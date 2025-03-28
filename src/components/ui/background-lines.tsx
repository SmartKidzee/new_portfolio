"use client";
import { cn } from "../../lib/utils";
import { motion } from "motion/react";
import React, { useEffect, useState, useMemo } from "react";
 
export const BackgroundLines = ({
  children,
  className,
  svgOptions,
}: {
  children: React.ReactNode;
  className?: string;
  svgOptions?: {
    duration?: number;
    lineCount?: number;
  };
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div
      className={cn(
        "h-full w-full inset-0 absolute overflow-hidden",
        className
      )}
    >
      <SVG svgOptions={svgOptions} isMobile={isMobile} />
      {children}
    </div>
  );
};

const SVG = ({
  svgOptions,
  isMobile
}: {
  svgOptions?: {
    duration?: number;
    lineCount?: number;
  };
  isMobile: boolean;
}) => {
  // Center coordinates - position at center of profile pic
  const centerX = isMobile ? 250 : 720;
  const centerY = isMobile ? 325 : 230;
  
  // Get duration and line count from props or use defaults
  const duration = svgOptions?.duration || 5;
  const lineCount = svgOptions?.lineCount || (isMobile ? 30 : 80);
  
  // Colors with good contrast
  const colors = [
    "#46A5CA", // Blue
    "#D6590C", // Orange
    "#4FAE4D", // Green
    "#A534A0", // Purple
    "#D7C200", // Yellow
    "#FF94B4", // Pink
    "#8C2F2F", // Dark Red
    "#59BBEB", // Light Blue
    "#247AFB", // Royal Blue
    "#32A852", // Emerald
    "#DF4B19", // Bright Orange
    "#9932CC", // Dark Purple
    "#FF6347", // Tomato
    "#3E84D0", // Steel Blue
    "#B3297A", // Magenta
    "#670F6D", // Deep Purple
    "#46A29C", // Teal
    "#504F1C", // Olive
    "#9F39A5", // Orchid
    "#363636", // Dark Gray
    "#860909", // Maroon
    "#6A286F", // Plum
    "#604483", // Slate Blue
    "#FF3232", // Red
    "#00CED1", // Dark Turquoise
    "#90EE90", // Light Green
    "#FFD700", // Gold
  ];
  
  // Generate paths that emanate from center
  const paths = useMemo(() => {
    const generatedPaths = [];
    const maxRadius = isMobile ? 800 : 1400;
    
    for (let i = 0; i < lineCount; i++) {
      const angle = (i * 2 * Math.PI) / lineCount;
      const randomLength = maxRadius * (0.7 + Math.random() * 0.3);
      
      // End point
      const endX = centerX + Math.cos(angle) * randomLength;
      const endY = centerY + Math.sin(angle) * randomLength;
      
      // Add more variation to make the lines more random in direction
      const cp1Distance = randomLength * (0.2 + Math.random() * 0.2);
      const cp2Distance = randomLength * (0.5 + Math.random() * 0.3);
      
      const cp1Angle = angle + (Math.random() - 0.5) * 0.6;
      const cp2Angle = angle + (Math.random() - 0.5) * 0.8;
      
      const cp1X = centerX + Math.cos(cp1Angle) * cp1Distance;
      const cp1Y = centerY + Math.sin(cp1Angle) * cp1Distance;
      
      const cp2X = centerX + Math.cos(cp2Angle) * cp2Distance;
      const cp2Y = centerY + Math.sin(cp2Angle) * cp2Distance;
      
      generatedPaths.push({
        path: `M${centerX} ${centerY} C${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`,
        delay: Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        width: isMobile ? 
          1.5 + Math.random() * 2 : 
          1 + Math.random() * 2
      });
    }
    
    return generatedPaths;
  }, [centerX, centerY, lineCount, isMobile]);
  
  // Define the path variants for dashed lines
  const pathVariants = {
    initial: { strokeDashoffset: 1000, strokeDasharray: "40 120" },
    animate: {
      strokeDashoffset: 0,
      strokeDasharray: "30 100",
      opacity: [0, 0.4, 0.4, 0],
    },
  };
  
  return (
    <motion.svg
      viewBox={isMobile ? "0 0 500 900" : "0 0 1440 900"}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
    >
      {paths.map((pathData, idx) => (
        <motion.path
          key={`path-${idx}`}
          d={pathData.path}
          stroke={pathData.color}
          strokeWidth={pathData.width}
          strokeLinecap="round"
          variants={pathVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: duration * (isMobile ? 2.0 : 1.5) + (Math.random() * 1),
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
            delay: Math.random() * (isMobile ? 6 : 8),
            repeatDelay: Math.random() * (isMobile ? 4 : 5),
          }}
        />
      ))}
      
      {/* Add a second set for more density - reduce on mobile */}
      {paths.slice(0, paths.length / (isMobile ? 4 : 3)).map((pathData, idx) => (
        <motion.path
          key={`path-extra-${idx}`}
          d={pathData.path}
          stroke={colors[(idx + colors.length / 3) % colors.length]}
          strokeWidth={pathData.width * 0.8}
          strokeLinecap="round"
          variants={pathVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: duration * (isMobile ? 2.2 : 1.8) + (Math.random() * 2),
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
            delay: Math.random() * (isMobile ? 8 : 10) + 2,
            repeatDelay: Math.random() * (isMobile ? 5 : 6),
          }}
        />
      ))}
    </motion.svg>
  );
}; 