/*
	Installed from https://reactbits.dev/ts/tailwind/
*/

import React from "react";

export interface GlassIconsItem {
  icon: React.ReactElement;
  color: string;
  label: string;
  customClass?: string;
  url?: string;
}

export interface GlassIconsProps {
  items: GlassIconsItem[];
  className?: string;
}

const gradientMapping: Record<string, string> = {
  blue: "linear-gradient(hsl(223, 90%, 50%), hsl(208, 90%, 50%))",
  purple: "linear-gradient(hsl(283, 90%, 50%), hsl(268, 90%, 50%))",
  red: "linear-gradient(hsl(3, 90%, 50%), hsl(348, 90%, 50%))",
  indigo: "linear-gradient(hsl(253, 90%, 50%), hsl(238, 90%, 50%))",
  orange: "linear-gradient(hsl(43, 90%, 50%), hsl(28, 90%, 50%))",
  green: "linear-gradient(hsl(123, 90%, 40%), hsl(108, 90%, 40%))",
};

const GlassIcons: React.FC<GlassIconsProps> = ({ items, className }) => {
  const getBackgroundStyle = (color: string): React.CSSProperties => {
    if (gradientMapping[color]) {
      return { background: gradientMapping[color] };
    }
    return { background: color };
  };

  const renderIcon = (item: GlassIconsItem, index: number) => {
    const iconContent = (
      <>
        {/* Back layer */}
        <span
          className="absolute top-0 left-0 w-full h-full rounded-[1.25em] block transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[100%_100%] rotate-[15deg] group-hover:[transform:rotate(25deg)_translate3d(-0.5em,-0.5em,0.5em)]"
          style={{
            ...getBackgroundStyle(item.color),
            boxShadow: "0.5em -0.5em 0.75em hsla(223, 10%, 10%, 0.15)",
          }}
        ></span>

        {/* Front layer */}
        <span
          className="absolute top-0 left-0 w-full h-full rounded-[1.25em] bg-[hsla(0,0%,100%,0.15)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[80%_50%] flex backdrop-blur-[0.75em] [-webkit-backdrop-filter:blur(0.75em)] transform group-hover:[transform:translateZ(2em)]"
          style={{
            boxShadow: "0 0 0 0.1em hsla(0, 0%, 100%, 0.3) inset",
          }}
        >
          <span
            className="m-auto w-[1.5em] h-[1.5em] flex items-center justify-center"
            aria-hidden="true"
          >
            {item.icon}
          </span>
        </span>

        {/* Label */}
        <span className="absolute top-full left-0 right-0 text-center whitespace-nowrap leading-[2] text-sm md:text-base opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] translate-y-0 group-hover:opacity-100 group-hover:[transform:translateY(20%)] glass-icon-label">
          {item.label}
        </span>
      </>
    );

    const baseClass = `relative bg-transparent outline-none w-[3em] sm:w-[3.5em] md:w-[4em] h-[3em] sm:h-[3.5em] md:h-[4em] [perspective:24em] [transform-style:preserve-3d] [-webkit-tap-highlight-color:transparent] group ${
      item.customClass || ""
    }`;

    if (item.url) {
      return (
        <a
          key={index}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          className={baseClass}
        >
          {iconContent}
        </a>
      );
    }

    return (
      <button
        key={index}
        type="button"
        aria-label={item.label}
        className={baseClass}
      >
        {iconContent}
      </button>
    );
  };

  return (
    <div
      className={`flex justify-center items-center mx-auto py-4 overflow-visible glass-icons-grid ${
        className || ""
      }`}
    >
      <div className="inline-grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 mx-auto">
        {items.map((item, index) => renderIcon(item, index))}
      </div>
    </div>
  );
};

export default GlassIcons;
