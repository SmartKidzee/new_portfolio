import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  maxDuration?: number;
  onLoadingComplete?: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  maxDuration = 3000,
  onLoadingComplete 
}) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const particlesRef = useRef<HTMLDivElement>(null);
  
  // Generate particles for the background
  useEffect(() => {
    if (!particlesRef.current || typeof window === 'undefined') return;
    
    const particles = particlesRef.current;
    const particleCount = window.innerWidth < 768 ? 30 : 60;
    
    // Clear any existing particles
    particles.innerHTML = '';
    
    // Create new particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      
      // Random size between 2-8px
      const size = Math.random() * 6 + 2;
      
      // Position randomly within the container
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      // Random opacity between 0.1-0.6
      const opacity = Math.random() * 0.5 + 0.1;
      
      // Random color (purple, pink variations)
      const hue = Math.random() * 60 + 280; // 280-340 range for purples/pinks
      const color = `hsla(${hue}, 70%, 60%, ${opacity})`;
      
      // Apply styles
      particle.style.position = 'absolute';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.borderRadius = '50%';
      particle.style.backgroundColor = color;
      particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;
      particle.style.pointerEvents = 'none';
      
      // Animation duration and delay
      const duration = Math.random() * 4 + 2;
      const delay = Math.random() * 2;
      
      // Apply animation
      particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`;
      
      // Add to container
      particles.appendChild(particle);
    }
    
    // Add keyframes for float animation if it doesn't exist
    if (!document.querySelector('#particle-animation')) {
      const style = document.createElement('style');
      style.id = 'particle-animation';
      style.textContent = `
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg) scale(1);
          }
          100% {
            transform: translateY(${Math.random() * 30 - 15}px) 
                       translateX(${Math.random() * 30 - 15}px) 
                       rotate(${Math.random() * 40 - 20}deg) 
                       scale(${Math.random() * 0.4 + 0.8});
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);
  
  // Simulate loading progress
  useEffect(() => {
    let mounted = true;
    
    // Simplified loading progress that won't crash browsers
    const interval = setInterval(() => {
      if (!mounted) return;
      
      setProgress(prev => {
        // Use a consistent but accelerating progress approach
        const remaining = 100 - prev;
        const increment = Math.max(0.5, remaining / 15);
        return Math.min(prev + increment, 99.5);
      });
    }, 100);
    
    // Force complete after maxDuration
    const timer = setTimeout(() => {
      if (!mounted) return;
      
      setProgress(100);
      setTimeout(() => {
        if (mounted) {
          setIsVisible(false);
          if (onLoadingComplete) onLoadingComplete();
        }
      }, 600);
    }, maxDuration);
    
    // Listen for window load event to complete genuinely if before timeout
    const handleLoad = () => {
      if (!mounted) return;
      
      setProgress(100);
      setTimeout(() => {
        if (mounted) {
          setIsVisible(false);
          if (onLoadingComplete) onLoadingComplete();
        }
      }, 600);
    };
    
    window.addEventListener('load', handleLoad);
    
    return () => {
      mounted = false;
      clearInterval(interval);
      clearTimeout(timer);
      window.removeEventListener('load', handleLoad);
    };
  }, [maxDuration, onLoadingComplete]);
  
  // Letters for the animated title
  const letters = "Shreyas".split("");
  
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
        >
          {/* Particle container */}
          <div 
            ref={particlesRef}
            className="absolute inset-0 overflow-hidden pointer-events-none"
          />
          
          <div className="relative w-full max-w-md px-4">
            {/* Logo Animation */}
            <motion.div 
              className="flex justify-center mb-10"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative flex items-center text-5xl font-bold">
                {letters.map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ 
                      delay: 0.1 + index * 0.1,
                      duration: 0.6,
                      ease: [0.2, 0.65, 0.3, 0.9],
                    }}
                    className="relative inline-block"
                  >
                    <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                      {letter}
                    </span>
                    
                    {/* Character glow effect */}
                    <motion.span
                      className="absolute inset-0 blur-md opacity-70 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-clip-text text-transparent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.7, 0] }}
                      transition={{
                        delay: 0.5 + index * 0.1,
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    >
                      {letter}
                    </motion.span>
                  </motion.span>
                ))}
              </div>
            </motion.div>
            
            {/* Loading Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="relative mb-6"
            >
              <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeInOut" }}
                />
              </div>
              
              {/* Glow effect */}
              <motion.div
                className="absolute top-0 h-2 w-10 rounded-full bg-white opacity-30 blur-sm"
                style={{ left: `${progress - 5}%` }}
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              />
            </motion.div>
            
            {/* Loading Text */}
            <motion.div 
              className="text-center text-white text-opacity-90 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div
                animate={{
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              >
                <span className="inline-block mr-1 font-medium">
                  {Math.round(progress)}% Loading
                </span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5
                  }}
                >
                  <span className="inline-block">.</span>
                  <span className="inline-block">.</span>
                  <span className="inline-block">.</span>
                </motion.span>
              </motion.div>
            </motion.div>
            
            {/* Bottom message */}
            <motion.div
              className="absolute bottom-4 left-0 right-0 text-center text-white text-opacity-50 text-xs px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              Preparing an awesome experience for you
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen; 