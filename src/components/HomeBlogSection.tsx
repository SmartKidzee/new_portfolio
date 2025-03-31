import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getLatestBlogs, Blog } from '../data/blogs';
import ShareButtons from './ShareButtons';

export default function HomeBlogSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Load the latest blogs
  useEffect(() => {
    const latestBlogs = getLatestBlogs(3);
    setBlogs(latestBlogs);
    setIsLoading(false);
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === blogs.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? blogs.length - 1 : prevIndex - 1
    );
  };

  // Touch event handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null; // Reset end position
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const diffX = touchStartX.current - touchEndX.current;
    const threshold = 50; // Minimum swipe distance
    
    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        // Swipe left, go to next
        nextSlide();
      } else {
        // Swipe right, go to previous
        prevSlide();
      }
    }
    
    // Reset values
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Apple-style variants for animation
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 1, 0.5, 1],
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.5,
        ease: [0.25, 1, 0.5, 1],
      },
    }),
  };

  // Format date
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center md:text-left mb-12 md:flex md:items-end md:justify-between">
          <div>
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-white mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Latest Articles
            </motion.h2>
            <motion.p 
              className="text-gray-400 max-w-2xl md:mx-0 mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Check out my most recent thoughts, achievements, and projects
            </motion.p>
          </div>
          
          <motion.div 
            className="mt-6 md:mt-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link 
              to="/blogs" 
              className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <span className="mr-2">See all articles</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
        
        {/* Carousel */}
        <div 
          className="relative overflow-hidden" 
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation arrows - repositioned for better mobile experience */}
          <div className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 z-20">
            <button 
              onClick={prevSlide}
              className="bg-black/70 hover:bg-black/80 text-white p-2 md:p-3 rounded-full backdrop-blur-sm transition-colors shadow-lg"
              aria-label="Previous slide"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 z-20">
            <button 
              onClick={nextSlide}
              className="bg-black/70 hover:bg-black/80 text-white p-2 md:p-3 rounded-full backdrop-blur-sm transition-colors shadow-lg"
              aria-label="Next slide"
            >
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
          
          {/* Carousel content */}
          <div className="relative h-[400px] sm:h-[450px] md:h-[520px] px-12 sm:px-16 md:px-20">
            <AnimatePresence initial={false} custom={direction}>
              {blogs.length > 0 && (
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-full max-w-4xl mx-auto px-1 sm:px-2">
                    <div className="bg-black/10 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl transform hover:scale-[1.01] transition-transform duration-300">
                      {/* Image */}
                      {(blogs[currentIndex]._thumbnailOverride || blogs[currentIndex].src) && (
                        <Link to={`/blogs/${blogs[currentIndex].id}`}>
                          <div className="relative w-full aspect-[16/9] overflow-hidden">
                            <img 
                              src={blogs[currentIndex]._thumbnailOverride || blogs[currentIndex].src} 
                              alt={blogs[currentIndex].title}
                              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            />
                            
                            {/* Video indicator */}
                            {blogs[currentIndex].video && (
                              <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                                Watch Video
                              </div>
                            )}
                          </div>
                        </Link>
                      )}
                      
                      {/* Content */}
                      <div className="p-4 sm:p-6 md:p-8">
                        <div className="flex flex-wrap gap-1 sm:gap-2 md:gap-3 mb-3 sm:mb-4">
                          <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300 truncate max-w-[120px] sm:max-w-full">
                            {blogs[currentIndex].category}
                          </span>
                          
                          <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-gray-700/50 text-gray-300">
                            {formatDate(blogs[currentIndex].created_at)}
                          </span>
                          
                          {blogs[currentIndex].isAchievement && (
                            <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-300">
                              Achievement
                            </span>
                          )}
                        </div>
                        
                        <Link to={`/blogs/${blogs[currentIndex].id}`}>
                          <h3 className="text-lg sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 md:mb-4 text-white hover:text-indigo-300 transition-colors line-clamp-2">
                            {blogs[currentIndex].title}
                          </h3>
                        </Link>
                        
                        <p className="text-gray-300 text-xs sm:text-sm md:text-base line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-4 md:mb-6">
                          {blogs[currentIndex].content.substring(0, 120)}...
                        </p>
                        
                        <div className="flex flex-wrap items-center justify-between">
                          <Link 
                            to={`/blogs/${blogs[currentIndex].id}`}
                            className="text-indigo-400 text-sm sm:text-base font-medium hover:translate-x-1 transition-transform duration-300 inline-flex items-center"
                          >
                            Read more <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                          </Link>
                          
                          <div className="mt-3 sm:mt-0">
                            <ShareButtons 
                              title={blogs[currentIndex].title}
                              url={`${window.location.origin}/blogs/${blogs[currentIndex].id}`}
                              category={blogs[currentIndex].category}
                              tags={blogs[currentIndex].tags}
                              content={blogs[currentIndex].content}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-6 sm:mt-8 md:mt-10 pt-2">
            {blogs.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-indigo-500 w-6 sm:w-8' 
                    : 'bg-gray-600 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Swipe indicator for mobile - only shows on small screens */}
          <div className="sm:hidden text-xs text-center text-gray-400 mt-4">
            <span>← Swipe to navigate →</span>
          </div>
        </div>
      </div>
    </div>
  );
} 