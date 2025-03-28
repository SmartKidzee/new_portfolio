/**
 * Advanced Component Preloader
 * 
 * This module implements an intelligent, comprehensive preloading strategy
 * for all components in the components and cpmponents directories.
 */

import { lazy } from 'react';
import componentScanner, { ComponentEntry } from './componentScanner';
import preloadMetrics from './preloadMetrics';
import interactionTracker, { UserInteraction } from './interactionTracker';
import componentDependencyGraph from './componentDependencyGraph';

interface PreloadOptions {
  priority: 'critical' | 'high' | 'medium' | 'low';
  immediate: boolean;
  useIdleCallback: boolean;
}

// Enhanced multi-level cache system
interface CacheEntry {
  module: any;
  loadTime: number;
  lastAccessed: number;
  accessCount: number;
  size: number; // Estimated memory size
}

class AdvancedPreloader {
  private preloadedComponents: Set<string> = new Set();
  private preloadPromises: Record<string, Promise<any>> = {};
  private idleCallbackIds: number[] = [];
  private preloadInProgress: boolean = false;
  private networkCondition: 'fast' | 'medium' | 'slow' = 'medium';
  private isLowEndDevice: boolean = false;
  
  // Enhanced cache system
  private componentCache: Map<string, CacheEntry> = new Map();
  private maxCacheSize: number = 20 * 1024 * 1024; // 20MB default cache size
  private currentCacheSize: number = 0;
  private cacheMissCounter: Record<string, number> = {};
  
  // Predictive loading system
  private componentUsagePatterns: Record<string, {
    usageCount: number,
    lastUsedAt: number,
    averageRenderTime: number,
    followedBy: Record<string, number> // tracks components used after this one
  }> = {};
  
  // Hierarchical loading state
  private componentLoadingLevels: Map<string, number> = new Map(); // Component ID to hierarchy level
  private componentDependents: Map<string, Set<string>> = new Map(); // Component ID to components that depend on it
  
  // View prediction
  private visibilityObserver: IntersectionObserver | null = null;
  private observedElements: Map<Element, string> = new Map(); // Element to component ID mapping

  constructor() {
    this.detectEnvironment();
    
    // Listen for network condition changes
    if ('connection' in navigator) {
      (navigator as any).connection?.addEventListener('change', this.updateNetworkCondition.bind(this));
    }
    
    // Initialize visibility observer for predictive loading
    this.initVisibilityObserver();
    
    // Initialize user interaction tracking for predictive loading
    this.trackUserInteractions();
    
    // Dynamic cache size based on device memory
    this.adjustCacheSizeBasedOnDevice();
    
    // Set up periodic cache analysis and optimization
    setInterval(this.optimizeCache.bind(this), 60000); // Run every minute
  }

