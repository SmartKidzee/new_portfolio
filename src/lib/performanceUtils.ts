// Basic performance flags and utilities

// Simple performance flags
const performanceFlags = {
  isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false,
  isLowEndDevice: false,
  prefersReducedMotion: typeof window !== 'undefined' 
    ? window.matchMedia?.('(prefers-reduced-motion: reduce)').matches 
    : false
};

// Initialize on client side only
if (typeof window !== 'undefined') {
  // Update mobile detection on resize
  window.addEventListener('resize', () => {
    performanceFlags.isMobile = window.innerWidth < 768;
  }, { passive: true });
  
  // Try to detect low-end devices
  try {
    // Check for device memory API
    if ('deviceMemory' in navigator) {
      performanceFlags.isLowEndDevice = (navigator as any).deviceMemory < 4;
    }
    
    // Check for connection type
    if ('connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection && (connection.saveData || 
        ['slow-2g', '2g', '3g'].includes(connection.effectiveType))) {
        performanceFlags.isLowEndDevice = true;
      }
    }
  } catch (e) {
    console.error('Error detecting device capabilities:', e);
  }
}

export default performanceFlags; 