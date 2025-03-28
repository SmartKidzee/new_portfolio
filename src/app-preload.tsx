/**
 * Advanced Predictive Component Preloader
 * 
 * This module implements a sophisticated, multi-layered preloading strategy for all components,
 * achieving near-instantaneous component loading through intelligent prediction and preparation.
 */

// Import advanced preloading system
import advancedPreloader from './lib/advancedPreloader';
import componentScanner from './lib/componentScanner';
import preloadMetrics from './lib/preloadMetrics';
import interactionTracker from './lib/interactionTracker';
import componentDependencyGraph from './lib/componentDependencyGraph';
import { useEffect, useState } from 'react';

// This file preloads essential components before the main application starts
// Import it at the top of your entry file (main.tsx, index.tsx, etc.)

// Create polyfill for Next.js Image compatibility
if (typeof window !== 'undefined') {
  // @ts-ignore - Ignore TypeScript errors for this global assignment
  window.process = window.process || {
    env: {
      // @ts-ignore - Required for Next.js Image component
      __NEXT_IMAGE_OPTS: {
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        domains: [
          'images.unsplash.com', 
          'aceternity.com', 
          'assets.aceternity.com', 
          'i.ibb.co',
          'github.com',
          'raw.githubusercontent.com',
          'youtube.com',
          'www.youtube.com',
          'youtu.be'
        ],
        path: '/',
        loader: 'default'
      }
    },
    browser: true,
    version: ''
  };
}

// Define resource types to avoid duplicate property errors
interface PreconnectResource {
  type: 'preconnect';
  href: string;
  crossorigin?: boolean;
}

interface DnsPrefetchResource {
  type: 'dns-prefetch';
  href: string;
}

interface PreloadResource {
  type: 'preload';
  href: string;
  as: string;
  crossorigin?: boolean;
  typeAttr?: string;
}

interface ModulePreloadResource {
  type: 'modulepreload';
  href: string;
}

type ResourceHint = PreconnectResource | DnsPrefetchResource | PreloadResource | ModulePreloadResource;

/**
 * React Hook for component preloading
 */
function useComponentPreload(componentId: string, options: {
  priority?: 'critical' | 'high' | 'medium' | 'low',
  immediate?: boolean
} = {}) {
  const [isPreloaded, setIsPreloaded] = useState(advancedPreloader.isComponentPreloaded(componentId));
  
  useEffect(() => {
    // If already preloaded, no action needed
    if (isPreloaded) return;
    
    // Start preloading
    advancedPreloader.preloadComponent(componentId, {
      priority: options.priority || 'medium',
      immediate: options.immediate || false,
      useIdleCallback: !options.immediate
    }).then(() => {
      setIsPreloaded(true);
    });
    
    // Emit event for component rendering
    const event = new CustomEvent('componentRendered', {
      detail: {
        componentId,
        renderTime: performance.now(),
        isInitialRender: true
      }
    });
    document.dispatchEvent(event);
    
    return () => {
      // Emit event for component unloading
      const unmountEvent = new CustomEvent('componentUnmounted', {
        detail: {
          componentId,
          timestamp: performance.now()
        }
      });
      document.dispatchEvent(unmountEvent);
    };
  }, [componentId, options.priority, options.immediate, isPreloaded]);
  
  return isPreloaded;
}

/**
 * Initialize the advanced preloading system with multi-layered strategy
 */
