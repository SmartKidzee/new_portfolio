/*
	Apple-Style Glass Dock
*/

"use client";

import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence,
} from "framer-motion";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";

export type DockItemData = {
  icon: React.ReactNode;
  label: React.ReactNode;
  onClick: () => void;
  className?: string;
};

export type DockProps = {
  items: DockItemData[];
  className?: string;
  distance?: number;
  panelHeight?: number;
  baseItemSize?: number;
  dockHeight?: number;
  spring?: SpringOptions;
  activeIndex?: number | null;
  setActiveIndex?: React.Dispatch<React.SetStateAction<number | null>>;
};

type DockItemProps = {
  icon: React.ReactNode;
  label: React.ReactNode;
  onClick: () => void;
  className?: string;
  panelHeight?: number;
  baseItemSize?: number;
  index?: number;
  activeIndex: number | null;
  setActiveIndex: (index: number | null) => void;
  isDockScrolling: boolean;
};

function DockItem({
  icon,
  label,
  onClick,
  className = "",
  panelHeight = 76,
  baseItemSize = 50,
  index = 0,
  activeIndex,
  setActiveIndex,
  isDockScrolling,
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isTapped, setIsTapped] = useState(false);
  const isHovered = useMotionValue(0);
  const isActive = activeIndex === index;
  
  // Track touch position to detect swipes
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isLocalScrolling, setIsLocalScrolling] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    // Store the initial touch position
    setTouchStartX(e.touches[0].clientX);
    setTouchStartY(e.touches[0].clientY);
    setIsLocalScrolling(false);
    isHovered.set(1);
    setIsTapped(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartX || !touchStartY) return;
    
    const xDiff = Math.abs(e.touches[0].clientX - touchStartX);
    const yDiff = Math.abs(e.touches[0].clientY - touchStartY);
    
    // If horizontal movement is greater than vertical and exceeds threshold, 
    // consider it a scroll rather than a tap
    if (xDiff > yDiff && xDiff > 10) {
      setIsLocalScrolling(true);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.stopPropagation();
    
    // Only execute click if it's not scrolling (both locally and at dock level)
    if (!isLocalScrolling && !isDockScrolling) {
      // Execute click
      setTimeout(() => {
        if (onClick) {
          onClick();
        }
        setActiveIndex(index);
      }, 50);
      
      // Keep the label visible for a while after tapping
      setTimeout(() => {
        setIsTapped(false);
        isHovered.set(0);
      }, 2000);
    } else {
      // If was scrolling, hide label more quickly
      setTimeout(() => {
        setIsTapped(false);
        isHovered.set(0);
      }, 300);
    }
    
    // Reset touch tracking
    setTouchStartX(0);
    setTouchStartY(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`dock-panel-item relative ${className} ${isActive ? 'active' : ''}`}
      style={{
        width: baseItemSize,
        height: panelHeight,
      }}
      whileHover={{ 
        scale: 1.1, 
        y: -3,
        transition: { type: "spring", stiffness: 300, damping: 15 } 
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => !isTapped && isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => !isTapped && isHovered.set(0)}
      onClick={(e) => {
        // Prevent click when scrolling
        if (isLocalScrolling) {
          e.stopPropagation();
          return;
        }
        onClick();
        setActiveIndex(index);
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="button"
      aria-label={typeof label === "string" ? label : "menu item"}
      tabIndex={0}
    >
      <div className="flex h-full flex-col items-center justify-center">
        <div 
          className={`dock-icon-container relative flex items-center justify-center ${isActive ? 'active' : ''}`}
        >
          <div className="relative flex h-full w-full items-center justify-center">
            {icon}
          </div>
          
          {/* Simple active indicator */}
          {isActive && (
            <div className="active-indicator"></div>
          )}
        </div>
      </div>
      
      {label && (
        <DockLabel isHovered={isHovered} isTapped={isTapped && !isLocalScrolling} isActive={isActive}>
          {label}
        </DockLabel>
      )}
    </motion.div>
  );
}

type DockLabelProps = {
  className?: string;
  children: React.ReactNode;
  isHovered?: MotionValue<number>;
  isTapped?: boolean;
  isActive?: boolean;
};

function DockLabel({ children, className = "", isHovered, isTapped, isActive }: DockLabelProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isHovered) {
      const unsubscribe = isHovered.on("change", (latest) => {
        setIsVisible(latest === 1 || Boolean(isTapped) || Boolean(isActive));
      });
      return () => unsubscribe();
    }
  }, [isHovered, isTapped, isActive]);

  useEffect(() => {
    if (isTapped || isActive) {
      setIsVisible(true);
    }
  }, [isTapped, isActive]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: -35 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.2 }}
          className={`${className} dock-tooltip`}
          role="tooltip"
          style={{ x: "-50%" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Dock({
  items,
  className = "",
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  distance = 200,
  panelHeight = 76,
  dockHeight = 256,
  baseItemSize = 50,
  activeIndex: externalActiveIndex,
  setActiveIndex: externalSetActiveIndex,
}: DockProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [internalActiveIndex, setInternalActiveIndex] = useState<number | null>(null);
  const [isDockScrolling, setIsDockScrolling] = useState(false);
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 });
  
  // Use external state if provided, otherwise use internal state
  const activeIndex = externalActiveIndex !== undefined ? externalActiveIndex : internalActiveIndex;
  const setActiveIndex = externalSetActiveIndex || setInternalActiveIndex;

  // Touch event handlers for the dock panel
  const handleDockTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        time: Date.now()
      };
      setIsDockScrolling(false);
    }
  };

  const handleDockTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && touchStartRef.current.x !== 0) {
      const xDiff = Math.abs(e.touches[0].clientX - touchStartRef.current.x);
      
      // If horizontal movement exceeds threshold, mark as scrolling
      if (xDiff > 10) {
        setIsDockScrolling(true);
      }
    }
  };

  const handleDockTouchEnd = () => {
    // Reset after a short delay to allow child click handlers to check the state
    setTimeout(() => {
      touchStartRef.current = { x: 0, y: 0, time: 0 };
      setIsDockScrolling(false);
    }, 300);
  };

  // Center the dock on load and when active item changes
  const centerActiveDockItem = useCallback(() => {
    // Use requestAnimationFrame for smoother animations
    requestAnimationFrame(() => {
      const panel = panelRef.current;
      if (panel) {
        const index = activeIndex !== null ? activeIndex : 0;
        const item = panel.children[index] as HTMLElement;
        
        if (item) {
          const targetScrollLeft = item.offsetLeft - panel.clientWidth / 2 + item.clientWidth / 2;
          
          // Only scroll if the difference is significant to avoid unnecessary jittering
          const currentScrollLeft = panel.scrollLeft;
          const scrollDiff = Math.abs(currentScrollLeft - targetScrollLeft);
          
          // If this is the initial centering, do it without animation
          if (!panel.dataset.initialized) {
            panel.scrollLeft = targetScrollLeft;
            panel.dataset.initialized = 'true';
          } 
          // Only perform smooth scroll when the difference is significant
          else if (scrollDiff > 10) {
            panel.scrollTo({ 
              left: targetScrollLeft, 
              behavior: 'smooth' 
            });
          }
        }
      }
    });
  }, [activeIndex]);

  // Center when active index changes
  useEffect(() => {
    centerActiveDockItem();
  }, [activeIndex, centerActiveDockItem]);

  // Initial centering on load
  useEffect(() => {
    centerActiveDockItem();
    
    // Set first item as active initially
    if (activeIndex === null) {
      setActiveIndex(0);
    }
  }, [items.length, centerActiveDockItem, activeIndex, setActiveIndex]);

  return (
    <div className={`${className} dock-container`}>
      <div className="dock-glass"></div>
      <div
        ref={panelRef}
        className="dock-panel"
        role="toolbar"
        aria-label="Application dock"
        onTouchStart={handleDockTouchStart}
        onTouchMove={handleDockTouchMove}
        onTouchEnd={handleDockTouchEnd}
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            icon={item.icon}
            label={item.label}
            onClick={item.onClick}
            className={item.className}
            panelHeight={panelHeight}
            baseItemSize={baseItemSize}
            index={index}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            isDockScrolling={isDockScrolling}
          />
        ))}
      </div>
    </div>
  );
}
