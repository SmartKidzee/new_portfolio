/**
 * Performance Optimizer
 * 
 * This module integrates all performance optimizations in a single entry point:
 * - Component preloading
 * - Performance monitoring
 * - Resource prioritization
 * - Runtime optimization
 */

import preloadManager from './preloadManager';
import performanceMonitor from './performanceMonitor';

interface PerformanceConfig {
  // Enable/disable features
  monitoring: boolean;
  preloading: boolean;
  adaptiveLoading: boolean;
  
  // Initialize immediately or defer
  initializeImmediately: boolean;
  
  // Component preloading options
  criticalComponents: string[];
  preloadThreshold: number; // in pixels, for IntersectionObserver rootMargin
}

class PerformanceOptimizer {
  private initialized = false;
  private config: PerformanceConfig = {
    monitoring: true,
    preloading: true,
    adaptiveLoading: true,
    initializeImmediately: true,
    criticalComponents: [],
    preloadThreshold: 200
  };

  constructor() {
    if (this.config.initializeImmediately) {
      this.initialize();
    }
  }

  /**
   * Initialize all performance optimizations
   */
  public initialize(): void {
    if (this.initialized) return;
    this.initialized = true;

    // Start monitoring - do this first to capture metrics from the beginning
    if (this.config.monitoring) {
      this.initializeMonitoring();
    }

    // Initialize preloading after a short delay to prioritize critical rendering
    if (this.config.preloading) {
      setTimeout(() => {
        this.initializePreloading();
      }, 300); // Short delay for critical rendering path
    }

    // Setup cleanup on page unload
    window.addEventListener('beforeunload', this.cleanup.bind(this));
  }

  /**
   * Initialize performance monitoring
   */
  private initializeMonitoring(): void {
    performanceMonitor.startMonitoring((metrics) => {
      // Optional callback for metrics updates
      if (metrics.fcp && metrics.lcp) {
        // Once FCP and LCP are recorded, we can mark critical assets as loaded
        if (this.config.preloading) {
          preloadManager.markCriticalAssetsLoaded();
        }
      }

      // Report to analytics in production
      if (process.env.NODE_ENV === 'production') {
        try {
          // Web Vitals reporting logic could go here
          // reportWebVitals(metrics);
        } catch (error) {
          console.error('Error reporting metrics:', error);
        }
      }
    });
  }

  /**
   * Initialize preloading system
   */
  private initializePreloading(): void {
    // Detect network conditions and setup observers
    if (document.readyState === 'complete') {
      this.setupComponentObservers();
    } else {
      window.addEventListener('load', () => {
        this.setupComponentObservers();
      });
    }
  }

  /**
   * Setup observers for component-based preloading
   */
  private setupComponentObservers(): void {
    // Find sections to observe
    const sectionIds = [
      'hero-section',
      'about-section', 
      'skills-section',
      'projects-section',
      'experience-section',
      'contact-section'
    ];

    // Observe each section
    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        preloadManager.observeComponent(element, id);
      }
    });

    // Handle navigation intent from menu clicks
    const menuLinks = document.querySelectorAll('a[href^="#"]');
    menuLinks.forEach(link => {
      link.addEventListener('mouseenter', () => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          const targetId = href.substring(1);
          preloadManager.setNavigationIntent(targetId);
        }
      });
    });
  }

  /**
   * Inject resource hints for key resources
   */
  public injectResourceHints(): void {
    const resources = [
      // DNS prefetch
      { type: 'dns-prefetch', href: '//fonts.googleapis.com' },
      { type: 'dns-prefetch', href: '//fonts.gstatic.com' },
      
      // Preconnect
      { type: 'preconnect', href: 'https://fonts.googleapis.com', crossorigin: true },
      { type: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
      
      // Preload critical resources
      { type: 'preload', href: '/fonts/main-font.woff2', as: 'font', crossorigin: true },
    ];

    // Add resource hints to document head
    resources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = resource.type;
      link.href = resource.href;
      
      if (resource.as) {
        link.setAttribute('as', resource.as);
      }
      
      if (resource.crossorigin) {
        link.setAttribute('crossorigin', 'anonymous');
      }
      
      document.head.appendChild(link);
    });
  }

  /**
   * Apply adaptive loading optimizations based on device capabilities
   */
  public applyAdaptiveLoading(): void {
    const isLowEndDevice = 
      (navigator as any).deviceMemory < 4 || 
      (navigator as any).hardwareConcurrency < 4;
      
    const hasReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Add classes to document for CSS optimizations
    if (isLowEndDevice) {
      document.documentElement.classList.add('low-end-device');
    }
    
    if (hasReducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    }
    
    // Optimize event listeners
    if (isLowEndDevice) {
      // Use passive listeners for touch events on low-end devices
      const options = { passive: true };
      document.addEventListener('touchstart', () => {}, options);
      document.addEventListener('touchmove', () => {}, options);
    }
  }

  /**
   * Clean up resources
   */
  private cleanup(): void {
    performanceMonitor.stopMonitoring();
    preloadManager.cleanup();
  }
}

// Create and export singleton instance
const performanceOptimizer = new PerformanceOptimizer();
export default performanceOptimizer; 