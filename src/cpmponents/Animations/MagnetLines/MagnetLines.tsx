/*
	Installed from https://reactbits.dev/ts/tailwind/
*/

import React, { useRef, useEffect, CSSProperties } from "react";

interface MagnetLinesProps {
  rows?: number;
  columns?: number;
  containerSize?: string;
  lineColor?: string;
  lineWidth?: string;
  lineHeight?: string;
  baseAngle?: number;
  className?: string;
  style?: CSSProperties;
}

// Simple throttle function to limit event handler calls
const throttle = (callback: Function, delay: number) => {
  let lastCall = 0;
  return (...args: any[]) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      callback(...args);
    }
  };
};

const MagnetLines: React.FC<MagnetLinesProps> = ({
  rows = 9,
  columns = 9,
  containerSize = "80vmin",
  lineColor = "#efefef",
  lineWidth = "1vmin",
  lineHeight = "6vmin",
  baseAngle = -10,
  className = "",
  style = {},
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLSpanElement>("span");
    
    // Performance optimization: cache DOM measurements
    const itemPositions = Array.from(items).map(item => {
      const rect = item.getBoundingClientRect();
      return {
        element: item,
        centerX: rect.x + rect.width / 2,
        centerY: rect.y + rect.height / 2
      };
    });

    const onPointerMove = (pointer: { x: number; y: number }) => {
      // Using requestAnimationFrame for smoother animations
      requestAnimationFrame(() => {
        itemPositions.forEach(({ element, centerX, centerY }) => {
          const b = pointer.x - centerX;
          const a = pointer.y - centerY;
          const c = Math.sqrt(a * a + b * b) || 1;
          const r =
            ((Math.acos(b / c) * 180) / Math.PI) * (pointer.y > centerY ? 1 : -1);

          element.style.setProperty("--rotate", `${r}deg`);
        });
      });
    };

    // Throttle the event handler for better performance, 16ms is close to 60fps
    const throttledPointerMove = throttle(onPointerMove, 16);

    const handlePointerMove = (e: PointerEvent) => {
      throttledPointerMove({ x: e.x, y: e.y });
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    if (items.length) {
      const middleIndex = Math.floor(items.length / 2);
      const rect = items[middleIndex].getBoundingClientRect();
      onPointerMove({ x: rect.x, y: rect.y });
    }

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [rows, columns]); // Add dependencies to ensure recalculation when grid changes

  const total = rows * columns;
  const spans = Array.from({ length: total }, (_, i) => (
    <span
      key={i}
      className="block origin-center"
      style={{
        backgroundColor: lineColor,
        width: lineWidth,
        height: lineHeight,
        //@ts-ignore
        "--rotate": `${baseAngle}deg`,
        transform: "rotate(var(--rotate))",
        willChange: "transform",
      }}
    />
  ));

  return (
    <div
      ref={containerRef}
      className={`grid place-items-center ${className}`}
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        width: containerSize,
        height: containerSize,
        ...style,
      }}
    >
      {spans}
    </div>
  );
};

export default MagnetLines;
