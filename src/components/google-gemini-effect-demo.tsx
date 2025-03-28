"use client";
import { useScroll, useTransform, motion, useMotionValueEvent } from "motion/react";
import React, { useEffect, useState, useRef } from "react";
import { GoogleGeminiEffect } from "./ui/google-gemini-effect";

export default function GoogleGeminiEffectDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const ref = React.useRef(null);
  
  // Use a custom scroll container
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Create scroll progress tracker
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  
  // Log scroll progress for debugging
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Optional: Add logging here if needed for debugging
  });

  // Create smooth path animations with slight staggering
  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  // Use IntersectionObserver to detect when component is in view
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="h-[400vh] bg-black w-full dark:border dark:border-white/[0.1] rounded-md relative pt-10 overflow-clip"
      ref={ref}
    >
      <GoogleGeminiEffect
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
        title="Building My Own Programming Language"
        description="I'm currently working on an ambitious project that combines the elegance of modern languages with intuitive syntax. Follow along as I bring this vision to life!"
      />
    </div>
  );
} 