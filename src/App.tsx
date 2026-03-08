import React, { useState, useEffect, useRef, TouchEvent, useCallback, Suspense, lazy } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  Github,
  Linkedin,
  Youtube,
  User,
  GraduationCap,
  Code,
  BookOpen,
  Rocket,
  BarChart2,
} from 'lucide-react';
 
 
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ShinyText from './cpmponents/TextAnimations/ShinyText/ShinyText';
import SplitText from './cpmponents/TextAnimations/SplitText/SplitText';
 
import RotatingText from './cpmponents/TextAnimations/RotatingText/RotatingText';
 
const TiltedCard = lazy(() => import('./cpmponents/Components/TiltedCard/TiltedCard'));
import GlassIcons from './cpmponents/Components/GlassIcons/GlassIcons';
import Marquee from 'react-fast-marquee';
import ShadcnNavbar from './cpmponents/Navbar/ShadcnNavbar';
import { 
  FaReact, 
  FaNodeJs, 
  FaPython, 
  FaGithub, 
  FaHtml5, 
  FaCss3Alt, 
  FaJs, 
  FaLinux, 
  FaTerminal, 
  FaCode, 
  FaLaptopCode,
  FaYoutube,
  FaGitAlt
} from 'react-icons/fa';
import { SiTailwindcss, SiTypescript, SiC, SiVercel } from 'react-icons/si';
import { MdSettingsSuggest } from 'react-icons/md';
import { BiSolidBrain } from 'react-icons/bi';
import CircularSkills from './cpmponents/Components/Skills/CircularSkills';
 
 
const InfiniteMovingCardsDemo = lazy(() => import("./components/infinite-moving-cards-demo"));
const ExperienceSection = lazy(() => import('./components/ExperienceSection'));
const Particles = lazy(() => import('./cpmponents/Backgrounds/Particles/Particles'));
// Import the GoogleGeminiEffectDemo component
 
const ContactForm = lazy(() => import('./cpmponents/ContactForm/ContactForm'));
const HomeBlogSection = lazy(() => import('./components/HomeBlogSection'));
import { WebsiteStructuredData, PersonStructuredData } from "./components/StructuredData";

import './styles/mobile-card-fix.css';
const CardDemo = lazy(() => import('./components/cards-demo-1'));
import { FlickeringGrid } from './components/magicui/flickering-grid';
// SEO component with Helmet
const SEOHelmet = () => {
  return (
    <Helmet>
      <title>Shreyas | Tech Enthusiast</title>
      <meta name="description" content="Shreyas J is a Computer Science & Engineering student with a focus on Artificial Intelligence and Machine Learning. Follow his journey, projects, and tech insights through his portfolio website." />
      <meta name="keywords" content="Shreyas, tech enthusiast, React, TypeScript, web development, portfolio, front-end developer, full-stack developer, content creator" />
      <link rel="canonical" href="https://iamshreyas.live" />
      
      {/* Structured data for Person */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Shreyas",
          "url": "https://iamshreyas.live",
          "image": "https://i.ibb.co/B55KFGh2/IMG-1106.jpg",
          "sameAs": [
            "https://github.com/SmartKidzee",
            "https://www.linkedin.com/in/smartshreyas/",
            "https://youtube.com/SmartKidzee",
            "https://x.com/KidzeeSmart"
          ],
          "jobTitle": "Software Engineer",
          "worksFor": {
            "@type": "Organization",
            "name": "Freelance"
          },
          "description": "Full Stack Software Engineer specializing in React, TypeScript and modern web technologies."
        })}
      </script>
      
      {/* Structured data for WebSite */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite", 
          "name": "Shreyas Portfolio",
          "url": "https://iamshreyas.live",
          "description": "Shreyas J is a Computer Science & Engineering student with a focus on Artificial Intelligence and Machine Learning. Follow his journey, projects, and tech insights through his portfolio website.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://iamshreyas.live/blogs?search={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        })}
      </script>
    </Helmet>
  );
};

// Stats Item Component (unused helper removed)

