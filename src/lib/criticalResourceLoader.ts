/**
 * Critical Resource Loader
 * 
 * Implements precision resource loading strategies to drastically reduce initial render time
 * through extreme prioritization and predictive loading techniques.
 */

// Create advanced prediction model for resource prioritization
interface ResourcePriority {
  path: string;
  type: 'script' | 'style' | 'image' | 'font' | 'data';
  priority: 'critical' | 'high' | 'medium' | 'low';
  viewport: 'above-fold' | 'initial-viewport' | 'below-fold' | 'offscreen';
  loadStrategy: 'immediate' | 'defer' | 'prefetch' | 'preconnect' | 'preload';
  renderBlocking: boolean;
}

/**
 * Hyper-optimized resource loader that uses real-time prioritization
 * with stratified loading techniques to create near-instantaneous perception
 */
class CriticalResourceLoader {
  private resourceMap: Map<string, ResourcePriority> = new Map();
  private loadedResources: Set<string> = new Set();
  private renderStartTime: number = 0;
  private isInitialRenderComplete: boolean = false;
  private intersectionController: IntersectionObserver | null = null;
  private raf: number | null = null;
  private resourcePromises: Record<string, Promise<any>> = {};
  private nextIdleWorkQueue: Function[] = [];
  private networkInfo: any = null;
  
