/**
 * Performance optimizations for React applications
 * This file contains utilities to improve performance without modifying visual elements
 */

// Function to prevent layout thrashing by batching DOM reads and writes
export function optimizeDOMOperations(callback: () => void): void {
  // Use requestAnimationFrame to schedule DOM operations in the next frame
  requestAnimationFrame(() => {
    // Read phase - all DOM measurements should happen here
    const measurements = document.querySelectorAll('[data-measure]');
    const measurementValues: Record<string, DOMRect> = {};
    
    measurements.forEach((element) => {
      const id = element.getAttribute('data-measure');
      if (id) {
        measurementValues[id] = element.getBoundingClientRect();
      }
    });
    
    // Write phase - all DOM mutations should happen here
    requestAnimationFrame(() => {
      callback();
    });
  });
}

// Add resource hints for better resource loading
export function addResourceHints(): void {
  // Don't run this in SSR context
  if (typeof document === 'undefined') return;

  // Preconnect to origins
  const origins = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    // Add other third-party origins your app connects to
  ];

  origins.forEach(origin => {
    if (!document.querySelector(`link[rel="preconnect"][href="${origin}"]`)) {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = origin;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    }
  });
}

// Cache frequently accessed DOM elements
const domCache = new Map<string, Element | null>();

export function getCachedElement(selector: string): Element | null {
  if (!domCache.has(selector)) {
    const element = document.querySelector(selector);
    domCache.set(selector, element);
  }
  return domCache.get(selector) || null;
}

// Clear the cache when needed (e.g., after major DOM changes)
export function clearDOMCache(): void {
  domCache.clear();
}

// Monitor and log performance issues
export function monitorPerformance(): void {
  // Don't run in SSR or if the API isn't available
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  // Monitor long tasks
  try {
    const longTaskObserver = new PerformanceObserver((entryList) => {
      entryList.getEntries().forEach((entry) => {
        if (entry.duration > 50) { // Tasks longer than 50ms may cause jank
          console.warn('Long task detected:', entry.duration.toFixed(2) + 'ms');
        }
      });
    });
    
    longTaskObserver.observe({ type: 'longtask', buffered: true });
  } catch (e) {
    console.warn('Long task monitoring not supported');
  }

  // Monitor layout shifts
  try {
    const layoutShiftObserver = new PerformanceObserver((entryList) => {
      entryList.getEntries().forEach((entry: any) => {
        if (entry.value > 0.1) { // Significant layout shifts
          console.warn('Significant layout shift detected:', entry.value.toFixed(4));
        }
      });
    });
    
    layoutShiftObserver.observe({ type: 'layout-shift', buffered: true });
  } catch (e) {
    console.warn('Layout shift monitoring not supported');
  }
}

// Apply all performance optimizations
export function applyAllOptimizations(): void {
  addResourceHints();
  monitorPerformance();
  
  // Use a safer approach that won't crash browsers
  if (typeof document !== 'undefined') {
    // Use requestIdleCallback to apply non-critical optimizations
    const applyOptimizations = () => {
      // Add a class using classList which is more reliable
      if (document.body) {
        document.body.classList.add('content-loaded');
      }
    };
    
    // Use requestIdleCallback or fall back to setTimeout for older browsers
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(applyOptimizations);
    } else {
      setTimeout(applyOptimizations, 1000);
    }
  }
}

// Call this function as early as possible
if (typeof window !== 'undefined') {
  applyAllOptimizations();
} 