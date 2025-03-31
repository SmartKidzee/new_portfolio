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
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  
  // Generate particles for the background
  useEffect(() => {
    if (!particlesRef.current || typeof window === 'undefined') return;
    
    const particles = particlesRef.current;
    const particleCount = window.innerWidth < 768 ? 40 : 80;
    
    // Clear any existing particles
    particles.innerHTML = '';
    
    // Create new particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      
      // Random size between 1-6px
      const size = Math.random() * 5 + 1;
      
      // Position randomly within the container
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      
      // Random opacity between 0.05-0.3
      const opacity = Math.random() * 0.25 + 0.05;
      
      // Use brand gradient colors
      const hueOptions = [280, 320, 340, 220, 200];  // purple, pink, red, blue variations
      const hue = hueOptions[Math.floor(Math.random() * hueOptions.length)];
      const saturation = 70 + Math.random() * 30;
      const lightness = 50 + Math.random() * 20;
      const color = `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`;
      
      // Apply styles
      particle.style.position = 'absolute';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.borderRadius = '50%';
      particle.style.backgroundColor = color;
      particle.style.boxShadow = `0 0 ${size * 3}px ${color}`;
      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;
      particle.style.pointerEvents = 'none';
      
      // Animation duration and delay
      const duration = Math.random() * 5 + 3;
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
            opacity: 0.1;
          }
          100% {
            transform: translateY(${Math.random() * 40 - 20}px) 
                       translateX(${Math.random() * 40 - 20}px) 
                       rotate(${Math.random() * 60 - 30}deg) 
                       scale(${Math.random() * 0.6 + 0.8});
            opacity: 0.3;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Set up mouse move effect for glass morphism
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      
      // Apply a subtle rotation effect based on mouse position
      const rotateX = (y - 0.5) * 10; // -5 to 5 degrees
      const rotateY = (x - 0.5) * -10; // -5 to 5 degrees
      
      containerRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      
      // Move particles slightly with mouse
      if (particlesRef.current) {
        particlesRef.current.style.transform = `translate(${(x - 0.5) * -10}px, ${(y - 0.5) * -10}px)`;
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Rotating animation for Apple-inspired loading effect
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 10);
    
    return () => clearInterval(interval);
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
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-xl"
        >
          {/* Particle container */}
          <div 
            ref={particlesRef}
            className="absolute inset-0 overflow-hidden pointer-events-none"
          />
          
          {/* Main content container with glass effect */}
          <div 
            ref={containerRef}
            className="relative w-full max-w-md px-6 py-8 transition-transform duration-200 ease-out"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Glass card effect */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl"></div>
            
            {/* Logo Animation */}
            <motion.div 
              className="relative flex justify-center mb-10"
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
                    <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
                      {letter}
                    </span>
                    
                    {/* Character glow effect */}
                    <motion.span
                      className="absolute inset-0 blur-md opacity-70 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent"
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
            
            {/* Apple-inspired Loading Spinner */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="relative flex justify-center mb-8"
            >
              <svg 
                width="38" 
                height="38" 
                viewBox="0 0 38 38" 
                className="relative"
              >
                <defs>
                  <linearGradient id="spinner-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3A29FF" />
                    <stop offset="50%" stopColor="#FF94B4" />
                    <stop offset="100%" stopColor="#FF3232" />
                  </linearGradient>
                </defs>
                <g transform={`rotate(${rotation} 19 19)`}>
                  <path 
                    d="M19 4
                      a 15 15 0 0 1 0 30
                      a 15 15 0 0 1 0 -30"
                    fill="none"
                    stroke="url(#spinner-gradient)"
                    strokeWidth="3"
                    strokeDasharray="80, 125"
                    strokeLinecap="round"
                  />
                </g>
              </svg>
              
              {/* Glow effect behind spinner */}
              <div className="absolute inset-0 blur-xl opacity-50 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-full"></div>
            </motion.div>
            
            {/* Loading Bar - with glass effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="relative mb-6"
            >
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div 
                  className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeInOut" }}
                />
              </div>
              
              {/* Glow effect */}
              <motion.div
                className="absolute top-0 h-1.5 w-10 rounded-full bg-white opacity-30 blur-sm"
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
            
            {/* Loading Text - with glass effect */}
            <motion.div 
              className="relative text-center text-white text-opacity-90 text-sm font-medium"
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
                <span className="inline-block mr-1">
                  {Math.round(progress)}% Loading
                </span>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  .
                </motion.span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen; 