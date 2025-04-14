"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

interface BeamBackgroundProps {
  className?: string;
  beamClassName?: string;
  numberOfBeams?: number;
  speed?: number;
  maxCollisions?: number;
  density?: number;
}

export const BeamBackground = ({
  className,
  beamClassName,
  numberOfBeams = 10,
  speed = 1.5,
  maxCollisions = 10,
  density = 1,
}: BeamBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [beams, setBeams] = useState<Array<{ id: number; x: number; y: number; angle: number; width: number; height: number; hue: number; collisions: number }>>([]);
  const animationRef = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const calculateBeams = () => {
      const { width, height } = container.getBoundingClientRect();
      const adjustedNumberOfBeams = Math.floor(numberOfBeams * density);

      const newBeams = Array.from({ length: adjustedNumberOfBeams }).map((_, i) => ({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        angle: Math.random() * 360,
        width: Math.random() * 8 + 2,
        height: Math.max(height / 2, Math.random() * height),
        hue: Math.floor(Math.random() * 360),
        collisions: 0
      }));

      setBeams(newBeams);
    };

    // Initialize beams
    calculateBeams();

    // Update on resize
    resizeObserverRef.current = new ResizeObserver(calculateBeams);
    resizeObserverRef.current.observe(container);

    // Animation loop
    let lastTime = 0;
    const animate = (time: number) => {
      if (!container) return;
      const { width, height } = container.getBoundingClientRect();

      // Calculate time delta for smooth animation regardless of frame rate
      const deltaTime = time - lastTime;
      lastTime = time;
      
      setBeams(prevBeams => 
        prevBeams.map(beam => {
          // Move the beam based on its angle
          const radians = (beam.angle * Math.PI) / 180;
          const velocity = speed * (deltaTime / 16); // Normalize by 60fps
          
          let x = beam.x + Math.cos(radians) * velocity;
          let y = beam.y + Math.sin(radians) * velocity;
          let angle = beam.angle;
          let collisions = beam.collisions;
          
          // Check for collisions with boundaries
          const hitEdge = 
            x < 0 || 
            x > width || 
            y < 0 || 
            y > height;
          
          if (hitEdge) {
            // Reflect angle when hitting an edge
            if (x < 0 || x > width) {
              angle = 180 - angle;
              x = Math.max(0, Math.min(x, width));
            }
            if (y < 0 || y > height) {
              angle = 360 - angle;
              y = Math.max(0, Math.min(y, height));
            }
            
            // Normalize angle
            angle = (angle + 360) % 360;
            
            // Increment collision counter
            collisions += 1;
          }
          
          // Reset beam if it has reached max collisions
          if (collisions >= maxCollisions) {
            return {
              ...beam,
              x: Math.random() * width,
              y: Math.random() * height,
              angle: Math.random() * 360,
              collisions: 0,
              hue: Math.floor(Math.random() * 360)
            };
          }
          
          return { ...beam, x, y, angle, collisions };
        })
      );
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, [numberOfBeams, speed, maxCollisions, density]);

  return (
    <div ref={containerRef} className={cn("w-full h-full overflow-hidden relative", className)}>
      {beams.map(beam => (
        <div
          key={beam.id}
          className={cn(
            "absolute bg-gradient-to-r from-primary/60 to-primary/20 blur-sm",
            beamClassName
          )}
          style={{
            left: `${beam.x}px`,
            top: `${beam.y}px`,
            width: `${beam.width}px`,
            height: `${beam.height}px`,
            transform: `rotate(${beam.angle}deg)`,
            transformOrigin: 'center',
            filter: `hue-rotate(${beam.hue}deg)`,
            opacity: Math.max(0.3, 1 - beam.collisions / maxCollisions),
            boxShadow: `0 0 ${20 + beam.width * 2}px ${beam.width}px rgba(120, 50, 255, 0.3)`,
            transition: 'opacity 0.3s ease-out'
          }}
        />
      ))}
    </div>
  );
}; 