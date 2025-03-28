import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import * as Progress from '@radix-ui/react-progress';

// Interface for individual skill
interface Skill {
  name: string;
  level: number;
  icon: React.ReactNode;
  color: string;
}

// Interface for skill category
interface SkillCategory {
  title: string;
  skills: Skill[];
}

interface CircularSkillsProps {
  categories: SkillCategory[];
}

// Function to convert level to angle for circle
const calculateStrokeDashoffset = (level: number) => {
  const circumference = 2 * Math.PI * 45; // 45 is the radius
  return circumference - (circumference * level) / 100;
};

// Fixed SVG settings
const SVG_SIZE = 100;
const CIRCLE_RADIUS = 45;
const CIRCLE_CENTER = SVG_SIZE / 2;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

const CircularSkills: React.FC<CircularSkillsProps> = ({ categories }) => {
  // Create refs for every circle to directly control the animation
  const circleRefs = useRef<Record<string, SVGCircleElement | null>>({});
  
  // Use IntersectionObserver to detect when skills come into view
  useEffect(() => {
    // Track which elements have already been animated
    const animatedElements = new Set<string>();
    
    const handleInView = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-skill-id');
          // Only animate if this element hasn't been animated before
          if (id && circleRefs.current[id] && !animatedElements.has(id)) {
            animatedElements.add(id); // Mark as animated
            const circle = circleRefs.current[id];
            const level = parseInt(entry.target.getAttribute('data-level') || '0');
            
            if (circle) {
              // Reset transition
              circle.style.transition = 'none';
              // Reset to full circle (starting position)
              circle.style.strokeDashoffset = `${CIRCUMFERENCE}`;
              
              // Force reflow
              void circle.getBoundingClientRect();
              
              // Force animation after a short delay to ensure proper rendering
              setTimeout(() => {
                // Animate to final position
                circle.style.transition = 'stroke-dashoffset 1.5s ease-out';
                circle.style.strokeDashoffset = `${CIRCUMFERENCE - (CIRCUMFERENCE * level) / 100}`;
              }, 50);
            }
          }
        }
      });
    };
    
    // Create observer with high sensitivity
    const observer = new IntersectionObserver(handleInView, { 
      threshold: 0.1,
      rootMargin: "0px" 
    });
    
    // Observe all skill containers
    const skillElements = document.querySelectorAll('.skill-container');
    skillElements.forEach((el) => observer.observe(el));
    
    // Also set up manual refresh on window resize and orientation change
    const refreshAnimations = () => {
      // No need to re-animate on resize or orientation change
      // Only apply to elements that haven't been animated yet
      skillElements.forEach((el) => {
        const id = el.getAttribute('data-skill-id');
        if (id && circleRefs.current[id] && !animatedElements.has(id)) {
          if (el.getBoundingClientRect().top < window.innerHeight) {
            animatedElements.add(id); // Mark as animated
            const circle = circleRefs.current[id];
            const level = parseInt(el.getAttribute('data-level') || '0');
            
            if (circle) {
              // Reset and animate
              circle.style.transition = 'none';
              circle.style.strokeDashoffset = `${CIRCUMFERENCE}`;
              void circle.getBoundingClientRect();
              
              setTimeout(() => {
                circle.style.transition = 'stroke-dashoffset 1.5s ease-out';
                circle.style.strokeDashoffset = `${CIRCUMFERENCE - (CIRCUMFERENCE * level) / 100}`;
              }, 50);
            }
          }
        }
      });
    };
    
    window.addEventListener('resize', refreshAnimations);
    window.addEventListener('orientationchange', refreshAnimations);
    
    return () => {
      skillElements.forEach((el) => observer.unobserve(el));
      window.removeEventListener('resize', refreshAnimations);
      window.removeEventListener('orientationchange', refreshAnimations);
    };
  }, []);
  
  return (
    <div className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {categories.map((category, catIndex) => (
          <motion.div 
            key={catIndex}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: catIndex * 0.1, duration: 0.5 }}
            className="p-6 rounded-xl bg-black/30 border border-violet-500/20 hover:border-violet-500/50 shadow-xl transition-all duration-300"
          >
            <h3 className="text-xl font-bold mb-6 text-center">{category.title}</h3>
            <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:gap-8">
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skillIndex}
                  className="flex flex-col items-center skill-card-hover"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: catIndex * 0.05 + skillIndex * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Simpler SVG approach that works better on mobile */}
                  <div 
                    className="relative skill-container" 
                    style={{ width: '100px', height: '100px' }}
                    data-skill-id={`skill-${catIndex}-${skillIndex}`}
                    data-level={skill.level}
                  >
                    {/* Background circle */}
                    <svg width={SVG_SIZE} height={SVG_SIZE} viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}>
                      <circle 
                        cx={CIRCLE_CENTER} 
                        cy={CIRCLE_CENTER} 
                        r={CIRCLE_RADIUS} 
                        fill="transparent" 
                        stroke="rgba(255, 255, 255, 0.1)" 
                        strokeWidth="8" 
                      />
                      
                      {/* Progress circle with gradient */}
                      <defs>
                        <linearGradient id={`skillGradient-${catIndex}-${skillIndex}`} x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#3A29FF" />
                          <stop offset="100%" stopColor="#FF3232" />
                        </linearGradient>
                      </defs>
                      
                      <circle 
                        ref={(el) => {
                          circleRefs.current[`skill-${catIndex}-${skillIndex}`] = el;
                        }}
                        cx={CIRCLE_CENTER} 
                        cy={CIRCLE_CENTER} 
                        r={CIRCLE_RADIUS} 
                        fill="transparent" 
                        stroke={`url(#skillGradient-${catIndex}-${skillIndex})`}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={CIRCUMFERENCE}
                        strokeDashoffset={CIRCUMFERENCE}
                        className="circular-progress"
                        style={{ 
                          transition: 'none',
                        }}
                      />
                    </svg>
                    
                    {/* Percentage in the middle */}
                    <div 
                      className="absolute inset-0 flex items-center justify-center flex-col"
                      style={{ top: 0, left: 0, right: 0, bottom: 0 }}
                    >
                      <motion.span 
                        className="text-xl font-bold"
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ 
                          duration: 0.5, 
                          delay: catIndex * 0.05 + skillIndex * 0.1 + 0.2
                        }}
                      >
                        {skill.level}%
                      </motion.span>
                    </div>
                    
                    {/* Icon at the top with improved mobile visibility */}
                    <div className="skill-icon-container">
                      {skill.icon}
                    </div>
                  </div>
                  
                  <motion.h4 
                    className="text-center font-semibold text-base mt-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      delay: catIndex * 0.05 + skillIndex * 0.1 + 0.3,
                      duration: 0.5
                    }}
                  >
                    {skill.name}
                  </motion.h4>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CircularSkills; 