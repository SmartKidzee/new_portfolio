"use client";

import { cn } from "../../lib/utils";
import React, { useEffect, useState, useMemo } from "react";
import CountUp from "../../cpmponents/TextAnimations/CountUp/CountUp";
import { throttle } from "../../lib/throttledAnimation";
import performanceFlags from "../../lib/injectPerformanceOptimizations";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    icon: string;
    value: number;
    label: string;
    caption?: string;
    suffix?: string;
    separator?: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);
  const [cloned, setCloned] = useState(false);
  const [start, setStart] = useState(false);
  const [isMobile, setIsMobile] = useState(performanceFlags.isMobile);

  // Detect mobile device for optimizations
  useEffect(() => {
    const detectMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    detectMobile();
    window.addEventListener('resize', detectMobile);
    return () => window.removeEventListener('resize', detectMobile);
  }, []);

  // Create a duplicate set of items for smoother infinite scrolling
  const duplicatedItems = useMemo(() => {
    // Quintuple the items for truly seamless infinite scroll
    return [...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items, ...items];
  }, [items]);

  useEffect(() => {
    addAnimation();
    
    // Reset animation on window resize to prevent glitches
    const handleResize = () => {
      if (containerRef.current) {
        containerRef.current.style.animation = 'none';
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.style.animation = '';
            addAnimation();
          }
        }, 10);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      getDirection();
      getSpeed();
      setStart(true);
      setCloned(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards",
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse",
        );
      }
    }
  };
  
  const getSpeed = () => {
    if (containerRef.current) {
      // Mobile needs a different timing scale for smoother continuous scrolling
      const mobileMultiplier = isMobile ? 1.3 : 1;
      
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", `${40 * mobileMultiplier}s`);
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", `${80 * mobileMultiplier}s`);
      } else {
        containerRef.current.style.setProperty("--animation-duration", `${140 * mobileMultiplier}s`);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && !isMobile && "hover:[animation-play-state:paused]",
        )}
        style={{ 
          willChange: 'transform',
          animationIterationCount: 'infinite',
          animationTimingFunction: 'linear',
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
          ...(isMobile ? {
            transform: 'translate3d(0,0,0)',
            WebkitTransform: 'translate3d(0,0,0)',
            perspective: '1000px',
          } : {})
        }}
      >
        {duplicatedItems.map((stat, idx) => (
          <li
            className="relative w-[280px] sm:w-[320px] max-w-full shrink-0 rounded-2xl border border-b-0 border-[#38BDF8]/20 bg-gradient-to-br from-[#1E293B] to-[#1E293B]/70 p-6 shadow-lg hover:border-[#38BDF8]/50 transition-all duration-300 hover:shadow-[#A855F7]/40 hover:shadow-lg"
            key={`${idx}-${stat.label}`}
            style={{ transform: 'translateZ(0)' }}
          >
            <div className="text-center">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="flex items-center justify-center">
                <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#38BDF8] to-[#A855F7] bg-clip-text text-transparent">
                  <CountUp 
                    from={0}
                    to={stat.value} 
                    duration={2}
                    separator={stat.separator || ""}
                  />
                </span>
                {stat.suffix && (
                  <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#38BDF8] to-[#A855F7] bg-clip-text text-transparent ml-1">
                    {stat.suffix}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-semibold mt-2 text-[#E2E8F0]">{stat.label}</h3>
              {stat.caption && (
                <p className="text-sm text-[#94A3B8] mt-1">{stat.caption}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}; 