function App() {
  const [cursorTrails, setCursorTrails] = useState<
    { x: number; y: number; id: string }[]
  >([]);
  const trailIdCounter = useRef(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  const [isMobile, setIsMobile] = useState(false);
  
  
  
  
  const location = useLocation();
  const blogsSectionRef = useRef<HTMLElement>(null);
  

  // Add touch handlers for stats
  

  const sections = [
    'home',
    'stats',
    'about',
    'experience',
    'education',
    'skills',
    'projects',
    'blogs',
    'contact',
  ];

  // Define the scrollTo function before it's used
  const scrollTo = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      
      // Set the active section
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  }, [setActiveSection, setIsMenuOpen]);

  // Configure dock items for navigation
  // Dock items (unused placeholder removed)

  // Stats data (unused placeholder removed)

  // Refs for DOM elements

  // Force consistent font sizing - fix for text resizing issues
  useEffect(() => {
    // Set viewport height for mobile browsers
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    // Disable font size adjustment on mobiles
    const disableFontSizeAdjust = () => {
      document.documentElement.style.setProperty('-webkit-text-size-adjust', '100%');
      document.documentElement.style.setProperty('text-size-adjust', '100%');
      
      // Add meta tag dynamically to disable viewport zooming/text-size-adjustment
      let meta = document.querySelector('meta[name="viewport"]');
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'viewport');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
      
      // Add a style tag for the logo font if it doesn't exist
      let logoStyle = document.getElementById('logo-text-style');
      if (!logoStyle) {
        logoStyle = document.createElement('style');
        logoStyle.id = 'logo-text-style';
        logoStyle.innerHTML = `
          .logo-text {
            font-display: swap;
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        `;
        document.head.appendChild(logoStyle);
      }
    };
    
    setVh();
    disableFontSizeAdjust();
    
    // Apply these fixes both on initial load and resize
    window.addEventListener('resize', setVh);
    window.addEventListener('orientationchange', () => {
      setVh();
      disableFontSizeAdjust();
      
      // Re-apply after orientation change with delay
      setTimeout(disableFontSizeAdjust, 100);
      setTimeout(disableFontSizeAdjust, 500);
    });
    
    // Re-apply on page load and after load events
    window.addEventListener('load', disableFontSizeAdjust);
    window.addEventListener('DOMContentLoaded', disableFontSizeAdjust);
    
    // Force application multiple times to catch any changes
    setTimeout(disableFontSizeAdjust, 500);
    setTimeout(disableFontSizeAdjust, 1000);
    setTimeout(disableFontSizeAdjust, 2000);
    
    return () => {
      window.removeEventListener('resize', setVh);
      window.removeEventListener('orientationchange', setVh);
      window.removeEventListener('load', disableFontSizeAdjust);
      window.removeEventListener('DOMContentLoaded', disableFontSizeAdjust);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newTrail = { 
        x: e.clientX, 
        y: e.clientY, 
        id: `${Date.now()}-${trailIdCounter.current++}` 
      };
      setCursorTrails((prev) =>
        [...prev, newTrail].filter(
          (trail) => Date.now() - parseInt(trail.id.split('-')[0]) < 800
        )
      );
    };

    const handleScroll = () => {
      const currentPosition = window.scrollY + 100;
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            currentPosition >= offsetTop &&
            currentPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections, setActiveSection]);

  // Clean up old cursor trails
  useEffect(() => {
    const cleanup = setInterval(() => {
      setCursorTrails((prev) =>
        prev.filter((trail) => Date.now() - parseInt(trail.id.split('-')[0]) < 800)
      );
    }, 50);
    return () => clearInterval(cleanup);
  }, []);

  // Enhanced cursor trail effect
  const getRandomColor = () => {
    const colors = ['#dc2626', '#b91c1c', '#f87171'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getRandomSize = () => Math.floor(Math.random() * 4) + 3; // Random size between 3-6px

  // Add useScroll hook for progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Add scroll progress calculation with more precise measurements
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollableHeight = documentHeight - windowHeight;
      
      // Ensure progress doesn't exceed 1.0 (100%)
      const progress = Math.min(scrollTop / scrollableHeight, 1.0);
      
      // Update the progress bar width
      const progressBar = document.querySelector('.scroll-progress-bar') as HTMLElement;
      if (progressBar) {
        progressBar.style.transform = `scaleX(${progress})`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Skills categories (unused placeholder removed)

  // Legacy skills data (unused placeholder removed)

  // Confetti helper (unused placeholder removed)

  // Update device detection to fix navbar rendering
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      // setIsTablet(width > 768 && width <= 1024);
      // setIsPortrait(window.innerHeight > window.innerWidth);
      
      // Ensure navbar is properly displayed on mobile
      const navbarElement = document.querySelector('.shadcn-navbar');
      if (navbarElement) {
        navbarElement.classList.toggle('mobile-view', width <= 768);
        // Force display on mobile
        if (width <= 768) {
          navbarElement.setAttribute('style', 'display: block !important; visibility: visible !important; opacity: 1 !important;');
          const mobileButton = document.querySelector('.shadcn-navbar-mobile-trigger');
          if (mobileButton) {
            mobileButton.setAttribute('style', 'display: flex !important; visibility: visible !important; opacity: 1 !important;');
          }
        }
      }
    };
    
    // Initial check
    checkDevice();
    // Set up listeners
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', checkDevice);
    
    // Add a small delay to ensure the DOM is ready
    setTimeout(checkDevice, 100);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

  // Add scroll functions
  // Blog carousel helpers removed (not used in this file)

  // Add event listener for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        e.preventDefault();
        const section = anchor.hash.substring(1);
        scrollTo(section);
        
        // Close mobile menu if open
        if (isMenuOpen) {
          setIsMenuOpen(false);
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, [isMenuOpen]);

  // Ensure mobile menu closes on touch outside
  useEffect(() => {
    if (!isMenuOpen) return;
    
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const mobileMenu = document.querySelector('.mobile-nav-menu');
      const menuButton = document.querySelector('.mobile-menu-button');
      
      if (mobileMenu && menuButton) {
        const target = e.target as Node;
        if (!mobileMenu.contains(target) && !menuButton.contains(target)) {
          setIsMenuOpen(false);
        }
      }
    };
    
    document.addEventListener('touchstart', handleClickOutside as EventListener);
    document.addEventListener('mousedown', handleClickOutside as EventListener);
    
    return () => {
      document.removeEventListener('touchstart', handleClickOutside as EventListener);
      document.removeEventListener('mousedown', handleClickOutside as EventListener);
    };
  }, [isMenuOpen]);

  // Mobile navigation helper removed (not used)

  // Handle touch events separately for better mobile support (helpers removed if unused)

  // When section changes, update active state
  useEffect(() => {
    // Close menu when section changes
    setIsMenuOpen(false);
    
    // Removed confetti effect for sections
    
  }, [activeSection, setIsMenuOpen]);

  // Ensure mobile menu closes on touch outside
  useEffect(() => {
    if (!isMenuOpen) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const mobileMenu = document.querySelector('.mobile-nav-menu');
      const menuButton = document.querySelector('.mobile-menu-button');
      
      if (mobileMenu && menuButton) {
        // If clicked outside menu and button, close menu
        if (!mobileMenu.contains(target) && !menuButton.contains(target)) {
          setIsMenuOpen(false);
        }
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Handle hash navigation (for "#blogs" anchor)
  useEffect(() => {
    if (location.hash === '#blogs') {
      // Use a small timeout to ensure the page is fully loaded
      setTimeout(() => {
        if (blogsSectionRef.current) {
          // Reset scroll position first
          window.scrollTo(0, 0);
          // Then scroll to blogs section with smooth behavior
          blogsSectionRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start'
          });
        }
      }, 100);
    }
  }, [location]);

  useEffect(() => {
    localStorage.setItem('hasVisitedBefore', 'true');
  }, []);

  return (
    <>
      <SEOHelmet />
      
      <WebsiteStructuredData 
        url="https://iamshreyas.live"
        name="Shreyas | Tech Enthusiast"
        description="Shreyas J is a Computer Science & Engineering student with a focus on Artificial Intelligence and Machine Learning. Follow his journey, projects, and tech insights through his portfolio website."
        searchUrl="https://iamshreyas.live/search"
      />
      <PersonStructuredData 
        name="Shreyas J"
        jobTitle="Tech Enthusiast"
        description="Shreyas J is a Computer Science & Engineering student with a focus on Artificial Intelligence and Machine Learning. Follow his journey, projects, and tech insights through his portfolio website."
        imageUrl="https://iamshreyas.live/profile.jpg"
        url="https://iamshreyas.live"
        sameAsLinks={[
          "https://github.com/SmartKidzee",
          "https://linkedin.com/in/smartshreyas",
          "https://twitter.com/kidzeesmart",
          "https://instagram.com/smartkidzee"
        ]}
      />
      

      <div className="min-h-screen bg-vibrant-bg text-white">
        {/* Cursor Trails */}
        {cursorTrails.map((trail) => (
          <div
            key={trail.id}
            className="cursor-trail"
            style={{ 
              left: `${trail.x}px`, 
              top: `${trail.y}px`,
              width: `${getRandomSize()}px`,
              height: `${getRandomSize()}px`,
              background: getRandomColor(),
            }}
          />
        ))}

        {/* Scroll Progress Bar - Always visible now */}
        <motion.div
          className="scroll-progress-bar"
          style={{ scaleX }}
        />

        {/* Navigation - Force render with key to ensure updates */}
        <ShadcnNavbar 
          sections={sections} 
          activeSection={activeSection} 
          scrollTo={(section: string) => scrollTo(section)}
        />

        {/* Main Content */}
        <main className="md:pt-16 pt-0 pb-24">
          {/* Hero Section */}
          <section id="home" className="min-h-[100svh] relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#fd2601] to-[#f37e1c] text-white selection:bg-white selection:text-[#fd2601]">
            {/* Ambient Background Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
              <div className="text-[25vw] font-['Anton'] opacity-[0.08] blur-[4px] whitespace-nowrap tracking-widest text-center select-none leading-none">
                SHREYAS
              </div>
            </div>

            {/* Glowing Blobs */}
            <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] bg-[#F4791B] rounded-full blur-[80px] mix-blend-screen opacity-60 pointer-events-none z-0" />
            <div className="absolute bottom-[-20%] left-[-20%] w-[600px] h-[300px] bg-[#F4791B] rounded-full blur-[80px] mix-blend-screen opacity-60 pointer-events-none z-0" />

            {/* Main Centered Hero */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center min-h-[100svh] pt-24 md:pt-20">
              <div className="relative w-full flex flex-col items-center justify-center mt-8 md:mt-0 min-h-[40vh] md:min-h-[50vh]">
                
                {/* Portrait Image — BEHIND the headline */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[220px] sm:w-[280px] md:w-[440px] aspect-[3/4] z-[5] pointer-events-none drop-shadow-[0_0_60px_rgba(253,38,1,0.35)]">
                  <img
                    src="https://i.ibb.co/B55KFGh2/IMG-1106.jpg" 
                    alt="Shreyas"
                    className="w-full h-full object-cover object-top rounded-[2rem]"
                    loading="eager"
                  />
                </div>

                {/* Massive Headline — ON TOP of the photo */}
                <h1 className="font-['Anton'] text-[14vw] sm:text-[13vw] md:text-[min(11vw,170px)] leading-[0.85] tracking-wide text-center uppercase md:whitespace-nowrap z-10 mx-auto w-full relative drop-shadow-2xl">
                  <span className="block md:inline-block">BUILDING</span>
                  <span className="block md:inline-block md:ml-4">THE</span>
                  <span className="block md:inline-block md:ml-4">FUTURE</span>
                </h1>

              </div>

              {/* Floating Elements (Desktop + Mobile alignment) */}
              <div className="w-full mt-6 md:mt-24 pb-28 md:pb-0 flex flex-col md:flex-row justify-between items-start md:items-end z-30 gap-6 md:gap-0 px-2 md:px-0">
                <div className="font-['Inter'] text-xs sm:text-sm md:text-base max-w-xs uppercase tracking-widest leading-relaxed">
                  <span className="opacity-80">
                    // I'm Shreyas — an upcoming agentic engineer,<br/>
                    student & content creator<br/>
                    specializing in AI & FullStack.
                  </span>
                </div>
                
                <div className="font-['Inter'] font-semibold text-sm sm:text-lg md:text-2xl tracking-widest uppercase text-left md:text-right max-w-sm">
                  // CODE THAT <br/>
                  SPEAKS YOUR VISION
                </div>
              </div>
            </div>

            {/* Brand Strip / Tech Stack Footer inside Hero */}
            <div className="absolute bottom-0 left-0 w-full pb-8 pt-12 z-40 bg-gradient-to-t from-[#f37e1c] to-transparent overflow-hidden">
              <div className="w-full whitespace-nowrap overflow-hidden">
                <div className="inline-block animate-marquee-fast">
                  {/* Repeat the tech stack content twice to create a seamless infinite scroll loop */}
                  <span className="font-['Inter'] font-bold tracking-widest text-lg md:text-xl drop-shadow-md mx-8 opacity-90">REACT</span>
                  <span className="font-['Inter'] font-bold tracking-widest text-lg md:text-xl drop-shadow-md mx-8 opacity-90">TYPESCRIPT</span>
                  <span className="font-['Inter'] font-bold tracking-widest text-lg md:text-xl drop-shadow-md mx-8 opacity-90">NEXT.JS</span>
                  <span className="font-['Inter'] font-bold tracking-widest text-lg md:text-xl drop-shadow-md mx-8 opacity-90">TAILWIND</span>
                  <span className="font-['Inter'] font-bold tracking-widest text-lg md:text-xl drop-shadow-md mx-8 opacity-90">NODE.JS</span>
                  <span className="font-['Inter'] font-bold tracking-widest text-lg md:text-xl drop-shadow-md mx-8 opacity-90">VERCEL</span>
                  <span className="font-['Inter'] font-bold tracking-widest text-lg md:text-xl drop-shadow-md mx-8 opacity-90">REACT</span>
                  <span className="font-['Inter'] font-bold tracking-widest text-lg md:text-xl drop-shadow-md mx-8 opacity-90">TYPESCRIPT</span>
                  <span className="font-['Inter'] font-bold tracking-widest text-lg md:text-xl drop-shadow-md mx-8 opacity-90">NEXT.JS</span>
                  <span className="font-['Inter'] font-bold tracking-widest text-lg md:text-xl drop-shadow-md mx-8 opacity-90">TAILWIND</span>
                  <span className="font-['Inter'] font-bold tracking-widest text-lg md:text-xl drop-shadow-md mx-8 opacity-90">NODE.JS</span>
                  <span className="font-['Inter'] font-bold tracking-widest text-lg md:text-xl drop-shadow-md mx-8 opacity-90">VERCEL</span>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section id="stats" className="py-16 bg-vibrant-bg-alt text-vibrant-text relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="font-['Anton'] text-4xl md:text-5xl uppercase tracking-widest text-[#fd2601] drop-shadow-md inline-flex items-center">
                  <BarChart2 className="w-8 h-8 mr-3 " /> 
                  <SplitText 
                    text="My Stats" 
                    delay={40} 
                    className=""
                    animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
                    animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                  />
                </h2>
              </motion.div>
              <Suspense fallback={<div className="h-32 w-full" />}>
                <InfiniteMovingCardsDemo />
              </Suspense>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-16 md:py-20 bg-vibrant-bg relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="font-['Anton'] text-4xl md:text-5xl uppercase tracking-widest text-[#fd2601] drop-shadow-md inline-flex items-center">
                  <User className="w-8 h-8 mr-3 " /> 
                  <SplitText 
                    text="About Me" 
                    delay={40} 
                    className=""
                    animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
                    animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                  />
                </h2>
              </motion.div>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="space-y-8 apple-glass"
                >
                  <motion.p
                    className="text-gray-300 text-lg leading-relaxed min-h-[4.5rem] sm:min-h-[3rem] md:min-h-[3rem]"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    {"I'm Shreyas, a Sophomore Computer Science and Engineering undergraduate at The National Institute of Engineering, Mysuru, specializing in Artificial Intelligence and Machine Learning."}
                  </motion.p>
                  
                  <motion.p
                    className="text-gray-300 text-lg leading-relaxed min-h-[9rem] sm:min-h-[6rem] md:min-h-[6rem]"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {"I'm passionate about technology and enjoy diving deep into the ever-evolving world of AI and software development. When I'm not exploring the latest tech trends, you'll find me creating content for my YouTube channel, sharing insights as an Apple fanboy, or gaming on my PS5."}
                  </motion.p>
                  
                  <motion.p
                    className="text-gray-300 text-lg leading-relaxed min-h-[9rem] sm:min-h-[6rem] md:min-h-[6rem]"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    {"This website is built with Vite, React, and TypeScript, designed for speed, flexibility, and a modern experience. It's a step up from my earlier HTML & CSS site, bringing interactive elements and animations to showcase my work more dynamically."}
                  </motion.p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative group about-image-container mx-auto flex items-center justify-center p-4"
                >
                  <div 
                    className="profile-tilted-card w-full h-full aspect-square relative z-10"
                    onMouseMove={(e) => {
                      // Throttle mousemove events for better performance
                      if (!e.currentTarget.dataset.lastMove || 
                          Number(e.currentTarget.dataset.lastMove) < Date.now() - 25) {
                        
                        const card = e.currentTarget;
                        const rect = card.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        const centerX = rect.width / 2;
                        const centerY = rect.height / 2;
                        
                        // Calculate rotation values with damping for smoother effect
                        const rotateY = ((x - centerX) / centerX) * 6; // Reduced for smoother effect
                        const rotateX = ((centerY - y) / centerY) * 6; // Reduced for smoother effect
                        
                        // Set CSS variables for the 3D effect
                        card.style.setProperty('--rotateX', `${rotateX}deg`);
                        card.style.setProperty('--rotateY', `${rotateY}deg`);
                        
                        // Set mouse position for glow effect
                        const mouseX = ((x / rect.width) * 100);
                        const mouseY = ((y / rect.height) * 100);
                        card.style.setProperty('--mouse-x', `${mouseX}%`);
                        card.style.setProperty('--mouse-y', `${mouseY}%`);
                        
                        // Record last move time for throttling
                        card.dataset.lastMove = Date.now().toString();
                      }
                    }}
                    onMouseLeave={(e) => {
                      const card = e.currentTarget;
                      // Reset rotations when mouse leaves with smooth transition
                      card.style.setProperty('--rotateX', '0deg');
                      card.style.setProperty('--rotateY', '0deg');
                    }}
                  >
                    {/* Corner accent elements */}
                    <div className="corner corner-top-left"></div>
                    <div className="corner corner-top-right"></div>
                    <div className="corner corner-bottom-left"></div>
                    <div className="corner corner-bottom-right"></div>
                    
                    <TiltedCard 
                      imageSrc="/about-me.JPEG"
                      altText="Tech"
                      containerHeight="auto"
                      containerWidth="100%"
                      imageHeight="auto"
                      imageWidth="100%"
                      rotateAmplitude={5}
                      scaleOnHover={1.02}
                      showMobileWarning={false}
                      showTooltip={false}
                      displayOverlayContent={false}
                    />
                    <div className="profile-card-glow"></div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <Suspense fallback={<div className="h-screen w-full flex items-center justify-center"><div className="w-8 h-8 border-4 border-vibrant-orange border-t-transparent rounded-full animate-spin"></div></div>}>
            <ExperienceSection />
          </Suspense>

          {/* Education Section */}
          <section id="education" className="py-16 md:py-20 bg-vibrant-bg relative overflow-hidden">
            <div className="absolute inset-0 z-0 backdrop-blur-xl bg-gradient-to-b from-vibrant-bg/80 to-vibrant-orange-gradient-alt/80"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="font-['Anton'] text-4xl md:text-5xl uppercase tracking-widest text-[#fd2601] drop-shadow-md inline-flex items-center">
                  <GraduationCap className="w-8 h-8 mr-3 " /> 
                  <SplitText 
                    text="Education" 
                    delay={40} 
                    className=""
                    animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
                    animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                  />
                </h2>
              </motion.div>
              <div className="space-y-8 max-w-3xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="apple-glass-card relative group"
                  whileHover={{ 
                    translateY: -5, 
                    transition: { duration: 0.2 } 
                  }}
                >
                  {/* Glass card effect */}
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl"></div>
                  
                  {/* Card glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-vibrant-orange to-vibrant-orange-gradient opacity-0 group-hover:opacity-30 rounded-xl blur-lg transition-opacity duration-500"></div>
                  
                  {/* Card content */}
                  <div className="relative p-6 rounded-xl overflow-hidden">
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    <h3 className="text-xl font-bold mb-2 text-white">
                      The National Institute Of Engineering, Mysore
                    </h3>
                    <p className="text-vibrant-orange mb-2 flex items-center">
                      <span className="h-2 w-2 rounded-full bg-vibrant-orange inline-block mr-2"></span>
                      Bachelor of Engineering - BE, Computer Science (Specialisation
                      in AI & ML)
                    </p>
                    <p className="text-[#94A3B8] flex items-center">
                      <span className="h-2 w-2 rounded-full bg-[#94A3B8] inline-block mr-2"></span>
                      Sep 2024 - Jul 2028
                    </p>
                    <p className="text-vibrant-text mt-2 flex items-center">
                      <span className="h-2 w-2 rounded-full bg-[#E2E8F0] inline-block mr-2"></span>
                      Activities: Tech Enthusiast, ISSA
                    </p>
                    <p className="text-[#FACC15] mt-2 flex items-center font-semibold">
                      <span className="h-2 w-2 rounded-full bg-[#FACC15] inline-block mr-2"></span>
                      CGPA: 9.33
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="apple-glass-card relative group"
                  whileHover={{ 
                    translateY: -5, 
                    transition: { duration: 0.2 } 
                  }}
                >
                  {/* Glass card effect */}
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl"></div>
                  
                  {/* Card glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-vibrant-orange to-vibrant-orange-gradient opacity-0 group-hover:opacity-30 rounded-xl blur-lg transition-opacity duration-500"></div>
                  
                  {/* Card content */}
                  <div className="relative p-6 rounded-xl overflow-hidden">
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    <h3 className="text-xl font-bold mb-2 text-white">
                      Pramati Hill View Academy
                    </h3>
                    <p className="text-vibrant-orange mb-2 flex items-center">
                      <span className="h-2 w-2 rounded-full bg-vibrant-orange inline-block mr-2"></span>
                      Senior Secondary Certificate - 12th board
                    </p>
                    <p className="text-[#94A3B8] flex items-center">
                      <span className="h-2 w-2 rounded-full bg-[#94A3B8] inline-block mr-2"></span>
                      2022 - 2024
                    </p>
                    <p className="text-vibrant-text mt-2 flex items-center font-semibold">
                      <span className="h-2 w-2 rounded-full bg-[#E2E8F0] inline-block mr-2"></span>
                      CGPA: 8.0
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="apple-glass-card relative group"
                  whileHover={{ 
                    translateY: -5, 
                    transition: { duration: 0.2 } 
                  }}
                >
                  {/* Glass card effect */}
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 shadow-2xl"></div>
                  
                  {/* Card glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-vibrant-orange to-vibrant-orange-gradient opacity-0 group-hover:opacity-30 rounded-xl blur-lg transition-opacity duration-500"></div>
                  
                  {/* Card content */}
                  <div className="relative p-6 rounded-xl overflow-hidden">
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    <h3 className="text-xl font-bold mb-2 text-white">The Acme School</h3>
                    <p className="text-vibrant-orange mb-2 flex items-center">
                      <span className="h-2 w-2 rounded-full bg-vibrant-orange inline-block mr-2"></span>
                      Secondary School Certificate - 10th board
                    </p>
                    <p className="text-vibrant-text mt-2 flex items-center font-semibold">
                      <span className="h-2 w-2 rounded-full bg-[#FACC15] inline-block mr-2"></span>
                      Percentage: 95.2%
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="py-16 md:py-20 relative overflow-hidden with-particles">
            {/* Particles Background */}
            <div className="particles-container">
              <Particles
                particleColors={['#f1c40f', '#3498db', '#e74c3c']}
                particleCount={200}
                particleSpread={10}
                speed={0.1}
                particleBaseSize={100}
                moveParticlesOnHover={true}
                alphaParticles={true}
                disableRotation={false}
              />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="font-['Anton'] text-4xl md:text-5xl uppercase tracking-widest text-[#fd2601] drop-shadow-md inline-flex items-center">
                  <Code className="w-8 h-8 mr-3 " /> 
                  <SplitText 
                    text="Skills" 
                    delay={40} 
                    className=""
                    animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
                    animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                  />
                </h2>
              </motion.div>

              {/* Skills Marquee */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
              >
                <Marquee 
                  speed={50} 
                  gradient={false}
                  className="py-8 bg-black/30 rounded-xl overflow-hidden marquee-container"
                >
                  <div className="flex space-x-16 md:space-x-20 mx-8 items-center">
                    <FaPython size={40} className="text-yellow-500" />
                    <FaReact size={40} className="text-blue-400" />
                    <FaNodeJs size={40} className="text-green-500" />
                    <FaJs size={40} className="text-yellow-400" />
                    <FaHtml5 size={40} className="text-orange-500" />
                    <FaCss3Alt size={40} className="text-blue-500" />
                    <SiC size={40} className="text-blue-400" />
                    <SiTailwindcss size={40} className="text-cyan-400" />
                    <SiTypescript size={40} className="text-blue-600" />
                    <FaGithub size={40} className="text-white" />
                    <FaGitAlt size={40} className="text-orange-600" />
                    <FaLinux size={40} className="text-white" />
                    <BiSolidBrain size={40} className="text-purple-500" />
                    <FaLaptopCode size={40} className="text-green-400" />
                    <FaYoutube size={40} className="text-red-500" />
                  </div>
                </Marquee>
              </motion.div>

              {/* Circular Skills Component */}
              <CircularSkills 
                categories={[
                  {
                    title: "💻 Programming Languages",
                    skills: [
                      { 
                        name: 'Python', 
                        level: 80, 
                        icon: <FaPython className="text-yellow-500" size={24} />,
                        color: "#f1c40f"
                      },
                      { 
                        name: 'JavaScript', 
                        level: 60, 
                        icon: <FaJs className="text-yellow-400" size={24} />,
                        color: "#f39c12" 
                      },
                      { 
                        name: 'C', 
                        level: 60, 
                        icon: <SiC className="text-blue-400" size={24} />,
                        color: "#3498db" 
                      },
                      { 
                        name: 'TypeScript', 
                        level: 55, 
                        icon: <SiTypescript className="text-blue-600" size={24} />,
                        color: "#2980b9" 
                      }
                    ]
                  },
                  {
                    title: "🌐 Web Development",
                    skills: [
                      { 
                        name: 'HTML & CSS', 
                        level: 85, 
                        icon: <div className="flex"><FaHtml5 className="text-orange-500 mr-1" size={20} /><FaCss3Alt className="text-blue-500" size={20} /></div>,
                        color: "#e74c3c" 
                      },
                      { 
                        name: 'React', 
                        level: 60, 
                        icon: <FaReact className="text-blue-400" size={24} />,
                        color: "#3498db" 
                      },
                      { 
                        name: 'Tailwind', 
                        level: 65, 
                        icon: <SiTailwindcss className="text-cyan-400" size={24} />,
                        color: "#06b6d4" 
                      },
                      { 
                        name: 'Vercel', 
                        level: 75, 
                        icon: <SiVercel className="text-white" size={24} />,
                        color: "#6c5ce7" 
                      }
                    ]
                  },
                  {
                    title: "⚙️ Tools & Platforms",
                    skills: [
                      { 
                        name: 'Linux', 
                        level: 60, 
                        icon: <FaLinux className="text-white" size={24} />,
                        color: "#ffffff" 
                      },
                      { 
                        name: 'Terminal', 
                        level: 65, 
                        icon: <FaTerminal className="text-gray-100" size={24} />,
                        color: "#a29bfe" 
                      },
                      { 
                        name: 'VS Code', 
                        level: 80, 
                        icon: <MdSettingsSuggest className="text-blue-400" size={24} />,
                        color: "#0984e3" 
                      },
                      { 
                        name: 'Vercel', 
                        level: 70, 
                        icon: <SiVercel className="text-gray-100" size={24} />,
                        color: "#6c5ce7" 
                      }
                    ]
                  },
                  {
                    title: "📌 Other Skills",
                    skills: [
                      { 
                        name: 'AI Basics', 
                        level: 40, 
                        icon: <BiSolidBrain className="text-purple-500" size={24} />,
                        color: "#8e44ad" 
                      },
                      { 
                        name: 'ML Basics', 
                        level: 30, 
                        icon: <FaLaptopCode className="text-green-400" size={24} />,
                        color: "#27ae60" 
                      },
                      { 
                        name: 'Tech Content', 
                        level: 65, 
                        icon: <FaYoutube className="text-red-500" size={24} />,
                        color: "#e74c3c" 
                      },
                      { 
                        name: 'Prompt Engineering', 
                        level: 80, 
                        icon: <FaCode className="text-orange-300" size={24} />,
                        color: "#f39c12" 
                      }
                    ]
                  }
                ]}
              />
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="py-16 md:py-20 relative overflow-hidden">
            {/* Add flickering grid as background */}
            <div className="absolute inset-0 z-0">
              <Suspense fallback={null}>
                <FlickeringGrid 
                  squareSize={3}
                  gridGap={10}
                  flickerChance={0.2}
                  color="rgb(99, 102, 241)"
                  maxOpacity={0.2}
                />
              </Suspense>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-6" // Changed from mb-12 to mb-6
              >
                <h2 className="font-['Anton'] text-4xl md:text-5xl uppercase tracking-widest text-[#fd2601] drop-shadow-md inline-flex items-center">
                  <Rocket className="w-8 h-8 mr-3 " /> 
                  <SplitText 
                    text="Projects" 
                    delay={40} 
                    className=""
                    animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
                    animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                  />
                </h2>
              </motion.div>
              
              {/* Desktop View - CardDemo */}
              <div className="hidden md:block w-full mx-auto">
                <div className="flex items-center justify-center">
                  <div className="max-w-lg w-full">
                    <Suspense fallback={<div className="w-full h-64 bg-white/5 animate-pulse rounded-xl" />}>
                      <CardDemo />
                    </Suspense>
                  </div>
                </div>
              </div>
              
              {/* Mobile View - CardDemo with flickering grid background */}
              <div className="block md:hidden w-full mx-auto">
                <div className="relative w-full overflow-hidden rounded-xl" style={{ height: '600px' }}>
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-5">
                    <div className="w-full max-w-[300px] mx-auto">
                      <Suspense fallback={<div className="w-full h-64 bg-white/5 animate-pulse rounded-xl" />}>
                        <CardDemo />
                      </Suspense>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Blogs Section */}
          <section id="blogs" ref={blogsSectionRef} className="py-16 md:py-20 bg-vibrant-bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="font-['Anton'] text-4xl md:text-5xl uppercase tracking-widest text-[#fd2601] drop-shadow-md inline-flex items-center">
                  <BookOpen className="w-8 h-8 mr-3 " /> 
                  <SplitText 
                    text="Blogs" 
                    delay={40} 
                    className=""
                    animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
                    animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                  />
                </h2>
              </motion.div>
              
              <Suspense fallback={<div className="w-full h-96 flex items-center justify-center"><div className="w-8 h-8 border-4 border-vibrant-orange border-t-transparent rounded-full animate-spin"></div></div>}>
                <HomeBlogSection />
              </Suspense>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
            {/* Conditional GeoGreeting popup for contact page */}

            {/* Bold solid background that matches site theme better */}
            <div className="absolute inset-0 bg-vibrant-bg z-0"></div>
            
            {/* Patterned background with higher opacity for neobrutalism */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.2] z-[1]"></div>
            
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <div className="inline-block bg-vibrant-orange px-8 py-6 rounded-md border-4 border-white/10 shadow-[0_0_15px_rgba(229,9,20,0.5)] mb-6 transform -rotate-1">
                  <h2 className="text-4xl md:text-6xl font-extrabold text-white uppercase" style={{ textShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
                    Get in Touch
                  </h2>
                </div>
                <p className="text-white text-lg md:text-xl max-w-2xl mx-auto font-bold">
                  Have a question or want to work together? Send me a message.
                </p>
              </motion.div>
              
                  <div className="max-w-4xl mx-auto">
                {/* Contact form with neobrutalism wrapper */}
                <div className="transform rotate-1 hover:rotate-0 transition-transform duration-300">
                  <Suspense fallback={<div className="w-full h-96 bg-white/5 animate-pulse rounded-xl" />}>
                    <ContactForm formId="xkndlgya" />
                  </Suspense>
                </div>
                
                {/* Social media links with soothing theme styling */}
                <div className="flex justify-center gap-5 mt-16">
                  <a 
                    href="https://github.com/SmartKidzee" 
                    className="p-4 bg-vibrant-bg rounded-md border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-200"
                    aria-label="GitHub"
                  >
                    <Github className="w-6 h-6 text-white" />
                  </a>
                  <a 
                    href="https://youtube.com/SmartKidzee" 
                    className="p-4 bg-vibrant-orange rounded-md border border-vibrant-orange shadow-[0_0_15px_rgba(229,9,20,0.3)] hover:translate-y-1 hover:translate-x-1 hover:shadow-[0_0_20px_rgba(229,9,20,0.5)] transition-all duration-200"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-6 h-6 text-white" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/smartshreyas/" 
                    className="p-4 bg-[#0077B5] rounded-md border border-white/20 shadow-[0_0_15px_rgba(0,119,181,0.3)] hover:translate-y-1 hover:translate-x-1 hover:shadow-[0_0_20px_rgba(0,119,181,0.5)] transition-all duration-200"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-6 h-6 text-white" />
                  </a>
                  <a 
                    href="https://x.com/KidzeeSmart" 
                    className="p-4 bg-black rounded-md border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-200"
                    aria-label="X (Twitter)"
                  >
                    <img src="https://i.ibb.co/5hYX5GVr/logo-white.png" alt="X" className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-black py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-[#94A3B8]">
              © 2025 Shreyas. All rights reserved. | 
              <a href="/terms" className="text-[#94A3B8] hover:text-white ml-1 mr-1">Terms & Conditions</a> |
              <a href="/privacy" className="text-[#94A3B8] hover:text-white ml-1">Privacy Policy</a>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
