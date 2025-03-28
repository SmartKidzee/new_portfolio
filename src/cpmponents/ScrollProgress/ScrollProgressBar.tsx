import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollProgressBarProps {
  height?: number;
  color?: string;
  isActive?: boolean;
  zIndex?: number;
  shadow?: boolean;
  mobileBreakpoint?: number;
}

const ScrollProgressBar: React.FC<ScrollProgressBarProps> = ({
  height = 4,
  color = 'linear-gradient(90deg, #7c3aed, #ec4899)',
  isActive = true,
  zIndex = 9999, // Ensure it's higher than navbar
  shadow = true,
  mobileBreakpoint = 768
}) => {
  const { scrollYProgress } = useScroll();
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Transform scrollYProgress to ensure visibility at the beginning
  // Makes the bar more visible when just starting to scroll
  const scaleX = useTransform(
    scrollYProgress,
    [0, 0.02, 1],  // More responsive at the beginning of the scroll
    [0, 0.05, 1]   // Smaller initial jump to avoid visual jank
  );

  useEffect(() => {
    // Simplified approach to prevent crashes
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    const checkScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Initial checks
    checkMobile();
    checkScroll();

    // Add event listeners with low frequency
    window.addEventListener('resize', checkMobile);
    window.addEventListener('scroll', checkScroll, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', checkScroll);
    };
  }, [mobileBreakpoint]);

  // Only render when active
  if (!isActive) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 origin-left"
      style={{
        height: `${height}px`,
        background: color,
        scaleX,
        zIndex,
        boxShadow: shadow && isScrolled ? '0 0 10px rgba(124, 58, 237, 0.8)' : 'none',
        // Apply a slight glow effect
        filter: 'drop-shadow(0 0 2px rgba(236, 72, 153, 0.5))',
        // Add a slightly darker color and thicker bar on mobile for better visibility
        ...(isMobile && {
          height: `${height * 1.5}px`, // Make the bar 50% thicker on mobile
          background: 'linear-gradient(90deg, #a855f7, #ec4899)', // Slightly more vibrant on mobile
          opacity: isScrolled ? 1 : 0.8, // More visible when scrolled
        }),
        transition: 'opacity 0.3s, height 0.3s'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isScrolled ? 1 : 0.8 }}
      transition={{ duration: 0.3 }}
    />
  );
};

export default ScrollProgressBar; 