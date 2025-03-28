/**
 * Component Preloading Examples
 * 
 * This file contains examples of how to use the advanced preloading system
 * in various components and scenarios.
 */

import React, { useEffect } from 'react';
import { createPreloadableComponent, lazyWithPreload, PreloadSuspense } from './lazyWithPreload';
import advancedPreloader from './advancedPreloader';

// Example 1: Basic preloadable component
// This creates a component that will be preloaded with medium priority
const { Component: BasicExample, preload: preloadBasic } = createPreloadableComponent(
  'BasicExample',
  () => import('../components/apple-cards-carousel-demo'),
  { priority: 'medium' }
);

// Example 2: Critical priority component with immediate preloading
// This component will be preloaded immediately with critical priority
const { Component: CriticalExample, preload: preloadCritical } = createPreloadableComponent(
  'CriticalExample',
  () => import('../cpmponents/Loading/LoadingScreen'),
  { 
    priority: 'critical',
    preloadImmediately: true
  }
);

// Example 3: Using the lazyWithPreload utility
// This creates a lazy component with preload and isPreloaded methods
const LazyExample = lazyWithPreload(
  'LazyExample',
  () => import('../components/google-gemini-effect-demo'),
  { priority: 'high' }
);

// Example 4: Component that preloads other components on user interaction
export const PreloadOnInteractionExample: React.FC = () => {
  // Preload component when user hovers
  const handleHover = () => {
    // Preload a component that will likely be needed soon
    advancedPreloader.preloadComponent('Timeline', {
      priority: 'high',
      immediate: true
    });
  };
  
  return (
    <div 
      className="hover-trigger" 
      onMouseEnter={handleHover}
    >
      <h2>Hover to preload the Timeline component</h2>
      <p>When you hover over this element, the Timeline component will be preloaded.</p>
    </div>
  );
};

// Example 5: Section-based preloading with IntersectionObserver
export const SectionWithPreloadExample: React.FC = () => {
  useEffect(() => {
    // Get the section element
    const sectionElement = document.getElementById('example-section');
    
    if (sectionElement) {
      // Set up IntersectionObserver to detect when section is visible
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Preload components needed for this section
              advancedPreloader.preloadComponent('InfiniteMovingCards', {
                priority: 'high',
                immediate: true
              });
              
              // Stop observing once preloaded
              observer.disconnect();
            }
          });
        },
        { rootMargin: '200px 0px' } // Start preloading when within 200px of viewport
      );
      
      // Start observing the section
      observer.observe(sectionElement);
      
      // Clean up
      return () => {
        observer.disconnect();
      };
    }
  }, []);
  
  return (
    <section id="example-section">
      <h2>Section with Preloading</h2>
      <p>When this section becomes visible, it will preload related components.</p>
    </section>
  );
};

// Example 6: Usage with navigation
export const NavigationExample: React.FC = () => {
  const handleNavClick = (sectionId: string) => {
    // Preload components for the section being navigated to
    switch (sectionId) {
      case 'projects':
        advancedPreloader.preloadComponent('InfiniteMovingCards', {
          priority: 'high',
          immediate: true
        });
        break;
      case 'experience':
        advancedPreloader.preloadComponent('Timeline', {
          priority: 'high',
          immediate: true
        });
        break;
      default:
        // No specific preloading
        break;
    }
    
    // Navigate to the section
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <nav>
      <button onClick={() => handleNavClick('projects')}>Projects</button>
      <button onClick={() => handleNavClick('experience')}>Experience</button>
    </nav>
  );
};

// Example 7: Using PreloadSuspense for grouping preloaded components
export const GroupedPreloadExample: React.FC = () => {
  return (
    <PreloadSuspense fallback={<div>Loading group...</div>}>
      <div className="component-group">
        <LazyExample />
        <BasicExample />
      </div>
    </PreloadSuspense>
  );
};

// Export examples for use in the application
export const PreloadingExamples = {
  BasicExample,
  CriticalExample,
  LazyExample,
  PreloadOnInteractionExample,
  SectionWithPreloadExample,
  NavigationExample,
  GroupedPreloadExample,
  
  // Export preload functions for direct use
  preloadFunctions: {
    preloadBasic,
    preloadCritical,
    preloadLazy: LazyExample.preload
  }
}; 