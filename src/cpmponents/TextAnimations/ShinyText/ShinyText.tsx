/*
	Installed from https://reactbits.dev/ts/tailwind/
*/

import React from "react";

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
  // Create base styles for all shiny text
  const baseStyles: React.CSSProperties = {
    display: 'inline-block',
    position: 'relative',
    zIndex: 10,
  };
  
  // Add animation styles if not disabled
  if (!disabled) {
    baseStyles.animation = `shine ${speed}s linear infinite`;
  }
  
  // Add gradient specific styles if the className includes gradient-text
  if (className.includes('gradient-text')) {
    return (
      <span
        className={className}
        style={{
          ...baseStyles,
          background: 'linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100%), linear-gradient(90deg, #7c3aed 0%, #ec4899 50%, #7c3aed 100%)',
          backgroundSize: '200% 100%, 200% 100%',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          WebkitTextFillColor: 'transparent',
          animation: `shine-gradient ${speed}s linear infinite`
        }}
      >
        {text}
      </span>
    );
  }
  
  // Otherwise return regular shiny text
  return (
    <span
      className={className}
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
