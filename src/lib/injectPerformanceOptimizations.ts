/**
 * This script injects performance optimizations without modifying visual elements
 * Import and call injectOptimizations() early in your application lifecycle
 */

// Detect if it's a mobile device
const isMobile = window.innerWidth < 768;

// Global performance optimization flags
export const performanceFlags = {
  isMobile,
  isLowEndDevice: false, // Will be updated after checks
  prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  isOlderDevice: !('IntersectionObserver' in window) || !('requestAnimationFrame' in window)
};

/**
 * Apply global performance optimizations
 */
function applyPerformanceOptimizations() {
  try {
    // Initial detection - will be refined when DOM is ready
    performanceFlags.isMobile = window.innerWidth < 768;
    
    // Wait for DOM to be ready before finalizing device detection
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', finalizeDeviceDetection);
    } else {
      // DOM already loaded
      finalizeDeviceDetection();
    }
    
    // Apply touch optimizations for mobile
    if (performanceFlags.isMobile || 'ontouchstart' in window) {
      if (document.body) {
        document.body.classList.add('touch-device');
      
        // Force hardware acceleration for body - with safer approach
        document.body.style.transform = 'translateZ(0)';
        document.body.style.backfaceVisibility = 'hidden';
      }
      
      // Improve scrolling performance on mobile
      document.documentElement.style.setProperty('--scroll-behavior', 'auto');
      
      // Add passive listeners - but limit to avoid memory issues
      addEventListenerWithOptions('touchstart', () => {}, { passive: true });
    }
  } catch (error) {
    console.error('Error applying performance optimizations:', error);
  }
}

/**
 * More reliable device detection after DOM is ready
 */
function finalizeDeviceDetection() {
  try {
    // Check for low memory devices
    if ('deviceMemory' in navigator) {
      const memory = (navigator as any).deviceMemory;
      if (memory && memory < 4) {
        performanceFlags.isLowEndDevice = true;
      }
    }

    // Check connection type for slow connections
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection && (connection.saveData || 
          ['slow-2g', '2g', '3g'].includes(connection.effectiveType))) {
        performanceFlags.isLowEndDevice = true;
      }
    }

    // Verify mobile detection one more time
    performanceFlags.isMobile = window.innerWidth < 768;

    // Add classes to body for CSS optimizations
    if (document.body) {
      if (performanceFlags.isMobile) {
        document.body.classList.add('mobile-device');
      }
      
      if (performanceFlags.isLowEndDevice) {
        document.body.classList.add('low-performance-device');
      }
      
      if (performanceFlags.prefersReducedMotion) {
        document.body.classList.add('reduced-motion');
      }
    }
  } catch (error) {
    console.error('Error in device detection:', error);
    // Fallback to safe values
    performanceFlags.isLowEndDevice = false;
  }
}

/**
 * Add event listener with options
 */
function addEventListenerWithOptions(event: string, handler: EventListener, options: AddEventListenerOptions) {
  document.addEventListener(event, handler, options);
  // Clean up on page unload to prevent memory leaks
  window.addEventListener('unload', () => {
    document.removeEventListener(event, handler);
  });
}

// Apply optimizations immediately
applyPerformanceOptimizations();

// Debounced resize handler to update flags on orientation change
let resizeTimeout: number | null = null;
window.addEventListener('resize', () => {
  if (resizeTimeout) window.clearTimeout(resizeTimeout);
  resizeTimeout = window.setTimeout(() => {
    // Update mobile flag
    performanceFlags.isMobile = window.innerWidth < 768;
    
    // Update classes
    document.body.classList.toggle('mobile-device', performanceFlags.isMobile);
  }, 250);
}, { passive: true });

export default performanceFlags; 