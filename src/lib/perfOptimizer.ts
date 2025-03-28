/**
 * PerfOptimizer - Master Performance Optimization Controller
 * 
 * Orchestrates all performance optimization systems to achieve near-instantaneous
 * loading and interaction times. Acts as the central coordinator for hyper-performance.
 */

import hyperCache from './hyperCache';
import assetPredictor from './assetPredictor';

// Will use these when implemented
// import streamingRenderer from './streamingRenderer';
// import criticalResourceLoader from './criticalResourceLoader';

interface PerformanceMetrics {
  ttfb: number; // Time to First Byte
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  tti: number; // Time to Interactive
  tbt: number; // Total Blocking Time
  loadTime: number; // Total Page Load Time
  resourceLoadTimes: Map<string, number>; // Individual resource load times
  idleUtilization: number; // % of idle time utilized
  renderBlockedTime: number; // Time rendering was blocked
  interactionToNextPaint: number; // Time from interaction to next paint
}

interface OptimizationMode {
  type: 'extreme' | 'balanced' | 'accessibility' | 'auto';
  priority: 'speed' | 'smoothness' | 'resource-conservation';
  aggressiveness: number; // 1-10 scale
}

interface PerfOptimizerConfig {
  mode: OptimizationMode;
  maxCacheSize: number; // in bytes
  useServiceWorker: boolean;
  usePreconnect: boolean;
  usePredictiveLoading: boolean;
  useProgressiveHydration: boolean;
  useLazyComponents: boolean;
  adaptToNetworkConditions: boolean;
  adaptToDeviceCapabilities: boolean;
  adaptToUserBehavior: boolean;
  reportToAnalytics: boolean;
  debugMode: boolean;
}

/**
 * Centralizes and coordinates all performance optimization strategies 
 * to achieve maximum perceived and actual performance gains.
 */
class PerfOptimizer {
  private config: PerfOptimizerConfig;
  private metrics: PerformanceMetrics;
  private optimizationStrategies: Map<string, boolean> = new Map();
  private resourceRegistry: Map<string, any> = new Map();
  private observers: Map<string, any> = new Map();
  private adaptiveState: {
    networkType: string;
    deviceMemory: number;
    cpuCores: number;
    batteryLevel: number | null;
    batteryCharging: boolean | null;
    lastUserInteraction: number;
  };
  private perfObserver: PerformanceObserver | null = null;
  private initialized: boolean = false;
  private optimizerInitTime: number = performance.now();
  
