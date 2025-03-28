/**
 * Intelligent Preload Manager
 * 
 * This module manages resource preloading based on user interaction patterns,
 * network conditions, and device capabilities.
 */

// Network and device conditions
interface ConnectionInfo {
  effectiveType: string;
  downlink: number;
  rtt: number;
  saveData: boolean;
}

// State tracking for preload operations
interface PreloadState {
  criticalAssetsLoaded: boolean;
  inViewComponents: Set<string>;
  navigationIntent: string | null;
  networkCondition: 'fast' | 'medium' | 'slow';
  isLowEndDevice: boolean;
}

class PreloadManager {
  private state: PreloadState = {
    criticalAssetsLoaded: false,
    inViewComponents: new Set<string>(),
    navigationIntent: null,
    networkCondition: 'medium',
    isLowEndDevice: false
  };

  private preloadedModules: Set<string> = new Set();
  private preloadedAssets: Set<string> = new Set();
  private idleCallbackId: number | null = null;
  private observer: IntersectionObserver | null = null;

  constructor() {
    this.detectEnvironment();
    this.setupIntersectionObserver();
    
    // Listen for network condition changes
    if ('connection' in navigator && (navigator as any).connection) {
      (navigator as any).connection.addEventListener('change', this.updateNetworkCondition.bind(this));
    }
  }

  /**
   * Detect device capabilities and network conditions
   */
  private detectEnvironment(): void {
    // Detect device capabilities
    this.state.isLowEndDevice = this.detectLowEndDevice();
    
    // Detect network conditions
    this.updateNetworkCondition();
  }

  /**
   * Update network condition state based on current connection
   */
  private updateNetworkCondition(): void {
    if (!('connection' in navigator)) {
      return;
    }

    const connection = (navigator as any).connection as ConnectionInfo;
    
    if (connection.saveData) {
      this.state.networkCondition = 'slow';
      return;
    }

    switch (connection.effectiveType) {
      case 'slow-2g':
      case '2g':
        this.state.networkCondition = 'slow';
        break;
      case '3g':
        this.state.networkCondition = 'medium';
        break;
      case '4g':
        this.state.networkCondition = 'fast';
        break;
      default:
        // Default to medium when unknown
        this.state.networkCondition = 'medium';
    }
  }

  /**
   * Detect if device is low-end
   */
  private detectLowEndDevice(): boolean {
    const memory = (navigator as any).deviceMemory;
    if (memory && memory < 4) {
      return true;
    }

    // Check for slow CPU
    if (typeof window !== 'undefined' && 'navigator' in window) {
      const userAgent = navigator.userAgent;
      if (
        /android/i.test(userAgent) && 
        !(/SM-[G|N][0-9]{3,4}/.test(userAgent)) // Exclude high-end Samsung devices
      ) {
        return true;
      }
    }

    return false;
  }

