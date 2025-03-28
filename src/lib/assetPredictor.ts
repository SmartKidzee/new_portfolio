/**
 * AssetPredictor - Advanced Predictive Resource Loading System
 * 
 * Uses machine learning and behavioral analysis to predict which resources
 * a user will need next and preloads them with optimal timing.
 */

import hyperCache from './hyperCache';

type AssetType = 'image' | 'script' | 'style' | 'font' | 'data' | 'video' | 'audio';

interface AssetDescriptor {
  id: string;
  url: string;
  type: AssetType;
  size: number;
  priority: number; // 1-10 scale, 10 being highest
  dependencies?: string[]; // IDs of assets this depends on
}

interface NavigationPattern {
  from: string; // route path
  to: string; // route path
  count: number;
  avgTransitionTime: number; // ms
  lastObserved: number; // timestamp
}

interface UserBehaviorData {
  sessionDuration: number;
  pageViews: {[path: string]: number};
  avgTimeOnPage: {[path: string]: number};
  navigationPatterns: NavigationPattern[];
  componentInteractions: {[componentId: string]: number};
  deviceCategory: 'mobile' | 'tablet' | 'desktop';
  connectionType: string;
  returningUser: boolean;
}

interface RoutePredictionModel {
  predict: (currentRoute: string) => Map<string, number> | undefined;
}

interface ComponentPredictionModel {
  predict: (currentComponents: string[]) => string[];
}

interface PredictionModels {
  routeTransition: RoutePredictionModel;
  componentInteraction: ComponentPredictionModel;
}

/**
 * Predictive asset loading system that uses machine learning techniques
 * and behavioral analysis to anticipate user needs before they occur.
 */
class AssetPredictor {
  private assets: Map<string, AssetDescriptor> = new Map();
  private assetsByRoute: Map<string, Set<string>> = new Map();
  private assetDependencyGraph: Map<string, Set<string>> = new Map();
  private behavioralData: UserBehaviorData;
  private navigationHistory: string[] = [];
  private componentVisibility: Map<string, boolean> = new Map();
  private routeTransitionProbabilities: Map<string, Map<string, number>> = new Map();
  private predictionModels: PredictionModels;
  private loadingInProgress: Set<string> = new Set();
  private loadingComplete: Set<string> = new Set();
  private currentRoute: string = '';
  private sessionStartTime: number = Date.now();
  
  constructor() {
    // Initialize behavioral data
    this.behavioralData = this.initBehavioralData();
    
    // Initialize prediction system
    this.predictionModels = this.initPredictionSystem();
    
    // Set up route change monitoring
    this.setupRouteMonitoring();
    
    // Set up component visibility monitoring
    this.setupVisibilityMonitoring();
    
    // Load previous behavioral data
    this.loadSavedBehavioralData();
  }
  
  /**
   * Initialize user behavioral data object
   */
  private initBehavioralData(): UserBehaviorData {
    return {
      sessionDuration: 0,
      pageViews: {},
      avgTimeOnPage: {},
      navigationPatterns: [],
      componentInteractions: {},
      deviceCategory: this.detectDeviceCategory(),
      connectionType: this.detectConnectionType(),
      returningUser: this.isReturningUser()
    };
  }
  
  /**
   * Initialize the prediction system
   */
  private initPredictionSystem(): PredictionModels {
    // Implement basic machine learning model initialization
    // This would be more sophisticated in a real implementation
    
    return {
      // Initialize route prediction model
      routeTransition: {
        predict: (currentRoute: string): Map<string, number> | undefined => {
          // Return probabilities of next routes
          if (this.routeTransitionProbabilities.has(currentRoute)) {
            return this.routeTransitionProbabilities.get(currentRoute);
          }
          return undefined;
        }
      },
      
      // Initialize component interaction model
      componentInteraction: {
        predict: (currentComponents: string[]): string[] => {
          // Simple implementation - return components with highest interaction counts
          const interactionCounts = this.behavioralData.componentInteractions;
          return Object.entries(interactionCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([componentId]) => componentId);
        }
      }
    };
  }
  
