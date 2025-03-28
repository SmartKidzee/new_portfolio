/**
 * HyperCache - Extreme Performance Caching System
 * 
 * Implements a multi-tiered caching strategy with intelligent preloading,
 * persistence optimization, and predictive invalidation for near-instantaneous
 * resource availability.
 */

interface CacheConfig {
  name: string;
  version: number;
  maxSize: number; // in bytes
  defaultTTL: number; // in milliseconds 
  persistenceStrategy: 'memory' | 'session' | 'local' | 'indexed-db' | 'filesystem' | 'multi-tier';
  compressionLevel: 'none' | 'low' | 'medium' | 'high';
  prefetchStrategy: 'aggressive' | 'conservative' | 'network-aware' | 'none';
  invalidationStrategy: 'time-based' | 'access-based' | 'hybrid' | 'manual';
}

interface CacheMetrics {
  hits: number;
  misses: number;
  size: number;
  itemCount: number;
  oldestEntry: Date | null;
  newestEntry: Date | null;
  averageAccessTime: number;
  persistenceOverhead: number;
}

/**
 * Implements an ultra-high performance caching system using multiple storage strategies
 * with intelligent prefetching and strategic persistence.
 */
class HyperCache {
  private config: CacheConfig;
  private memoryCache: Map<string, any> = new Map();
  private memoryCacheMeta: Map<string, { expires: number, size: number, accessCount: number, lastAccessed: number }> = new Map();
  private persistentCache: IDBDatabase | null = null;
  private metrics: CacheMetrics = {
    hits: 0,
    misses: 0,
    size: 0,
    itemCount: 0,
    oldestEntry: null,
    newestEntry: null,
    averageAccessTime: 0,
    persistenceOverhead: 0
  };
  private pendingWrites: Map<string, Promise<void>> = new Map();
  private networkInfo: any = null;
  private totalAccessTime: number = 0;
  private totalAccesses: number = 0;
  private prefetchQueue: string[] = [];
  private processingPrefetch: boolean = false;
  
  constructor(config: Partial<CacheConfig> = {}) {
    // Set default configuration with aggressive optimizations
    this.config = {
      name: 'hyper-cache',
      version: 1,
      maxSize: 50 * 1024 * 1024, // 50MB default
      defaultTTL: 24 * 60 * 60 * 1000, // 24 hours
      persistenceStrategy: 'multi-tier',
      compressionLevel: 'medium',
      prefetchStrategy: 'network-aware',
      invalidationStrategy: 'hybrid',
      ...config
    };
    
    // Initialize caches
    this.initializeCache();
    
    // Monitor network conditions for adaptive behavior
    this.setupNetworkMonitoring();
    
    // Set up cache maintenance
    this.setupCacheMaintenance();
  }
  
  /**
   * Initialize the appropriate cache storage based on config
   */
  private async initializeCache(): Promise<void> {
    // Always set up memory cache
    this.memoryCache = new Map();
    this.memoryCacheMeta = new Map();
    
    // Initialize persistent storage if needed
    if (this.config.persistenceStrategy !== 'memory') {
      await this.initializePersistentStorage();
    }
    
    // Attempt to restore cache metrics
    this.restoreMetrics();
  }
  
  /**
   * Initialize persistent storage based on configuration
   */
  private async initializePersistentStorage(): Promise<void> {
    try {
      if (this.useIndexedDB()) {
        await this.initializeIndexedDB();
      }
      
      // Try to preload critical cache data into memory
      if (this.config.prefetchStrategy !== 'none') {
        await this.preloadCriticalCacheData();
      }
    } catch (error) {
      console.error('Failed to initialize persistent cache:', error);
      // Fallback to memory-only cache
      this.config.persistenceStrategy = 'memory';
    }
  }
  
  /**
   * Check if we should use IndexedDB
   */
  private useIndexedDB(): boolean {
    return this.config.persistenceStrategy === 'indexed-db' || 
           this.config.persistenceStrategy === 'multi-tier';
  }
  
