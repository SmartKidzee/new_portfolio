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
} from 'lucide-react';
import ReactPlayer from 'react-player';
import { useForm } from '@formspree/react';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';
import ShinyText from './cpmponents/TextAnimations/ShinyText/ShinyText';
import SplitText from './cpmponents/TextAnimations/SplitText/SplitText';
import ScrollReveal from './cpmponents/TextAnimations/ScrollReveal/ScrollReveal';
import RotatingText from './cpmponents/TextAnimations/RotatingText/RotatingText';
import CountUp from './cpmponents/TextAnimations/CountUp/CountUp';
import Aurora from './cpmponents/Backgrounds/Aurora/Aurora';
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
import { SiTailwindcss, SiTypescript, SiVite, SiGithubpages, SiC } from 'react-icons/si';
import { MdSettingsSuggest } from 'react-icons/md';
import { BiSolidBrain } from 'react-icons/bi';
import CircularSkills from './cpmponents/Components/Skills/CircularSkills';
import { TypewriterEffectSmooth } from './components/ui/typewriter-effect';
import Logo from './cpmponents/Components/Logo/Logo';
import InfiniteMovingCardsDemo from "./components/infinite-moving-cards-demo";
import TimelineDemo from "./components/timeline-demo";
import Particles from './cpmponents/Backgrounds/Particles/Particles';
// Import the GoogleGeminiEffectDemo component
import GoogleGeminiEffectDemo from "./components/google-gemini-effect-demo";
import { Carousel, Card } from "./components/ui/apple-cards-carousel";

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
    { x: number; y: number; id: number }[]
  >([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [activeBlog, setActiveBlog] = useState<number | null>(null);
  const [state, handleSubmit] = useForm('xkndlgya');
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
      setCursorTrails((prev) => {
        const newTrail = { x: e.clientX, y: e.clientY, id: Date.now() };
        return [...prev, newTrail].slice(-10); // Keep last 10 trails for smoother effect
      });

      // Update mouse position for experience card effect
      const card = document.querySelector('.experience-card') as HTMLElement;
      if (card) {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
      }
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
        prev.filter((trail) => Date.now() - trail.id < 800)
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
        { name: 'Git & GitHub', level: 'Advanced', progress: '75%', icon: <div className="flex"><FaGitAlt className="text-orange-600 mr-2" size={36} /><FaGithub className="text-gray-100" size={36} /></div> }
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

  const blogs = [
    {
      category: "Website Update",
      title: "Portfolio Revamp with Modern UI Components",
      content: "I'm excited to announce that I've completely revamped my portfolio website with cutting-edge UI components like the Apple Cards Carousel! The new design features smooth animations, responsive layouts, and an immersive user experience inspired by Apple's design language. This update includes advanced React components with motion effects, backdrop blur, and a modern card-based interface for showcasing projects and blog posts. I've spent weeks perfecting every animation and interaction to create a seamless browsing experience. The tech stack includes React 18, TypeScript, Framer Motion for animations, and Tailwind CSS for styling. The source code is available on GitHub at https://github.com/SmartKidzee/new_portfolio. Check out the seamless transitions and visual effects that make browsing through content feel like a premium experience!",
      src: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2555&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      isAchievement: true
    },
    {
      category: "Academic Achievement",
      title: "First Semester Success!",
      content: "I'm thrilled to share that I've achieved an outstanding SGPA of 9.0 in my first semester at NIE! This achievement reflects my dedication to academic excellence and my passion for learning. The journey through the first semester was filled with challenges, late-night study sessions, and countless hours of programming practice. I particularly enjoyed the Data Structures course where I implemented various algorithms and data structures from scratch. My Computer Organization class was also fascinating as we learned about the fundamental building blocks of computer systems. The journey has been challenging but incredibly rewarding, and I'm grateful for all the support from my professors and peers. Here's to many more successful semesters ahead! 🎉",
      src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800',
      isAchievement: true
    },
    {
      category: "Gaming",
      title: "My PS5 Journey",
      content: "Excited to share that I've joined the PS5 family! After months of waiting for stock availability, I finally managed to get my hands on the PlayStation 5 Digital Edition. The unboxing experience was amazing, and the console looks sleek and futuristic on my desk. I've been blown away by the graphics capabilities, especially with games like Spider-Man: Miles Morales and Horizon Forbidden West. The DualSense controller is a game-changer with its haptic feedback and adaptive triggers providing a whole new level of immersion. I've already spent countless hours exploring these incredible worlds and can't wait to dive into more exclusive titles. Stay tuned for an upcoming video showcasing my gaming adventures and a detailed review of my favorite PS5 games so far!",
      src: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=800',
    },
    {
      category: "Gaming",
      title: "PS5 Unboxing Video",
      content: 'Check out my PS5 unboxing experience! In this video, I share my first impressions of the PlayStation 5 Digital Edition, from the moment I open the box to setting it up and playing my first game. I explore the new user interface, show off the amazing DualSense controller features, and demonstrate the lightning-fast loading times thanks to the SSD. The video also includes a comparison with my old PS4 to highlight the massive performance improvements. If you\'re considering getting a PS5 or just curious about what the next generation of gaming looks like, this video is for you! Don\'t forget to like and subscribe for more gaming content coming soon.',
      src: 'https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?auto=format&fit=crop&w=800',
      video: 'https://youtu.be/gM09dY6WKXY',
    },
    {
      category: "Education",
      title: "New Chapter at NIE",
      content:
        "I'm thrilled to announce that I've joined the National Institute of Engineering (NIE), Mysore, for my undergraduate degree in Computer Science and Engineering, with a specialization in Artificial Intelligence and Machine Learning! The campus is absolutely stunning, with modern facilities, well-equipped labs, and beautiful green spaces perfect for studying and socializing. I've already met some brilliant peers and passionate professors who are experts in their fields. The AI & ML specialization curriculum is comprehensive, covering everything from the fundamentals of programming and mathematics to advanced topics like neural networks, computer vision, and natural language processing. The journey to secure a seat at NIE Mysore was challenging, involving rigorous entrance exams and a competitive selection process, but I'm glad I made it! I can't wait to dive deep into AI and ML, explore new technologies, and work on exciting projects that could potentially make a real-world impact. The college also has numerous technical clubs and research opportunities that I'm eager to explore. This is just the beginning of a great adventure that will shape my career in tech!",
      src: 'https://i.ibb.co/HLv8CcCk/NIEimg.jpg',
    },
  ];

  // Trigger confetti when achievement blog comes into view on mobile
  useEffect(() => {
    if (isMobile) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              triggerConfetti();
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );

      const achievementBlog = document.querySelector('.blog-card[data-achievement="true"]');
      if (achievementBlog) {
        observer.observe(achievementBlog);
      }

      return () => observer.disconnect();
    }
  }, [isMobile]);

  // Update for device detection and orientation
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', checkDevice);
    
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

  return (
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

      {/* Navigation */}
      <ShadcnNavbar 
        sections={sections} 
        activeSection={activeSection} 
        scrollTo={(section: string) => scrollTo(section)}
      />

      {/* Mobile menu button */}
      <button
        aria-label="Toggle mobile menu"
        className="fixed top-4 right-4 z-50 p-3 rounded-md hover:bg-violet-900/20 text-white touch-manipulation mobile-menu-button active:bg-violet-800/30"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div
          className="fixed top-0 right-0 w-full h-auto z-40 bg-[#030014]/95 backdrop-blur-md border-b border-violet-900/20 overflow-hidden mobile-nav-menu"
          style={{
            animation: isMenuOpen ? 'mobileMenuFadeIn 0.2s ease forwards' : 'none'
          }}
        >
          <div className="container mx-auto py-16 px-4">
            <div className="flex flex-col space-y-4">
              {sections.map((section) => (
                <button
                  key={section}
                  className={`px-4 py-3 rounded-md text-left transition-all duration-200 ${
                    activeSection === section 
                      ? 'bg-violet-800/20 text-white font-medium' 
                      : 'text-slate-300 hover:bg-violet-800/10'
                  }`}
                  onClick={() => {
                    scrollTo(section);
                    setIsMenuOpen(false);
                  }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-16 pb-24">
        {/* Hero Section */}
        <motion.section
          id="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="min-h-screen flex items-center justify-center relative overflow-hidden py-8 md:py-12 px-4"
        >
          {/* Aurora background - only on home section */}
          <div className="absolute inset-0 z-0 aurora-container">
            <Aurora
              colorStops={["#38BDF8", "#A855F7", "#FACC15"]}
              blend={0.5}
              amplitude={1.0}
              speed={0.5}
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
                  disabled={false}
                  speed={6}
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
                className="relative group aspect-square max-w-md mx-auto"
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
                    imageSrc="https://i.ibb.co/cSD9xp5x/DALL-E-2025-03-22-23-56-12-A-futuristic-digital-artwork-featuring-a-glowing-AI-powered-interface-wit.png"
                    altText="Tech"
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
        <section id="education" className="py-16 md:py-20 bg-[#1E293B]/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                className="gradient-border p-6 hover:scale-105 transition-transform duration-300"
              >
                <h3 className="text-xl font-bold mb-2">
                  The National Institute Of Engineering, Mysore
                </h3>
                <p className="text-[#38BDF8] mb-2">
                  Bachelor of Engineering - BE, Computer Science (Specialisation
                  in AI & ML)
                </p>
                <p className="text-[#94A3B8]">Sep 2024 - Jul 2028</p>
                <p className="text-[#E2E8F0] mt-2">
                  Activities: Tech Enthusiast, ISSA
                </p>
                <p className="text-[#FACC15] mt-2">CGPA: 9.00</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="gradient-border p-6 hover:scale-105 transition-transform duration-300"
              >
                <h3 className="text-xl font-bold mb-2">
                  Pramati Hill View Academy
                </h3>
                <p className="text-[#38BDF8] mb-2">
                  Senior Secondary Certificate - 12th board
                </p>
                <p className="text-[#94A3B8]">2022 - 2024</p>
                <p className="text-[#E2E8F0] mt-2">CGPA: 8.0</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="gradient-border p-6 hover:scale-105 transition-transform duration-300"
              >
                <h3 className="text-xl font-bold mb-2">The Acme School</h3>
                <p className="text-[#38BDF8] mb-2">
                  Secondary School Certificate - 10th board
                </p>
                <p className="text-[#E2E8F0] mt-2">Percentage: 95.2%</p>
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
                      name: 'Git & GitHub', 
                      level: 75, 
                      icon: <FaGithub className="text-white" size={24} />,
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
                      name: 'GitHub Pages', 
                      level: 70, 
                      icon: <SiGithubpages className="text-gray-100" size={24} />,
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            
            {/* Google Gemini Effect for Projects */}
            <div className="w-full mx-auto">
              <GoogleGeminiEffectDemo />
            </div>
          </div>
        </section>

        {/* Blogs Section */}
        <section id="blogs" className="py-16 md:py-20 bg-[#1E293B]/50">
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
            
            {/* Apple Cards Carousel Implementation */}
            <div className="w-full h-full">
              {/* Cards mapping from blogs data */}
              <Carousel 
                items={blogs.map((blog, index) => (
                  <Card 
                    key={blog.src} 
                    card={{
                      category: blog.category,
                      title: blog.title,
                      src: blog.src,
                      content: (
                        <div className="space-y-6 max-w-full">
                          <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-sans leading-relaxed">
                            {blog.content.includes('https://') ? 
                              blog.content.split(/(\bhttps:\/\/[^\s]+\b)/).map((part, i) => {
                                if (part.match(/^\bhttps:\/\/[^\s]+\b$/)) {
                                  return (
                                    <a 
                                      key={i}
                                      href={part} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-blue-600 hover:text-blue-500 transition-colors font-medium inline-flex items-center"
                                    >
                                      <span className="underline underline-offset-2">{part.includes("github.com") ? "GitHub repository" : part}</span>
                                      <svg className="w-3.5 h-3.5 ml-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                      </svg>
                                    </a>
                                  );
                                }
                                return <span key={i}>{part}</span>;
                              })
                              : blog.content
                            }
                          </p>
                          
                          {blog.video && (
                            <div className="rounded-xl overflow-hidden mb-6 player-wrapper" style={{ 
                              position: 'relative', 
                              paddingBottom: '56.25%', 
                              height: 0,
                              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' 
                            }}>
                              <iframe
                                src={blog.video.includes('youtu.be/') 
                                  ? `https://www.youtube.com/embed/${blog.video.split('youtu.be/')[1]}` 
                                  : blog.video.includes('youtube.com/watch?v=') 
                                    ? `https://www.youtube.com/embed/${blog.video.split('v=')[1]}` 
                                    : blog.video}
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{ 
                                  position: 'absolute', 
                                  top: 0, 
                                  left: 0, 
                                  width: '100%', 
                                  height: '100%', 
                                  borderRadius: '0.75rem' 
                                }}
                              />
                            </div>
                          )}
                          
                          {blog.isAchievement && (
                            <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-4 md:p-6 rounded-xl">
                              <p className="text-green-600 dark:text-green-400 font-medium">🎉 Achievement Unlocked!</p>
                      </div>
                    )}
                        </div>
                      )
                    }} 
                    index={index} 
                  />
                ))}
              />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-20 relative overflow-hidden">
          {/* Modern gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1A202C] to-[#2D3748] opacity-90 z-0"></div>
          
          {/* Animated grid pattern */}
          <div className="absolute inset-0 bg-grid-white/[0.03] z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] to-transparent mix-blend-overlay"></div>
          </div>
          
          {/* Enhanced glass-effect elements */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl opacity-60 animate-pulse z-0"></div>
          <div className="absolute top-1/2 -left-24 w-80 h-80 bg-blue-500/10 rounded-full filter blur-3xl opacity-60 animate-pulse z-0" style={{ animationDelay: '1s', animationDuration: '7s' }}></div>
          <div className="absolute -bottom-20 right-1/3 w-64 h-64 bg-teal-400/10 rounded-full filter blur-xl opacity-70 animate-pulse z-0" style={{ animationDelay: '2s', animationDuration: '8s' }}></div>
          <div className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-pink-500/10 rounded-full filter blur-xl opacity-50 animate-pulse z-0" style={{ animationDelay: '3s', animationDuration: '9s' }}></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-bold inline-flex items-center bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#A855F7] py-3 px-8 rounded-lg shadow-[0_5px_30px_rgba(56,189,248,0.3)]">
                <Phone className="w-8 h-8 mr-3 text-[#0F172A]" /> 
                <SplitText 
                  text="Contact Me" 
                  delay={40} 
                  className="text-[#0F172A]"
                  animationFrom={{ opacity: 0, transform: "translate3d(0,50px,0)" }}
                  animationTo={{ opacity: 1, transform: "translate3d(0,0,0)" }}
                />
              </h2>
            </motion.div>
            <div className="max-w-4xl mx-auto">
              {/* Modern glass form with enhanced effects */}
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] p-8 md:p-10 relative overflow-hidden">
                {/* Enhanced glow effects */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#38BDF8]/20 rounded-full filter blur-[40px] opacity-70 animate-pulse"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#A855F7]/20 rounded-full filter blur-[40px] opacity-70 animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-gradient-to-r from-[#38BDF8]/0 via-[#38BDF8]/5 to-[#38BDF8]/0 rotate-45 filter blur-[30px] opacity-30"></div>
                
                <form onSubmit={handleSubmit} className="space-y-6 relative">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2 text-white/90 flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-[#38BDF8]" />
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      placeholder="Your name"
                      className="w-full px-4 py-3 bg-[#1E293B]/60 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-[#818CF8] outline-none border border-white/10 transition-all duration-300 placeholder:text-white/30"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2 text-white/90 flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4 text-[#38BDF8]" />
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 bg-[#1E293B]/60 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-[#818CF8] outline-none border border-white/10 transition-all duration-300 placeholder:text-white/30"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2 text-white/90 flex items-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4 text-[#38BDF8]" />
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      placeholder="Your message here..."
                      className="w-full px-4 py-3 bg-[#1E293B]/60 backdrop-blur-sm rounded-xl focus:ring-2 focus:ring-[#818CF8] outline-none border border-white/10 transition-all duration-300 placeholder:text-white/30"
                    ></textarea>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="pt-2"
                  >
                    <button
                      type="submit"
                      disabled={state.submitting}
                      className="relative group w-full overflow-hidden rounded-xl backdrop-blur-sm"
                    >
                      <div className="absolute inset-0 w-full h-full transition duration-300 group-hover:bg-gradient-to-r group-hover:from-[#38BDF8]/40 group-hover:via-[#818CF8]/40 group-hover:to-[#A855F7]/40"></div>
                      <div className="relative z-10 px-6 py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-[#38BDF8] via-[#818CF8] to-[#A855F7] rounded-xl font-medium shadow-[0_4px_12px_rgba(56,189,248,0.3)] transition-all duration-300 hover:shadow-[0_6px_20px_rgba(56,189,248,0.5)] transform hover:-translate-y-1">
                        {state.submitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Send Message</span>
                          </>
                        )}
                      </div>
                    </button>
                  </motion.div>
                  {state.succeeded && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-r from-[#38BDF8]/20 to-[#818CF8]/20 backdrop-blur-sm py-3 px-4 rounded-xl border border-[#38BDF8]/30 flex items-center gap-2 justify-center"
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      <p className="text-white font-medium">Message sent successfully!</p>
                    </motion.div>
                  )}
                </form>
              </div>
              
              {/* Social media links */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="flex justify-center gap-4 mt-8"
              >
                <a href="https://github.com/SmartKidzee" className="p-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:bg-white/10 transition-colors duration-300 group">
                  <Github className="w-5 h-5 text-white/70 group-hover:text-white" />
                </a>
                <a href="https://youtube.com/SmartKidzee" className="p-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:bg-white/10 transition-colors duration-300 group">
                  <Youtube className="w-5 h-5 text-white/70 group-hover:text-white" />
                </a>
                <a href="https://www.linkedin.com/in/smartshreyas/" className="p-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:bg-white/10 transition-colors duration-300 group">
                  <Linkedin className="w-5 h-5 text-white/70 group-hover:text-white" />
                </a>
                <a href="https://x.com/KidzeeSmart" className="p-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 hover:bg-white/10 transition-colors duration-300 group">
                  <img src="https://i.ibb.co/5hYX5GVr/logo-white.png" alt="X" className="w-5 h-5" />
                </a>
              </motion.div>
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
  );
}

export default App;
