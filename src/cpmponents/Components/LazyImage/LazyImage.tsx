import React, { useState, useEffect, memo } from 'react';
import { useIntersectionObserver } from '../../../lib/performance-hooks';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  placeholderColor?: string;
  loadingEffect?: 'fade' | 'blur' | 'none';
  threshold?: number;
  rootMargin?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  placeholderColor = '#121212',
  loadingEffect = 'fade',
  threshold = 0.1,
  rootMargin = '100px',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [ref, isInView] = useIntersectionObserver({
    threshold,
    rootMargin,
  });

  // State to track if we should attempt to load the image
  const [shouldLoad, setShouldLoad] = useState(false);

  // Only attempt to load the image when it's in view
  useEffect(() => {
    if (isInView && !shouldLoad) {
      setShouldLoad(true);
    }
  }, [isInView, shouldLoad]);

  // Handle image load and error
  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  // Placeholder style
  const placeholderStyle: React.CSSProperties = {
    backgroundColor: placeholderColor,
    width: width || '100%',
    height: height || '100%',
    display: 'block',
  };

  // Image style based on loading effect
  const imageStyle: React.CSSProperties = {
    width: width || '100%',
    height: height || '100%',
    opacity: isLoaded ? 1 : 0,
    transition: loadingEffect === 'fade' ? 'opacity 0.3s ease-in-out' : 'none',
    filter: loadingEffect === 'blur' && !isLoaded ? 'blur(10px)' : 'none',
    objectFit: 'cover',
  };

  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>} 
      style={{ 
        position: 'relative',
        width: width || '100%',
        height: height || 'auto',
        overflow: 'hidden'
      }}
      className={className}
    >
      {/* Placeholder */}
      {!isLoaded && (
        <div style={placeholderStyle} />
      )}

      {/* Image */}
      {shouldLoad && !hasError && (
        <img
          src={src}
          alt={alt}
          style={imageStyle}
          onLoad={handleLoad}
          onError={handleError}
          width={width}
          height={height}
          loading="lazy"
          decoding="async"
        />
      )}

      {/* Error fallback */}
      {hasError && (
        <div 
          style={{
            ...placeholderStyle,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontSize: '14px',
          }}
        >
          Failed to load image
        </div>
      )}
    </div>
  );
};

export default memo(LazyImage); 