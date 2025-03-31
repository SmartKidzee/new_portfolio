import React, { useState, useEffect, useRef, TouchEvent, useCallback, useMemo } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Github,
  Linkedin,
  Youtube,
  User,
  GraduationCap,
  Code,
  Briefcase,
  BookOpen,
  Phone,
  Rocket,
  ChevronLeft,
  ChevronRight,
  Home,
  BarChart2,
  Settings,
  Mail,
  Twitter,
  BarChart3,
  Brain,
  FileCode,
  PenTool,
  MessageSquare,
  Loader2,
  Send,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import ReactPlayer from 'react-player';
import confetti from 'canvas-confetti';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ShinyText from './cpmponents/TextAnimations/ShinyText/ShinyText';
import SplitText from './cpmponents/TextAnimations/SplitText/SplitText';
import ScrollReveal from './cpmponents/TextAnimations/ScrollReveal/ScrollReveal';
import RotatingText from './cpmponents/TextAnimations/RotatingText/RotatingText';
import CountUp from './cpmponents/TextAnimations/CountUp/CountUp';
import Aurora from './cpmponents/Backgrounds/Aurora/Aurora';
import Orb from './cpmponents/Backgrounds/Orb/Orb';
import { BackgroundLines } from './components/ui/background-lines';
import Dock from './cpmponents/Components/Dock/Dock';
import TiltedCard from './cpmponents/Components/TiltedCard/TiltedCard';
import GlassIcons from './cpmponents/Components/GlassIcons/GlassIcons';
import Hyperspeed from './cpmponents/Backgrounds/Hyperspeed/Hyperspeed';
import { hyperspeedPresets } from './cpmponents/Backgrounds/Hyperspeed/hyperspeedPresets';
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
  FaApple, 
  FaCode, 
  FaGlobe, 
  FaLaptopCode,
  FaYoutube,
  FaGitAlt
} from 'react-icons/fa';
import { SiTailwindcss, SiTypescript, SiVite, SiGithubpages, SiC, SiVercel } from 'react-icons/si';
import { MdSettingsSuggest } from 'react-icons/md';
import { BiSolidBrain } from 'react-icons/bi';
import CircularSkills from './cpmponents/Components/Skills/CircularSkills';
import { TypewriterEffectSmooth } from './components/ui/typewriter-effect';
import { Logo } from './cpmponents/Components/Logo/Logo';
import InfiniteMovingCardsDemo from "./components/infinite-moving-cards-demo";
import TimelineDemo from "./components/timeline-demo";
import Particles from './cpmponents/Backgrounds/Particles/Particles';
// Import the GoogleGeminiEffectDemo component
import GoogleGeminiEffectDemo from "./components/google-gemini-effect-demo";
import { Carousel, Card } from "./components/ui/apple-cards-carousel";
import ContactForm from './cpmponents/ContactForm/ContactForm';
import HomeBlogSection from './components/HomeBlogSection';
import { WebsiteStructuredData, PersonStructuredData } from "./components/StructuredData";

