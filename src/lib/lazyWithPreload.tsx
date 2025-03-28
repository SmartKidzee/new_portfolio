/**
 * LazyWithPreload Utility
 * 
 * This utility makes it easy to use lazy-loaded components with intelligent preloading.
 * It provides a suspense boundary and triggers preloading of components.
 */

import React, { Suspense, ComponentType, ComponentProps, useState, useEffect } from 'react';
import advancedPreloader from './advancedPreloader';

interface PreloadComponentOptions {
  priority?: 'critical' | 'high' | 'medium' | 'low';
  fallback?: React.ReactNode;
  preloadImmediately?: boolean;
  suspenseFallback?: React.ReactNode;
}

/**
 * Creates a preloadable lazy component
 */
export function createPreloadableComponent<T extends ComponentType<any>>(
  componentId: string,
  importFn: () => Promise<{ default: T }>,
  options: PreloadComponentOptions = {}
): {
  Component: React.ComponentType<ComponentProps<T>>;
  preload: () => Promise<any>;
  isPreloaded: () => boolean;
} {
  // Default options
  const { 
    priority = 'medium',
    fallback = null,
    preloadImmediately = false,
    suspenseFallback = <DefaultSuspenseFallback />
  } = options;

  // Create the lazy component with preloading
  const LazyComponent = advancedPreloader.createLazyComponent(
    componentId, 
    importFn,
    { 
      priority: priority as any,
      immediate: preloadImmediately,
      useIdleCallback: priority !== 'critical'
    }
  );

  // If preloadImmediately is true, trigger preload right away
  if (preloadImmediately) {
    advancedPreloader.preloadComponent(componentId, {
      priority: priority as any,
      immediate: true
    });
  }

  // Create wrapper component with suspense
  const Component: React.FC<ComponentProps<T>> = (props) => {
    const [isLoading, setIsLoading] = useState(!advancedPreloader.isComponentPreloaded(componentId));
    
    useEffect(() => {
      // Mark as not loading once component is ready
      if (advancedPreloader.isComponentPreloaded(componentId)) {
        setIsLoading(false);
      }
    }, []);
    
    if (isLoading && fallback) {
      return <>{fallback}</>;
    }
    
    return (
      <Suspense fallback={suspenseFallback}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };

  // Return component and utilities
  return {
    Component,
    preload: () => advancedPreloader.preloadComponent(componentId, {
      priority: priority as any,
      immediate: true
    }),
    isPreloaded: () => advancedPreloader.isComponentPreloaded(componentId)
  };
}

/**
 * Default suspense fallback component
 */
const DefaultSuspenseFallback: React.FC = () => (
  <div className="flex items-center justify-center p-4 min-h-[100px]">
    <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
  </div>
);

/**
 * Creates a React.lazy() component with intelligent preloading
 */
export function lazyWithPreload<T extends ComponentType<any>>(
  componentId: string,
  importFn: () => Promise<{ default: T }>,
  options: PreloadComponentOptions = {}
): React.LazyExoticComponent<T> & {
  preload: () => Promise<any>;
  isPreloaded: () => boolean;
} {
  // Create the lazy component
  const LazyComponent = React.lazy(importFn);
  
  // Add preload and isPreloaded methods
  const EnhancedComponent = LazyComponent as React.LazyExoticComponent<T> & {
    preload: () => Promise<any>;
    isPreloaded: () => boolean;
  };
  
  // Implement the preload method
  EnhancedComponent.preload = () => {
    return advancedPreloader.preloadComponent(componentId, {
      priority: options.priority as any || 'medium',
      immediate: true
    });
  };
  
  // Implement the isPreloaded method
  EnhancedComponent.isPreloaded = () => {
    return advancedPreloader.isComponentPreloaded(componentId);
  };
  
  // If preloadImmediately is true, trigger preload right away
  if (options.preloadImmediately) {
    EnhancedComponent.preload();
  }
  
  return EnhancedComponent;
}

/**
 * Suspense wrapper with preloading
 */
export function PreloadSuspense({ 
  children,
  fallback = <DefaultSuspenseFallback />
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}): JSX.Element {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  );
}

export default {
  createPreloadableComponent,
  lazyWithPreload,
  PreloadSuspense
}; 