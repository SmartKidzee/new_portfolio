/*
	Installed from https://reactbits.dev/ts/tailwind/
*/

import React, { useEffect, useRef, useState } from "react";
import { Renderer, Camera, Geometry, Program, Mesh } from "ogl";

interface ParticlesProps {
  particleCount?: number;
  particleSpread?: number;
  speed?: number;
  particleColors?: string[];
  moveParticlesOnHover?: boolean;
  particleHoverFactor?: number;
  alphaParticles?: boolean;
  particleBaseSize?: number;
  sizeRandomness?: number;
  cameraDistance?: number;
  disableRotation?: boolean;
  className?: string;
}

const defaultColors: string[] = ["#ffffff", "#ffffff", "#ffffff"];

const hexToRgb = (hex: string): [number, number, number] => {
  hex = hex.replace(/^#/, "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const int = parseInt(hex, 16);
  const r = ((int >> 16) & 255) / 255;
  const g = ((int >> 8) & 255) / 255;
  const b = (int & 255) / 255;
  return [r, g, b];
};

// Simplified vertex shader for mobile
const vertexSimple = /* glsl */ `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;
  
  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  
  varying vec4 vRandom;
  varying vec3 vColor;
  
  void main() {
    vRandom = random;
    vColor = color;
    
    vec3 pos = position * uSpread;
    
    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    vec4 mvPos = viewMatrix * mPos;
    gl_PointSize = uBaseSize / length(mvPos.xyz);
    gl_Position = projectionMatrix * mvPos;
  }
`;

// Full vertex shader for desktop
const vertex = /* glsl */ `
  attribute vec3 position;
  attribute vec4 random;
  attribute vec3 color;
  
  uniform mat4 modelMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uTime;
  uniform float uSpread;
  uniform float uBaseSize;
  uniform float uSizeRandomness;
  
  varying vec4 vRandom;
  varying vec3 vColor;
  
  void main() {
    vRandom = random;
    vColor = color;
    
    vec3 pos = position * uSpread;
    pos.z *= 10.0;
    
    vec4 mPos = modelMatrix * vec4(pos, 1.0);
    float t = uTime;
    mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
    mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
    mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);
    
    vec4 mvPos = viewMatrix * mPos;
    gl_PointSize = (uBaseSize * (1.0 + uSizeRandomness * (random.x - 0.5))) / length(mvPos.xyz);
    gl_Position = projectionMatrix * mvPos;
  }
`;

// Simplified fragment shader for mobile
const fragmentSimple = /* glsl */ `
  precision highp float;
  
  varying vec3 vColor;
  
  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));
    
    if(d > 0.5) {
      discard;
    }
    gl_FragColor = vec4(vColor, 1.0);
  }
`;

// Full fragment shader for desktop
const fragment = /* glsl */ `
  precision highp float;
  
  uniform float uTime;
  uniform float uAlphaParticles;
  varying vec4 vRandom;
  varying vec3 vColor;
  
  void main() {
    vec2 uv = gl_PointCoord.xy;
    float d = length(uv - vec2(0.5));
    
    if(uAlphaParticles < 0.5) {
      if(d > 0.5) {
        discard;
      }
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), 1.0);
    } else {
      float circle = smoothstep(0.5, 0.4, d) * 0.8;
      gl_FragColor = vec4(vColor + 0.2 * sin(uv.yxx + uTime + vRandom.y * 6.28), circle);
    }
  }
`;

const Particles: React.FC<ParticlesProps> = ({
  particleCount = 200,
  particleSpread = 10,
  speed = 0.1,
  particleColors,
  moveParticlesOnHover = false,
  particleHoverFactor = 1,
  alphaParticles = false,
  particleBaseSize = 100,
  sizeRandomness = 1,
  cameraDistance = 20,
  disableRotation = false,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rendererRef = useRef<Renderer | null>(null);
  const animationRef = useRef<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  // Detect mobile device once on mount
  useEffect(() => {
    const checkDevice = () => {
      const isMobileDevice = window.innerWidth <= 768;
      setIsMobile(isMobileDevice);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);
  
  // Cleanup function to ensure all WebGL resources are properly disposed
  const cleanupRenderer = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    if (rendererRef.current) {
      // Clean up WebGL context
      const canvas = rendererRef.current.gl.canvas;
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
      
      // Attempt to lose WebGL context to free up GPU resources
      const gl = rendererRef.current.gl;
      const loseContext = gl.getExtension('WEBGL_lose_context');
      if (loseContext) {
        loseContext.loseContext();
      }
      
      rendererRef.current = null;
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Skip rendering on low-end mobile devices
    if (isMobile && document.body.classList.contains('low-performance-device')) {
      container.innerHTML = '<div class="w-full h-full bg-opacity-20 bg-black"></div>';
      return;
    }
    
    // Perform safety checks before initializing WebGL
    if (!window.WebGLRenderingContext) {
      console.error("WebGL not supported by this browser");
      container.innerHTML = '<div class="w-full h-full bg-opacity-20 bg-black"></div>';
      return;
    }

    // Prevent WebGL initialization until the container has valid dimensions
    if (container.clientWidth <= 0 || container.clientHeight <= 0) {
      console.warn("Container has zero dimensions, delaying WebGL initialization");
      
      // Retry after a short delay to allow the DOM to update
      const dimensionCheckTimer = setTimeout(() => {
        if (container.clientWidth > 0 && container.clientHeight > 0) {
          // Now the container has valid dimensions, initialize WebGL
          const event = new Event('resize');
          window.dispatchEvent(event);
        }
      }, 500);
      
      return () => clearTimeout(dimensionCheckTimer);
    }
    
    // Adjusted values for mobile
    const actualParticleCount = isMobile ? Math.min(50, particleCount) : particleCount;
    const actualSpeed = isMobile ? speed * 0.5 : speed;
    const actualParticleSpread = isMobile ? particleSpread * 0.7 : particleSpread;
    
    try {
      // Create renderer with alpha transparency and basic depth testing
      const renderer = new Renderer({ 
        depth: false, 
        alpha: true, 
        antialias: false, // Disable antialiasing on mobile for better performance
        powerPreference: 'low-power' // Request low power mode on mobile
      });
      
      // Apply error handling for WebGL context creation failure
      if (!renderer || !renderer.gl) {
        throw new Error("Failed to create WebGL context");
      }
      
      rendererRef.current = renderer;
      
      const gl = renderer.gl;
      container.appendChild(gl.canvas);
      gl.clearColor(0, 0, 0, 0);

      const camera = new Camera(gl, { fov: 15 });
      camera.position.set(0, 0, cameraDistance);

      // Efficient resize handler
      let resizeTimeout: number;
      const resize = () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = window.setTimeout(() => {
          if (container && renderer) {
            const width = container.clientWidth;
            const height = container.clientHeight;
            
            // Check for valid dimensions before resizing
            if (width <= 0 || height <= 0) {
              console.warn("Invalid dimensions during resize", width, height);
              return;
            }
            
            renderer.setSize(width, height);
            camera.perspective({ aspect: width / height });
          }
        }, 250); // Debounce resize events
      };
      
      window.addEventListener("resize", resize, { passive: true });
      resize();

      // Only add mouse move handler if not on mobile
      const handleMouseMove = (e: MouseEvent) => {
        if (isMobile) return;
        
        const rect = container.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        mouseRef.current = { x, y };
      };

      if (moveParticlesOnHover && !isMobile) {
        container.addEventListener("mousemove", handleMouseMove, { passive: true });
      }

      const count = actualParticleCount;
      const positions = new Float32Array(count * 3);
      const randoms = new Float32Array(count * 4);
      const colors = new Float32Array(count * 3);
      const palette =
        particleColors && particleColors.length > 0
          ? particleColors
          : defaultColors;

      for (let i = 0; i < count; i++) {
        let x: number, y: number, z: number, len: number;
        do {
          x = Math.random() * 2 - 1;
          y = Math.random() * 2 - 1;
          z = Math.random() * 2 - 1;
          len = x * x + y * y + z * z;
        } while (len > 1 || len === 0);
        const r = Math.cbrt(Math.random());
        positions.set([x * r, y * r, z * r], i * 3);
        randoms.set(
          [Math.random(), Math.random(), Math.random(), Math.random()],
          i * 4,
        );
        const col = hexToRgb(palette[Math.floor(Math.random() * palette.length)]);
        colors.set(col, i * 3);
      }

      const geometry = new Geometry(gl, {
        position: { size: 3, data: positions },
        random: { size: 4, data: randoms },
        color: { size: 3, data: colors },
      });

      // Choose appropriate shaders based on mobile or desktop
      const program = new Program(gl, {
        vertex: isMobile ? vertexSimple : vertex,
        fragment: isMobile ? fragmentSimple : fragment,
        uniforms: {
          uTime: { value: 0 },
          uSpread: { value: actualParticleSpread },
          uBaseSize: { value: isMobile ? particleBaseSize * 0.7 : particleBaseSize },
          uSizeRandomness: { value: isMobile ? 0 : sizeRandomness },
          uAlphaParticles: { value: alphaParticles && !isMobile ? 1 : 0 },
        },
        transparent: true,
        depthTest: false,
      });

      const particles = new Mesh(gl, { mode: gl.POINTS, geometry, program });

      let lastTime = performance.now();
      let elapsed = 0;
      let lastFrameTime = 0;
      const frameInterval = isMobile ? 1000/30 : 0; // Limit to 30fps on mobile

      const update = (t: number) => {
        // Safety check to prevent render loops after cleanup
        if (!containerRef.current || !rendererRef.current) {
          return;
        }
        
        try {
          // Check if canvas is still valid
          if (!gl.canvas || gl.canvas.width <= 0 || gl.canvas.height <= 0) {
            console.warn("Invalid canvas dimensions, skipping render");
            if (animationRef.current) {
              animationRef.current = requestAnimationFrame(update);
            }
            return;
          }
          
          // Update time
          program.uniforms.uTime.value = t * 0.001 * actualSpeed;
          
          // Update mouse interaction if enabled
          if (moveParticlesOnHover) {
            program.uniforms.uMouse.value = [
              mouseRef.current.x * particleHoverFactor,
              mouseRef.current.y * particleHoverFactor
            ];
          }
          
          if (!disableRotation) {
            particles.rotation.y = t * 0.0001 * actualSpeed;
            particles.rotation.z = t * 0.00005 * actualSpeed;
          }
          
          // Draw
          renderer.render({ scene: particles, camera });
          
          // Continue animation loop
          if (animationRef.current) {
            animationRef.current = requestAnimationFrame(update);
          }
        } catch (error) {
          console.error("WebGL render error:", error);
          // Stop animation on error
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
          }
        }
      };

      animationRef.current = requestAnimationFrame(update);

      return () => {
        window.removeEventListener("resize", resize);
        
        if (moveParticlesOnHover && !isMobile) {
          container.removeEventListener("mousemove", handleMouseMove);
        }
        
        cleanupRenderer();
      };
    } catch (error) {
      console.error("WebGL error in Particles component:", error);
      // Fallback for WebGL errors
      container.innerHTML = '<div class="w-full h-full bg-opacity-10 bg-black"></div>';
      return cleanupRenderer;
    }
  }, [
    particleCount,
    particleSpread,
    speed,
    moveParticlesOnHover,
    particleHoverFactor,
    alphaParticles,
    particleBaseSize,
    sizeRandomness,
    cameraDistance,
    disableRotation,
    isMobile
  ]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full ${className || ""}`}
      aria-hidden="true"
    />
  );
};

export default Particles;
