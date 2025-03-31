/*
	Installed from https://reactbits.dev/ts/tailwind/
*/

import React, { useEffect, useRef, useState } from "react";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  disabled = false,
  speed = 5,
  className = "",
}) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    if (disabled || !containerRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) - 0.5;
      const y = ((e.clientY - rect.top) / rect.height) - 0.5;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [disabled]);
  
  // Create base styles for all shiny text
  const baseStyles: React.CSSProperties = {
    display: 'inline-block',
    position: 'relative',
    zIndex: 10,
    transition: 'transform 0.1s ease-out, text-shadow 0.3s ease-out',
    textShadow: isHovered 
      ? '0 10px 20px rgba(124, 58, 237, 0.5), 0 6px 6px rgba(124, 58, 237, 0.3)'
      : '0 4px 6px rgba(124, 58, 237, 0.2)',
    transform: isHovered 
      ? `perspective(1000px) rotateX(${mousePosition.y * -7}deg) rotateY(${mousePosition.x * 7}deg) scale(1.05)`
      : 'perspective(1000px) rotateX(0) rotateY(0) scale(1)',
  };
  
  // Add animation styles if not disabled
  if (!disabled) {
    baseStyles.animation = `shine ${speed}s linear infinite`;
  }
  
  // Add Apple-like styles 
  if (className.includes('gradient-text') || true) {
    // Add special Apple-inspired glass effect
    return (
      <span
        ref={containerRef}
        className={`${className} relative`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          ...baseStyles,
          background: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%), linear-gradient(90deg, #3A29FF 0%, #FF94B4 50%, #FF3232 100%)',
          backgroundSize: '200% 100%, 200% 100%',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          WebkitTextFillColor: 'transparent',
          animation: `shine-gradient ${speed}s linear infinite`,
          padding: '0.1em 0.2em',
          borderRadius: '0.2em',
        }}
      >
        {/* Apple-like glass highlight effect */}
        {isHovered && (
          <>
            <span 
              style={{
                position: 'absolute',
                top: '-10%',
                left: '-5%',
                right: '-5%',
                height: '40%',
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)',
                borderRadius: '50% 50% 0 0 / 80% 80% 0 0',
                transform: `rotate(${mousePosition.x * 5}deg)`,
                pointerEvents: 'none',
                zIndex: -1,
                filter: 'blur(4px)',
              }}
            />
            <span
              style={{
                position: 'absolute',
                inset: '-50%',
                background: 'radial-gradient(circle at center, rgba(144, 58, 255, 0.6) 0%, rgba(144, 58, 255, 0.2) 40%, rgba(144, 58, 255, 0) 60%)',
                transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
                pointerEvents: 'none',
                zIndex: -2,
                mixBlendMode: 'overlay',
                filter: 'blur(20px)',
                opacity: 0.7,
              }}
            />
          </>
        )}
        {text}
      </span>
    );
  }
  
  // Otherwise return regular shiny text
  return (
    <span
      ref={containerRef}
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={baseStyles}
    >
      {text}
    </span>
  );
};

export default ShinyText;

// tailwind.config.js
// module.exports = {
//   theme: {
//     extend: {
//       keyframes: {
//         shine: {
//           '0%': { 'background-position': '100%' },
//           '100%': { 'background-position': '-100%' },
//         },
//       },
//       animation: {
//         shine: 'shine 5s linear infinite',
//       },
//     },
//   },
//   plugins: [],
// };
