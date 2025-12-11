"use client";

import React, { Children, cloneElement, isValidElement, ReactElement, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

type ScrollStackProps = {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
  topOffsetClassName?: string; // e.g., "top-24 sm:top-28"
};

type ScrollStackItemInjectedProps = {
  __stackIndex?: number;
  __stackCount?: number;
  className?: string;
};

export default function ScrollStack({
  children,
  className,
  itemClassName,
  topOffsetClassName = "top-16 sm:top-24 md:top-28",
}: ScrollStackProps) {
  const items = useMemo(() => Children.toArray(children) as ReactElement[], [children]);
  const count = items.length;
  const [tailPx, setTailPx] = useState(0);

  // Add a tiny tail (~1cm ≈ 38px) only on mobile to avoid abrupt cutoff
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setTailPx(mq.matches ? 38 : 0);
    update();
    try {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    } catch {
      // Safari fallback
      mq.addListener(update);
      return () => mq.removeListener(update);
    }
  }, []);

  return (
    <div
      className={`relative w-full ${className ?? ""}`}
      style={{
        // Use svh to respect mobile visual viewport and add a tiny mobile-only tail (≈1cm)
        height: `calc(100svh + ${Math.max(count - 1, 0) * 44}svh + ${tailPx}px)`,
      }}
    >
      {items.map((child, index) => {
        if (!isValidElement(child)) return child;
        return cloneElement(child, {
          __stackIndex: index,
          __stackCount: count,
          className: itemClassName,
          topOffsetClassName,
        } as ScrollStackItemInjectedProps & { topOffsetClassName: string });
      })}
    </div>
  );
}

export function ScrollStackItem({
  children,
  __stackIndex = 0,
  __stackCount: _unused = 1,
  className,
  topOffsetClassName = "top-16 sm:top-24 md:top-28",
}: {
  children: ReactNode;
  className?: string;
  topOffsetClassName?: string;
} & ScrollStackItemInjectedProps) {
  const ref = useRef<HTMLDivElement>(null);
  const zIndex = __stackIndex + 10;

  return (
    <motion.div
      ref={ref}
      style={{ zIndex, transformOrigin: "top center" }}
      className={`sticky ${topOffsetClassName} mx-auto w-full max-w-3xl`}
    >
      <div
        className={`relative min-h-[260px] rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_8px_30px_rgb(2,6,23,0.25)] backdrop-blur-md ${
          className ?? ""
        }`}
      >
        {/* Soft gradient edge for premium look, non-intrusive */}
        <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-b from-[#FF0000]/10 to-[#800000]/10 opacity-60" />
        <div className="relative z-10">{children}</div>
      </div>
    </motion.div>
  );
}