  constructor() {
    this.renderStartTime = performance.now();
    this.detectNetworkConditions();
    this.createIntersectionObserver();
    this.interceptNetworkRequests();
    
    // Register for render completion
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.isInitialRenderComplete = true;
        this.processDeferredResources();
      }, 100);
    });
  }
  
  /**
   * Setup precise network condition detection
   */
  private detectNetworkConditions(): void {
    // Get detailed connection information
    if ('connection' in navigator) {
      this.networkInfo = (navigator as any).connection;
      
      if (this.networkInfo) {
        this.networkInfo.addEventListener('change', () => {
          this.adjustPrioritiesBasedOnNetwork();
        });
      }
    }
    
    // Detect memory constraints
    const isLowMemoryDevice = ('deviceMemory' in navigator) && (navigator as any).deviceMemory < 4;
    
    // Detect CPU constraints
    const isLowPowerDevice = ('hardwareConcurrency' in navigator) && (navigator as any).hardwareConcurrency <= 4;
    
    if (isLowMemoryDevice || isLowPowerDevice) {
      this.applyConstrainedDeviceOptimizations();
    }
  }
  
  /**
   * Register critical path resources that absolutely must be loaded first
   */
  public registerAbsoluteCriticalResources(resources: ResourcePriority[]): void {
    resources.forEach(resource => {
      this.resourceMap.set(resource.path, resource);
      
      if (resource.renderBlocking && resource.loadStrategy === 'immediate') {
        this.preloadCriticalResource(resource); 
      }
    });
  }
  
  /**
   * Ultra-aggressively preload critical viewport resources
   * using the most optimal loading strategy for each resource type
   */
  private preloadCriticalResource(resource: ResourcePriority): void {
    if (this.loadedResources.has(resource.path)) return;
    
    switch(resource.type) {
      case 'script':
        this.preloadScript(resource);
        break;
      case 'style':
        this.preloadStyle(resource);
        break;
      case 'image':
        this.preloadImage(resource);
        break;
      case 'font':
        this.preloadFont(resource);
        break;
      case 'data':
        this.preloadData(resource);
        break;
    }
    
    this.loadedResources.add(resource.path);
  }
  
  /**
   * Preload script with precise load timing and execution control
   */
  private preloadScript(resource: ResourcePriority): void {
    const script = document.createElement('link');
    script.rel = 'preload';
    script.as = 'script';
    script.href = resource.path;
    
    // Inline execution of tiny critical scripts for maximum speed
    if (resource.loadStrategy === 'immediate' && resource.renderBlocking) {
      fetch(resource.path)
        .then(response => response.text())
        .then(content => {
          // Execute tiny critical scripts immediately
          if (content.length < 4096) { // 4KB threshold
            const inlineScript = document.createElement('script');
            inlineScript.textContent = content;
            document.head.appendChild(inlineScript);
          } else {
            // For larger scripts, load with controlled execution
            const script = document.createElement('script');
            script.src = resource.path;
            script.async = !resource.renderBlocking;
            document.head.appendChild(script);
          }
        })
        .catch(() => {
          // Fallback to normal loading if fetch fails
          const script = document.createElement('script');
          script.src = resource.path;
          script.async = !resource.renderBlocking;
          document.head.appendChild(script);
        });
    } else {
      document.head.appendChild(script);
    }
    
    this.resourcePromises[resource.path] = new Promise(resolve => {
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
    });
  }
  
  /**
   * Preload style with critical CSS extraction for initial viewport
   */
  private preloadStyle(resource: ResourcePriority): void {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'style';
    link.href = resource.path;
    document.head.appendChild(link);
    
    // Extract and inline critical CSS for above-fold content
    if (resource.viewport === 'above-fold' || resource.viewport === 'initial-viewport') {
      fetch(resource.path)
        .then(response => response.text())
        .then(css => {
          const style = document.createElement('style');
          style.textContent = this.extractCriticalCSS(css);
          document.head.appendChild(style);
          
          // Then load the full stylesheet to avoid FOUC
          const fullLink = document.createElement('link');
          fullLink.rel = 'stylesheet';
          fullLink.href = resource.path;
          fullLink.setAttribute('media', 'print');
          fullLink.onload = () => {
            fullLink.setAttribute('media', 'all');
          };
          document.head.appendChild(fullLink);
        })
        .catch(() => {
          // Fallback to normal loading if fetch fails
          const styleLink = document.createElement('link');
          styleLink.rel = 'stylesheet';
          styleLink.href = resource.path;
          document.head.appendChild(styleLink);
        });
    } else {
      // Non-critical styles can be loaded normally, but still optimized
      const linkElem = document.createElement('link');
      linkElem.rel = 'stylesheet';
      linkElem.href = resource.path;
      
      if (resource.priority === 'low') {
        linkElem.setAttribute('media', 'print');
        linkElem.onload = () => {
          linkElem.setAttribute('media', 'all');
        };
      }
      
      document.head.appendChild(linkElem);
    }
    
    this.resourcePromises[resource.path] = new Promise(resolve => {
      link.onload = () => resolve(true);
      link.onerror = () => resolve(false);
    });
  }
  
  /**
   * Extract critical CSS rules for above-the-fold content
   */
  private extractCriticalCSS(fullCSS: string): string {
    // This is a simplified approach - in production you would use a proper critical CSS extractor
    // Here we're focusing on basic viewport-related and core styles
    
    // Extract @import, @font-face, root variables and other critical global rules
    const globalRuleRegex = /@(import|font-face|keyframes|media|supports|layer|property|charset|namespace|page|container)/g;
    const globalMatches = fullCSS.match(new RegExp(`(${globalRuleRegex.source}[^}]*}(?:[^}]*})*)+`, 'g')) || [];
    
    // Extract rules for critical selectors that are likely to be above the fold
    const criticalSelectors = [
      'html', 'body', '#root', '.container', 'header', 'nav', '.logo', 'main', 'h1', 'h2', 
      '.hero', '.banner', '.header', '#header', '.navigation', '.menu', '.button', '.btn',
      '.shadcn-navbar', '.card', '.loading'
    ];
    
    const selectorPatterns = criticalSelectors.map(sel => 
      new RegExp(`(${sel}(\\s*[,{]|\\.[a-zA-Z0-9_-]+|\\#[a-zA-Z0-9_-]+|:[a-zA-Z0-9_-]+|\\[[^\\]]+\\])+)\\s*{[^}]*}`, 'g')
    );
    
    const extractedRules: string[] = [];
    selectorPatterns.forEach(pattern => {
      const matches = fullCSS.match(pattern);
      if (matches) extractedRules.push(...matches);
    });
    
    // Combine all extracted styles
    return [...globalMatches, ...extractedRules].join('\n');
  }
  
  /**
   * Hyper-optimized image preloading with adaptive quality
   */
  private preloadImage(resource: ResourcePriority): void {
    // Only preload if in or near initial viewport
    if (resource.viewport === 'above-fold' || resource.viewport === 'initial-viewport') {
      const imageLoader = new Image();
      
      // For critical images, consider data URL embedding for instant display
      if (resource.priority === 'critical' && resource.viewport === 'above-fold') {
        // Check for low-quality preview in page metadata
        const metaPreview = document.querySelector(`meta[name="preview:${resource.path}"]`);
        if (metaPreview) {
          const previewContent = metaPreview.getAttribute('content');
          if (previewContent) {
            // Create a placeholder with LQIP (Low Quality Image Placeholder)
            this.createImagePlaceholder(resource.path, previewContent);
          }
        }
      }
      
      // Apply adaptive loading based on network conditions
      if (this.networkInfo?.saveData || 
          (this.networkInfo?.effectiveType && 
          ['slow-2g', '2g', '3g'].includes(this.networkInfo.effectiveType))) {
        
        // For slow connections, try to get optimized version
        const lowQualityPath = this.getOptimizedImagePath(resource.path);
        imageLoader.src = lowQualityPath;
      } else {
        imageLoader.src = resource.path;
      }
      
      this.resourcePromises[resource.path] = new Promise(resolve => {
        imageLoader.onload = () => resolve(true);
        imageLoader.onerror = () => resolve(false);
      });
    }
  }
  
  /**
   * Create a low-quality image placeholder to show instantly
   */
  private createImagePlaceholder(originalPath: string, dataUrl: string): void {
    // Find image elements that will load this resource
    const imgElements = document.querySelectorAll(`img[src="${originalPath}"], img[data-src="${originalPath}"]`);
    
    imgElements.forEach(img => {
      // Save the original source
      const originalSrc = img.getAttribute('src') || img.getAttribute('data-src') || '';
      img.setAttribute('data-original-src', originalSrc);
      
      // Set placeholder
      img.setAttribute('src', dataUrl);
      
      // When the full image loads, swap it in
      const fullImg = new Image();
      fullImg.src = originalSrc;
      
      fullImg.onload = () => {
        img.setAttribute('src', originalSrc);
      };
    });
  }
  
  /**
   * Get network-appropriate image path
   */
  private getOptimizedImagePath(originalPath: string): string {
    // Convert to WebP for better compression if browser supports it
    if (this.supportsWebP() && !originalPath.endsWith('.webp')) {
      // Check if we have a webp version available
      const webpPath = originalPath.replace(/\.(jpe?g|png)$/i, '.webp');
      return webpPath;
    }
    
    // For slow connections, try to load a lower resolution
    if (this.networkInfo?.saveData || this.networkInfo?.effectiveType === 'slow-2g' || this.networkInfo?.effectiveType === '2g') {
      // If filename has dimensions like image-800x600.jpg, reduce them
      const dimensionMatch = originalPath.match(/-(\d+)x(\d+)\./);
      if (dimensionMatch) {
        const width = parseInt(dimensionMatch[1]);
        const height = parseInt(dimensionMatch[2]);
        
        // Reduce to 50% for very slow connections
        const newWidth = Math.floor(width * 0.5);
        const newHeight = Math.floor(height * 0.5);
        
        return originalPath.replace(
          new RegExp(`-${width}x${height}\\.`), 
          `-${newWidth}x${newHeight}.`
        );
      }
      
      // Try adding a lower quality suffix
      return originalPath.replace(/(\.[^.]+)$/, '-low$1');
    }
    
    return originalPath;
  }
  
  /**
   * Check WebP support
   */
  private supportsWebP(): boolean {
    const canvas = document.createElement('canvas');
    if (!canvas || !canvas.getContext) {
      return false;
    }
    
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }
  
  /**
   * Ultra-responsive font preloading with fallback system
   */
  private preloadFont(resource: ResourcePriority): void {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.href = resource.path;
    link.crossOrigin = 'anonymous';
    
    // Determine font format for correct type attribute
    if (resource.path.endsWith('.woff2')) {
      link.type = 'font/woff2';
    } else if (resource.path.endsWith('.woff')) {
      link.type = 'font/woff';
    } else if (resource.path.endsWith('.ttf')) {
      link.type = 'font/ttf';
    }
    
    document.head.appendChild(link);
    
    // Add font-display: swap to ensure text is visible immediately
    if (resource.priority === 'critical') {
      const style = document.createElement('style');
      style.textContent = `
        @font-face {
          font-family: "${resource.path.split('/').pop()?.split('.')[0]}";
          src: url("${resource.path}") format("${this.getFontFormat(resource.path)}");
          font-display: swap;
        }
      `;
      document.head.appendChild(style);
    }
    
    this.resourcePromises[resource.path] = new Promise(resolve => {
      link.onload = () => resolve(true);
      link.onerror = () => resolve(false);
    });
  }
  
  /**
   * Get font format from file extension
   */
  private getFontFormat(path: string): string {
    if (path.endsWith('.woff2')) return 'woff2';
    if (path.endsWith('.woff')) return 'woff';
    if (path.endsWith('.ttf')) return 'truetype';
    if (path.endsWith('.eot')) return 'embedded-opentype';
    if (path.endsWith('.svg')) return 'svg';
    return 'truetype'; // default
  }
  
  /**
   * Preload API data for immediate rendering
   */
  private preloadData(resource: ResourcePriority): void {
    if (resource.priority === 'critical' || resource.priority === 'high') {
      this.resourcePromises[resource.path] = fetch(resource.path)
        .then(response => response.json())
        .then(data => {
          // Store in sessionStorage for immediate access
          try {
            sessionStorage.setItem(`preloaded_data_${resource.path}`, JSON.stringify(data));
          } catch (e) {
            console.error('Failed to cache API data in sessionStorage', e);
          }
          return data;
        })
        .catch(error => {
          console.error('Failed to preload data', error);
          return null;
        });
    }
  }
  
  /**
   * Create high-precision intersection observer for viewport-based loading
   */
  private createIntersectionObserver(): void {
    if (!('IntersectionObserver' in window)) return;
    
    this.intersectionController = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target;
            const resourcePath = element.getAttribute('data-resource');
            
            if (resourcePath) {
              const resource = this.resourceMap.get(resourcePath);
              if (resource && !this.loadedResources.has(resourcePath)) {
                this.preloadCriticalResource(resource);
              }
            }
            
            // Stop observing after loading
            this.intersectionController?.unobserve(element);
          }
        });
      },
      {
        // High precision for critical content
        rootMargin: '500px 0px',
        threshold: [0, 0.1, 0.5, 1.0]
      }
    );
  }
  
  /**
   * Register element for viewport-based loading
   */
  public observeElement(element: Element, resourcePath: string): void {
    if (!this.intersectionController || !element) return;
    
    element.setAttribute('data-resource', resourcePath);
    this.intersectionController.observe(element);
  }
  
  /**
   * Intercept network requests for intelligent prioritization
   */
  private interceptNetworkRequests(): void {
    if (!window.fetch) return;
    
    // Save reference to original fetch
    const originalFetch = window.fetch;
    
    // Override fetch with prioritized version
    window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
      
      // Check if this is a critical resource
      const resource = this.resourceMap.get(url);
      
      if (resource && (resource.priority === 'critical' || resource.priority === 'high')) {
        // Ensure critical requests have high priority
        const highPriorityInit = {
          ...init,
          importance: 'high'
        };
        
        return originalFetch(input, highPriorityInit);
      }
      
      // For non-critical resources during initial load, consider deferring
      if (!this.isInitialRenderComplete && (!resource || resource.priority === 'low')) {
        // Return a promise that will resolve after initial render
        return new Promise((resolve) => {
          this.nextIdleWorkQueue.push(() => {
            resolve(originalFetch(input, init));
          });
        });
      }
      
      // Otherwise proceed normally
      return originalFetch(input, init);
    };
  }
  
  /**
   * Process deferred resources after initial render
   */
  private processDeferredResources(): void {
    // First batch of idle work immediately after render
    const processBatch = (deadline: IdleDeadline | null) => {
      while ((deadline === null || deadline.timeRemaining() > 0) && this.nextIdleWorkQueue.length > 0) {
        const nextWork = this.nextIdleWorkQueue.shift();
        if (nextWork) nextWork();
      }
      
      // If there's more work and we have requestIdleCallback, continue in next idle period
      if (this.nextIdleWorkQueue.length > 0) {
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(processBatch);
        } else {
          // Fallback to setTimeout with a small delay
          setTimeout(() => processBatch(null), 50);
        }
      }
    };
    
    // Start processing
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(processBatch);
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => processBatch(null), 50);
    }
  }
  
  /**
   * Apply optimizations for constrained devices
   */
  private applyConstrainedDeviceOptimizations(): void {
    // Add a class to enable CSS-based optimizations
    document.documentElement.classList.add('constrained-device');
    
    // Reduce animation complexity via CSS variables
    const style = document.createElement('style');
    style.textContent = `
      .constrained-device {
        --animation-duration-factor: 0.8;
        --transition-duration-factor: 0.8;
        --effect-complexity-factor: 0.5;
      }
      
      .constrained-device * {
        animation-duration: calc(var(--animation-duration) * var(--animation-duration-factor, 1)) !important;
        transition-duration: calc(var(--transition-duration) * var(--transition-duration-factor, 1)) !important;
      }
      
      .constrained-device [data-effect-complexity="high"] {
        display: none !important;
      }
      
      .constrained-device video {
        max-resolution: 720p !important;
      }
    `;
    document.head.appendChild(style);
  }
  
  /**
   * Adjust resource priorities based on network conditions
   */
  private adjustPrioritiesBasedOnNetwork(): void {
    if (!this.networkInfo) return;
    
    // On slow connections, be more aggressive with prioritization
    if (this.networkInfo.saveData || 
        ['slow-2g', '2g'].includes(this.networkInfo.effectiveType)) {
      
      this.resourceMap.forEach((resource, path) => {
        // Downgrade medium to low
        if (resource.priority === 'medium') {
          resource.priority = 'low';
        }
        
        // Convert some high to medium
        if (resource.priority === 'high' && resource.viewport !== 'above-fold') {
          resource.priority = 'medium';
        }
      });
    }
  }
  
  /**
   * Retrieve preloaded data (for APIs/JSON)
   */
  public getPreloadedData<T>(path: string): Promise<T | null> {
    // First check sessionStorage for instant access
    try {
      const cached = sessionStorage.getItem(`preloaded_data_${path}`);
      if (cached) {
        return Promise.resolve(JSON.parse(cached));
      }
    } catch (e) {
      console.error('Failed to retrieve cached data', e);
    }
    
    // Otherwise check if we have a promise for this resource
    if (path in this.resourcePromises) {
      return this.resourcePromises[path];
    }
    
    // Or fetch it if not yet loaded
    return fetch(path)
      .then(response => response.json())
      .catch(error => {
        console.error('Failed to fetch data', error);
        return null;
      });
  }
  
  /**
   * Get loading priority for a path
   */
  public getPriority(path: string): 'critical' | 'high' | 'medium' | 'low' {
    const resource = this.resourceMap.get(path);
    return resource?.priority || 'medium';
  }
}

// Create singleton instance
const criticalResourceLoader = new CriticalResourceLoader();
export default criticalResourceLoader; 