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
        // If enough time has elapsed since the last frame or not mobile
        if (t - lastFrameTime >= frameInterval || !isMobile) {
          lastFrameTime = t;
          
          const delta = Math.min(32, t - lastTime); // Cap delta time
          lastTime = t;
          elapsed += delta * actualSpeed;

          if (!isMobile) {
            program.uniforms.uTime.value = elapsed * 0.001;
          }

          if (moveParticlesOnHover && !isMobile) {
            particles.position.x = -mouseRef.current.x * particleHoverFactor;
            particles.position.y = -mouseRef.current.y * particleHoverFactor;
          } else {
            particles.position.x = 0;
            particles.position.y = 0;
          }

          if (!disableRotation && !isMobile) {
            particles.rotation.x = Math.sin(elapsed * 0.0001) * 0.1;
            particles.rotation.y = Math.cos(elapsed * 0.0002) * 0.15;
            particles.rotation.z += 0.005 * actualSpeed;
          }

          // Only render if container is visible
          const rect = container.getBoundingClientRect();
          if (
            rect.bottom >= 0 &&
            rect.top <= window.innerHeight &&
            rect.right >= 0 &&
            rect.left <= window.innerWidth
          ) {
            renderer.render({ scene: particles, camera });
          }
        }
        
        // Store animation frame ID for cleanup
        animationRef.current = requestAnimationFrame(update);
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