// SEO component with Helmet
const SEOHelmet = () => {
  return (
    <Helmet>
      <title>Shreyas J | Tech Enthusiast</title>
      <meta name="description" content="Shreyas J - Full Stack Software Engineer, Content Creator and Tech Enthusiast. Explore my portfolio featuring React, TypeScript, and modern web development projects." />
      <meta name="keywords" content="Shreyas J, tech enthusiast, React, TypeScript, web development, portfolio, front-end developer, full-stack developer, content creator" />
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
          "description": "Full Stack Software Engineer specializing in React, TypeScript and modern web technologies. View my portfolio, blog, and projects.",
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

// Stats Item Component
interface StatsItemProps {
  value: number;
  title: string;
  caption?: string;
  icon: React.ReactNode;
  suffix?: string;
  separator?: string;
  onAnimationComplete?: () => void;
}

const StatsItem: React.FC<StatsItemProps> = ({ 
  value, 
  title, 
  caption, 
  icon, 
  suffix = '', 
  separator = '',
  onAnimationComplete 
}) => {
  return (
    <div className="stat-slide" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="stat-content" style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        width: '80%',
        textAlign: 'center'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          width: '100%',
          margin: '0 0 0.2rem 0'
        }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            <div
              style={{ 
                fontSize: '2.5rem',
                fontWeight: 700,
                background: 'linear-gradient(to right, #7c3aed, #ec4899)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
              }}
            >
              <CountUp 
                from={0}
                to={value} 
                duration={2}
                separator={separator}
                onEnd={onAnimationComplete}
                style={{
                  display: 'inline-flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center'
                }}
              />
              {suffix && (
                <span style={{ 
                  fontSize: '2rem',
                  display: 'inline-flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  marginLeft: '2px'
                }}>
                  {suffix}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <h3 style={{ 
          fontSize: '0.9rem',
          fontWeight: 600,
          color: '#ffffff',
          margin: '0.1rem 0',
          width: '100%',
          textAlign: 'center'
        }}>
          {title}
        </h3>
        
        {caption && (
          <div style={{ 
            fontSize: '0.75rem',
            color: 'rgba(255, 255, 255, 0.7)',
            margin: '0.1rem 0',
            width: '100%',
            textAlign: 'center'
          }}>
            {caption}
          </div>
        )}
        
        <div style={{ 
          marginTop: '0.3rem',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'rgba(124, 58, 237, 0.8)'
        }}>
          {icon}
        </div>
      </div>
    </div>
  );
};

function App() {
  const [cursorTrails, setCursorTrails] = useState<
    { x: number; y: number; id: string }[]
  >([]);
  const trailIdCounter = useRef(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [activeBlog, setActiveBlog] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const blogContainerRef = useRef<HTMLDivElement>(null);
  const [lastConfettiTime, setLastConfettiTime] = useState(0);
  const [activeStatSlide, setActiveStatSlide] = useState(0);
  const [countUpComplete, setCountUpComplete] = useState(false);
  const navigate = useNavigate();
  const navbarRef = useRef(null);
  const location = useLocation();
  const blogsSectionRef = useRef<HTMLElement>(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isExplainingModalOpen, setIsExplainingModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState('none');

  // Add touch handlers for stats
  const statsTouchStartX = useRef(0);
  const statsTouchEndX = useRef(0);

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
  const dockItems = React.useMemo(() => [
    { 
      icon: <Home size={18} className="text-white" />, 
      label: 'Home', 
      onClick: () => scrollTo('home') 
    },
    { 
      icon: <BarChart3 size={18} className="text-white" />, 
      label: 'Stats', 
      onClick: () => scrollTo('stats') 
    },
    { 
      icon: <User size={18} className="text-white" />, 
      label: 'About', 
      onClick: () => scrollTo('about') 
    },
    { 
      icon: <Briefcase size={18} className="text-white" />, 
      label: 'Experience', 
      onClick: () => scrollTo('experience') 
    },
    { 
      icon: <GraduationCap size={18} className="text-white" />, 
      label: 'Education', 
      onClick: () => scrollTo('education') 
    },
    { 
      icon: <Brain size={18} className="text-white" />, 
      label: 'Skills', 
      onClick: () => scrollTo('skills') 
    },
    { 
      icon: <FileCode size={18} className="text-white" />, 
      label: 'Projects', 
      onClick: () => scrollTo('projects') 
    },
    { 
      icon: <PenTool size={18} className="text-white" />, 
      label: 'Blogs', 
      onClick: () => scrollTo('blogs') 
    },
    { 
      icon: <Mail size={18} className="text-white" />, 
      label: 'Contact', 
      onClick: () => scrollTo('contact') 
    },
  ], [scrollTo]);

  // Stats data
  const statsData = [
    { icon: "🛠️", value: 4, label: "GitHub Repositories Created" },
    { icon: "💻", value: 2, label: "Personal Projects", caption: "Custom Programming Language & Portfolio Website" },
    { icon: "📜", value: 4, label: "Certifications Earned", suffix: "+" },
    { icon: "⌨️", value: 5, label: "Programming Languages Learned", suffix: "+" },
    { icon: "🌐", value: 40, label: "Website Daily Visitors", suffix: "+" },
    { icon: "👥", value: 350, label: "LinkedIn Connections", suffix: "+" },
    { icon: "📊", value: 20, label: "YouTube Views", suffix: "K+" },
    { icon: "📝", value: 5000, label: "Lines of Code Written for This Website", suffix: "+" },
  ];

  // Refs for DOM elements
  const containerRef = useRef<HTMLDivElement>(null);

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
      // Update cursor trails with a unique ID (combination of timestamp and counter)
      const newTrail = { 
        x: e.clientX, 
        y: e.clientY, 
        id: `${Date.now()}-${trailIdCounter.current++}` 
      };
      
      setCursorTrails((prev) => {
        // Add new trail and remove old ones
        return [...prev, newTrail].filter(
          (trail) => Date.now() - parseInt(trail.id.split('-')[0]) < 800
        );
      });
      
      // Update mouse position for other effects
      setMousePosition({ x: e.clientX, y: e.clientY });
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
    const colors = ['#3A29FF', '#FF94B4', '#FF3232'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getRandomSize = () => {
    return Math.floor(Math.random() * 4) + 3; // Random size between 3-6px
  };

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

  // Skills data with categories
  const skillCategories = [
    {
      title: "🌐 Web Development",
      skills: [
        { name: 'HTML & CSS', level: 'Advanced', progress: '85%', icon: <div className="flex"><FaHtml5 className="text-orange-500 mr-2" size={36} /><FaCss3Alt className="text-blue-500" size={36} /></div> },
        { name: 'React + Vite', level: 'Intermediate', progress: '60%', icon: <div className="flex"><FaReact className="text-blue-400 mr-2" size={36} /><SiVite className="text-purple-400" size={36} /></div> },
        { name: 'Tailwind CSS', level: 'Intermediate', progress: '65%', icon: <SiTailwindcss className="text-cyan-400" size={36} /> },
        { name: 'Vercel', level: '75%', icon: <SiVercel className="text-white" size={36} /> }
      ]
    },
    {
      title: "⚙️ Tools & Platforms",
      skills: [
        { name: 'Linux & Terminal', level: 'Intermediate', progress: '60%', icon: <div className="flex"><FaLinux className="text-white mr-2" size={36} /><FaTerminal className="text-gray-100" size={36} /></div> },
        { name: 'VS Code & Development Setup', level: 'Advanced', progress: '80%', icon: <MdSettingsSuggest className="text-blue-400" size={36} /> },
        { name: 'MacOS for Coding', level: 'Intermediate', progress: '60%', icon: <FaApple className="text-gray-100" size={36} /> },
        { name: 'GitHub Pages (Deployment)', level: 'Advanced', progress: '70%', icon: <SiGithubpages className="text-gray-100" size={36} /> }
      ]
    },
    {
      title: "📌 Other Skills",
      skills: [
        { name: 'Artificial Intelligence (Basics)', level: 'Beginner', progress: '40%', icon: <BiSolidBrain className="text-purple-500" size={36} /> },
        { name: 'Machine Learning (Basics)', level: 'Beginner', progress: '30%', icon: <FaLaptopCode className="text-green-400" size={36} /> },
        { name: 'Prompt Engineering', level: 'Advanced', progress: '80%', icon: <FaCode className="text-orange-300" size={36} /> },
        { name: 'Tech Content Creation (YouTube, Blog)', level: 'Intermediate', progress: '65%', icon: <FaYoutube className="text-red-500" size={36} /> }
      ]
    }
  ];

  // Legacy skills data - keeping for compatibility
  const skills = [
    { name: 'C (Programming Language)', level: 'Beginner', progress: '30%' },
    { name: 'Python', level: 'Intermediate', progress: '60%' },
    { name: 'MySQL DBMS', level: 'Beginner', progress: '35%' },
    { name: 'HTML', level: 'Intermediate', progress: '65%' },
    { name: 'React JS', level: 'Beginner', progress: '40%' },
    { name: 'Prompt Engineering', level: 'Intermediate', progress: '70%' },
    { name: 'Computer Networking', level: 'Beginner', progress: '30%' },
    { name: 'Figma', level: 'Beginner', progress: '35%' },
    { name: 'Adobe Premiere Pro', level: 'Intermediate', progress: '65%' },
  ];

  const triggerConfetti = () => {
    const now = Date.now();
    if (now - lastConfettiTime < 1000) return; // Limit to once per second
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setLastConfettiTime(now);
  };

  // Update device detection to fix navbar rendering
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
      setIsPortrait(window.innerHeight > window.innerWidth);
      
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
  const scrollLeft = () => {
    if (blogContainerRef.current) {
      setIsScrolling(true);
      blogContainerRef.current.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
      setTimeout(() => setIsScrolling(false), 500);
    }
  };

  const scrollRight = () => {
    if (blogContainerRef.current) {
      setIsScrolling(true);
      blogContainerRef.current.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
      setTimeout(() => setIsScrolling(false), 500);
    }
  };

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

  // Add a dedicated mobile navigation function
  const handleMobileNavClick = (section: string) => {
    // First close the menu both via state and direct DOM manipulation for reliability
    setIsMenuOpen(false);
    
    // Also hide via direct DOM manipulation as a fallback
    const mobileMenu = document.querySelector('.mobile-nav-menu');
    if (mobileMenu) {
      mobileMenu.classList.add('menu-closing');
    }
    
    // Use setTimeout to ensure menu closing animation completes before scrolling
    setTimeout(() => {
      const sectionElement = document.getElementById(section);
      if (sectionElement) {
        const offset = 80;
        const elementPosition = sectionElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }, 150);
  };

  // Handle touch events separately for better mobile support
  const handleTouchStart = (e: React.TouchEvent, section: string) => {
    e.currentTarget.classList.add('button-pressed');
  };

  const handleTouchEnd = (e: React.TouchEvent, section: string) => {
    e.currentTarget.classList.remove('button-pressed');
    handleMobileNavClick(section);
  };

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
        name="Shreyas J | Tech Enthusiast"
        description="Shreyas J's personal portfolio showcasing projects, skills, blog posts, and more."
        searchUrl="https://iamshreyas.live/search"
      />
      
      <PersonStructuredData
        name="Shreyas J"
        jobTitle="Tech Enthusiast"
        description="Shreyas J is a passionate tech enthusiast specializing in web development, AI, and mobile applications."
        imageUrl="https://iamshreyas.live/profile.jpg"
        url="https://iamshreyas.live"
        sameAsLinks={[
          "https://github.com/SmartKidzee",
          "https://linkedin.com/in/smartshreyas",
          "https://twitter.com/kidzeesmart",
          "https://instagram.com/smartkidzee"
        ]}
      />
      
      <div className="min-h-screen bg-[#030014] text-white">
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
          <motion.section
            id="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="min-h-screen flex items-center justify-center relative overflow-hidden py-8 md:py-12 px-4"
          >
            {/* Aurora background - only on home section */}
            <div className="absolute inset-0 z-1 aurora-container">
              <Aurora 
                colorStops={["#38BDF8", "#A855F7", "#FACC15"]}
                blend={0.5}
                amplitude={1.0}
                speed={0.5}
                style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
              />
            </div>
            
            {/* BackgroundLines effect - only on home section */}
            <div className="absolute inset-0 z-5 pointer-events-auto">
              <BackgroundLines 
                className="bg-transparent"
                svgOptions={{
                  duration: 10,
                  lineCount: isMobile ? 40 : 80
                }}
              >
                <div></div>
              </BackgroundLines>
            </div>
            
            <div className="absolute inset-0 z-5 bg-gradient-to-br from-[#3A29FF]/20 to-[#FF3232]/20" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-52 h-52 mx-auto mb-8 sm:w-60 sm:h-60 md:w-72 md:h-72"
                >
                  <div 
                    className="profile-tilted-card w-full h-full"
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
                      imageSrc="https://i.ibb.co/B55KFGh2/IMG-1106.jpg?auto=format&fit=crop&q=80&w=400&h=400"
                      altText="Shreyas Profile"
                      captionText="Shreyas"
                      containerHeight="100%"
                      containerWidth="100%"
                      imageHeight="100%"
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
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="text-5xl md:text-7xl font-bold mb-6"
                >
                  Hello, I'm <ShinyText 
                    text="Shreyas" 
                    disabled={true}
                    speed={0}
                    className="bg-gradient-to-r from-[#38BDF8] to-[#A855F7] bg-clip-text text-transparent font-bold"
                  />
                </motion.h1>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-xl md:text-2xl text-[#E2E8F0] mb-8 flex flex-wrap justify-center items-center gap-2 hero-subtitle"
                >
                  <span className="inline-flex items-center">I am a{" "}</span>
                  <span className="rotating-text-container">
                    <RotatingText 
                      texts={["Student", "Technophile", "Content Creator", "Tech Enthusiast"]} 
                      transition={{ type: "spring", damping: 20, stiffness: 250 }}
                      rotationInterval={3000}
                      loop={true}
                      auto={true}
                      splitBy="characters"
                      staggerDuration={0.03}
                      staggerFrom="first"
                      mainClassName="inline-flex justify-center items-center w-full"
                      splitLevelClassName="mx-0.5"
                      elementLevelClassName="text-[#E2E8F0] font-semibold"
                    />
                  </span>
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col items-center justify-center"
                >
                  <GlassIcons
                    className="w-full max-w-md mx-auto justify-center py-0 sm:py-4"
                    items={[
                      {
                        icon: <Github className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
                        color: "indigo",
                        label: "GitHub",
                        customClass: "transform-gpu cursor-pointer",
                        url: "https://github.com/SmartKidzee"
                      },
                      {
                        icon: <Youtube className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
                        color: "red",
                        label: "YouTube",
                        customClass: "transform-gpu cursor-pointer",
                        url: "https://youtube.com/SmartKidzee"
                      },
                      {
                        icon: <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
                        color: "blue",
                        label: "LinkedIn",
                        customClass: "transform-gpu cursor-pointer",
                        url: "https://www.linkedin.com/in/smartshreyas/"
                      },
                      {
                        icon: <img src="https://i.ibb.co/5hYX5GVr/logo-white.png" alt="X" className="w-5 h-5 sm:w-6 sm:h-6" />,
                        color: "black",
                        label: "X",
                        customClass: "transform-gpu cursor-pointer",
                        url: "https://x.com/KidzeeSmart"
                      },
                    ]}
                  />
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* Stats Section */}
          <section id="stats" className="py-16 bg-[#1E293B] text-[#E2E8F0] relative overflow-hidden with-particles">
            {/* Particles Background */}
            <div className="particles-container">
              <Particles
                particleColors={['#a855f7', '#38bdf8', '#ffffff']}
                particleCount={200}
                particleSpread={10}
                speed={0.1}
                particleBaseSize={100}
                moveParticlesOnHover={true}
                alphaParticles={true}
                disableRotation={false}
              />
            </div>
            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold inline-flex items-center bg-gradient-to-r from-[#38BDF8] to-[#A855F7] py-2 px-6 rounded-lg shadow-lg">
                  <BarChart2 className="w-8 h-8 mr-3 text-[#0F172A]" /> 
                  <SplitText 
                    text="My Stats" 
                    delay={40} 
                    className="text-[#0F172A]"
                    animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
                    animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                  />
                </h2>
              </motion.div>
              <InfiniteMovingCardsDemo />
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-16 md:py-20 bg-[#1E293B]/50 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
              <Hyperspeed effectOptions={hyperspeedPresets.four} />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold inline-flex items-center bg-gradient-to-r from-[#38BDF8] to-[#A855F7] py-2 px-6 rounded-lg shadow-lg">
                  <User className="w-8 h-8 mr-3 text-[#0F172A]" /> 
                  <SplitText 
                    text="About Me" 
                    delay={40} 
                    className="text-[#0F172A]"
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
                  <p className="text-gray-300 text-lg leading-relaxed min-h-[4.5rem] sm:min-h-[3rem] md:min-h-[3rem]">
                    <TypewriterEffectSmooth 
                      words={[
                        { text: "I'm Shreyas, a first-year Computer Science and Engineering undergraduate at The National Institute of Engineering, Mysuru, specializing in Artificial Intelligence and Machine Learning." }
                      ]}
                      className="text-gray-300"
                      cursorClassName="bg-violet-500"
                      startDelay={100}
                    />
                  </p>
                  
                  <p className="text-gray-300 text-lg leading-relaxed min-h-[9rem] sm:min-h-[6rem] md:min-h-[6rem]">
                    <TypewriterEffectSmooth 
                      words={[
                        { text: "I'm passionate about technology and enjoy diving deep into the ever-evolving world of AI and software development. When I'm not exploring the latest tech trends, you'll find me creating content for my YouTube channel, sharing insights as an Apple fanboy, or gaming on my PS5." }
                      ]}
                      className="text-gray-300"
                      cursorClassName="bg-pink-500"
                      startDelay={1500}
                    />
                  </p>
                  
                  <p className="text-gray-300 text-lg leading-relaxed min-h-[9rem] sm:min-h-[6rem] md:min-h-[6rem]">
                    <TypewriterEffectSmooth
                      words={[
                        { text: "This website is built with Vite, React, and TypeScript, designed for speed, flexibility, and a modern experience. It's a step up from my earlier HTML & CSS site, bringing interactive elements and animations to showcase my work more dynamically." }
                      ]}
                      className="text-gray-300"
                      cursorClassName="bg-cyan-500"
                      startDelay={3000}
                    />
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative group about-image-container mx-auto"
                >
                  <div 
                    className="profile-tilted-card w-full h-full"
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
                      imageSrc="https://i.ibb.co/C3DZvL6k/about-me-img.png"
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
          <section id="experience" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold inline-flex items-center bg-gradient-to-r from-[#38BDF8] to-[#A855F7] py-2 px-6 rounded-lg shadow-lg">
                  <Briefcase className="w-8 h-8 mr-3 text-[#0F172A]" /> 
                  <SplitText 
                    text="Experience" 
                    delay={40} 
                    className="text-[#0F172A]"
                    animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
                    animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                  />
                </h2>
              </motion.div>
              
              {/* Timeline Component */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <TimelineDemo />
              </motion.div>
            </div>
          </section>

          {/* Education Section */}
          <section id="education" className="py-16 md:py-20 bg-[#1E293B]/50 relative overflow-hidden">
            <div className="absolute inset-0 z-0 backdrop-blur-xl bg-gradient-to-b from-[#1E293B]/80 to-[#0F172A]/80"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold inline-flex items-center bg-gradient-to-r from-[#38BDF8] to-[#A855F7] py-2 px-6 rounded-lg shadow-lg">
                  <GraduationCap className="w-8 h-8 mr-3 text-[#0F172A]" /> 
                  <SplitText 
                    text="Education" 
                    delay={40} 
                    className="text-[#0F172A]"
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
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#38BDF8] to-[#A855F7] opacity-0 group-hover:opacity-30 rounded-xl blur-lg transition-opacity duration-500"></div>
                  
                  {/* Card content */}
                  <div className="relative p-6 rounded-xl overflow-hidden">
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    <h3 className="text-xl font-bold mb-2 text-white">
                      The National Institute Of Engineering, Mysore
                    </h3>
                    <p className="text-[#38BDF8] mb-2 flex items-center">
                      <span className="h-2 w-2 rounded-full bg-[#38BDF8] inline-block mr-2"></span>
                      Bachelor of Engineering - BE, Computer Science (Specialisation
                      in AI & ML)
                    </p>
                    <p className="text-[#94A3B8] flex items-center">
                      <span className="h-2 w-2 rounded-full bg-[#94A3B8] inline-block mr-2"></span>
                      Sep 2024 - Jul 2028
                    </p>
                    <p className="text-[#E2E8F0] mt-2 flex items-center">
                      <span className="h-2 w-2 rounded-full bg-[#E2E8F0] inline-block mr-2"></span>
                      Activities: Tech Enthusiast, ISSA
                    </p>
                    <p className="text-[#FACC15] mt-2 flex items-center font-semibold">
                      <span className="h-2 w-2 rounded-full bg-[#FACC15] inline-block mr-2"></span>
                      CGPA: 9.00
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
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#38BDF8] to-[#A855F7] opacity-0 group-hover:opacity-30 rounded-xl blur-lg transition-opacity duration-500"></div>
                  
                  {/* Card content */}
                  <div className="relative p-6 rounded-xl overflow-hidden">
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    <h3 className="text-xl font-bold mb-2 text-white">
                      Pramati Hill View Academy
                    </h3>
                    <p className="text-[#38BDF8] mb-2 flex items-center">
                      <span className="h-2 w-2 rounded-full bg-[#38BDF8] inline-block mr-2"></span>
                      Senior Secondary Certificate - 12th board
                    </p>
                    <p className="text-[#94A3B8] flex items-center">
                      <span className="h-2 w-2 rounded-full bg-[#94A3B8] inline-block mr-2"></span>
                      2022 - 2024
                    </p>
                    <p className="text-[#E2E8F0] mt-2 flex items-center font-semibold">
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
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#38BDF8] to-[#A855F7] opacity-0 group-hover:opacity-30 rounded-xl blur-lg transition-opacity duration-500"></div>
                  
                  {/* Card content */}
                  <div className="relative p-6 rounded-xl overflow-hidden">
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    
                    <h3 className="text-xl font-bold mb-2 text-white">The Acme School</h3>
                    <p className="text-[#38BDF8] mb-2 flex items-center">
                      <span className="h-2 w-2 rounded-full bg-[#38BDF8] inline-block mr-2"></span>
                      Secondary School Certificate - 10th board
                    </p>
                    <p className="text-[#E2E8F0] mt-2 flex items-center font-semibold">
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
                <h2 className="text-3xl md:text-4xl font-bold inline-flex items-center bg-gradient-to-r from-[#38BDF8] to-[#A855F7] py-2 px-6 rounded-lg shadow-lg">
                  <Code className="w-8 h-8 mr-3 text-[#0F172A]" /> 
                  <SplitText 
                    text="Skills" 
                    delay={40} 
                    className="text-[#0F172A]"
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
          <section id="projects" className="py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-6" // Changed from mb-12 to mb-6
              >
                <h2 className="text-3xl md:text-4xl font-bold inline-flex items-center bg-gradient-to-r from-[#38BDF8] to-[#A855F7] py-2 px-6 rounded-lg shadow-lg">
                  <Rocket className="w-8 h-8 mr-3 text-[#0F172A]" /> 
                  <SplitText 
                    text="Projects" 
                    delay={40} 
                    className="text-[#0F172A]"
                    animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
                    animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                  />
                </h2>
              </motion.div>
              
              {/* Desktop View - Google Gemini Effect for Projects */}
              <div className="hidden md:block w-full mx-auto">
                <GoogleGeminiEffectDemo />
              </div>
              
              {/* Mobile View - Orb Background with Project Content */}
              <div className="block md:hidden w-full mx-auto">
                <div className="orb-container" style={{ width: '100%', height: '600px', position: 'relative', overflow: 'hidden', borderRadius: '1rem', margin: '0 auto' }}>
                  {/* Orb Background */}
                  <Orb
                    hoverIntensity={0.7}
                    rotateOnHover={true}
                    hue={0}
                    forceHoverState={false}
                  />
                  
                  {/* Mobile Project Content */}
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center py-4 px-5 text-center">
                    <div className="w-full max-w-[240px] mx-auto flex flex-col items-center justify-center">
                      <h3 className="text-white">Building My Own Programming Language</h3>
                      <p className="text-white/90">I'm currently working on an ambitious project that combines the elegance of modern languages with intuitive syntax. Follow along as I bring this vision to life!</p>
                      <button 
                        className="px-5 py-2.5 bg-gradient-to-r from-[#38BDF8] to-[#A855F7] rounded-full text-white font-medium shadow-lg hover:shadow-xl transition-all text-sm"
                      >
                        Coming Soon!
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Blogs Section */}
          <section id="blogs" ref={blogsSectionRef} className="py-16 md:py-20 bg-[#1E293B]/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-3xl md:text-4xl font-bold inline-flex items-center bg-gradient-to-r from-[#38BDF8] to-[#A855F7] py-2 px-6 rounded-lg shadow-lg">
                  <BookOpen className="w-8 h-8 mr-3 text-[#0F172A]" /> 
                  <SplitText 
                    text="Blogs" 
                    delay={40} 
                    className="text-[#0F172A]"
                    animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
                    animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                  />
                </h2>
              </motion.div>
              
              <HomeBlogSection />
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
            {/* Gradient background with soft blur */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1A202C] to-[#2D3748] opacity-80 z-0"></div>
            
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] z-[1]"></div>
            
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#A855F7] mb-4">
                  Get in Touch
                </h2>
                <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
                  Have a question or want to work together? Send me a message.
                </p>
              </motion.div>
              
              <div className="max-w-4xl mx-auto">
                {/* Use the new ContactForm component */}
                <ContactForm formId="xkndlgya" />
                
                {/* Social media links with improved styling */}
                <div className="flex justify-center gap-5 mt-12">
                  <a 
                    href="https://github.com/SmartKidzee" 
                    className="p-4 bg-white/5 backdrop-blur-md rounded-full border border-white/10 hover:bg-white/10 hover:scale-110 transition-all duration-300"
                    aria-label="GitHub"
                  >
                    <Github className="w-6 h-6 text-white" />
                  </a>
                  <a 
                    href="https://youtube.com/SmartKidzee" 
                    className="p-4 bg-white/5 backdrop-blur-md rounded-full border border-white/10 hover:bg-white/10 hover:scale-110 transition-all duration-300"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-6 h-6 text-white" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/smartshreyas/" 
                    className="p-4 bg-white/5 backdrop-blur-md rounded-full border border-white/10 hover:bg-white/10 hover:scale-110 transition-all duration-300"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-6 h-6 text-white" />
                  </a>
                  <a 
                    href="https://x.com/KidzeeSmart" 
                    className="p-4 bg-white/5 backdrop-blur-md rounded-full border border-white/10 hover:bg-white/10 hover:scale-110 transition-all duration-300"
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
            <p className="text-[#94A3B8]">© 2025 Shreyas. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
