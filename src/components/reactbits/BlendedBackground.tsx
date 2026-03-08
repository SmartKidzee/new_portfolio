import React from 'react';
import { motion } from 'framer-motion';

export const BlendedBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-vibrant-bg">
      {/* Base gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,15,28,0)_0%,rgba(10,15,28,0.8)_100%)] z-10" />
      
      {/* Animated blob 1: Teal */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full mix-blend-screen filter blur-[100px] opacity-40 bg-vibrant-orange"
        animate={{
          x: [0, 100, 0, -100, 0],
          y: [0, 50, 100, 50, 0],
          scale: [1, 1.2, 1, 0.8, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Animated blob 2: Lavender */}
      <motion.div
        className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] rounded-full mix-blend-screen filter blur-[120px] opacity-30 bg-vibrant-orange-light"
        animate={{
          x: [0, -100, 0, 100, 0],
          y: [0, -50, -100, -50, 0],
          scale: [1, 0.9, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Animated blob 3: Blue */}
      <motion.div
        className="absolute bottom-[-20%] left-[20%] w-[70vw] h-[70vw] rounded-full mix-blend-screen filter blur-[130px] opacity-30 bg-vibrant-orange-gradient"
        animate={{
          x: [0, 50, -50, -100, 0],
          y: [0, -100, -50, 50, 0],
          scale: [1, 1.1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
};

export default BlendedBackground;
