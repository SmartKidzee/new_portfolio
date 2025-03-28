import React, { useState, useEffect, useRef } from 'react';
import { getImageProps } from '../../lib/next-image-polyfill';

// A simple image component to replace Next.js Image
interface ImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  layout?: 'fill' | 'fixed' | 'responsive' | 'intrinsic';
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  quality?: number;
  priority?: boolean;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  sizes?: string;
  fill?: boolean;
  blurDataURL?: string;
  onLoad?: () => void;
  loading?: 'lazy' | 'eager';
  decoding?: 'auto' | 'sync' | 'async';
  fetchPriority?: 'auto' | 'high' | 'low';
  [key: string]: any; // For any other props
}

// Type for the image attributes returned by getImageProps
interface OptimizedImageAttributes {
  src: string;
  loading: 'lazy' | 'eager';
  decoding: 'sync' | 'async';
  fetchPriority: 'high' | 'auto';
}

export type NextImageProps = ImageProps;

/**
 * Optimized Image Component
 * 
 * A component that mimics Next.js Image functionality with performance optimizations:
 * - Automatic responsive sizing
 * - Lazy loading with IntersectionObserver
 * - Blur-up placeholder effect
 * - WebP format support
 */
const OptimizedImage: React.FC<ImageProps> = ({
  src,
  alt = "Image",
  width,
  height,
  fill = false,
  className = "",
  style = {},
  onLoad,
  loading,
  decoding,
  fetchPriority,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(props.priority || false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Initialize IntersectionObserver for lazy loading
  useEffect(() => {
    if (props.priority || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsInView(true);
              if (imgRef.current && observerRef.current) {
                observerRef.current.unobserve(imgRef.current);
              }
            }
          });
        },
        {
          rootMargin: '200px', // Start loading when image is 200px away from viewport
          threshold: 0.01,
        }
      );
    }

    if (imgRef.current && observerRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [props.priority]);

  // Handle image loading
  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  // Get optimized image props
  const imgProps = getImageProps(src, { 
    width: typeof width === 'number' ? width : 1000, 
    quality: props.quality || 75, 
    priority: props.priority || false 
  }) as OptimizedImageAttributes;

  const containerStyle: React.CSSProperties = {
    position: fill ? 'absolute' : 'relative',
    width: fill ? '100%' : width,
    height: fill ? '100%' : height,
    overflow: 'hidden',
    ...style,
  };

  const imgStyle: React.CSSProperties = {
    objectFit: (props.objectFit || 'cover') as React.CSSProperties['objectFit'],
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity 0.5s ease',
    width: fill ? '100%' : '100%',
    height: fill ? '100%' : 'auto',
  };

  const placeholderStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: !isLoaded && !props.blurDataURL ? '#f0f0f0' : undefined,
    backgroundImage: props.blurDataURL ? `url(${props.blurDataURL})` : undefined,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(20px)',
    transform: 'scale(1.2)',
    opacity: isLoaded ? 0 : 1,
    transition: 'opacity 0.5s ease',
  };

  // Use a normal img tag with enhanced loading effect
  if (fill) {
    return (
      <div className={`relative ${className}`} style={containerStyle}>
        {(isInView || props.priority) && (
          <img
            ref={imgRef}
            src={imgProps.src}
            alt={alt}
            style={imgStyle}
            onLoad={handleLoad}
            loading={loading || imgProps.loading}
            decoding={decoding || imgProps.decoding}
            fetchPriority={fetchPriority || imgProps.fetchPriority}
            {...props}
          />
        )}
        {!isLoaded && (
          <div style={placeholderStyle} />
        )}
      </div>
    );
  }

  // Standard image
  return (
    <div style={{ position: 'relative', width: '100%', display: 'inline-block' }}>
      {!isLoaded && props.blurDataURL && (
        <div style={placeholderStyle} />
      )}
      {(isInView || props.priority) && (
        <img
          ref={imgRef}
          src={imgProps.src}
          alt={alt}
          width={width}
          height={height}
          className={className}
          style={{
            ...style,
            maxWidth: '100%',
            height: 'auto',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
          onLoad={handleLoad}
          loading={loading || imgProps.loading}
          decoding={decoding || imgProps.decoding}
          fetchPriority={fetchPriority || imgProps.fetchPriority}
          {...props}
        />
      )}
    </div>
  );
};

// Add Image component to global scope for compatibility
if (typeof window !== 'undefined') {
  // @ts-ignore
  window.NextImage = OptimizedImage;
}

export default OptimizedImage; 