  /**
   * Setup monitoring for route changes
   */
  private setupRouteMonitoring(): void {
    // Listen for route changes - framework agnostic approach
    // For single-page applications
    
    // History API based monitoring
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;
    
    history.pushState = (...args) => {
      originalPushState.apply(history, args);
      this.handleRouteChange(window.location.pathname);
    };
    
    history.replaceState = (...args) => {
      originalReplaceState.apply(history, args);
      this.handleRouteChange(window.location.pathname);
    };
    
    // Handle popstate events
    window.addEventListener('popstate', () => {
      this.handleRouteChange(window.location.pathname);
    });
    
    // Initial route
    this.handleRouteChange(window.location.pathname);
  }
  
  /**
   * Setup monitoring for component visibility
   */
  private setupVisibilityMonitoring(): void {
    // Set up intersection observer for components
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const componentId = entry.target.getAttribute('data-component-id');
        if (componentId) {
          const isVisible = entry.isIntersecting;
          this.componentVisibility.set(componentId, isVisible);
          
          if (isVisible) {
            // Increment interaction count for this component
            const currentCount = this.behavioralData.componentInteractions[componentId] || 0;
            this.behavioralData.componentInteractions[componentId] = currentCount + 1;
            
            // Consider preloading dependent assets
            this.predictAndLoadComponentDependencies(componentId);
          }
        }
      });
    }, {
      threshold: 0.1 // 10% visibility triggers
    });
    
    // Monitor all components with the data-component-id attribute
    this.observeComponentsInDOM(observer);
    
    // Re-run when DOM changes
    const mutationObserver = new MutationObserver(() => {
      this.observeComponentsInDOM(observer);
    });
    
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  
  /**
   * Observe all components in the DOM
   */
  private observeComponentsInDOM(observer: IntersectionObserver): void {
    const components = document.querySelectorAll('[data-component-id]');
    components.forEach(component => {
      observer.observe(component);
    });
  }
  
  /**
   * Handle a route change
   */
  private handleRouteChange(newRoute: string): void {
    // Calculate time spent on previous route
    const now = Date.now();
    if (this.currentRoute) {
      const timeOnPage = now - (this.navigationHistory.length > 0 ? 
        now - this.sessionStartTime : this.sessionStartTime);
      
      // Update average time on page
      const currentAvg = this.behavioralData.avgTimeOnPage[this.currentRoute] || 0;
      const currentViews = this.behavioralData.pageViews[this.currentRoute] || 0;
      
      if (currentViews > 0) {
        this.behavioralData.avgTimeOnPage[this.currentRoute] = 
          (currentAvg * currentViews + timeOnPage) / (currentViews + 1);
      } else {
        this.behavioralData.avgTimeOnPage[this.currentRoute] = timeOnPage;
      }
      
      // Record navigation pattern
      if (this.navigationHistory.length > 0) {
        this.recordNavigationPattern(this.currentRoute, newRoute, timeOnPage);
      }
    }
    
    // Record page view
    this.behavioralData.pageViews[newRoute] = 
      (this.behavioralData.pageViews[newRoute] || 0) + 1;
    
    // Add to navigation history
    this.navigationHistory.push(newRoute);
    if (this.navigationHistory.length > 20) {
      this.navigationHistory.shift(); // Keep history manageable
    }
    
    // Update current route
    this.currentRoute = newRoute;
    
    // Preload assets for this route
    this.loadAssetsForRoute(newRoute);
    
    // Predict and preload assets for likely next routes
    this.predictAndLoadNextRouteAssets();
    
    // Update transition probabilities
    this.updateTransitionProbabilities();
    
    // Save behavioral data periodically
    if (this.navigationHistory.length % 5 === 0) {
      this.saveBehavioralData();
    }
  }
  
  /**
   * Register an asset for prediction and preloading
   */
  public registerAsset(asset: AssetDescriptor, routes: string[] = []): void {
    this.assets.set(asset.id, asset);
    
    // Associate asset with routes
    routes.forEach(route => {
      if (!this.assetsByRoute.has(route)) {
        this.assetsByRoute.set(route, new Set());
      }
      this.assetsByRoute.get(route)?.add(asset.id);
    });
    
    // Build dependency graph
    if (asset.dependencies) {
      this.assetDependencyGraph.set(asset.id, new Set(asset.dependencies));
      
      // Reverse dependencies for quick lookup
      asset.dependencies.forEach(depId => {
        if (!this.assetDependencyGraph.has(depId)) {
          this.assetDependencyGraph.set(depId, new Set());
        }
        this.assetDependencyGraph.get(depId)?.add(asset.id);
      });
    }
  }
  
  /**
   * Load assets explicitly needed for the current route
   */
  private loadAssetsForRoute(route: string): void {
    const assetIds = this.assetsByRoute.get(route) || new Set();
    
    // Sort by priority
    const sortedAssets = Array.from(assetIds)
      .map(id => this.assets.get(id)!)
      .sort((a, b) => b.priority - a.priority);
    
    // Load in priority order  
    for (const asset of sortedAssets) {
      this.loadAsset(asset.id);
    }
  }
  
  /**
   * Predict and load assets for likely next routes
   */
  private predictAndLoadNextRouteAssets(): void {
    // Get predictions from the model
    const routePredictions = this.predictionModels.routeTransition.predict(this.currentRoute);
    
    if (!routePredictions) return;
    
    // Create prioritized list of routes and their probabilities
    const routesWithProbabilities = Array.from(routePredictions.entries())
      .sort((a: [string, number], b: [string, number]) => b[1] - a[1]); // Sort by probability (descending)
    
    // Preload assets for top likely routes
    const topRoutes = routesWithProbabilities.slice(0, 3); // Top 3 most likely routes
    
    // Adjust number of assets preloaded based on probability
    for (const [route, probability] of topRoutes) {
      // Only preload for routes with sufficiently high probability
      if (probability < 0.15) continue;
      
      const assetIds = this.assetsByRoute.get(route) || new Set();
      
      // Sort by priority
      const sortedAssets = Array.from(assetIds)
        .map(id => this.assets.get(id)!)
        .sort((a, b) => b.priority - a.priority);
      
      // Determine how many assets to preload based on probability
      const numAssetsToPreload = Math.ceil(sortedAssets.length * probability);
      
      // Preload selected assets
      for (let i = 0; i < Math.min(numAssetsToPreload, sortedAssets.length); i++) {
        this.preloadAsset(sortedAssets[i].id);
      }
    }
  }
  
  /**
   * Predict and load assets related to a visible component
   */
  private predictAndLoadComponentDependencies(componentId: string): void {
    // Find assets related to this component 
    // This is a simplified implementation
    
    // For a real system, there would be a map of components to assets
    // Here we'll just use a naming convention for demonstration
    const relatedAssetIds = Array.from(this.assets.keys())
      .filter(assetId => assetId.startsWith(`component:${componentId}:`));
    
    // Load these assets immediately as they're needed by a visible component
    for (const assetId of relatedAssetIds) {
      this.loadAsset(assetId);
    }
    
    // Predict which other components might be interacted with next
    const predictedComponentIds = this.predictionModels.componentInteraction
      .predict([componentId]);
    
    // Preload assets for predicted components
    for (const predictedId of predictedComponentIds) {
      const relatedPredictedAssets = Array.from(this.assets.keys())
        .filter(assetId => assetId.startsWith(`component:${predictedId}:`));
      
      for (const assetId of relatedPredictedAssets) {
        this.preloadAsset(assetId);
      }
    }
  }
  
  /**
   * Immediately load an asset as it's needed now
   */
  private loadAsset(assetId: string): void {
    // Skip if already loaded or loading
    if (this.loadingComplete.has(assetId) || this.loadingInProgress.has(assetId)) {
      return;
    }
    
    const asset = this.assets.get(assetId);
    if (!asset) return;
    
    // Mark as loading
    this.loadingInProgress.add(assetId);
    
    // Check if cached first
    hyperCache.get(this.getCacheKey(asset)).then(cachedData => {
      if (cachedData) {
        // Use cached data
        this.processLoadedAsset(asset, cachedData);
        return;
      }
      
      // Load the asset
      this.fetchAsset(asset).then(data => {
        // Cache the result
        hyperCache.set(this.getCacheKey(asset), data, {
          priority: asset.priority >= 8 ? 'critical' : 
                   asset.priority >= 5 ? 'high' : 
                   asset.priority >= 3 ? 'normal' : 'low'
        });
        
        this.processLoadedAsset(asset, data);
      }).catch(error => {
        console.error(`Failed to load asset ${asset.id}:`, error);
        this.loadingInProgress.delete(assetId);
      });
    });
  }
  
  /**
   * Preload an asset for future use at a lower priority
   */
  private preloadAsset(assetId: string): void {
    // Skip if already loaded, loading, or preloading threshold reached
    if (this.loadingComplete.has(assetId) || 
        this.loadingInProgress.has(assetId) ||
        this.shouldThrottlePreloading()) {
      return;
    }
    
    const asset = this.assets.get(assetId);
    if (!asset) return;
    
    // Check cache first
    hyperCache.get(this.getCacheKey(asset)).then(cachedData => {
      if (cachedData) {
        // Already cached, no need to preload
        return;
      }
      
      // Mark as loading
      this.loadingInProgress.add(assetId);
      
      // Preload with appropriate resource hints
      if (asset.type === 'image') {
        this.preloadImage(asset);
      } else if (asset.type === 'script') {
        this.preloadScript(asset);
      } else if (asset.type === 'style') {
        this.preloadStyle(asset);
      } else if (asset.type === 'font') {
        this.preloadFont(asset);
      } else {
        // For other asset types, use fetch with lower priority
        this.fetchAssetWithLowerPriority(asset).then(data => {
          // Cache the result
          hyperCache.set(this.getCacheKey(asset), data, {
            priority: 'low'
          });
          
          this.loadingComplete.add(assetId);
          this.loadingInProgress.delete(assetId);
        }).catch(error => {
          console.error(`Failed to preload asset ${asset.id}:`, error);
          this.loadingInProgress.delete(assetId);
        });
      }
    });
  }
  
  /**
   * Process a loaded asset
   */
  private processLoadedAsset(asset: AssetDescriptor, data: any): void {
    // Apply the asset appropriately based on type
    switch (asset.type) {
      case 'image':
        // Nothing to do, browser caches the image
        break;
      case 'script':
        this.applyScript(asset, data);
        break;
      case 'style':
        this.applyStyle(asset, data);
        break;
      case 'font':
        // Nothing to do, browser handles this
        break;
      case 'data':
        // Store data for application use
        this.storeData(asset, data);
        break;
    }
    
    // Mark as complete
    this.loadingComplete.add(asset.id);
    this.loadingInProgress.delete(asset.id);
    
    // Load dependencies
    const dependentIds = this.assetDependencyGraph.get(asset.id);
    if (dependentIds) {
      // Find assets that have all dependencies loaded
      dependentIds.forEach(depId => {
        const depAsset = this.assets.get(depId);
        if (depAsset && depAsset.dependencies) {
          const allDepsLoaded = depAsset.dependencies.every(d => 
            this.loadingComplete.has(d));
          
          if (allDepsLoaded) {
            this.loadAsset(depId);
          }
        }
      });
    }
  }
  
  /**
   * Create a consistent cache key for an asset
   */
  private getCacheKey(asset: AssetDescriptor): string {
    return `asset:${asset.id}:${asset.url}`;
  }
  
  /**
   * Fetch an asset
   */
  private fetchAsset(asset: AssetDescriptor): Promise<any> {
    switch (asset.type) {
      case 'image':
        return this.fetchImage(asset);
      case 'script':
        return this.fetchScript(asset);
      case 'style':
        return this.fetchStyle(asset);
      case 'font':
        return this.fetchFont(asset);
      case 'data':
        return this.fetchData(asset);
      case 'video':
        return this.fetchVideo(asset);
      case 'audio':
        return this.fetchAudio(asset);
      default:
        return fetch(asset.url).then(res => res.blob());
    }
  }
  
  /**
   * Fetch an asset with lower priority (for preloading)
   */
  private fetchAssetWithLowerPriority(asset: AssetDescriptor): Promise<any> {
    // Use newer fetch API with priority hint if available
    // @ts-ignore - priority is a newer property not in all TypeScript defs
    const fetchOptions: RequestInit = { priority: 'low' };
    return fetch(asset.url, fetchOptions).then(res => res.blob());
  }
  
  /**
   * Fetch an image asset
   */
  private fetchImage(asset: AssetDescriptor): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        // Create a mock response for cache consistency
        fetch(asset.url)
          .then(res => res.blob())
          .then(resolve)
          .catch(reject);
      };
      
      img.onerror = () => {
        reject(new Error(`Failed to load image: ${asset.url}`));
      };
      
      img.src = asset.url;
    });
  }
  
  /**
   * Fetch a script asset
   */
  private fetchScript(asset: AssetDescriptor): Promise<string> {
    return fetch(asset.url).then(res => res.text());
  }
  
  /**
   * Fetch a style asset
   */
  private fetchStyle(asset: AssetDescriptor): Promise<string> {
    return fetch(asset.url).then(res => res.text());
  }
  
  /**
   * Fetch a font asset
   */
  private fetchFont(asset: AssetDescriptor): Promise<ArrayBuffer> {
    return fetch(asset.url).then(res => res.arrayBuffer());
  }
  
  /**
   * Fetch a data asset
   */
  private fetchData(asset: AssetDescriptor): Promise<any> {
    return fetch(asset.url).then(res => {
      // Try to parse as JSON if appropriate
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return res.json();
      }
      return res.text();
    });
  }
  
  /**
   * Fetch video asset metadata
   */
  private fetchVideo(asset: AssetDescriptor): Promise<any> {
    // For videos, we just fetch the metadata, not the whole video
    return fetch(asset.url, { method: 'HEAD' }).then(res => {
      return {
        contentType: res.headers.get('content-type'),
        contentLength: res.headers.get('content-length'),
        url: asset.url
      };
    });
  }
  
  /**
   * Fetch audio asset metadata
   */
  private fetchAudio(asset: AssetDescriptor): Promise<any> {
    // For audio, we just fetch the metadata, not the whole audio file
    return fetch(asset.url, { method: 'HEAD' }).then(res => {
      return {
        contentType: res.headers.get('content-type'),
        contentLength: res.headers.get('content-length'),
        url: asset.url
      };
    });
  }
  
  /**
   * Preload an image
   */
  private preloadImage(asset: AssetDescriptor): void {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = asset.url;
    link.onload = () => {
      this.loadingComplete.add(asset.id);
      this.loadingInProgress.delete(asset.id);
      document.head.removeChild(link);
    };
    link.onerror = () => {
      this.loadingInProgress.delete(asset.id);
      document.head.removeChild(link);
    };
    document.head.appendChild(link);
  }
  
  /**
   * Preload a script
   */
  private preloadScript(asset: AssetDescriptor): void {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'script';
    link.href = asset.url;
    link.onload = () => {
      this.loadingComplete.add(asset.id);
      this.loadingInProgress.delete(asset.id);
      document.head.removeChild(link);
    };
    link.onerror = () => {
      this.loadingInProgress.delete(asset.id);
      document.head.removeChild(link);
    };
    document.head.appendChild(link);
  }
  
  /**
   * Preload a style
   */
  private preloadStyle(asset: AssetDescriptor): void {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = asset.url;
    link.onload = () => {
      this.loadingComplete.add(asset.id);
      this.loadingInProgress.delete(asset.id);
      document.head.removeChild(link);
    };
    link.onerror = () => {
      this.loadingInProgress.delete(asset.id);
      document.head.removeChild(link);
    };
    document.head.appendChild(link);
  }
  
  /**
   * Preload a font
   */
  private preloadFont(asset: AssetDescriptor): void {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.href = asset.url;
    link.crossOrigin = 'anonymous'; // Usually needed for fonts
    link.onload = () => {
      this.loadingComplete.add(asset.id);
      this.loadingInProgress.delete(asset.id);
      document.head.removeChild(link);
    };
    link.onerror = () => {
      this.loadingInProgress.delete(asset.id);
      document.head.removeChild(link);
    };
    document.head.appendChild(link);
  }
  
  /**
   * Apply a loaded script
   */
  private applyScript(asset: AssetDescriptor, code: string): void {
    // Create a script element and execute
    const script = document.createElement('script');
    script.text = code;
    document.head.appendChild(script);
  }
  
  /**
   * Apply a loaded style
   */
  private applyStyle(asset: AssetDescriptor, css: string): void {
    // Create a style element and add to head
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }
  
  /**
   * Store fetched data for application use
   */
  private storeData(asset: AssetDescriptor, data: any): void {
    // Store in runtime cache for application to use
    hyperCache.set(`data:${asset.id}`, data, {
      priority: 'high'
    });
  }
  
  /**
   * Determine if we should throttle preloading based on network conditions
   */
  private shouldThrottlePreloading(): boolean {
    // Check network conditions
    if (this.behavioralData.connectionType === 'slow-2g' || 
        this.behavioralData.connectionType === '2g') {
      return true;
    }
    
    // Check battery status if available
    if ('getBattery' in navigator) {
      // @ts-ignore - Not all TypeScript definitions include battery API
      navigator.getBattery().then((battery: any) => {
        if (battery.level < 0.15 && !battery.charging) {
          return true;
        }
      });
    }
    
    // Check if too many preloads are already happening
    if (this.loadingInProgress.size > 10) {
      return true;
    }
    
    return false;
  }
  
  /**
   * Record a navigation pattern between routes
   */
  private recordNavigationPattern(from: string, to: string, transitionTime: number): void {
    const patterns = this.behavioralData.navigationPatterns;
    
    // Find existing pattern
    const existingPattern = patterns.find(p => p.from === from && p.to === to);
    
    if (existingPattern) {
      // Update existing pattern
      existingPattern.count++;
      existingPattern.avgTransitionTime = 
        (existingPattern.avgTransitionTime * (existingPattern.count - 1) + transitionTime) / 
        existingPattern.count;
      existingPattern.lastObserved = Date.now();
    } else {
      // Add new pattern
      patterns.push({
        from,
        to,
        count: 1,
        avgTransitionTime: transitionTime,
        lastObserved: Date.now()
      });
    }
  }
  
  /**
   * Update the route transition probability model
   */
  private updateTransitionProbabilities(): void {
    const patterns = this.behavioralData.navigationPatterns;
    
    // Group by "from" route
    const fromRoutes = new Map<string, NavigationPattern[]>();
    
    patterns.forEach(pattern => {
      if (!fromRoutes.has(pattern.from)) {
        fromRoutes.set(pattern.from, []);
      }
      fromRoutes.get(pattern.from)!.push(pattern);
    });
    
    // Calculate probabilities for each from route
    fromRoutes.forEach((toPatterns, fromRoute) => {
      const totalCount = toPatterns.reduce((sum, p) => sum + p.count, 0);
      
      // Calculate raw probabilities
      const probabilities = new Map<string, number>();
      
      toPatterns.forEach(pattern => {
        probabilities.set(pattern.to, pattern.count / totalCount);
      });
      
      // Apply recency boost
      const now = Date.now();
      const maxBoost = 0.2; // Maximum boost for very recent observations
      const recencyHorizon = 7 * 24 * 60 * 60 * 1000; // 7 days
      
      toPatterns.forEach(pattern => {
        const age = now - pattern.lastObserved;
        const recencyFactor = Math.max(0, 1 - (age / recencyHorizon));
        const boost = maxBoost * recencyFactor;
        
        if (boost > 0) {
          const currentProb = probabilities.get(pattern.to)!;
          probabilities.set(pattern.to, Math.min(1, currentProb + boost));
        }
      });
      
      // Normalize probabilities to ensure they sum to 1
      let sum = 0;
      probabilities.forEach(prob => { sum += prob; });
      
      if (sum > 0) {
        probabilities.forEach((prob, route) => {
          probabilities.set(route, prob / sum);
        });
      }
      
      // Update the model
      this.routeTransitionProbabilities.set(fromRoute, probabilities);
    });
  }
  
  /**
   * Detect device category
   */
  private detectDeviceCategory(): 'mobile' | 'tablet' | 'desktop' {
    const userAgent = navigator.userAgent;
    
    // Simple detection, would be more sophisticated in production
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(userAgent)) {
      return 'tablet';
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)) {
      return 'mobile';
    }
    return 'desktop';
  }
  
  /**
   * Detect connection type
   */
  private detectConnectionType(): string {
    if ('connection' in navigator) {
      // @ts-ignore - effectiveType not in all TypeScript defs
      const networkInfo = (navigator as any).connection;
      
      if (networkInfo) {
        return networkInfo.effectiveType || 'unknown';
      }
    }
    return 'unknown';
  }
  
  /**
   * Check if this is a returning user
   */
  private isReturningUser(): boolean {
    try {
      const lastVisit = localStorage.getItem('lastVisit');
      return !!lastVisit;
    } catch (e) {
      return false;
    }
  }
  
  /**
   * Load previously saved behavioral data
   */
  private loadSavedBehavioralData(): void {
    try {
      // Try to load from localStorage
      const savedData = localStorage.getItem('assetPredictorData');
      
      if (savedData) {
        const parsedData = JSON.parse(savedData) as Partial<UserBehaviorData>;
        
        // Merge with new session data
        if (parsedData.pageViews) {
          this.behavioralData.pageViews = {
            ...parsedData.pageViews,
            ...this.behavioralData.pageViews
          };
        }
        
        if (parsedData.avgTimeOnPage) {
          this.behavioralData.avgTimeOnPage = {
            ...parsedData.avgTimeOnPage,
            ...this.behavioralData.avgTimeOnPage
          };
        }
        
        if (parsedData.navigationPatterns) {
          // Combine patterns, merging duplicates
          const allPatterns = [
            ...parsedData.navigationPatterns,
            ...this.behavioralData.navigationPatterns
          ];
          
          // Group by from-to pairs
          const patternMap = new Map<string, NavigationPattern>();
          
          allPatterns.forEach(pattern => {
            const key = `${pattern.from}|${pattern.to}`;
            
            if (patternMap.has(key)) {
              const existing = patternMap.get(key)!;
              existing.count += pattern.count;
              existing.avgTransitionTime = 
                (existing.avgTransitionTime * existing.count + 
                 pattern.avgTransitionTime * pattern.count) / 
                (existing.count + pattern.count);
              existing.lastObserved = Math.max(existing.lastObserved, pattern.lastObserved);
            } else {
              patternMap.set(key, { ...pattern });
            }
          });
          
          this.behavioralData.navigationPatterns = Array.from(patternMap.values());
        }
        
        if (parsedData.componentInteractions) {
          this.behavioralData.componentInteractions = {
            ...parsedData.componentInteractions,
            ...this.behavioralData.componentInteractions
          };
        }
      }
      
      // Update last visit time
      localStorage.setItem('lastVisit', Date.now().toString());
      
    } catch (error) {
      console.error('Error loading behavioral data:', error);
    }
  }
  
  /**
   * Save behavioral data for future sessions
   */
  private saveBehavioralData(): void {
    try {
      // Update session duration
      this.behavioralData.sessionDuration = Date.now() - this.sessionStartTime;
      
      // Save to localStorage
      localStorage.setItem('assetPredictorData', JSON.stringify(this.behavioralData));
      
    } catch (error) {
      console.error('Error saving behavioral data:', error);
    }
  }
  
  /**
   * Get predicted next routes from current route
   */
  public getPredictedNextRoutes(): { route: string, probability: number }[] {
    if (!this.currentRoute) return [];
    
    const predictions = this.predictionModels.routeTransition.predict(this.currentRoute);
    
    if (!predictions || predictions.size === 0) return [];
    
    return Array.from(predictions.entries())
      .map(([route, probability]: [string, number]) => ({ route, probability }))
      .sort((a, b) => b.probability - a.probability);
  }
  
  /**
   * Get assets currently loaded or in progress
   */
  public getLoadingStatus(): { loaded: string[], loading: string[] } {
    return {
      loaded: Array.from(this.loadingComplete),
      loading: Array.from(this.loadingInProgress)
    };
  }
  
  /**
   * Get session statistics
   */
  public getSessionStats(): any {
    return {
      duration: Date.now() - this.sessionStartTime,
      pageViews: this.behavioralData.pageViews,
      currentRoute: this.currentRoute,
      deviceCategory: this.behavioralData.deviceCategory,
      connectionType: this.behavioralData.connectionType,
      assetsLoaded: this.loadingComplete.size,
      predictions: this.getPredictedNextRoutes()
    };
  }
}

// Create singleton instance
const assetPredictor = new AssetPredictor();

// Mark last visit time in storage for returning user detection
try {
  localStorage.setItem('lastVisit', Date.now().toString());
} catch (e) {
  // Ignore storage errors
}

export default assetPredictor; 