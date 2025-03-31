"use client";

import React, { useEffect, useState, memo, useMemo } from "react";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import performanceFlags from "../lib/performanceUtils";

// Memoize the component to prevent unnecessary re-renders
const InfiniteMovingCardsDemo = memo(() => {
  // Detect if mobile for performance optimizations
  const [isMobile, setIsMobile] = useState(performanceFlags.isMobile);
  const [isLowEndDevice, setIsLowEndDevice] = useState(performanceFlags.isLowEndDevice);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Use fewer items on mobile for better performance
  const items = useMemo(() => {
    // Use all items on desktop, fewer on mobile
    return isMobile 
      ? statsData.slice(0, 6) // Only first 6 items on mobile
      : statsData;
  }, [isMobile]);

  // Return the component with optimized rendering
  return (
    <div className="h-auto py-10 rounded-md flex flex-col antialiased items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={items}
        direction="left"
        speed={isMobile ? "slow" : "slow"} // Make it slow on both mobile and desktop
        pauseOnHover={false} // Prevent pausing to ensure continuous scrolling
      />
    </div>
  );
});

// Name the component for better debugging
InfiniteMovingCardsDemo.displayName = 'InfiniteMovingCardsDemo';

const statsData = [
  { icon: "🛠️", value: 4, label: "GitHub Repositories Created" },
  { icon: "💻", value: 2, label: "Personal Projects", caption: "Custom Programming Language & Portfolio Website" },
  { icon: "📜", value: 4, label: "Certifications Earned", suffix: "+" },
  { icon: "⌨️", value: 5, label: "Programming Languages Learned", suffix: "+" },
  { icon: "🌐", value: 40, label: "Website Daily Visitors", suffix: "+" },
  { icon: "👥", value: 350, label: "LinkedIn Connections", suffix: "+" },
  { icon: "📊", value: 20, label: "YouTube Views", suffix: "K+" },
  { icon: "📝", value: 5000, label: "Lines of Code Written for This Website", suffix: "+" },
];

export default InfiniteMovingCardsDemo; 