function initializeAdvancedPreloading() {
  console.log('[AppPreload] Initializing advanced predictive preloading system...');
  
  // First, analyze network conditions and device capabilities
  const connection = (navigator as any).connection;
  const memory = (navigator as any).deviceMemory || 4;
  const isSaveData = connection?.saveData || false;
  
  // Configure preloading strategy based on device capabilities
  const preloadingMode = isSaveData ? 'minimal' :
                         memory < 4 ? 'conservative' :
                         memory < 8 ? 'balanced' : 'aggressive';
  
  console.log(`[AppPreload] Operating in ${preloadingMode} preloading mode based on device capabilities`);
  
  // Create a hierarchical preloading strategy based on component dependencies
  const preloadingLayers = [
    // Layer 1: Core Component Preloading
    {
      execute: () => {
        console.log('[AppPreload] Executing Layer 1: Core Component Preloading');
        
        // Initialize preloader with critical components
        advancedPreloader.initialize();
        
        // Track initial preload metrics
        preloadMetrics.logPerformanceSnapShot('Layer 1: Core preloading initiated');
        
        // Wait for critical components to load before proceeding
        return new Promise<void>((resolve) => {
          document.addEventListener('criticalComponentsLoaded', () => {
            preloadMetrics.logPerformanceSnapShot('Layer 1: Critical components loaded');
            resolve();
          }, { once: true });
        });
      },
      skipInModes: [] // Never skip this layer
    },
    
    // Layer 2: Intelligent Resource Management
    {
      execute: () => {
        console.log('[AppPreload] Executing Layer 2: Intelligent Resource Management');
        
        // Analyze user viewport and visible components
        const visibleComponents = getVisibleComponentIds();
        
        // Preload components that are visible or about to be visible
        visibleComponents.forEach(componentId => {
          // For each visible component, preload its direct dependencies
          const dependencies = componentDependencyGraph.getDirectDependencies(componentId);
          
          dependencies.forEach(depId => {
            if (!advancedPreloader.isComponentPreloaded(depId)) {
              advancedPreloader.preloadComponent(depId, {
                priority: 'high',
                immediate: true,
                useIdleCallback: false
              });
            }
          });
        });
        
        preloadMetrics.logPerformanceSnapShot('Layer 2: Visible components prepared');
        
        // Wait a moment for high-priority components to load
        return new Promise<void>(resolve => {
          setTimeout(() => {
            preloadMetrics.logPerformanceSnapShot('Layer 2: Resource management complete');
            resolve();
          }, 300);
        });
      },
      skipInModes: ['minimal'] // Skip in minimal mode
    },
    
    // Layer 3: Predictive Loading Optimization
    {
      execute: () => {
        console.log('[AppPreload] Executing Layer 3: Predictive Loading Optimization');
        
        // Get current route and user interaction patterns
        const userContext = interactionTracker.getCurrentUserContext();
        
        // Predict which components might be needed next based on usage patterns
        const predictedComponents = predictComponentNeeds(userContext);
        
        // Schedule predicted components for preloading with appropriate priorities
        predictedComponents.forEach((prediction, index) => {
          // Only preload if not already preloaded and confidence is high enough
          if (!advancedPreloader.isComponentPreloaded(prediction.componentId) && 
              prediction.confidence > 0.4) {
            // Stagger preloading to avoid network contention
            setTimeout(() => {
              advancedPreloader.preloadComponent(prediction.componentId, {
                priority: prediction.confidence > 0.7 ? 'high' : 'medium',
                immediate: prediction.confidence > 0.9,
                useIdleCallback: prediction.confidence < 0.7
              });
            }, index * 100); // Stagger by 100ms per component
          }
        });
        
        preloadMetrics.logPerformanceSnapShot('Layer 3: Predictive preloading scheduled');
        return Promise.resolve();
      },
      skipInModes: ['minimal', 'conservative'] // Skip in minimal and conservative modes
    }
  ];
  
  // Execute preloading layers sequentially
  executePreloadingLayers(preloadingLayers, preloadingMode);
}

/**
 * Execute preloading layers in sequence, respecting device constraints
 */
function executePreloadingLayers(
  layers: Array<{execute: () => Promise<void>, skipInModes: string[]}>,
  currentMode: string
) {
  // Filter layers based on current mode
  const applicableLayers = layers.filter(layer => !layer.skipInModes.includes(currentMode));
  
  // Execute layers sequentially
  let promise = Promise.resolve();
  
  applicableLayers.forEach(layer => {
    promise = promise.then(() => layer.execute());
  });
  
  // When all layers are complete
  promise.then(() => {
    console.log('[AppPreload] Multi-layered preloading strategy complete');
    preloadMetrics.logPerformanceSnapShot('All preloading layers complete');
    
    // Set a flag to indicate the advanced preloading is complete
    document.documentElement.classList.add('advanced-preloading-complete');
    
    // Dispatch event for other systems to react to
    const event = new CustomEvent('advancedPreloadingComplete', {
      detail: { metrics: preloadMetrics.getMetrics() }
    });
    document.dispatchEvent(event);
    
    // After a delay, log the final preload results
    setTimeout(() => {
      console.log('[AppPreload] Preloading complete. Full performance report:');
      console.log(advancedPreloader.generatePerformanceReport());
    }, 5000);
  });
}

/**
 * Get IDs of components currently visible in the viewport
 */
function getVisibleComponentIds(): string[] {
  const visibleComponentIds: string[] = [];
  
  // Find elements with data-component-id attribute that are in viewport
  const componentElements = document.querySelectorAll('[data-component-id]');
  
  componentElements.forEach(element => {
    const rect = element.getBoundingClientRect();
    
    // Check if element is in viewport or close to it
    const isVisible = (
      rect.top < window.innerHeight + 200 && // Element is above the bottom of viewport (plus margin)
      rect.bottom > -200 && // Element is below the top of viewport (plus margin)
      rect.left < window.innerWidth + 200 && // Element is left of the right edge of viewport (plus margin)
      rect.right > -200 // Element is right of the left edge of viewport (plus margin)
    );
    
    if (isVisible) {
      const componentId = element.getAttribute('data-component-id');
      if (componentId) {
        visibleComponentIds.push(componentId);
      }
    }
  });
  
  return visibleComponentIds;
}

/**
 * Predict which components might be needed next based on user context
 */
