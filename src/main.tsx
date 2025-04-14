// Apply performance optimizations first
import './lib/performanceOptimizer';

// Preload essential components
import './app-preload';

import React, { Suspense, useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async';
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"
import './index.css'
// Blog animations removed

// Import blog image grid styles
import './styles/blogImages.css'

// Import mobile fixes for card builder
import './styles/mobile-card-fix.css'

// Import Next.js polyfill
import './lib/next-image-polyfill'

// Import performance optimizations
import performanceOptimizer from './lib/performanceOptimizer'
import performanceFlags from './lib/injectPerformanceOptimizations'

// Import our new intelligent preloading system
import { lazyWithPreload, PreloadSuspense } from './lib/lazyWithPreload'
import advancedPreloader from './lib/advancedPreloader'

// Blog-related imports removed

// Initialize performance optimizer and inject resource hints
performanceOptimizer.injectResourceHints();
performanceOptimizer.applyAdaptiveLoading();

// Mobile detection
const isMobile = window.innerWidth < 768;

// Eager load the loading screen
import LoadingScreen from './cpmponents/Loading/LoadingScreen'
import ScrollProgressBar from './cpmponents/ScrollProgress/ScrollProgressBar'

// Enhanced lazy loading with intelligent preloading
const App = lazyWithPreload('App', () => import('./App.tsx'), { 
  priority: 'critical',
  preloadImmediately: true
});

const NotFound = lazyWithPreload('NotFound', () => import('./NotFound.tsx'), { 
  priority: 'high',
  preloadImmediately: false
});

// Blog-related lazy loads
const BlogListPage = lazyWithPreload('BlogListPage', () => import('./pages/blogs/BlogListPage.tsx'), {
  priority: 'medium',
  preloadImmediately: false
});

const BlogPage = lazyWithPreload('BlogPage', () => import('./pages/blogs/BlogPage.tsx'), {
  priority: 'medium',
  preloadImmediately: false
});

// Card Builder page - replace with redirect
const CardBuilderPage = lazyWithPreload('CardBuilderPage', () => import('./pages/card-builder/CardBuilderRedirect.tsx'), {
  priority: 'medium',
  preloadImmediately: false
});

// New Tech Card Builder page
const TechCardBuilderPage = lazyWithPreload('TechCardBuilderPage', () => import('./pages/card-builder/TechCardBuilder.tsx'), {
  priority: 'medium',
  preloadImmediately: false
});

// Blog-related lazy loads removed

import CardPage from './pages/card/[id]';

// Import Terms page
const TermsPage = lazyWithPreload('TermsPage', () => import('./pages/Terms.tsx'), {
  priority: 'low',
  preloadImmediately: false
});

// Import Privacy page
const PrivacyPage = lazyWithPreload('PrivacyPage', () => import('./pages/Privacy.tsx'), {
  priority: 'low',
  preloadImmediately: false
});

// Route-based app with loading screen
const RouteBasedApp = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isBlogPage = location.pathname.startsWith('/blogs');
  const isCardBuilderPage = location.pathname === '/card-builder';
  const isTechCardBuilderPage = location.pathname === '/tech-card-builder';
  const is404Page = !isHomePage && !isBlogPage && !isCardBuilderPage && !isTechCardBuilderPage;
  
  // On mobile, skip loading screen if it's a refresh (non-first visit)
  const hasVisitedBefore = localStorage.getItem('hasVisitedBefore') === 'true';
  const shouldSkipLoading = isMobile && hasVisitedBefore;
  
  const [isLoading, setIsLoading] = useState(!is404Page && !shouldSkipLoading && isHomePage);
  const [contentVisible, setContentVisible] = useState(is404Page || shouldSkipLoading);
  const [isLowEndDevice, setIsLowEndDevice] = useState(false);
  
  // Preload components based on route
  useEffect(() => {
    if (is404Page) {
      NotFound.preload();
    } else if (isBlogPage) {
      if (location.pathname === '/blogs') {
        BlogListPage.preload();
      } else {
        BlogPage.preload();
      }
    } else if (isCardBuilderPage) {
      CardBuilderPage.preload();
    } else if (isTechCardBuilderPage) {
      TechCardBuilderPage.preload();
    }
  }, [is404Page, isBlogPage, isCardBuilderPage, isTechCardBuilderPage, location.pathname]);
  
  // Mark that the user has visited before
  useEffect(() => {
    localStorage.setItem('hasVisitedBefore', 'true');
  }, []);
  
  // Update low end device flag safely
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLowEndDevice(performanceFlags.isLowEndDevice);
    }, 100);
    return () => clearTimeout(timeout);
  }, []);
  
  useEffect(() => {
    // Skip loading for 404 pages
    if (is404Page) {
      return;
    }
    
    // Simple approach to showing content after loading
    if (!isLoading) {
      setTimeout(() => {
        setContentVisible(true);
      }, 100);
    }
  }, [isLoading, is404Page]);
  
  // Monitor preloading for metrics
  useEffect(() => {
    // Listen for critical components loaded event
    const handleCriticalLoaded = () => {
      console.log('[Main] Critical components loaded, app ready for interaction');
    };
    
    document.addEventListener('criticalComponentsLoaded', handleCriticalLoaded);
    
    return () => {
      document.removeEventListener('criticalComponentsLoaded', handleCriticalLoaded);
    };
  }, []);
  
  // Simple loading fallback
  const LoadingFallback = () => (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
  
  return (
    <>
      {/* Initial loading screen - only show on main page, not for 404, and not on mobile refresh */}
      {!is404Page && !shouldSkipLoading && (
        <LoadingScreen 
          maxDuration={3000}
          onLoadingComplete={() => setIsLoading(false)} 
        />
      )}
      
      {/* Scroll progress bar (always present, internally handles visibility) */}
      <ScrollProgressBar 
        height={4}
        shadow={!isLowEndDevice}
        zIndex={9999}
      />
      
      {/* Main app content - 404 page is immediately visible, homepage waits for loading */}
      <div style={{ 
        opacity: contentVisible ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
        visibility: contentVisible ? 'visible' : 'hidden',
        display: 'contents'
      }}>
        <PreloadSuspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/blogs" element={<BlogListPage />} />
            <Route path="/blogs/:blogId" element={<BlogPage />} />
            <Route path="/card-builder" element={<CardBuilderPage />} />
            <Route path="/tech-card-builder" element={<TechCardBuilderPage />} />
            <Route path="/card/:id" element={<CardPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PreloadSuspense>
      </div>
    </>
  )
}

// Main App that provides router context
const MainApp = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <RouteBasedApp />
        <SpeedInsights />
        <Analytics />
      </BrowserRouter>
    </HelmetProvider>
  );
};

// Create root with error handling
try {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <MainApp />
      </React.StrictMode>
    );
  }
} catch (error) {
  console.error('Failed to render application:', error);
  // Attempt recovery
  document.body.innerHTML = '<div style="text-align:center;padding:2rem;color:white;">Loading failed. Please refresh the page.</div>';
}