  constructor(config?: Partial<PerfOptimizerConfig>) {
    // Initialize with default or provided configuration
    this.config = {
      mode: {
        type: 'extreme',  // Default to extreme optimization
        priority: 'speed',
        aggressiveness: 10 // Maximum aggressiveness
      },
      maxCacheSize: 100 * 1024 * 1024, // 100MB
      useServiceWorker: true,
      usePreconnect: true,
      usePredictiveLoading: true,
      useProgressiveHydration: true,
      useLazyComponents: true,
      adaptToNetworkConditions: true,
      adaptToDeviceCapabilities: true,
      adaptToUserBehavior: true,
      reportToAnalytics: true,
      debugMode: false,
      ...config
    };
    
    // Initialize metrics tracking
    this.metrics = {
      ttfb: 0,
      fcp: 0,
      lcp: 0,
      fid: 0,
      cls: 0,
      tti: 0,
      tbt: 0,
      loadTime: 0,
      resourceLoadTimes: new Map(),
      idleUtilization: 0,
      renderBlockedTime: 0,
      interactionToNextPaint: 0
    };
    
    // Initialize adaptive state
    this.adaptiveState = {
      networkType: 'unknown',
      deviceMemory: this.detectDeviceMemory(),
      cpuCores: this.detectCPUCores(),
      batteryLevel: null,
      batteryCharging: null,
      lastUserInteraction: Date.now()
    };
    
    // Delay actual initialization until after DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.initialize());
    } else {
      // DOM already loaded
      setTimeout(() => this.initialize(), 0);
    }
  }
  
  /**
   * Initialize the performance optimizer
   */
  private initialize(): void {
    if (this.initialized) return;
    
    console.log('🚀 Initializing HyperPerformance Optimizer...');
    
    // Set up performance observers
    this.setupPerformanceObservers();
    
    // Detect device capabilities
    this.detectCapabilities();
    
    // Set up optimization strategies
    this.initializeOptimizationStrategies();
    
    // Set up observers
    this.setupObservers();
    
    // Register event listeners
    this.registerEventListeners();
    
    // Apply initial optimizations
    this.applyInitialOptimizations();
    
    // Register service worker if enabled
    if (this.config.useServiceWorker) {
      this.registerServiceWorker();
    }
    
    // Update initialization status
    this.initialized = true;
    
    // Calculate initialization time
    const initTime = performance.now() - this.optimizerInitTime;
    
    console.log(`✅ Performance optimizer initialized in ${initTime.toFixed(2)}ms`);
    
    // Schedule adaptive optimization
    this.scheduleAdaptiveOptimization();
  }
  
  /**
   * Set up performance observers to track key metrics
   */
  private setupPerformanceObservers(): void {
    if (!('PerformanceObserver' in window)) return;
    
    try {
      // Set up FCP observer
      const fcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        
        if (entries.length > 0) {
          this.metrics.fcp = entries[0].startTime;
          this.logMetric('FCP', this.metrics.fcp);
        }
      });
      
      fcpObserver.observe({ type: 'paint', buffered: true });
      
      // Set up LCP observer
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        
        if (entries.length > 0) {
          const lastEntry = entries[entries.length - 1];
          this.metrics.lcp = lastEntry.startTime;
          this.logMetric('LCP', this.metrics.lcp);
        }
      });
      
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      
      // Set up FID observer
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        
        if (entries.length > 0) {
          this.metrics.fid = entries[0].duration;
          this.logMetric('FID', this.metrics.fid);
        }
      });
      
      fidObserver.observe({ type: 'first-input', buffered: true });
      
      // Set up CLS observer
      const clsObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        
        // Calculate CLS
        let clsValue = 0;
        entries.forEach((entry) => {
          // Cast to LayoutShift type for layout-shift entries
          const layoutShift = entry as unknown as {hadRecentInput: boolean, value: number};
          if (!layoutShift.hadRecentInput) {
            clsValue += layoutShift.value;
          }
        });
        
        this.metrics.cls = clsValue;
        this.logMetric('CLS', this.metrics.cls);
      });
      
      clsObserver.observe({ type: 'layout-shift', buffered: true });
      
      // Set up navigation timing observer
      const navigationObserver = new PerformanceObserver((entryList) => {
        const navEntry = entryList.getEntries()[0];
        if (navEntry) {
          // @ts-ignore - Type issues with different performance entry types
          this.metrics.ttfb = navEntry.responseStart - navEntry.requestStart;
          // @ts-ignore
          this.metrics.loadTime = navEntry.loadEventEnd - navEntry.fetchStart;
          
          this.logMetric('TTFB', this.metrics.ttfb);
          this.logMetric('Load Time', this.metrics.loadTime);
        }
      });
      
      navigationObserver.observe({ type: 'navigation', buffered: true });
      
      // Set up resource timing observer
      const resourceObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        
        entries.forEach(entry => {
          // @ts-ignore - Type issues with initiatorType
          if (entry.initiatorType) {
            this.metrics.resourceLoadTimes.set(entry.name, entry.duration);
            
            // Check for slow resources (> 500ms)
            if (entry.duration > 500) {
              this.logSlowResource(entry);
            }
          }
        });
      });
      
      resourceObserver.observe({ type: 'resource', buffered: true });
    } catch (e) {
      console.error('Error setting up performance observers:', e);
    }
  }
  
  /**
   * Detect device capabilities for adaptive optimization
   */
  private detectCapabilities(): void {
    // Detect network information
    if ('connection' in navigator) {
      // @ts-ignore - Type definitions may not include connection API
      const connection = (navigator as any).connection;
      
      if (connection) {
        this.adaptiveState.networkType = connection.effectiveType || 'unknown';
        
        connection.addEventListener('change', () => {
          this.adaptiveState.networkType = connection.effectiveType || 'unknown';
          this.adaptToCurrentConditions();
        });
      }
    }
    
    // Detect battery status if available
    if ('getBattery' in navigator) {
      // @ts-ignore - Battery API not in all TypeScript definitions
      navigator.getBattery().then((battery: any) => {
        this.adaptiveState.batteryLevel = battery.level;
        this.adaptiveState.batteryCharging = battery.charging;
        
        battery.addEventListener('levelchange', () => {
          this.adaptiveState.batteryLevel = battery.level;
          this.adaptToCurrentConditions();
        });
        
        battery.addEventListener('chargingchange', () => {
          this.adaptiveState.batteryCharging = battery.charging;
          this.adaptToCurrentConditions();
        });
      });
    }
  }
  
  /**
   * Detect device memory
   */
  private detectDeviceMemory(): number {
    // @ts-ignore - deviceMemory not in all TypeScript definitions
    return navigator.deviceMemory || 4; // Default to 4GB if not available
  }
  
  /**
   * Detect CPU cores
   */
  private detectCPUCores(): number {
    return navigator.hardwareConcurrency || 4; // Default to quad-core if not available
  }
  
  /**
   * Initialize optimization strategies based on configuration and device capabilities
   */
  private initializeOptimizationStrategies(): void {
    // Set up initial strategies
    this.optimizationStrategies.set('preconnect', this.config.usePreconnect);
    this.optimizationStrategies.set('predictiveLoading', this.config.usePredictiveLoading);
    this.optimizationStrategies.set('progressiveHydration', this.config.useProgressiveHydration);
    this.optimizationStrategies.set('lazyComponents', this.config.useLazyComponents);
    
    // Adjust strategies based on device capabilities
    if (this.config.adaptToDeviceCapabilities) {
      // For low-end devices, be more conservative
      if (this.adaptiveState.deviceMemory <= 2 || this.adaptiveState.cpuCores <= 2) {
        this.optimizationStrategies.set('predictiveLoading', false);
        this.optimizationStrategies.set('progressiveHydration', true);
      }
      
      // For high-end devices, be more aggressive
      if (this.adaptiveState.deviceMemory >= 8 && this.adaptiveState.cpuCores >= 8) {
        this.optimizationStrategies.set('predictiveLoading', true);
        this.optimizationStrategies.set('progressiveHydration', false);
      }
    }
  }
  
  /**
   * Set up various observers for monitoring user behavior and page performance
   */
  private setupObservers(): void {
    // Set up intersection observer for viewport monitoring
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const elementId = entry.target.id || entry.target.getAttribute('data-id');
          if (elementId) {
            // Track element visibility
            if (entry.isIntersecting) {
              this.onElementVisible(elementId, entry.target);
            }
          }
        });
      },
      { threshold: 0.1 } // 10% visibility required
    );
    
    this.observers.set('intersection', intersectionObserver);
    
    // Observe all important elements
    this.observeImportantElements(intersectionObserver);
    
    // Set up mutation observer to catch new elements
    const mutationObserver = new MutationObserver((mutations) => {
      let shouldReobserve = false;
      
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          shouldReobserve = true;
        }
      });
      
      if (shouldReobserve) {
        this.observeImportantElements(intersectionObserver);
      }
    });
    
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    this.observers.set('mutation', mutationObserver);
  }
  
  /**
   * Observe important elements for visibility tracking
   */
  private observeImportantElements(observer: IntersectionObserver): void {
    // Observe elements with performance-critical attributes
    const elements = document.querySelectorAll('[data-perf-critical], [data-perf-id], .perf-monitor');
    
    elements.forEach(element => {
      observer.observe(element);
    });
  }
  
  /**
   * Register event listeners for user interaction tracking
   */
  private registerEventListeners(): void {
    // Track user interactions
    document.addEventListener('click', this.onUserInteraction.bind(this), { passive: true });
    document.addEventListener('touchstart', this.onUserInteraction.bind(this), { passive: true });
    document.addEventListener('keydown', this.onUserInteraction.bind(this), { passive: true });
    document.addEventListener('scroll', this.onUserScroll.bind(this), { passive: true });
    
    // Track page visibility changes
    document.addEventListener('visibilitychange', this.onVisibilityChange.bind(this));
    
    // Track page transitions
    window.addEventListener('beforeunload', this.onPageUnload.bind(this));
    window.addEventListener('pagehide', this.onPageHide.bind(this));
    
    // Track network status changes
    window.addEventListener('online', this.onNetworkStatusChange.bind(this));
    window.addEventListener('offline', this.onNetworkStatusChange.bind(this));
  }
  
  /**
   * Apply initial performance optimizations
   */
  private applyInitialOptimizations(): void {
    // Preconnect to origins for critical resources
    if (this.optimizationStrategies.get('preconnect')) {
      this.setupPreconnects();
    }
    
    // Set up predictive loading
    if (this.optimizationStrategies.get('predictiveLoading')) {
      this.setupPredictiveLoading();
    }
    
    // Set up idle-time optimizations
    this.setupIdleTimeOptimizations();
  }
  
  /**
   * Set up preconnect links for common domains
   */
  private setupPreconnects(): void {
    // Extract domains from current resources
    const domains = new Set<string>();
    
    // Get all scripts, links, images, etc.
    const resources = [
      ...Array.from(document.querySelectorAll('script[src]')),
      ...Array.from(document.querySelectorAll('link[href]')),
      ...Array.from(document.querySelectorAll('img[src]')),
      ...Array.from(document.querySelectorAll('iframe[src]'))
    ];
    
    // Extract domains
    resources.forEach(resource => {
      let url: string | null = null;
      
      if (resource instanceof HTMLScriptElement && resource.src) {
        url = resource.src;
      } else if (resource instanceof HTMLLinkElement && resource.href) {
        url = resource.href;
      } else if (resource instanceof HTMLImageElement && resource.src) {
        url = resource.src;
      } else if (resource instanceof HTMLIFrameElement && resource.src) {
        url = resource.src;
      }
      
      if (url) {
        try {
          const domain = new URL(url).origin;
          if (domain !== window.location.origin) {
            domains.add(domain);
          }
        } catch (e) {
          // Ignore invalid URLs
        }
      }
    });
    
    // Create preconnect links
    domains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
      
      // Also add DNS prefetch as fallback
      const dnsLink = document.createElement('link');
      dnsLink.rel = 'dns-prefetch';
      dnsLink.href = domain;
      document.head.appendChild(dnsLink);
    });
  }
  
  /**
   * Set up predictive loading
   */
  private setupPredictiveLoading(): void {
    // Register critical assets with the asset predictor
    this.registerCriticalAssets();
  }
  
  /**
   * Register critical assets with the asset predictor
   */
  private registerCriticalAssets(): void {
    // Find critical assets in the page
    const criticalImages = Array.from(document.querySelectorAll('img[data-perf-critical="true"]'));
    const criticalScripts = Array.from(document.querySelectorAll('script[data-perf-critical="true"]'));
    const criticalStyles = Array.from(document.querySelectorAll('link[rel="stylesheet"][data-perf-critical="true"]'));
    
    // Register images
    criticalImages.forEach((img, index) => {
      if (img instanceof HTMLImageElement && img.src) {
        assetPredictor.registerAsset({
          id: `critical-image-${index}`,
          url: img.src,
          type: 'image',
          size: 0, // Size unknown at this point
          priority: 10, // Maximum priority
        }, [window.location.pathname]);
      }
    });
    
    // Register scripts
    criticalScripts.forEach((script, index) => {
      if (script instanceof HTMLScriptElement && script.src) {
        assetPredictor.registerAsset({
          id: `critical-script-${index}`,
          url: script.src,
          type: 'script',
          size: 0,
          priority: 9,
        }, [window.location.pathname]);
      }
    });
    
    // Register styles
    criticalStyles.forEach((style, index) => {
      if (style instanceof HTMLLinkElement && style.href) {
        assetPredictor.registerAsset({
          id: `critical-style-${index}`,
          url: style.href,
          type: 'style',
          size: 0,
          priority: 10,
        }, [window.location.pathname]);
      }
    });
  }
  
  /**
   * Set up optimizations to run during idle time
   */
  private setupIdleTimeOptimizations(): void {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(this.performIdleOptimizations.bind(this), { timeout: 2000 });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(this.performIdleOptimizations.bind(this), 1000);
    }
  }
  
  /**
   * Perform optimizations during idle time
   */
  private performIdleOptimizations(deadline?: IdleDeadline): void {
    const hasTime = () => !deadline || deadline.timeRemaining() > 5;
    
    // Preload fonts
    if (hasTime()) {
      this.preloadFonts();
    }
    
    // Prefetch likely navigation routes
    if (hasTime()) {
      this.prefetchLikelyRoutes();
    }
    
    // Optimize images
    if (hasTime()) {
      this.optimizeImages();
    }
    
    // Schedule next idle optimization
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(this.performIdleOptimizations.bind(this), { timeout: 5000 });
    } else {
      setTimeout(this.performIdleOptimizations.bind(this), 3000);
    }
  }
  
  /**
   * Preload fonts during idle time
   */
  private preloadFonts(): void {
    // Find all font URLs in stylesheets
    const styleSheets = Array.from(document.styleSheets);
    const fontUrls = new Set<string>();
    
    styleSheets.forEach(styleSheet => {
      try {
        const rules = Array.from(styleSheet.cssRules || styleSheet.rules || []);
        
        rules.forEach(rule => {
          if (rule instanceof CSSFontFaceRule) {
            const src = rule.style.getPropertyValue('src');
            
            if (src) {
              // Extract URL from format like: url("path/to/font.woff2") format("woff2")
              const urlMatch = src.match(/url\(['"]?([^'"]+)['"]?\)/);
              
              if (urlMatch && urlMatch[1]) {
                fontUrls.add(urlMatch[1]);
              }
            }
          }
        });
      } catch (e) {
        // CORS restrictions might prevent accessing some stylesheets
        // Just ignore these - can't optimize what we can't read
      }
    });
    
    // Preload fonts that haven't been loaded yet
    fontUrls.forEach(url => {
      // Check if this font is already loaded or loading
      if (!document.querySelector(`link[rel="preload"][href="${url}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = url;
        link.as = 'font';
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      }
    });
  }
  
  /**
   * Prefetch likely navigation routes
   */
  private prefetchLikelyRoutes(): void {
    // Get predicted routes from asset predictor
    const predictedRoutes = assetPredictor.getPredictedNextRoutes();
    
    // Only prefetch routes with high probability (> 30%)
    const highProbRoutes = predictedRoutes.filter(r => r.probability > 0.3);
    
    highProbRoutes.forEach(route => {
      // Check if already prefetched
      const prefetchUrl = new URL(route.route, window.location.origin).href;
      
      if (!document.querySelector(`link[rel="prefetch"][href="${prefetchUrl}"]`)) {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = prefetchUrl;
        document.head.appendChild(link);
      }
    });
  }
  
  /**
   * Optimize images during idle time
   */
  private optimizeImages(): void {
    // Find all images that are not in viewport and not yet loading
    const images = Array.from(document.querySelectorAll('img:not([loading="lazy"]):not([data-perf-critical="true"])'));
    
    // Add lazy loading where possible
    images.forEach(img => {
      if (img instanceof HTMLImageElement && 'loading' in HTMLImageElement.prototype && !img.loading) {
        img.loading = 'lazy';
      }
    });
  }
  
  /**
   * Callback when an element becomes visible
   */
  private onElementVisible(elementId: string, element: Element): void {
    // If this is a lazy-loaded component, initialize it
    if (element.hasAttribute('data-perf-lazy')) {
      this.initializeLazyComponent(elementId, element);
    }
    
    // Preload any associated resources
    if (element.hasAttribute('data-preload-resources')) {
      const resourcesAttr = element.getAttribute('data-preload-resources');
      if (resourcesAttr) {
        try {
          const resources = JSON.parse(resourcesAttr);
          this.preloadResources(resources);
        } catch (e) {
          // Ignore JSON parse errors
        }
      }
    }
  }
  
  /**
   * Initialize a lazy-loaded component
   */
  private initializeLazyComponent(elementId: string, element: Element): void {
    // This would be implemented based on the specific lazy loading system
    // For example, it might trigger a React or Vue lazy component initialization
    
    // Remove lazy loading marker
    element.removeAttribute('data-perf-lazy');
  }
  
  /**
   * Preload a list of resources
   */
  private preloadResources(resources: Array<{url: string, as: string}>): void {
    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.url;
      link.as = resource.as;
      
      // Add crossorigin for fonts and other CORS resources
      if (resource.as === 'font' || resource.as === 'fetch') {
        link.crossOrigin = 'anonymous';
      }
      
      document.head.appendChild(link);
    });
  }
  
  /**
   * Handler for user interactions
   */
  private onUserInteraction(event: Event): void {
    this.adaptiveState.lastUserInteraction = Date.now();
    
    // Check if this is a navigation interaction (clicked on a link)
    if (event.type === 'click') {
      const target = event.target as Element;
      const linkElement = target.closest('a');
      
      if (linkElement && linkElement.href && !linkElement.target) {
        const url = new URL(linkElement.href);
        
        // Only handle same-origin navigation
        if (url.origin === window.location.origin) {
          // Begin predictive loading
          this.predictiveNavigation(url.pathname);
        }
      }
    }
  }
  
  /**
   * Handler for user scrolling
   */
  private onUserScroll(): void {
    // Throttle to avoid excessive processing
    if (!this._scrollThrottled) {
      this._scrollThrottled = true;
      
      setTimeout(() => {
        this._scrollThrottled = false;
        
        // Update last interaction time
        this.adaptiveState.lastUserInteraction = Date.now();
        
        // We could prefetch more content in the direction of scroll
        // For infinite scroll applications
      }, 200);
    }
  }
  
  private _scrollThrottled: boolean = false;
  
  /**
   * Handler for page visibility changes
   */
  private onVisibilityChange(): void {
    if (document.visibilityState === 'visible') {
      // Page is visible again, reactivate performance optimizations
      this.resumeOptimizations();
    } else {
      // Page is hidden, pause heavy optimizations to save resources
      this.pauseOptimizations();
    }
  }
  
  /**
   * Handler for page unload
   */
  private onPageUnload(): void {
    // Save any critical performance data before unload
    
    if (this.config.reportToAnalytics) {
      this.reportPerformanceMetrics();
    }
  }
  
  /**
   * Handler for page hide
   */
  private onPageHide(event: PageTransitionEvent): void {
    // Check if it's a persisted page (going to bfcache)
    if (event.persisted) {
      // The page is being cached in the back-forward cache
      // We can clean up resources that would be reinitialized anyway
    }
  }
  
  /**
   * Handler for network status changes
   */
  private onNetworkStatusChange(): void {
    if (navigator.onLine) {
      // Online again - restore full functionality
      this.resumeOptimizations();
    } else {
      // Offline - switch to offline mode
      this.pauseOptimizations();
    }
  }
  
  /**
   * Begin predictive loading for navigation
   */
  private predictiveNavigation(route: string): void {
    // Register this route as a likely navigation target
    const existingPredictions = assetPredictor.getPredictedNextRoutes();
    const alreadyPredicted = existingPredictions.some(p => p.route === route);
    
    if (!alreadyPredicted) {
      // Prefetch the HTML for this route
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = route;
      document.head.appendChild(link);
    }
  }
  
  /**
   * Pause optimizations when page is hidden or offline
   */
  private pauseOptimizations(): void {
    // Pause predictive loading
    this.optimizationStrategies.set('predictiveLoading', false);
  }
  
  /**
   * Resume optimizations when page is visible again
   */
  private resumeOptimizations(): void {
    // Resume predictive loading if it was enabled
    if (this.config.usePredictiveLoading) {
      this.optimizationStrategies.set('predictiveLoading', true);
    }
  }
  
  /**
   * Schedule adaptive optimization based on device and network conditions
   */
  private scheduleAdaptiveOptimization(): void {
    // Run first adaptation
    this.adaptToCurrentConditions();
    
    // Schedule periodic reassessment
    setInterval(() => {
      this.adaptToCurrentConditions();
    }, 60000); // Reassess every minute
  }
  
  /**
   * Adapt optimization strategies to current conditions
   */
  private adaptToCurrentConditions(): void {
    if (!this.config.adaptToNetworkConditions && !this.config.adaptToDeviceCapabilities) {
      return; // Adaptation disabled
    }
    
    // Network-based adaptation
    if (this.config.adaptToNetworkConditions) {
      switch (this.adaptiveState.networkType) {
        case 'slow-2g':
        case '2g':
          // Extremely slow - disable all predictive loading
          this.optimizationStrategies.set('predictiveLoading', false);
          this.optimizationStrategies.set('progressiveHydration', true);
          break;
          
        case '3g':
          // Moderate - be conservative
          this.optimizationStrategies.set('predictiveLoading', true);
          this.optimizationStrategies.set('progressiveHydration', true);
          break;
          
        case '4g':
        case 'wifi':
          // Fast connection - be aggressive
          this.optimizationStrategies.set('predictiveLoading', true);
          this.optimizationStrategies.set('progressiveHydration', false);
          break;
          
        default:
          // Unknown - use defaults
      }
    }
    
    // Battery-based adaptation
    if (this.adaptiveState.batteryLevel !== null && !this.adaptiveState.batteryCharging) {
      // Low battery and not charging - be very conservative
      if (this.adaptiveState.batteryLevel < 0.15) {
        this.optimizationStrategies.set('predictiveLoading', false);
        this.optimizationStrategies.set('progressiveHydration', true);
      }
    }
  }
  
  /**
   * Register service worker for offline support and resource caching
   */
  private registerServiceWorker(): void {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
          (registration) => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
          },
          (err) => {
            console.log('ServiceWorker registration failed: ', err);
          }
        );
      });
    }
  }
  
  /**
   * Report performance metrics to analytics
   */
  private reportPerformanceMetrics(): void {
    // This would be implemented based on your analytics system
    // Example uses navigator.sendBeacon for reliable data transmission during page unload
    
    if ('sendBeacon' in navigator) {
      const performanceData = {
        metrics: this.metrics,
        url: window.location.href,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        deviceMemory: this.adaptiveState.deviceMemory,
        cpuCores: this.adaptiveState.cpuCores,
        networkType: this.adaptiveState.networkType
      };
      
      navigator.sendBeacon('/api/performance-log', JSON.stringify(performanceData));
    }
  }
  
  /**
   * Log a performance metric
   */
  private logMetric(name: string, value: number): void {
    if (!this.config.debugMode) return;
    
    console.log(`📊 Performance Metric - ${name}: ${value.toFixed(2)}ms`);
  }
  
  /**
   * Log a slow resource load
   */
  private logSlowResource(entry: PerformanceEntry): void {
    if (!this.config.debugMode) return;
    
    console.warn(`🐢 Slow Resource - ${entry.name}: ${entry.duration.toFixed(2)}ms`);
  }
  
  /**
   * Preload a key resource
   */
  public preloadResource(url: string, type: 'script' | 'style' | 'image' | 'font' | 'fetch'): void {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = type;
    
    if (type === 'font' || type === 'fetch') {
      link.crossOrigin = 'anonymous';
    }
    
    document.head.appendChild(link);
  }
  
  /**
   * Get current performance metrics
   */
  public getPerformanceMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }
  
  /**
   * Get optimization status
   */
  public getOptimizationStatus(): { strategies: Record<string, boolean>, adaptive: any } {
    return {
      strategies: Object.fromEntries(this.optimizationStrategies),
      adaptive: { ...this.adaptiveState }
    };
  }
}

// Create singleton instance
const perfOptimizer = new PerfOptimizer({
  mode: {
    type: 'extreme',
    priority: 'speed',
    aggressiveness: 10
  },
  debugMode: true
});

export default perfOptimizer; 