"use client";
import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconX,
} from "@tabler/icons-react";
import { cn } from "../../lib/utils";
import { AnimatePresence, motion } from "motion/react";
import NextImageShim from "./next-image-shim";
import type { NextImageProps } from "./next-image-shim";
import { useOutsideClick } from "../../hooks/use-outside-click";

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
}

type Card = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
  isScrolling: boolean;
}>({
  onCardClose: () => {},
  currentIndex: 0,
  isScrolling: false,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384; // (md:w-96)
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const handleScroll = () => {
    checkScrollability();
    
    // Mark as scrolling to prevent accidental card taps during scroll
    setIsScrolling(true);
    
    // Clear any existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Set a new timeout to mark scrolling as done after 150ms of no scroll events
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 150);
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{ 
        onCardClose: handleCardClose, 
        currentIndex,
        isScrolling 
      }}
    >
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto py-10 md:py-20 scroll-smooth [scrollbar-width:none] touch-pan-x"
          ref={carouselRef}
          onScroll={handleScroll}
        >
          <div
            className={cn(
              "absolute right-0  z-[1000] h-auto  w-[5%] overflow-hidden bg-gradient-to-l"
            )}
          ></div>

          <div
            className={cn(
              "flex flex-row justify-start gap-4 pl-4",
              "max-w-7xl mx-auto" // remove max-w-4xl if you want the carousel to span the full width of its container
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                    once: true,
                  },
                }}
                key={"card" + index}
                className="last:pr-[5%] md:last:pr-[33%] rounded-3xl"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center gap-4 mt-4 md:mt-6">
          <button
            className="h-10 w-10 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center disabled:opacity-50 transition-all shadow-md hover:shadow-lg active:scale-95"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-gray-500 dark:text-gray-300" />
          </button>
          <button
            className="h-10 w-10 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center disabled:opacity-50 transition-all shadow-md hover:shadow-lg active:scale-95"
            onClick={scrollRight}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            <IconArrowNarrowRight className="h-6 w-6 text-gray-500 dark:text-gray-300" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: Card;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose, currentIndex, isScrolling } = useContext(CarouselContext);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    if (open) {
      document.body.style.overflow = "hidden";
      
      // Force reflow and repaint for mobile browsers
      if (containerRef.current) {
        containerRef.current.style.transform = 'translateZ(0)';
      }
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => {
    setOpen(true);
    
    // Ensure content is fully visible after modal animation completes
    setTimeout(() => {
      if (contentRef.current) {
        contentRef.current.style.opacity = "1";
        contentRef.current.style.transform = "translateY(0)";
      }
    }, 10);
  };

  const handleClose = () => {
    if (contentRef.current) {
      contentRef.current.style.opacity = "0";
      contentRef.current.style.transform = "translateY(20px)";
    }
    
    // Add a small delay to let the fade out animation complete
    setTimeout(() => {
      setOpen(false);
      onCardClose(index);
    }, 200);
  };

  // Mobile-specific handlers with better touch handling
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    let touchStartTime = 0;
    let touchStartPos = { x: 0, y: 0 };
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartTime = Date.now();
      if (e.touches[0]) {
        touchStartPos = { 
          x: e.touches[0].clientX, 
          y: e.touches[0].clientY 
        };
      }
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      // Prevent if scrolling
      if (isScrolling) return;
      
      // Get touch duration
      const touchDuration = Date.now() - touchStartTime;
      
      // Check if it's a short tap (< 300ms for better detection)
      if (touchDuration < 300) {
        // Check if user didn't move their finger much
        if (e.changedTouches[0]) {
          const touchEndPos = { 
            x: e.changedTouches[0].clientX, 
            y: e.changedTouches[0].clientY 
          };
          
          const deltaX = Math.abs(touchEndPos.x - touchStartPos.x);
          const deltaY = Math.abs(touchEndPos.y - touchStartPos.y);
          
          // If movement is less than 20px in any direction, it's a tap (more generous for mobile)
          if (deltaX < 20 && deltaY < 20) {
            e.preventDefault();
            handleOpen();
          }
        }
      }
    };
    
    card.addEventListener('touchstart', handleTouchStart, { passive: true });
    card.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      card.removeEventListener('touchstart', handleTouchStart);
      card.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isScrolling]);

  return (
    <>
      {open && (
        <div 
          className="fixed inset-0 h-screen w-screen z-[9999] overflow-hidden"
          style={{
            perspective: "1000px",
            WebkitPerspective: "1000px"
          }}
        >
          <div
            className="bg-black/80 backdrop-blur-lg h-full w-full fixed inset-0"
            onClick={handleClose}
          />
          <div
            ref={containerRef}
            className="max-w-5xl mx-auto bg-white dark:bg-neutral-900 h-fit z-[10000] rounded-3xl font-sans overflow-hidden relative"
            style={{ 
              width: "calc(100% - 32px)",
              margin: "16px auto",
              overflowY: "auto",
              maxHeight: "calc(100vh - 32px)",
              WebkitOverflowScrolling: "touch",
              transform: "translateZ(0)",
              willChange: "transform",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
            }}
          >
            <div
              className="sticky top-0 right-0 z-[10001] bg-transparent w-full pt-4 px-4 flex justify-end"
            >
              <button
                className="h-8 w-8 bg-black dark:bg-white rounded-full flex items-center justify-center"
                onClick={handleClose}
              >
                <IconX className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
              </button>
            </div>
            
            <div 
              className="p-4 md:p-10" 
              ref={contentRef}
              style={{
                opacity: 0,
                transform: "translateY(20px)",
                transition: "opacity 0.4s ease, transform 0.4s ease" 
              }}
            >
              <p className="text-base font-medium text-black dark:text-white">
                {card.category}
              </p>
              <p className="text-2xl md:text-5xl font-semibold text-neutral-700 mt-4 dark:text-white">
                {card.title}
              </p>
              <div className="py-10 text-black dark:text-neutral-200">
                {card.content}
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        ref={cardRef}
        onClick={handleOpen}
        className="rounded-3xl bg-gray-100 dark:bg-neutral-900 h-80 w-56 md:h-[40rem] md:w-96 overflow-hidden flex flex-col items-start justify-start relative z-10 cursor-pointer active:scale-[0.98]"
        data-tappable="true"
        role="button"
        aria-label={`Open ${card.title} card`}
        tabIndex={0}
        style={{ touchAction: "manipulation" }} // Helps with iOS Safari touch events
      >
        <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
        <div className="relative z-40 p-8">
          <p className="text-white text-sm md:text-base font-medium font-sans text-left">
            {card.category}
          </p>
          <p className="text-white text-xl md:text-3xl font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-2">
            {card.title}
          </p>
        </div>
        <BlurImage
          src={card.src}
          alt={card.title}
          fill
          className="object-cover absolute z-10 inset-0"
        />
      </div>
    </>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: NextImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <div className={`relative ${className || ''}`} style={{ width: '100%', height: '100%' }}>
      <img
        src={src}
        alt={alt || "Image"}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'filter 0.5s ease, opacity 0.5s ease',
          filter: isLoaded ? 'blur(0)' : 'blur(10px)',
          opacity: isLoaded ? 1 : 0.7,
        }}
        onLoad={() => setIsLoaded(true)}
        {...rest}
      />
    </div>
  );
}; 