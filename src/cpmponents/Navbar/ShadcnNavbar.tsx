import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '../Components/Logo/Logo';
import './mobile-nav.css';

interface ShadcnNavbarProps {
  sections: string[];
  activeSection: string;
  scrollTo: (id: string) => void;
}

const ShadcnNavbar: React.FC<ShadcnNavbarProps> = ({ 
  sections, 
  activeSection, 
  scrollTo 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isCardBuilderPage, setIsCardBuilderPage] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLElement>(null);

  // Check if page is scrolled to add shadow
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check if mobile for responsive sizing
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check plus additional checks with delay to ensure rendering
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Force additional checks with timeouts to ensure the state updates
    setTimeout(checkMobile, 100);
    setTimeout(checkMobile, 500);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Check if current page is card builder page
  useEffect(() => {
    const checkIfCardBuilderPage = () => {
      const path = window.location.pathname;
      const isCardBuilderPage = path.includes('card-builder') || path.includes('tech-card-builder');
      
      // Apply special class for card-builder page
      if (navbarRef.current) {
        if (isCardBuilderPage) {
          navbarRef.current.classList.add('card-builder-page');
          // Force navbar to be visible on card builder page
          navbarRef.current.style.display = 'block';
          navbarRef.current.style.visibility = 'visible';
          navbarRef.current.style.opacity = '1';
          
          // Also ensure mobile trigger is visible
          const mobileTrigger = navbarRef.current.querySelector('.shadcn-navbar-mobile-trigger');
          if (mobileTrigger) {
            (mobileTrigger as HTMLElement).style.display = 'flex';
            (mobileTrigger as HTMLElement).style.visibility = 'visible';
            (mobileTrigger as HTMLElement).style.opacity = '1';
          }
        } else {
          navbarRef.current.classList.remove('card-builder-page');
        }
      }
    };
    
    checkIfCardBuilderPage();
    window.addEventListener('popstate', checkIfCardBuilderPage);
    
    // Also run the check after a delay to ensure it applies correctly
    setTimeout(checkIfCardBuilderPage, 100);
    setTimeout(checkIfCardBuilderPage, 500);
    
    return () => window.removeEventListener('popstate', checkIfCardBuilderPage);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen && 
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target as Node) &&
        navbarRef.current && 
        !navbarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // Close menu when pressing ESC key
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen]);

  // Set selected section active - Improved with direct section scroll
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, section: string) => {
    e.preventDefault();
    
    // First close the menu
    setIsOpen(false);
    
    // Wait for animation to complete before scrolling
    setTimeout(() => {
      const sectionElement = document.getElementById(section);
      if (sectionElement) {
        const offset = 80; // Adjust offset based on header height
        const elementPosition = sectionElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        // Fallback to the scrollTo prop if element not found
        scrollTo(section);
      }
    }, 150); // Slight delay for menu closing animation
  };

  // Toggle mobile menu with improved accessibility
  const toggleMenu = () => {
    setIsOpen(prev => !prev);
    // If opening the menu, trap focus within it
    if (!isOpen && mobileMenuRef.current) {
      setTimeout(() => {
        const firstFocusableElement = mobileMenuRef.current?.querySelector('a');
        if (firstFocusableElement) {
          (firstFocusableElement as HTMLElement).focus();
        }
      }, 100);
    }
  };

  // Force navbar visibility
  useEffect(() => {
    if (navbarRef.current) {
      navbarRef.current.style.display = 'block';
      navbarRef.current.style.visibility = 'visible';
      navbarRef.current.style.opacity = '1';
    }
  }, []);

  return (
    <header 
      ref={navbarRef}
      className={`fixed top-0 left-0 right-0 z-[99999] shadcn-navbar ${isScrolled ? 'shadow-md' : ''} ${isMobile ? 'mobile-view' : ''} ${isCardBuilderPage ? 'card-builder-page' : ''}`}
      data-component-id="ShadcnNavbar"
      style={{ 
        willChange: 'transform',
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        display: 'block',
        visibility: 'visible',
        opacity: 1
      }}
    >
      <div className="shadcn-navbar-container">
        <div className="flex-none">
          <a 
            href="#home"
            className={`shadcn-navbar-logo ${isCardBuilderPage && isMobile ? 'card-builder-logo' : ''}`}
            onClick={(e) => { 
              e.preventDefault();
              scrollTo('home');
            }}
            suppressHydrationWarning
          >
            <Logo />
          </a>
        </div>
        
        {/* Desktop navigation */}
        <div className="shadcn-navbar-menu">
          {sections.map((section) => (
            <motion.a
              key={section}
              href={`#${section}`}
              className={`shadcn-navbar-link ${activeSection === section ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, section)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: sections.indexOf(section) * 0.05 }}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </motion.a>
          ))}
        </div>

        {/* Mobile menu button - always render for mobile but control display with CSS */}
        <button 
          className={`shadcn-navbar-mobile-trigger ${isCardBuilderPage ? 'card-builder-button' : ''}`}
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          style={{ 
            display: isMobile ? 'flex' : 'none',
            visibility: 'visible',
            opacity: 1
          }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile navigation menu */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            ref={mobileMenuRef}
            className="shadcn-navbar-mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 40,
              opacity: { duration: 0.2 } 
            }}
            style={{
              willChange: 'opacity, height',
              transformOrigin: 'top',
              position: 'fixed',
              top: '4rem',
              left: 0,
              right: 0,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'rgba(15, 23, 42, 0.98)',
              zIndex: 99998,
              padding: '1rem',
              visibility: 'visible',
              opacity: 1
            }}
          >
            {sections.map((section) => (
              <motion.a
                key={section}
                href={`#${section}`}
                className={`mobile-nav-link ${activeSection === section ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, section)}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'block',
                  visibility: 'visible',
                  opacity: 1
                }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default ShadcnNavbar;