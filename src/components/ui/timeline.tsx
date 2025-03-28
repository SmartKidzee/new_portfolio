"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

// Utility function for class name merging
const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(' ');
};

export type TimelineEntry = {
  title: string;
  content: React.ReactNode;
};

export const Timeline = ({
  data,
  className,
}: {
  data: TimelineEntry[];
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  
  // This helps with mobile scroll detection
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    
    // Force repaint on scroll to help with mobile animation
    const handleScroll = () => {
      if (ref.current) {
        ref.current.style.transform = 'translateZ(0)';
        if (!isScrolling) {
          setIsScrolling(true);
          // Reset the flag after animation completes
          setTimeout(() => setIsScrolling(false), 100);
        }
      }
    };
    
    // Touch events for better mobile support
    const handleTouchStart = () => {
      if (ref.current) {
        ref.current.style.willChange = 'transform';
      }
    };
    
    const handleTouchMove = () => {
      if (ref.current) {
        ref.current.style.willChange = 'transform';
        ref.current.classList.add('is-scrolling');
        if (!isScrolling) {
          setIsScrolling(true);
        }
      }
    };
    
    const handleTouchEnd = () => {
      if (ref.current) {
        setTimeout(() => {
          ref.current?.classList.remove('is-scrolling');
          ref.current?.style.removeProperty('will-change');
          setIsScrolling(false);
        }, 500);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isScrolling]);

  return (
    <div 
      className={cn("relative max-w-screen-lg", className, isScrolling ? "is-scrolling" : "")} 
      ref={ref}
    >
      {/* Central timeline line with reduced opacity and behind content */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
        style={{ zIndex: 1 }}
      >
        <motion.div 
          className="absolute h-full w-0.5 bg-gradient-to-b from-[#38BDF8] via-[#A855F7] to-[#38BDF8]"
          style={{
            scaleY: scrollYProgress,
            transformOrigin: "top",
            opacity: 1
          }}
        />
      </div>
      
      {data.map((entry, index) => (
        <TimelineItem 
          key={index} 
          entry={entry} 
          index={index} 
          total={data.length} 
          progress={scrollYProgress}
          isMounted={isMounted}
          isScrolling={isScrolling}
        />
      ))}
    </div>
  );
};

// New TimelineItem component to handle individual entry animations
const TimelineItem = ({ 
  entry, 
  index, 
  total, 
  progress,
  isMounted,
  isScrolling
}: { 
  entry: TimelineEntry; 
  index: number; 
  total: number; 
  progress: any;
  isMounted: boolean;
  isScrolling: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-20% 0px -20% 0px" });
  
  // Track scroll direction
  const [scrollDir, setScrollDir] = useState<'up' | 'down' | null>(null);
  const prevScrollY = useRef(0);
  // Track if this item has ever been animated
  const [hasAppeared, setHasAppeared] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > prevScrollY.current) {
        setScrollDir('down');
      } else if (currentScrollY < prevScrollY.current) {
        setScrollDir('up');
      }
      prevScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Set hasAppeared to true when the item is in view and we're scrolling down
  useEffect(() => {
    if (isInView && scrollDir === 'down' && !hasAppeared) {
      setHasAppeared(true);
    }
  }, [isInView, scrollDir, hasAppeared]);
  
  // Calculate thresholds for this particular item
  // Transform for the line animation
  const itemProgress = useTransform(
    progress, 
    [
      Math.max(0, (index - 0.5) / total),  // Start slightly before this item's position
      Math.max(0, index / total),          // Item's exact position
      Math.min(1, (index + 1) / total)     // End at next item
    ],
    [0, 0.5, 1]  // Map to 0-1 range for smooth animation
  );
  
  // This controls the initial animation - only trigger when in view AND scrolling down
  // But once appeared, stays visible
  const shouldAnimate = hasAppeared || (isInView && scrollDir === 'down');
  
  return (
    <motion.div 
      ref={ref}
      className={cn(
        "relative z-10 flex items-start my-16 md:my-24",
        isScrolling ? "is-scrolling" : ""
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <TimePoint 
        progress={progress} 
        index={index} 
        total={total} 
        isMounted={isMounted} 
      />
      <TimeContent 
        title={entry.title} 
        content={entry.content} 
        lineProgress={itemProgress} 
        isInView={shouldAnimate}
      />
    </motion.div>
  );
};

export const TimePoint = ({
  progress,
  index,
  total,
  isMounted
}: {
  progress: any;
  index: number;
  total: number;
  isMounted: boolean;
}) => {
  const imageScale = useTransform(
    progress,
    [
      Math.max(0, (index - 0.5) / total),
      Math.min(1, (index + 1) / total),
    ],
    [0.8, 1]
  );

  const imageOpacity = useTransform(
    progress,
    [
      Math.max(0, (index - 0.5) / total),
      Math.min(1, (index + 1) / total),
    ],
    [0.6, 1]
  );

  return (
    <motion.div
      style={{
        opacity: isMounted ? imageOpacity : 1,
        scale: isMounted ? imageScale : 1,
      }}
      className="timeline-point relative z-30 h-12 w-12 flex items-center justify-center min-w-[48px]"
    >
      <div className="h-3 w-3 rounded-full bg-white" />
    </motion.div>
  );
};

export const TimeContent = ({ 
  title, 
  content,
  lineProgress,
  isInView
}: TimelineEntry & { lineProgress: any, isInView: boolean }) => {
  return (
    <div className="timeline-content ml-4 pb-8 pt-2 w-full z-20 relative">
      {/* Line animation based on scroll position */}
      <motion.div 
        className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-[#38BDF8] to-[#A855F7] z-25"
        style={{
          scaleY: lineProgress,
          opacity: 0.9,
          transformOrigin: "top"
        }}
      />
      
      {/* Increased z-index and added backdrop for better text visibility */}
      <div className="relative z-30">
        <h3 className="text-md md:text-xl font-semibold text-white bg-gradient-to-r from-[#38BDF8] to-[#A855F7] bg-clip-text text-transparent mb-4 relative">
          {title}
        </h3>
        <div className="mt-3 relative">{content}</div>
      </div>
    </div>
  );
}; 