import { useEffect } from 'react';

/**
 * Custom hook to handle scroll reset and CSS reapplication
 * This hook ensures that:
 * 1. The page is scrolled to the top on mount
 * 2. Global CSS is correctly reapplied when navigating back
 */
export const useScrollReset = () => {
  useEffect(() => {
    // Reset scroll position
    window.scrollTo(0, 0);

    // Ensure CSS is properly applied
    const reapplyCss = () => {
      // Force CSS reapplication by removing and adding class names
      document.body.classList.forEach(className => {
        document.body.classList.remove(className);
        // Use setTimeout to ensure the browser repaints
        setTimeout(() => {
          document.body.classList.add(className);
        }, 0);
      });

      // Ensure critical stylesheets are loaded
      const cssFiles = ['index.css', 'styles/blog-animations.css'];
      
      cssFiles.forEach(cssFile => {
        const cssPath = cssFile.startsWith('/') ? cssFile : `/${cssFile}`;
        const existingLink = document.querySelector(`link[href="${cssPath}"][rel="stylesheet"]`);
        
        if (!existingLink) {
          // Create and append the stylesheet link
          const newLink = document.createElement('link');
          newLink.rel = 'stylesheet';
          newLink.href = cssPath;
          newLink.setAttribute('data-permanent', 'true');
          document.head.appendChild(newLink);
        }
      });
      
      // Force repaint by toggling display
      document.body.style.display = 'none';
      // This triggers a reflow/repaint
      const _ = document.body.offsetHeight;
      document.body.style.display = '';
    };
    
    // Apply CSS immediately on mount
    reapplyCss();
    
    // Also apply on visibility change (helps with back navigation)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        reapplyCss();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Clean up event listener
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
}; 