/**
 * Next.js Image Component Polyfill
 * 
 * This module adds support for using Next.js Image component without the Next.js framework.
 * It provides compatibility with the image optimization API and responsive image loading.
 */

// Create global process object if it doesn't exist
if (typeof window !== 'undefined' && typeof window.process === 'undefined') {
  window.process = {
    env: {
      NODE_ENV: import.meta.env.MODE || 'development',
      __NEXT_IMAGE_OPTS: {
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        domains: [
          'images.unsplash.com', 
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

// Add Next.js image loader functions to window
if (typeof window !== 'undefined') {
  window.__NEXT_IMAGE_IMPORTED = true;
  
  // Default image loader
  window.__NEXT_IMAGE_DEFAULT_LOADER = ({ src, width, quality }) => {
    if (src.startsWith('http') || src.startsWith('//')) {
      // External image, return as is
      return src;
    }

    // Process local images (add width and quality if needed)
    if (src.startsWith('/')) {
      // For local images, we could add optimization parameters here if needed
      return `${src}${src.includes('?') ? '&' : '?'}w=${width}&q=${quality || 75}`;
    }

    return src;
  };
}

// Expose image optimization functions
export const getImageProps = (
  src: string,
  { width, quality = 75, priority = false }: { width: number; quality?: number; priority?: boolean }
) => {
  const imgSrc = typeof window !== 'undefined' && window.__NEXT_IMAGE_DEFAULT_LOADER 
    ? window.__NEXT_IMAGE_DEFAULT_LOADER({ src, width, quality })
    : src;

  return {
    src: imgSrc,
    loading: priority ? 'eager' : 'lazy',
    decoding: priority ? 'sync' : 'async',
    fetchPriority: priority ? 'high' : 'auto' as 'high' | 'auto',
  };
};

// Declare global types
declare global {
  interface Window {
    process: any;
    __NEXT_IMAGE_IMPORTED: boolean;
    __NEXT_IMAGE_DEFAULT_LOADER: (params: { src: string; width: number; quality?: number }) => string;
  }
}

export default {}; 