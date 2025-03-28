/**
 * Utilities for throttling animations on mobile devices
 * to improve performance and prevent crashes
 */

import performanceFlags from './injectPerformanceOptimizations';

/**
 * Returns appropriate animation duration based on device capabilities
 * @param baseDuration Default animation duration in ms
 * @returns Adjusted duration based on device performance
 */
export function getThrottledDuration(baseDuration: number): number {
  if (performanceFlags.prefersReducedMotion) {
    // Honor user preference for reduced motion
    return 0; 
  }
  
  if (performanceFlags.isLowEndDevice) {
    // Significantly reduce animations on low-end devices
    return Math.max(baseDuration * 0.5, 300);
  }
  
  if (performanceFlags.isMobile) {
    // Moderately reduce animations on mobile
    return Math.max(baseDuration * 0.75, 500);
  }
  
  // Use full animation duration on capable devices
  return baseDuration;
}

/**
 * Returns reduced variant count for animations on mobile devices
 * @param baseCount Default number of items/variants
 * @returns Reduced count for low-end devices
 */
export function getThrottledCount(baseCount: number): number {
  if (performanceFlags.isLowEndDevice) {
    // Drastically reduce count for low-end devices
    return Math.max(Math.floor(baseCount * 0.3), 3);
  }
  
  if (performanceFlags.isMobile) {
    // Moderately reduce count for mobile
    return Math.max(Math.floor(baseCount * 0.6), 5);
  }
  
  return baseCount;
}

/**
 * Checks if animation should be disabled completely
 * @param animationType Type of animation (can be used to selectively disable certain types)
 * @returns Boolean indicating if animation should be disabled
 */
export function shouldDisableAnimation(animationType: 'background' | 'scroll' | 'transition' | 'hover' = 'transition'): boolean {
  // Always respect user preference for reduced motion
  if (performanceFlags.prefersReducedMotion) {
    return true;
  }
  
  // On very low-end devices, disable background and scroll animations
  if (performanceFlags.isLowEndDevice && (animationType === 'background' || animationType === 'scroll')) {
    return true;
  }
  
  return false;
}

/**
 * Returns debounced version of a function
 * @param func Function to debounce
 * @param wait Wait time in ms
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...funcArgs: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>): void => {
    if (timeout) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

/**
 * Returns throttled version of a function
 * @param func Function to throttle
 * @param limit Limit time in ms
 * @returns Throttled function
 */
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...funcArgs: Parameters<T>) => void {
  let inThrottle = false;
  
  return (...args: Parameters<T>): void => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
} 