function predictComponentNeeds(userContext: any): Array<{componentId: string, confidence: number}> {
  // Get recently used components
  const recentInteractions = interactionTracker.getRecentInteractions(20)
    .filter(i => i.type === 'componentRendered')
    .map(i => i.componentId)
    .filter((id): id is string => id !== undefined);
  
  const predictions: Array<{componentId: string, confidence: number}> = [];
  
  // Get all components to evaluate
  const allComponents = Object.values(componentScanner.getAllComponents());
  
  // Predict likelihood of each component being needed
  allComponents.forEach(component => {
    if (advancedPreloader.isComponentPreloaded(component.id)) {
      return; // Skip already preloaded components
    }
    
    let confidence = 0;
    
    // Factor 1: Route relevance (higher confidence if component often used on current route)
    // This would need route usage tracking, assuming 0.5 as placeholder
    const routeRelevance = 0.5;
    
    // Factor 2: Component priority
    const priorityWeight = component.priority === 'critical' ? 1.0 :
                           component.priority === 'high' ? 0.8 :
                           component.priority === 'medium' ? 0.6 : 0.4;
    
    // Factor 3: Dependency relationship to recently used components
    let dependencyScore = 0;
    recentInteractions.forEach(recentId => {
      if (componentDependencyGraph.dependsOn(recentId, component.id)) {
        // This recent component depends on the evaluated component
        dependencyScore += 0.2;
      } else if (componentDependencyGraph.dependsOn(component.id, recentId)) {
        // The evaluated component depends on a recent component
        dependencyScore += 0.1;
      }
    });
    dependencyScore = Math.min(1.0, dependencyScore);
    
    // Calculate overall confidence
    confidence = (routeRelevance * 0.4) + (priorityWeight * 0.3) + (dependencyScore * 0.3);
    
    // Add to predictions if confidence is significant
    if (confidence > 0.3) {
      predictions.push({
        componentId: component.id,
        confidence
      });
    }
  });
  
  // Sort by confidence (descending)
  return predictions.sort((a, b) => b.confidence - a.confidence);
}

// Add resource hints for critical resources
if (typeof document !== 'undefined') {
  // Detect connection speed for smart preloading
  const connection = (navigator as any).connection;
  const isFastConnection = connection ? 
    (connection.effectiveType === '4g' && !connection.saveData) : 
    true;
    
  // Only preload certain resources on fast connections
  if (isFastConnection) {
    const criticalResources: ResourceHint[] = [
      { type: 'preconnect', href: 'https://fonts.googleapis.com', crossorigin: true },
      { type: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
      { type: 'dns-prefetch', href: 'https://images.unsplash.com' },
      { type: 'dns-prefetch', href: 'https://assets.aceternity.com' },
      { type: 'preload', href: '/fonts/main-font.woff2', as: 'font', crossorigin: true, typeAttr: 'font/woff2' },
      { type: 'modulepreload', href: '/components/critical-modules-chunk.js' }
    ];
    
    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = resource.type;
      link.href = resource.href;
      
      if (resource.type === 'preload') {
        link.setAttribute('as', resource.as);
        if (resource.typeAttr) {
          link.setAttribute('type', resource.typeAttr);
        }
      }
      
      // Handle crossorigin attribute with proper type checking
      if ('crossorigin' in resource && resource.crossorigin) {
        link.crossOrigin = 'anonymous';
      }
      
      document.head.appendChild(link);
    });
  }
  
  // Listen for when DOM is ready to preload components
  document.addEventListener('DOMContentLoaded', () => {
    // Mark the start of preloading process
    console.log('[AppPreload] Starting advanced component preloading process');
    preloadMetrics.logPerformanceSnapShot('Starting advanced preload process');
    
    // Initialize the multi-layered preloading system
    initializeAdvancedPreloading();
  });
  
  // Mark page as fully loaded when all resources are loaded
  window.addEventListener('load', () => {
    document.documentElement.classList.add('page-loaded');
    preloadMetrics.logPerformanceSnapShot('Page fully loaded');
  });
  
  // Register performance observers for key metrics
  if ('PerformanceObserver' in window) {
    // Observe First Contentful Paint
    try {
      const fcpObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          console.log(`[AppPreload] First Contentful Paint: ${entry.startTime.toFixed(1)}ms`);
          preloadMetrics.logPerformanceSnapShot(`FCP: ${entry.startTime.toFixed(1)}ms`);
        }
      });
      fcpObserver.observe({ type: 'paint', buffered: true });
    } catch (e) {
      console.warn('[AppPreload] FCP observation not supported');
    }
    
    // Observe Largest Contentful Paint
    try {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log(`[AppPreload] Largest Contentful Paint: ${lastEntry.startTime.toFixed(1)}ms`);
        preloadMetrics.logPerformanceSnapShot(`LCP: ${lastEntry.startTime.toFixed(1)}ms`);
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      console.warn('[AppPreload] LCP observation not supported');
    }
  }
}

// Preload the image component - this is critical for page rendering
// so we import it directly in addition to the component scanner
import './components/ui/next-image-shim';

// Export the component preloading hook
export { useComponentPreload }; 