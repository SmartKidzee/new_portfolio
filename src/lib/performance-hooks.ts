import { useCallback, useEffect, useRef, useState } from 'react';

// Debounced state hook
export function useDebouncedState<T>(initialValue: T, delay: number = 200): [T, (value: T) => void, T] {
  const [value, setValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay]);

  return [debouncedValue, setValue, value];
}

// Throttled function hook
export function useThrottledCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 200
): (...args: Parameters<T>) => void {
  const lastCall = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastArgsRef = useRef<Parameters<T> | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();
      lastArgsRef.current = args;
      
      if (now - lastCall.current >= delay) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        
        lastCall.current = now;
        callback(...args);
      } else if (!timeoutRef.current) {
        timeoutRef.current = setTimeout(() => {
          if (lastArgsRef.current) {
            lastCall.current = Date.now();
            callback(...lastArgsRef.current);
          }
          timeoutRef.current = null;
        }, delay - (now - lastCall.current));
      }
    },
    [callback, delay]
  );
}

// Hook to detect if element is visible in viewport
export function useIntersectionObserver(
  options: IntersectionObserverInit = {}
): [React.RefObject<HTMLElement>, boolean] {
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [options]);

  return [ref, isIntersecting];
}

// Hook for requestAnimationFrame with cleanup
export function useRafCallback<T extends (...args: any[]) => any>(
  callback: T
): (...args: Parameters<T>) => void {
  const requestRef = useRef<number | null>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [callback]);

  return useCallback((...args: Parameters<T>) => {
    if (requestRef.current !== null) {
      cancelAnimationFrame(requestRef.current);
    }
    
    requestRef.current = requestAnimationFrame(() => {
      callbackRef.current(...args);
      requestRef.current = null;
    });
  }, []);
}

// Hook to avoid repeated calculations by memoizing results
export function useMemoizedCalculation<T, R>(
  fn: (arg: T) => R,
  arg: T
): R {
  const cache = useRef<Map<T, R>>(new Map());
  
  if (!cache.current.has(arg)) {
    const result = fn(arg);
    cache.current.set(arg, result);
    return result;
  }
  
  return cache.current.get(arg)!;
} 