  /**
   * Setup IntersectionObserver to track visible components
   */
  private setupIntersectionObserver(): void {
    if (!('IntersectionObserver' in window)) {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const id = entry.target.id || entry.target.getAttribute('data-component');
          if (!id) return;

          if (entry.isIntersecting) {
            this.state.inViewComponents.add(id);
            // Preload components likely to be interacted with
            this.preloadRelatedComponents(id);
          } else {
            this.state.inViewComponents.delete(id);
          }
        });
      },
      {
        rootMargin: '200px 0px', // Preload when getting close to viewport
        threshold: 0.1
      }
    );
  }

  /**
   * Observe component visibility
   */
  public observeComponent(element: Element, componentId?: string): void {
    if (!this.observer || !element) return;
    
    if (componentId && !element.id) {
      element.setAttribute('data-component', componentId);
    }
    
    this.observer.observe(element);
  }

  /**
   * Schedule preloading for non-critical resources
   */
  public preloadNonCriticalAssets(): void {
    // Only preload non-critical assets on fast connections or after page is idle
    if (this.state.networkCondition === 'slow') {
      return;
    }

    if ('requestIdleCallback' in window) {
      this.idleCallbackId = window.requestIdleCallback(() => {
        this.preloadAssets();
      }, { timeout: 2000 });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        this.preloadAssets();
      }, 3000);
    }
  }

  /**
   * Preload component based on user navigation intent
   */
  public setNavigationIntent(targetId: string): void {
    this.state.navigationIntent = targetId;
    this.preloadComponentsByNavigationIntent();
  }

  /**
   * Preload components likely to be interacted with based on current visible components
   */
  private preloadRelatedComponents(componentId: string): void {
    // Define component relationships
    const componentRelations: Record<string, string[]> = {
      'hero-section': ['about-section', 'skills-section'],
      'about-section': ['skills-section', 'projects-section'],
      'skills-section': ['projects-section', 'experience-section'],
      'projects-section': ['experience-section', 'contact-section'],
      'experience-section': ['contact-section'],
      // Add more component relationships as needed
    };

    const relatedComponents = componentRelations[componentId] || [];
    
    // Only preload on fast connections or after critical content is loaded
    if (this.state.networkCondition !== 'slow' && this.state.criticalAssetsLoaded) {
      relatedComponents.forEach(component => {
        this.preloadComponent(component);
      });
    }
  }

  /**
   * Preload component modules based on navigation intent
   */
  private preloadComponentsByNavigationIntent(): void {
    if (!this.state.navigationIntent) return;
    
    this.preloadComponent(this.state.navigationIntent);
    
    // Reset navigation intent after handling
    this.state.navigationIntent = null;
  }

  /**
   * Preload specific component module
   */
  private preloadComponent(componentId: string): void {
    if (this.preloadedModules.has(componentId)) return;
    
    // Map componentId to actual module paths
    const componentModules: Record<string, () => Promise<any>> = {
      'skills-section': () => import('../cpmponents/Components/Skills/CircularSkills').catch(() => {}),
      'projects-section': () => import('../components/infinite-moving-cards-demo').catch(() => {}),
      'experience-section': () => import('../components/timeline-demo').catch(() => {}),
      // Using dynamic import for modules that might not exist yet but will be created later
      'hero-section': () => Promise.resolve().catch(() => {}),
      'about-section': () => Promise.resolve().catch(() => {}),
      'contact-section': () => Promise.resolve().catch(() => {})
    };

    const preloadModule = componentModules[componentId];
    if (preloadModule) {
      // Mark as preloaded immediately to prevent duplicate preloads
      this.preloadedModules.add(componentId);
      
      // Fetch the module
      preloadModule();
    }
  }

  /**
   * Preload assets like images, fonts, etc.
   */
  private preloadAssets(): void {
    const assetsToPreload = [
      // Add key visual assets, but limit number based on network conditions
      '/background-texture.webp',
      '/fonts/main-font.woff2'
      // Add more assets as needed
    ];

    // Limit number of assets based on network condition
    const limit = this.state.networkCondition === 'fast' 
      ? assetsToPreload.length 
      : Math.min(5, assetsToPreload.length);

    for (let i = 0; i < limit; i++) {
      const asset = assetsToPreload[i];
      if (this.preloadedAssets.has(asset)) continue;
      
      this.preloadedAssets.add(asset);
      
      if (asset.endsWith('.woff2') || asset.endsWith('.woff') || asset.endsWith('.ttf')) {
        this.preloadFont(asset);
      } else if (asset.endsWith('.webp') || asset.endsWith('.png') || asset.endsWith('.jpg') || asset.endsWith('.svg')) {
        this.preloadImage(asset);
      }
    }
  }

  /**
   * Preload image
   */
  private preloadImage(url: string): void {
    const img = new Image();
    img.src = url;
  }

  /**
   * Preload font
   */
  private preloadFont(url: string): void {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  }

  /**
   * Mark critical assets as loaded, which allows non-critical loading to begin
   */
  public markCriticalAssetsLoaded(): void {
    this.state.criticalAssetsLoaded = true;
    this.preloadNonCriticalAssets();
  }

  /**
   * Clean up resources
   */
  public cleanup(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    
    if (this.idleCallbackId !== null && 'cancelIdleCallback' in window) {
      window.cancelIdleCallback(this.idleCallbackId);
    }
    
    if ('connection' in navigator && (navigator as any).connection) {
      (navigator as any).connection.removeEventListener('change', this.updateNetworkCondition);
    }
  }
}

// Create singleton instance
const preloadManager = new PreloadManager();

export default preloadManager; 