import React, { useState, useEffect, memo } from 'react';

interface ImgWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
  lowResSrc?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const ImgWithFallback: React.FC<ImgWithFallbackProps> = ({
  src,
  fallback = '',
  lowResSrc,
  alt = '',
  onLoad: propsOnLoad,
  onError: propsOnError,
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState<string>(lowResSrc || src || '');
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [retryCount, setRetryCount] = useState<number>(0);
  const maxRetries = 2;

  // When src changes, reset to use the new source
  useEffect(() => {
    if (lowResSrc) {
      // If we have a low-res version, start with that
      setImgSrc(lowResSrc);
      
      // Then preload the high-res version
      const highResImage = new Image();
      highResImage.src = src || '';
      
      // When high-res is loaded, switch to it
      highResImage.onload = () => {
        setImgSrc(src || '');
        setIsLoaded(true);
        if (propsOnLoad) propsOnLoad();
      };
      
      highResImage.onerror = () => {
        handleError();
      };
    } else {
      // No low-res version, just use the main src
      setImgSrc(src || '');
    }
  }, [src, lowResSrc]);

  const handleError = () => {
    if (retryCount < maxRetries) {
      // Retry loading the image
      setRetryCount(prev => prev + 1);
      // Add cache busting parameter to avoid browser cache
      const timestamp = new Date().getTime();
      setImgSrc(`${src}?retry=${timestamp}`);
    } else if (fallback) {
      // After max retries, use fallback image
      setImgSrc(fallback);
    }
    
    if (propsOnError) propsOnError();
  };

  const handleLoad = () => {
    setIsLoaded(true);
    if (propsOnLoad) propsOnLoad();
  };

  return (
    <img
      {...props}
      src={imgSrc}
      alt={alt}
      onError={handleError}
      onLoad={handleLoad}
      loading="lazy"
      decoding="async"
      style={{
        ...props.style,
        transition: 'opacity 0.3s ease-in-out',
        opacity: isLoaded ? 1 : 0.6,
      }}
    />
  );
};

export default memo(ImgWithFallback); 