  /**
   * Initialize visibility observer to predict when components will be needed
   */
  private initVisibilityObserver(): void {
    if ('IntersectionObserver' in window) {
      this.visibilityObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            const componentId = this.observedElements.get(entry.target);
            if (!componentId) return;
            
            if (entry.isIntersecting) {
              // Component is about to be visible - start preloading dependencies
              this.preloadComponentDependencies(componentId);
              
              // If it's going to be visible soon based on scroll direction and velocity
              if (entry.intersectionRatio > 0.1 && this.isApproaching(entry.target)) {
                this.preloadComponent(componentId, { priority: 'high', immediate: true, useIdleCallback: false });
              }
            }
          });
        },
        {
          rootMargin: '200px', // Preload when within 200px of viewport
          threshold: [0, 0.1, 0.5, 1.0]
        }
      );
    }
  }
  
  /**
   * Determine if an element is approaching the viewport quickly
   */
  private isApproaching(element: Element): boolean {
    // Get scroll direction and velocity
    const scrollDirection = interactionTracker.getScrollDirection();
    const scrollVelocity = interactionTracker.getScrollVelocity();
    
    // Get element position
    const rect = element.getBoundingClientRect();
    
    // If scrolling down and element is below viewport
    if (scrollDirection === 'down' && rect.top > window.innerHeight) {
      // Calculate time until element will be visible based on scroll velocity
      const timeUntilVisible = rect.top / scrollVelocity;
      
      // If element will be visible within 1 second, consider it approaching
      return timeUntilVisible < 1000;
    }
    
    // If scrolling up and element is above viewport
    if (scrollDirection === 'up' && rect.bottom < 0) {
      const timeUntilVisible = Math.abs(rect.bottom) / scrollVelocity;
      return timeUntilVisible < 1000;
    }
    
    return false;
  }
  
  /**
   * Track user interactions to predict needed components
   */
  private trackUserInteractions(): void {
    // Process interaction data to predict component needs
    interactionTracker.onInteractionBatch((interactions) => {
      // Analyze interaction patterns to predict next components
      const predictedComponents = this.predictComponentsFromInteractions(interactions);
      
      // Preload predicted components
      predictedComponents.forEach(prediction => {
        // Only preload if confidence is high enough and not already loaded
        if (prediction.confidence > 0.7 && !this.isComponentPreloaded(prediction.componentId)) {
          this.preloadComponent(prediction.componentId, {
            priority: prediction.confidence > 0.9 ? 'high' : 'medium',
            immediate: prediction.confidence > 0.95,
            useIdleCallback: prediction.confidence < 0.8
          });
        }
      });
    });
  }
  
  /**
   * Predict which components might be needed based on user interactions
   */
  private predictComponentsFromInteractions(interactions: UserInteraction[]): Array<{componentId: string, confidence: number}> {
    // Get user's current "context" - what page they're on, what they're doing
    const currentContext = interactionTracker.getCurrentUserContext();
    
    // Components that are likely to be needed based on current context
    const predictions: Array<{componentId: string, confidence: number}> = [];
    
    // Analyze interaction patterns
    for (const componentId in this.componentUsagePatterns) {
      const pattern = this.componentUsagePatterns[componentId];
      
      // If this component is frequently used in this context
      if (currentContext.currentRoute && pattern.usageCount > 5) {
        // Calculate recency (more recent = higher confidence)
        const recency = Math.max(0, 1 - (Date.now() - pattern.lastUsedAt) / (24 * 60 * 60 * 1000));
        
        // Calculate frequency based on usage count
        const frequency = Math.min(1, pattern.usageCount / 20);
        
        // If we've observed this component following other components that were just used
        const sequenceConfidence = this.calculateSequenceConfidence(componentId, interactions);
        
        // Calculate overall confidence
        const confidence = (recency * 0.3) + (frequency * 0.3) + (sequenceConfidence * 0.4);
        
        if (confidence > 0.5) {
          predictions.push({ componentId, confidence });
        }
      }
    }
    
    // Sort by confidence
    return predictions.sort((a, b) => b.confidence - a.confidence);
  }
  
  /**
   * Calculate how likely a component is to be used based on sequence of recent component usage
   */
  private calculateSequenceConfidence(componentId: string, recentInteractions: any[]): number {
    // Extract recently used components from interactions
    const recentlyUsedComponents = recentInteractions
      .filter(i => i.type === 'componentRendered')
      .map(i => i.componentId);
    
    if (recentlyUsedComponents.length === 0) return 0;
    
    let totalConfidence = 0;
    
    // Check if this component often follows any of the recently used components
    recentlyUsedComponents.forEach(recentComponent => {
      const pattern = this.componentUsagePatterns[recentComponent];
      if (pattern && pattern.followedBy[componentId]) {
        // How often this component follows the recent component
        const followFrequency = pattern.followedBy[componentId] / pattern.usageCount;
        totalConfidence += followFrequency;
      }
    });
    
    // Normalize to 0-1 range
    return Math.min(1, totalConfidence / recentlyUsedComponents.length);
  }
  
  /**
   * Adjust cache size based on device capabilities
   */
  private adjustCacheSizeBasedOnDevice(): void {
    const memory = (navigator as any).deviceMemory;
    
    if (memory) {
      // Adjust cache size based on available memory
      // Base size is 20MB, scale up for devices with more memory
      this.maxCacheSize = Math.min(100 * 1024 * 1024, Math.max(5 * 1024 * 1024, memory * 5 * 1024 * 1024));
      console.log(`[AdvancedPreloader] Cache size adjusted to ${this.maxCacheSize / (1024 * 1024)}MB based on device memory`);
    }
  }

  /**
   * Detect device capabilities and network conditions
   */
  private detectEnvironment(): void {
    // Detect device capabilities
    const memory = (navigator as any).deviceMemory;
    const cores = (navigator as any).hardwareConcurrency;
    
    this.isLowEndDevice = 
      (memory && memory < 4) || 
      (cores && cores < 4);
    
    // Detect network conditions
    this.updateNetworkCondition();
  }

  /**
   * Update network condition based on connection info
   */
  private updateNetworkCondition(): void {
    if (!('connection' in navigator)) {
      return;
    }

    const connection = (navigator as any).connection;
    
    if (connection.saveData) {
      this.networkCondition = 'slow';
      return;
    }

    switch (connection.effectiveType) {
      case 'slow-2g':
      case '2g':
        this.networkCondition = 'slow';
        break;
      case '3g':
        this.networkCondition = 'medium';
        break;
      case '4g':
        this.networkCondition = 'fast';
        break;
      default:
        this.networkCondition = 'medium';
    }
  }

  /**
   * Initialize preloading process
   */
  public initialize(): void {
    if (this.preloadInProgress) return;
    this.preloadInProgress = true;
    
    // Log initialization
    console.log('[AdvancedPreloader] Initializing enhanced preloading system...');
    
    // Build component dependency graph
    this.buildComponentHierarchy();
    
    // First preload critical components
    this.preloadCriticalComponents();
    
    // Then schedule other components based on priority
    if (this.networkCondition !== 'slow') {
      this.scheduleNonCriticalPreloading();
    }
  }
  
  /**
   * Build component hierarchy and dependency graph
   */
  private buildComponentHierarchy(): void {
    const components = componentScanner.getAllComponents();
    
    // First pass: create hierarchical levels based on dependencies
    Object.values(components).forEach(component => {
      // Level 0 for components with no dependencies
      if (!component.dependencies || component.dependencies.length === 0) {
        this.componentLoadingLevels.set(component.id, 0);
      }
    });
    
    // Second pass: assign levels to components with dependencies
    let changed = true;
    while (changed) {
      changed = false;
      
      Object.values(components).forEach(component => {
        // Skip if already assigned
        if (this.componentLoadingLevels.has(component.id)) return;
        
        // Check if all dependencies have levels assigned
        const dependencies = component.dependencies || [];
        const allDepsAssigned = dependencies.every(depId => this.componentLoadingLevels.has(depId));
        
        if (allDepsAssigned && dependencies.length > 0) {
          // Find max level of dependencies and add 1
          const maxDepLevel = Math.max(
            ...dependencies.map(depId => this.componentLoadingLevels.get(depId) || 0)
          );
          
          this.componentLoadingLevels.set(component.id, maxDepLevel + 1);
          changed = true;
        }
      });
    }
    
    // Build reverse dependencies (what depends on what)
    Object.values(components).forEach(component => {
      (component.dependencies || []).forEach(depId => {
        if (!this.componentDependents.has(depId)) {
          this.componentDependents.set(depId, new Set());
        }
        this.componentDependents.get(depId)?.add(component.id);
      });
    });
    
    console.log(`[AdvancedPreloader] Component hierarchy built with ${this.componentLoadingLevels.size} components`);
  }

  /**
   * Preload critical components immediately
   */
  private preloadCriticalComponents(): void {
    const criticalComponents = componentScanner.getComponentsByPriority('critical');
    
    console.log(`[AdvancedPreloader] Preloading ${criticalComponents.length} critical components...`);
    
    // Sort critical components by hierarchy level
    criticalComponents.sort((a: ComponentEntry, b: ComponentEntry) => {
      const levelA = this.componentLoadingLevels.get(a.id) || 0;
      const levelB = this.componentLoadingLevels.get(b.id) || 0;
      return levelA - levelB; // Load lower levels first
    });
    
    // Create a queue of critical components to preload
    const preloadQueue = criticalComponents.map((component: ComponentEntry) => {
      return this.preloadComponent(component.id, {
        priority: 'critical',
        immediate: true,
        useIdleCallback: false
      });
    });
    
    // Execute all preloads concurrently
    Promise.all(preloadQueue).then(() => {
      console.log('[AdvancedPreloader] All critical components preloaded');
      
      // Generate a performance report at this point
      preloadMetrics.logPerformanceSnapShot('Critical components preloaded');
      
      // Dispatch an event when critical components are loaded
      const event = new CustomEvent('criticalComponentsLoaded');
      document.dispatchEvent(event);
    });
  }

  /**
   * Schedule preloading of non-critical components
   */
  private scheduleNonCriticalPreloading(): void {
    // Preload high priority components after a small delay
    setTimeout(() => {
      this.preloadByPriority('high');
    }, 500);
    
    // Use requestIdleCallback for medium and low priority components
    if ('requestIdleCallback' in window) {
      const idleOptions = { timeout: 2000 };
      
      // Medium priority - lower timeout
      const mediumPriorityId = requestIdleCallback(() => {
        this.preloadByPriority('medium');
      }, idleOptions);
      
      // Low priority - higher timeout
      const lowPriorityId = requestIdleCallback(() => {
        this.preloadByPriority('low');
      }, { timeout: 5000 });
      
      this.idleCallbackIds.push(mediumPriorityId, lowPriorityId);
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        this.preloadByPriority('medium');
      }, 3000);
      
      setTimeout(() => {
        this.preloadByPriority('low');
      }, 6000);
    }
  }

  /**
   * Preload components by priority level
   */
  private preloadByPriority(priority: 'high' | 'medium' | 'low'): void {
    // Skip if we're on a slow connection and not preloading high priority components
    if (this.networkCondition === 'slow' && priority !== 'high') {
      console.log(`[AdvancedPreloader] Skipping ${priority} priority preloading due to slow network`);
      return;
    }
    
    // Skip medium/low priority on low-end devices
    if (this.isLowEndDevice && priority === 'low') {
      console.log(`[AdvancedPreloader] Skipping ${priority} priority preloading on low-end device`);
      return;
    }
    
    const components = componentScanner.getComponentsByPriority(priority);
    
    // Sort components by hierarchy level and cache miss count
    components.sort((a, b) => {
      const levelA = this.componentLoadingLevels.get(a.id) || 0;
      const levelB = this.componentLoadingLevels.get(b.id) || 0;
      
      // If same level, prioritize components with more cache misses
      if (levelA === levelB) {
        const missesA = this.cacheMissCounter[a.id] || 0;
        const missesB = this.cacheMissCounter[b.id] || 0;
        return missesB - missesA;
      }
      
      return levelA - levelB;
    });
    
    console.log(`[AdvancedPreloader] Preloading ${components.length} ${priority} priority components...`);
    
    // For medium/low priority, we'll use a different strategy on low-end devices
    const useIdleCallback = priority !== 'high' && !this.isLowEndDevice;
    
    // Use chunk loading for better performance
    const chunkSize = priority === 'high' ? 5 : priority === 'medium' ? 3 : 2;
    for (let i = 0; i < components.length; i += chunkSize) {
      const chunk = components.slice(i, i + chunkSize);
      
      // Add a delay between chunks
      const delay = i * (priority === 'high' ? 50 : priority === 'medium' ? 100 : 200);
      
      setTimeout(() => {
        chunk.forEach(component => {
      this.preloadComponent(component.id, {
        priority,
        immediate: false,
        useIdleCallback
      });
    });
      }, delay);
    }
    
    // After a timeout, log results for this priority batch
    setTimeout(() => {
      preloadMetrics.logPerformanceSnapShot(`${priority} priority components processed`);
    }, priority === 'high' ? 1000 : priority === 'medium' ? 3000 : 6000);
  }
  
  /**
   * Preload dependencies of a component
   */
  private preloadComponentDependencies(componentId: string): void {
    const component = componentScanner.getComponent(componentId);
    
    if (!component || !component.dependencies || component.dependencies.length === 0) {
      return;
    }
    
    // Preload direct dependencies first
    component.dependencies.forEach(depId => {
      if (!this.isComponentPreloaded(depId)) {
        this.preloadComponent(depId, {
          priority: 'high',
          immediate: true,
          useIdleCallback: false
        });
      }
    });
    
    // Then schedule preloading of indirect dependencies
    const indirectDeps = componentDependencyGraph.getAllDependencies(componentId);
    
    indirectDeps.forEach((depId: string) => {
      if (!this.isComponentPreloaded(depId)) {
        this.preloadComponent(depId, {
          priority: 'medium',
          immediate: false,
          useIdleCallback: true
        });
      }
    });
  }

  /**
   * Preload a specific component by ID
   */
  public preloadComponent(componentId: string, options: Partial<PreloadOptions> = {}): Promise<any> {
    // Skip if already preloaded
    if (this.preloadedComponents.has(componentId)) {
      return this.preloadPromises[componentId] || Promise.resolve();
    }
    
    // Default options
    const defaultOptions: PreloadOptions = {
      priority: 'medium',
      immediate: false,
      useIdleCallback: true
    };
    
    const finalOptions = { ...defaultOptions, ...options };
    const component = componentScanner.getComponent(componentId);
    
    if (!component) {
      console.warn(`[AdvancedPreloader] Component ${componentId} not found in registry`);
      return Promise.resolve();
    }
    
    // Mark as preloaded immediately to prevent duplicate preloads
    this.preloadedComponents.add(componentId);
    
    // Track preload start in metrics
    preloadMetrics.recordComponentLoadStart(componentId, options.priority || 'medium');
    
    // Create preload function
    const preloadFn = () => {
      try {
        // Check cache first
        const cached = this.getFromCache(componentId);
        if (cached) {
          preloadMetrics.recordComponentLoaded(componentId);
          return Promise.resolve(cached);
        }
        
        // Use dynamic import() which returns a promise
        // The import will be handled by webpack/vite and the component will be loaded
        const importPromise = import(/* @vite-ignore */ component.path)
          .then(module => {
            // Add to cache
            this.addToCache(componentId, module);
            
            // Track successful preload in metrics
            preloadMetrics.recordComponentLoaded(componentId);
            
            // Track usage pattern
            this.recordComponentUsage(componentId);
            
            // Once this component is loaded, check if we should preload its dependents
            this.considerPreloadingDependents(componentId);
            
            return module;
          })
          .catch(err => {
            // Track failed preload in metrics
            preloadMetrics.recordComponentError(componentId, err.toString());
            console.warn(`[AdvancedPreloader] Failed to preload ${componentId}:`, err);
          });
        
        // Store the promise for future reference
        this.preloadPromises[componentId] = importPromise;
        
        return importPromise;
      } catch (err) {
        preloadMetrics.recordComponentError(componentId, (err as Error).toString());
        console.error(`[AdvancedPreloader] Error during preload of ${componentId}:`, err);
        return Promise.reject(err);
      }
    };
    
    // Execute the preload function based on options
    if (finalOptions.immediate) {
      return preloadFn();
    } else if (finalOptions.useIdleCallback && 'requestIdleCallback' in window) {
      const promise = new Promise((resolve) => {
        const idleCallbackId = requestIdleCallback(() => {
          preloadFn().then(resolve);
        }, { timeout: 2000 });
        
        this.idleCallbackIds.push(idleCallbackId);
      });
      
      this.preloadPromises[componentId] = promise;
      return promise;
    } else {
      // Use setTimeout as fallback
      const promise = new Promise((resolve) => {
        setTimeout(() => {
          preloadFn().then(resolve);
        }, 0);
      });
      
      this.preloadPromises[componentId] = promise;
      return promise;
    }
  }

  /**
   * Consider preloading components that depend on this one
   */
  private considerPreloadingDependents(componentId: string): void {
    const dependents = this.componentDependents.get(componentId);
    
    if (!dependents || dependents.size === 0) {
      return;
    }
    
    // Get user context to determine if dependents are likely to be needed
    const userContext = interactionTracker.getCurrentUserContext();
    
    dependents.forEach(depId => {
      if (this.isComponentPreloaded(depId)) {
        return;
      }
      
      const depComponent = componentScanner.getComponent(depId);
      
      if (!depComponent) {
        return;
      }
      
      // Check if all dependencies of this dependent are loaded
      const allDepsLoaded = (depComponent.dependencies || []).every(
        depDepId => this.isComponentPreloaded(depDepId)
      );
      
      // If all dependencies are loaded and it's high priority or likely to be needed
      if (allDepsLoaded && (
          depComponent.priority === 'high' || 
          this.isComponentLikelyNeeded(depId, userContext)
        )) {
        this.preloadComponent(depId, {
          priority: 'medium',
          immediate: false,
          useIdleCallback: true
        });
      }
    });
  }
  
  /**
   * Check if a component is likely to be needed based on user context
   */
  private isComponentLikelyNeeded(componentId: string, userContext: any): boolean {
    const pattern = this.componentUsagePatterns[componentId];
    
    // If no pattern data, not likely needed
    if (!pattern) {
      return false;
    }
    
    // If recently used, more likely to be needed again
    const recency = (Date.now() - pattern.lastUsedAt) < (5 * 60 * 1000); // Used in last 5 minutes
    
    // If used frequently, more likely to be needed
    const frequency = pattern.usageCount > 3;
    
    // If used in current route, more likely to be needed
    const relevantToRoute = userContext.currentRoute && 
      pattern.usageCount > 0;
    
    return recency || frequency || relevantToRoute;
  }
  
  /**
   * Record component usage pattern
   */
  private recordComponentUsage(componentId: string): void {
    const now = Date.now();
    
    // Initialize if first use
    if (!this.componentUsagePatterns[componentId]) {
      this.componentUsagePatterns[componentId] = {
        usageCount: 0,
        lastUsedAt: now,
        averageRenderTime: 0,
        followedBy: {}
      };
    }
    
    // Update pattern
    const pattern = this.componentUsagePatterns[componentId];
    pattern.usageCount++;
    pattern.lastUsedAt = now;
    
    // Update "followed by" relationships - what components tend to be used after this one
    const recentlyUsedComponents = Object.keys(this.componentUsagePatterns)
      .filter(id => id !== componentId && this.componentUsagePatterns[id].lastUsedAt > now - 10000); // Used in last 10 seconds
    
    recentlyUsedComponents.forEach(recentId => {
      const recentPattern = this.componentUsagePatterns[recentId];
      
      if (!recentPattern.followedBy[componentId]) {
        recentPattern.followedBy[componentId] = 0;
      }
      
      recentPattern.followedBy[componentId]++;
    });
  }
  
  /**
   * Add a component module to cache
   */
  private addToCache(componentId: string, module: any): void {
    // Estimate size - this is a rough estimate
    const size = JSON.stringify(module).length;
    
    // Create cache entry
    const entry: CacheEntry = {
      module,
      loadTime: Date.now(),
      lastAccessed: Date.now(),
      accessCount: 1,
      size
    };
    
    // Add to cache
    this.componentCache.set(componentId, entry);
    this.currentCacheSize += size;
    
    // Ensure we don't exceed max cache size
    if (this.currentCacheSize > this.maxCacheSize) {
      this.pruneCache();
    }
  }
  
  /**
   * Get a component module from cache
   */
  private getFromCache(componentId: string): any | null {
    const entry = this.componentCache.get(componentId);
    
    if (!entry) {
      // Track cache miss for optimization
      this.cacheMissCounter[componentId] = (this.cacheMissCounter[componentId] || 0) + 1;
      return null;
    }
    
    // Update access info
    entry.lastAccessed = Date.now();
    entry.accessCount++;
    
    return entry.module;
  }
  
  /**
   * Remove least valuable items from cache
   */
  private pruneCache(): void {
    if (this.componentCache.size === 0) return;
    
    // Calculate value score for each entry
    const entries: Array<[string, CacheEntry, number]> = [];
    
    this.componentCache.forEach((entry, componentId) => {
      // Recency score (0-1)
      const recency = Math.max(0, 1 - (Date.now() - entry.lastAccessed) / (60 * 60 * 1000));
      
      // Frequency score (0-1)
      const frequency = Math.min(1, entry.accessCount / 20);
      
      // Size penalty (0-1) - smaller is better
      const sizePenalty = entry.size / (1024 * 1024); // Size in MB
      
      // Priority boost
      const component = componentScanner.getComponent(componentId);
      const priorityBoost = component ? 
        (component.priority === 'critical' ? 3 : 
         component.priority === 'high' ? 2 : 
         component.priority === 'medium' ? 1 : 0) : 0;
      
      // Calculate value score - higher is more valuable
      const valueScore = (recency * 0.4) + (frequency * 0.3) + (priorityBoost * 0.3) - (sizePenalty * 0.1);
      
      entries.push([componentId, entry, valueScore]);
    });
    
    // Sort by value score (ascending - lowest value first)
    entries.sort((a, b) => a[2] - b[2]);
    
    // Remove lowest value entries until we're under the limit
    let removed = 0;
    while (this.currentCacheSize > this.maxCacheSize * 0.8 && entries.length > 0) {
      const [componentId, entry] = entries.shift()!;
      
      // Remove from cache
      this.componentCache.delete(componentId);
      this.currentCacheSize -= entry.size;
      removed++;
    }
    
    if (removed > 0) {
      console.log(`[AdvancedPreloader] Pruned ${removed} items from cache, now at ${Math.round(this.currentCacheSize / 1024 / 1024 * 100) / 100}MB`);
    }
  }
  
  /**
   * Optimize cache based on usage patterns
   */
  private optimizeCache(): void {
    // Analyze cache effectiveness
    const hitRatio = 1 - (Object.values(this.cacheMissCounter).reduce((sum, count) => sum + count, 0) / 
                          (this.componentCache.size + 1));
    
    console.log(`[AdvancedPreloader] Cache hit ratio: ${Math.round(hitRatio * 100)}%`);
    
    // If hit ratio is low, we might need to adjust preloading strategy
    if (hitRatio < 0.5) {
      // Find most missed components
      const mostMissed = Object.entries(this.cacheMissCounter)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
      
      // Preload most missed components
      mostMissed.forEach(([componentId, misses]) => {
        if (misses > 3 && !this.isComponentPreloaded(componentId)) {
          console.log(`[AdvancedPreloader] Optimizing cache: preloading frequently missed component ${componentId}`);
          this.preloadComponent(componentId, {
            priority: 'high',
            immediate: true,
            useIdleCallback: false
          });
        }
      });
    }
    
    // Reset cache miss counter
    this.cacheMissCounter = {};
  }

  /**
   * Create lazy-loaded component with enhanced preloading
   */
  public createLazyComponent<T extends React.ComponentType<any>>(
    componentId: string,
    importFn: () => Promise<{ default: T }>,
    preloadOptions: Partial<PreloadOptions> = {}
  ): React.LazyExoticComponent<T> {
    // Register the component if not already registered
    const component = componentScanner.getComponent(componentId);
    
    if (!component) {
      console.warn(`[AdvancedPreloader] Creating lazy component for unregistered component ${componentId}`);
    }
    
    // Start preloading immediately if options say so
    if (preloadOptions.immediate) {
    this.preloadComponent(componentId, preloadOptions);
    }
    
    // Create enhanced import function that tracks metrics
    const enhancedImportFn = () => {
      const startTime = performance.now();
      
      // If already preloaded, use that promise
      const preloadPromise = this.preloadPromises[componentId];
      if (preloadPromise) {
        return preloadPromise.then((module: any) => {
          // Record component usage
          this.recordComponentUsage(componentId);
          return module;
        });
      }
      
      // Otherwise load normally and track
      return importFn().then(module => {
        // Calculate load time
        const loadTime = performance.now() - startTime;
        
        // If not already tracked as preloaded, track as normal load
        if (!this.preloadedComponents.has(componentId)) {
          preloadMetrics.recordComponentRendered(componentId, startTime);
          
          // Mark as preloaded now to prevent duplicate tracking
          this.preloadedComponents.add(componentId);
        }
        
        // Record component usage
        this.recordComponentUsage(componentId);
        
        return module;
      });
    };
    
    // Create and return lazy component
    return lazy(enhancedImportFn);
  }

  /**
   * Check if a component is already preloaded
   */
  public isComponentPreloaded(componentId: string): boolean {
    return this.preloadedComponents.has(componentId);
  }

  /**
   * Generate performance report
   */
  public generatePerformanceReport(): any {
    return preloadMetrics.generateReport();
  }

  /**
   * Clean up resources
   */
  public cleanup(): void {
    // Cancel any pending idle callbacks
    this.idleCallbackIds.forEach(id => {
      if ('cancelIdleCallback' in window) {
        cancelIdleCallback(id);
      }
    });
    
    // Disconnect visibility observer
    if (this.visibilityObserver) {
      this.visibilityObserver.disconnect();
    }
    
    // Clear cache to free memory
    this.componentCache.clear();
    this.currentCacheSize = 0;
    
    console.log('[AdvancedPreloader] Resources cleaned up');
  }
}

// Create singleton instance
const advancedPreloader = new AdvancedPreloader();

export default advancedPreloader; 