  /**
   * Initialize IndexedDB storage
   */
  private initializeIndexedDB(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!('indexedDB' in window)) {
        return reject(new Error('IndexedDB not supported'));
      }
      
      const request = indexedDB.open(this.config.name, this.config.version);
      
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        
        // Create object stores if they don't exist
        if (!db.objectStoreNames.contains('cache-data')) {
          const store = db.createObjectStore('cache-data', { keyPath: 'key' });
          store.createIndex('expires', 'expires', { unique: false });
        }
        
        if (!db.objectStoreNames.contains('cache-metadata')) {
          db.createObjectStore('cache-metadata', { keyPath: 'key' });
        }
      };
      
      request.onsuccess = (event) => {
        this.persistentCache = (event.target as IDBOpenDBRequest).result;
        resolve();
      };
      
      request.onerror = (event) => {
        console.error('IndexedDB error:', (event.target as IDBOpenDBRequest).error);
        reject((event.target as IDBOpenDBRequest).error);
      };
    });
  }
  
  /**
   * Preload critical cache data for instant availability
   */
  private async preloadCriticalCacheData(): Promise<void> {
    if (!this.persistentCache) return;
    
    try {
      // Get the most frequently accessed items
      const transaction = this.persistentCache.transaction(['cache-metadata'], 'readonly');
      const store = transaction.objectStore('cache-metadata');
      const request = store.getAll();
      
      const metadataList = await new Promise<any[]>((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
      
      // Sort by access count to find critical items
      const sortedMetadata = metadataList
        .sort((a, b) => b.accessCount - a.accessCount)
        .slice(0, 20); // Preload top 20 most accessed items
      
      // Preload these items into memory cache
      await Promise.all(sortedMetadata.map(meta => 
        this.loadFromPersistentCache(meta.key)
      ));
    } catch (error) {
      console.error('Error preloading critical cache data:', error);
    }
  }
  
  /**
   * Setup network monitoring for adaptive behavior
   */
  private setupNetworkMonitoring(): void {
    if ('connection' in navigator) {
      this.networkInfo = (navigator as any).connection;
      
      if (this.networkInfo) {
        this.networkInfo.addEventListener('change', () => {
          this.adaptToNetworkConditions();
        });
        
        // Initial adaptation
        this.adaptToNetworkConditions();
      }
    }
  }
  
  /**
   * Adapt caching behavior based on network conditions
   */
  private adaptToNetworkConditions(): void {
    if (!this.networkInfo) return;
    
    const isSaveData = this.networkInfo.saveData;
    const effectiveType = this.networkInfo.effectiveType;
    
    // Adjust prefetching strategy based on network
    if (isSaveData || effectiveType === 'slow-2g' || effectiveType === '2g') {
      // Reduce prefetching on slow connections
      this.config.prefetchStrategy = 'conservative';
    } else if (effectiveType === '3g') {
      this.config.prefetchStrategy = 'network-aware';
    } else if (effectiveType === '4g') {
      this.config.prefetchStrategy = 'aggressive';
    }
    
    // Adjust TTL for slow connections to reduce network requests
    if (isSaveData || effectiveType === 'slow-2g' || effectiveType === '2g') {
      this.config.defaultTTL = 48 * 60 * 60 * 1000; // 48 hours for slow connections
    }
  }
  
  /**
   * Setup periodic cache maintenance tasks
   */
  private setupCacheMaintenance(): void {
    // Set up periodic cleanup
    setInterval(() => {
      this.runCacheMaintenance();
    }, 5 * 60 * 1000); // Run every 5 minutes
    
    // Set up idle time optimization
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        this.optimizeCacheDuringIdle();
      }, { timeout: 1000 });
    }
  }
  
  /**
   * Run regular cache maintenance tasks
   */
  private async runCacheMaintenance(): Promise<void> {
    try {
      // First purge expired items
      await this.purgeExpiredItems();
      
      // Then ensure we're within size limits
      if (this.metrics.size > this.config.maxSize) {
        await this.enforceSizeLimits();
      }
      
      // Update cache metrics
      this.updateCacheMetrics();
      
      // Save metrics for analytics
      this.persistMetrics();
    } catch (error) {
      console.error('Error during cache maintenance:', error);
    }
  }
  
  /**
   * Purge expired items from all cache tiers
   */
  private async purgeExpiredItems(): Promise<void> {
    const now = Date.now();
    
    // Remove expired items from memory cache
    for (const [key, meta] of this.memoryCacheMeta.entries()) {
      if (meta.expires < now) {
        this.metrics.size -= meta.size;
        this.memoryCache.delete(key);
        this.memoryCacheMeta.delete(key);
      }
    }
    
    // Remove expired items from persistent cache
    if (this.persistentCache) {
      try {
        const transaction = this.persistentCache.transaction(['cache-data', 'cache-metadata'], 'readwrite');
        const dataStore = transaction.objectStore('cache-data');
        const metaStore = transaction.objectStore('cache-metadata');
        const expiryIndex = dataStore.index('expires');
        
        // Get all expired items
        const range = IDBKeyRange.upperBound(now);
        const request = expiryIndex.getAllKeys(range);
        
        const expiredKeys = await new Promise<string[]>((resolve, reject) => {
          request.onsuccess = () => resolve(request.result as string[]);
          request.onerror = () => reject(request.error);
        });
        
        // Delete expired items
        for (const key of expiredKeys) {
          dataStore.delete(key);
          metaStore.delete(key);
        }
      } catch (error) {
        console.error('Error purging expired items from persistent cache:', error);
      }
    }
  }
  
  /**
   * Enforce size limits by removing least valuable items
   */
  private async enforceSizeLimits(): Promise<void> {
    // Calculate how much we need to remove
    const excessSize = this.metrics.size - this.config.maxSize;
    if (excessSize <= 0) return;
    
    let removedSize = 0;
    
    // Create a list of items with their value metrics
    const itemValues: Array<{ key: string, value: number, size: number }> = [];
    
    for (const [key, meta] of this.memoryCacheMeta.entries()) {
      // Calculate value based on access patterns and size
      // Higher access count and recency increase value, larger size decreases it
      const recencyScore = (Date.now() - meta.lastAccessed) / (24 * 60 * 60 * 1000); // Days since last access
      const accessScore = Math.log1p(meta.accessCount); // Logarithmic scaling of access count
      const sizeScore = Math.log1p(meta.size / 1024); // Logarithmic scaling of size in KB
      
      // Weighted value calculation - higher is more valuable to keep
      const value = (accessScore * 2) + (1 / recencyScore) - (sizeScore * 0.5);
      
      itemValues.push({ key, value, size: meta.size });
    }
    
    // Sort by value (ascending, so least valuable first)
    itemValues.sort((a, b) => a.value - b.value);
    
    // Remove least valuable items until we've cleared enough space
    for (const item of itemValues) {
      if (removedSize >= excessSize) break;
      
      this.memoryCache.delete(item.key);
      this.memoryCacheMeta.delete(item.key);
      removedSize += item.size;
      
      // Also remove from persistent cache if we're using that
      if (this.persistentCache) {
        try {
          const transaction = this.persistentCache.transaction(['cache-data', 'cache-metadata'], 'readwrite');
          const dataStore = transaction.objectStore('cache-data');
          const metaStore = transaction.objectStore('cache-metadata');
          
          dataStore.delete(item.key);
          metaStore.delete(item.key);
        } catch (error) {
          console.error('Error removing item from persistent cache:', error);
        }
      }
    }
    
    // Update metrics
    this.metrics.size -= removedSize;
    this.metrics.itemCount = this.memoryCache.size;
  }
  
  /**
   * Perform deeper optimization during idle time
   */
  private optimizeCacheDuringIdle(): void {
    const processChunk = (deadline: IdleDeadline) => {
      // Process prefetch queue during idle time
      while (this.prefetchQueue.length > 0 && deadline.timeRemaining() > 10) {
        const key = this.prefetchQueue.shift();
        if (key) this.prefetch(key);
      }
      
      // If we still have more to do, schedule another chunk
      if (this.prefetchQueue.length > 0) {
        window.requestIdleCallback(processChunk);
      } else {
        this.processingPrefetch = false;
      }
    };
    
    // Start processing in idle time
    if (!this.processingPrefetch && this.prefetchQueue.length > 0) {
      this.processingPrefetch = true;
      window.requestIdleCallback(processChunk);
    }
  }
  
  /**
   * Set a value in the cache with advanced options
   */
  public async set(
    key: string, 
    value: any, 
    options: { 
      ttl?: number,
      priority?: 'critical' | 'high' | 'normal' | 'low',
      prefetch?: boolean 
    } = {}
  ): Promise<void> {
    const startTime = performance.now();
    
    // Determine TTL
    const ttl = options.ttl ?? this.config.defaultTTL;
    const expires = Date.now() + ttl;
    
    // Prepare data for storage
    const processedValue = this.processValueForStorage(value);
    const valueSize = this.estimateSize(processedValue);
    
    // Check if we have room
    if (valueSize > this.config.maxSize) {
      console.warn(`Value for key "${key}" exceeds maximum cache size`);
      return;
    }
    
    // Store in memory cache
    this.memoryCache.set(key, processedValue);
    this.memoryCacheMeta.set(key, {
      expires,
      size: valueSize,
      accessCount: 0,
      lastAccessed: Date.now()
    });
    
    // Update metrics
    this.metrics.size += valueSize;
    this.metrics.itemCount = this.memoryCache.size;
    this.metrics.newestEntry = new Date();
    if (!this.metrics.oldestEntry) {
      this.metrics.oldestEntry = new Date();
    }
    
    // If we're over size limit, schedule cleanup
    if (this.metrics.size > this.config.maxSize) {
      setTimeout(() => this.enforceSizeLimits(), 0);
    }
    
    // Store in persistent cache if configured
    if (this.shouldPersist(options.priority)) {
      this.storeInPersistentCache(key, processedValue, expires, valueSize);
    }
    
    // Track performance
    const endTime = performance.now();
    this.totalAccessTime += (endTime - startTime);
    this.totalAccesses++;
    this.metrics.averageAccessTime = this.totalAccessTime / this.totalAccesses;
  }
  
  /**
   * Get a value from the cache with optimized path
   */
  public async get<T = any>(key: string, options: { defaultValue?: T, updateTTL?: boolean } = {}): Promise<T | null> {
    const startTime = performance.now();
    
    // First check memory cache for fastest path
    if (this.memoryCache.has(key)) {
      const meta = this.memoryCacheMeta.get(key)!;
      
      // Check if expired
      if (meta.expires < Date.now()) {
        // Remove expired item
        this.memoryCache.delete(key);
        this.memoryCacheMeta.delete(key);
        this.metrics.size -= meta.size;
        this.metrics.misses++;
      } else {
        // Return from memory cache (fastest path)
        const value = this.memoryCache.get(key);
        
        // Update metadata
        meta.accessCount++;
        meta.lastAccessed = Date.now();
        
        // Update TTL if requested
        if (options.updateTTL) {
          meta.expires = Date.now() + this.config.defaultTTL;
        }
        
        this.memoryCacheMeta.set(key, meta);
        this.metrics.hits++;
        
        // Track performance
        const endTime = performance.now();
        this.totalAccessTime += (endTime - startTime);
        this.totalAccesses++;
        this.metrics.averageAccessTime = this.totalAccessTime / this.totalAccesses;
        
        // Schedule related items for prefetching
        this.schedulePrefetch(key);
        
        return value as T;
      }
    }
    
    // If not in memory cache, try persistent cache
    if (this.persistentCache) {
      try {
        const value = await this.loadFromPersistentCache(key);
        if (value !== null) {
          const meta = this.memoryCacheMeta.get(key)!;
          this.metrics.hits++;
          
          // Track performance
          const endTime = performance.now();
          this.totalAccessTime += (endTime - startTime);
          this.totalAccesses++;
          this.metrics.averageAccessTime = this.totalAccessTime / this.totalAccesses;
          
          // Schedule related items for prefetching
          this.schedulePrefetch(key);
          
          return value as T;
        }
      } catch (error) {
        console.error(`Error loading from persistent cache: ${key}`, error);
      }
    }
    
    // If not found anywhere
    this.metrics.misses++;
    
    // Track performance
    const endTime = performance.now();
    this.totalAccessTime += (endTime - startTime);
    this.totalAccesses++;
    this.metrics.averageAccessTime = this.totalAccessTime / this.totalAccesses;
    
    return options.defaultValue !== undefined ? options.defaultValue : null;
  }
  
  /**
   * Load a value from persistent cache into memory cache
   */
  private async loadFromPersistentCache(key: string): Promise<any> {
    if (!this.persistentCache) return null;
    
    try {
      // Check data store
      const transaction = this.persistentCache.transaction(['cache-data', 'cache-metadata'], 'readonly');
      const dataStore = transaction.objectStore('cache-data');
      const metaStore = transaction.objectStore('cache-metadata');
      
      // Get data and metadata
      const dataRequest = dataStore.get(key);
      const metaRequest = metaStore.get(key);
      
      const [dataResult, metaResult] = await Promise.all([
        new Promise<any>((resolve, reject) => {
          dataRequest.onsuccess = () => resolve(dataRequest.result);
          dataRequest.onerror = () => reject(dataRequest.error);
        }),
        new Promise<any>((resolve, reject) => {
          metaRequest.onsuccess = () => resolve(metaRequest.result);
          metaRequest.onerror = () => reject(metaRequest.error);
        })
      ]);
      
      // Check for results and expiry
      if (!dataResult || !metaResult || metaResult.expires < Date.now()) {
        if (dataResult && metaResult.expires < Date.now()) {
          // Clean up expired item
          const deleteTransaction = this.persistentCache.transaction(['cache-data', 'cache-metadata'], 'readwrite');
          deleteTransaction.objectStore('cache-data').delete(key);
          deleteTransaction.objectStore('cache-metadata').delete(key);
        }
        return null;
      }
      
      // Update memory cache
      const value = dataResult.value;
      
      // Store in memory for faster future access
      this.memoryCache.set(key, value);
      this.memoryCacheMeta.set(key, {
        expires: metaResult.expires,
        size: metaResult.size,
        accessCount: metaResult.accessCount + 1,
        lastAccessed: Date.now()
      });
      
      // Update metrics
      this.metrics.size += metaResult.size;
      this.metrics.itemCount = this.memoryCache.size;
      
      // Also update persistent metadata for access count
      const updateTransaction = this.persistentCache.transaction(['cache-metadata'], 'readwrite');
      metaResult.accessCount += 1;
      metaResult.lastAccessed = Date.now();
      updateTransaction.objectStore('cache-metadata').put(metaResult);
      
      return value;
    } catch (error) {
      console.error(`Error loading ${key} from persistent cache:`, error);
      return null;
    }
  }
  
  /**
   * Delete a value from all cache layers
   */
  public async delete(key: string): Promise<boolean> {
    let deleted = false;
    
    // Remove from memory cache
    if (this.memoryCache.has(key)) {
      const meta = this.memoryCacheMeta.get(key);
      if (meta) {
        this.metrics.size -= meta.size;
      }
      this.memoryCache.delete(key);
      this.memoryCacheMeta.delete(key);
      deleted = true;
    }
    
    // Remove from persistent cache
    if (this.persistentCache) {
      try {
        const transaction = this.persistentCache.transaction(['cache-data', 'cache-metadata'], 'readwrite');
        const dataStore = transaction.objectStore('cache-data');
        const metaStore = transaction.objectStore('cache-metadata');
        
        dataStore.delete(key);
        metaStore.delete(key);
        deleted = true;
      } catch (error) {
        console.error(`Error deleting ${key} from persistent cache:`, error);
      }
    }
    
    return deleted;
  }
  
  /**
   * Clear all cache data
   */
  public async clear(): Promise<void> {
    // Clear memory cache
    this.memoryCache.clear();
    this.memoryCacheMeta.clear();
    
    // Reset metrics
    this.metrics = {
      hits: 0,
      misses: 0,
      size: 0,
      itemCount: 0,
      oldestEntry: null,
      newestEntry: null,
      averageAccessTime: 0,
      persistenceOverhead: 0
    };
    
    // Clear persistent cache
    if (this.persistentCache) {
      try {
        const transaction = this.persistentCache.transaction(['cache-data', 'cache-metadata'], 'readwrite');
        transaction.objectStore('cache-data').clear();
        transaction.objectStore('cache-metadata').clear();
      } catch (error) {
        console.error('Error clearing persistent cache:', error);
      }
    }
  }
  
  /**
   * Process a value before storage (compression, etc.)
   */
  private processValueForStorage(value: any): any {
    // For simple values, just return
    if (typeof value !== 'object' || value === null) {
      return value;
    }
    
    // For complex objects, we could apply compression here
    // but we'll just clone to ensure safe storage for now
    return JSON.parse(JSON.stringify(value));
  }
  
  /**
   * Estimate size of a value for cache metrics
   */
  private estimateSize(value: any): number {
    if (value === null || value === undefined) {
      return 0;
    }
    
    const type = typeof value;
    
    // Simple value estimates
    if (type === 'boolean') return 4;
    if (type === 'number') return 8;
    
    // String size
    if (type === 'string') return value.length * 2; // UTF-16 characters
    
    // Object size estimation 
    if (type === 'object') {
      try {
        const jsonStr = JSON.stringify(value);
        return jsonStr.length * 2; // UTF-16 characters
      } catch (e) {
        // Fallback for circular references etc.
        return 1024; // Arbitrary default for non-serializable objects
      }
    }
    
    return 8; // Default for other types
  }
  
  /**
   * Determine if a value should be persisted based on priority
   */
  private shouldPersist(priority?: 'critical' | 'high' | 'normal' | 'low'): boolean {
    if (this.config.persistenceStrategy === 'memory') {
      return false;
    }
    
    // Always persist critical and high priority items
    if (priority === 'critical' || priority === 'high') {
      return true;
    }
    
    // For normal priority, persist based on strategy
    if (priority === 'normal' || priority === undefined) {
      return this.config.persistenceStrategy === 'multi-tier' || 
             this.config.persistenceStrategy === 'indexed-db' || 
             this.config.persistenceStrategy === 'local';
    }
    
    // For low priority, only persist in multi-tier
    if (priority === 'low') {
      return this.config.persistenceStrategy === 'multi-tier';
    }
    
    return false;
  }
  
  /**
   * Store a value in the persistent cache
   */
  private async storeInPersistentCache(key: string, value: any, expires: number, size: number): Promise<void> {
    if (!this.persistentCache) return;
    
    // Skip if we already have a pending write for this key
    if (this.pendingWrites.has(key)) {
      await this.pendingWrites.get(key);
    }
    
    const writePromise = (async () => {
      try {
        const transaction = this.persistentCache!.transaction(['cache-data', 'cache-metadata'], 'readwrite');
        const dataStore = transaction.objectStore('cache-data');
        const metaStore = transaction.objectStore('cache-metadata');
        
        // Set data
        dataStore.put({
          key,
          value,
          expires
        });
        
        // Set metadata
        metaStore.put({
          key,
          expires,
          size,
          accessCount: 0,
          lastAccessed: Date.now()
        });
        
        // Wait for transaction to complete
        await new Promise<void>((resolve, reject) => {
          transaction.oncomplete = () => resolve();
          transaction.onerror = () => reject(transaction.error);
        });
      } catch (error) {
        console.error(`Error storing ${key} in persistent cache:`, error);
      } finally {
        // Remove from pending writes
        this.pendingWrites.delete(key);
      }
    })();
    
    // Track pending write
    this.pendingWrites.set(key, writePromise);
    
    await writePromise;
  }
  
  /**
   * Schedule prefetching for related items
   */
  private schedulePrefetch(key: string): void {
    if (this.config.prefetchStrategy === 'none') return;
    
    // For network-aware prefetching, check conditions
    if (this.config.prefetchStrategy === 'network-aware' && this.networkInfo) {
      if (this.networkInfo.saveData || this.networkInfo.effectiveType === 'slow-2g') {
        return; // Skip prefetching on very slow connections
      }
    }
    
    // Find related keys (simplified implementation)
    // In a real system, this would use sophisticated relationship tracking
    const relatedKeys = this.findRelatedKeys(key);
    
    // Add to prefetch queue
    for (const relatedKey of relatedKeys) {
      if (!this.memoryCache.has(relatedKey) && !this.prefetchQueue.includes(relatedKey)) {
        this.prefetchQueue.push(relatedKey);
      }
    }
    
    // Start processing prefetch queue if needed
    this.startPrefetching();
  }
  
  /**
   * Find keys related to the given key that should be prefetched
   */
  private findRelatedKeys(key: string): string[] {
    // Simple approach - use key prefix to identify related items
    const keyParts = key.split(':');
    const relatedKeys: string[] = [];
    
    // Iterate through all memory cache metadata to find related keys
    for (const [cachedKey, meta] of this.memoryCacheMeta.entries()) {
      if (cachedKey === key) continue;
      
      // Simple heuristic - keys with same prefix are likely related
      const cachedKeyParts = cachedKey.split(':');
      if (cachedKeyParts[0] === keyParts[0]) {
        relatedKeys.push(cachedKey);
      }
    }
    
    // Limit the number of prefetched keys
    const prefetchLimit = this.determinePrefetchLimit();
    return relatedKeys.slice(0, prefetchLimit);
  }
  
  /**
   * Determine how many items to prefetch based on strategy
   */
  private determinePrefetchLimit(): number {
    switch (this.config.prefetchStrategy) {
      case 'aggressive':
        return 10;
      case 'network-aware':
        if (!this.networkInfo) return 5;
        
        // Adjust based on network type
        switch (this.networkInfo.effectiveType) {
          case '4g': return 8;
          case '3g': return 4;
          case '2g': return 2;
          case 'slow-2g': return 0;
          default: return 5;
        }
      case 'conservative':
        return 3;
      case 'none':
      default:
        return 0;
    }
  }
  
  /**
   * Start processing the prefetch queue
   */
  private startPrefetching(): void {
    if (this.processingPrefetch || this.prefetchQueue.length === 0) {
      return;
    }
    
    // For idle-time processing
    if ('requestIdleCallback' in window) {
      this.processingPrefetch = true;
      window.requestIdleCallback((deadline) => {
        this.processPrefetchQueue(deadline);
      });
    } else {
      // Simple setTimeout fallback
      this.processingPrefetch = true;
      setTimeout(() => {
        this.processPrefetchQueue(null);
      }, 50);
    }
  }
  
  /**
   * Process items in the prefetch queue
   */
  private processPrefetchQueue(deadline: IdleDeadline | null): void {
    const processNext = () => {
      if (this.prefetchQueue.length === 0) {
        this.processingPrefetch = false;
        return;
      }
      
      // Check if we have time remaining
      if (deadline && deadline.timeRemaining() < 5) {
        // Schedule continuation in next idle callback
        window.requestIdleCallback((newDeadline) => {
          this.processPrefetchQueue(newDeadline);
        });
        return;
      }
      
      // Process next key
      const key = this.prefetchQueue.shift();
      if (key) {
        this.prefetch(key).then(() => {
          if ('requestIdleCallback' in window) {
            window.requestIdleCallback(processNext);
          } else {
            setTimeout(processNext, 0);
          }
        });
      } else {
        this.processingPrefetch = false;
      }
    };
    
    processNext();
  }
  
  /**
   * Prefetch a specific key
   */
  private async prefetch(key: string): Promise<void> {
    // Skip if already in memory
    if (this.memoryCache.has(key)) return;
    
    // Try to load from persistent cache
    if (this.persistentCache) {
      try {
        await this.loadFromPersistentCache(key);
      } catch (error) {
        // Silently ignore prefetch errors
      }
    }
  }
  
  /**
   * Update cache metrics
   */
  private updateCacheMetrics(): void {
    // Update item count
    this.metrics.itemCount = this.memoryCache.size;
    
    // Find oldest and newest entries
    let oldestTime = Infinity;
    let newestTime = 0;
    
    for (const meta of this.memoryCacheMeta.values()) {
      const creationTime = meta.expires - this.config.defaultTTL;
      if (creationTime < oldestTime) {
        oldestTime = creationTime;
      }
      if (creationTime > newestTime) {
        newestTime = creationTime;
      }
    }
    
    if (oldestTime !== Infinity) {
      this.metrics.oldestEntry = new Date(oldestTime);
    }
    
    if (newestTime !== 0) {
      this.metrics.newestEntry = new Date(newestTime);
    }
  }
  
  /**
   * Restore metrics from persistent storage
   */
  private async restoreMetrics(): Promise<void> {
    // Only if we're using persistent storage
    if (!this.persistentCache) return;
    
    try {
      const transaction = this.persistentCache.transaction(['cache-metadata'], 'readonly');
      const store = transaction.objectStore('cache-metadata');
      const request = store.get('__metrics__');
      
      const result = await new Promise<any>((resolve, reject) => {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
      
      if (result) {
        // Restore metrics from saved data
        this.metrics = {
          ...this.metrics,
          hits: result.hits || 0,
          misses: result.misses || 0,
          persistenceOverhead: result.persistenceOverhead || 0,
        };
      }
    } catch (error) {
      console.error('Error restoring cache metrics:', error);
    }
  }
  
  /**
   * Persist metrics for analytics
   */
  private async persistMetrics(): Promise<void> {
    if (!this.persistentCache) return;
    
    try {
      const transaction = this.persistentCache.transaction(['cache-metadata'], 'readwrite');
      const store = transaction.objectStore('cache-metadata');
      
      store.put({
        key: '__metrics__',
        hits: this.metrics.hits,
        misses: this.metrics.misses,
        persistenceOverhead: this.metrics.persistenceOverhead,
        lastUpdated: Date.now()
      });
    } catch (error) {
      console.error('Error persisting cache metrics:', error);
    }
  }
  
  /**
   * Get current cache metrics
   */
  public getMetrics(): CacheMetrics {
    return { ...this.metrics };
  }
}

// Create singleton instance with optimized settings
const hyperCache = new HyperCache({
  name: 'hyper-performance-cache',
  maxSize: 100 * 1024 * 1024, // 100MB
  defaultTTL: 24 * 60 * 60 * 1000, // 24 hours
  persistenceStrategy: 'multi-tier', 
  prefetchStrategy: 'network-aware'
});

export default hyperCache; 