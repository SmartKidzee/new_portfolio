import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '../Components/Logo/Logo';

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
  const [isMobile, setIsMobile] = useState(false);

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
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Set selected section active
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, section: string) => {
    e.preventDefault();
    scrollTo(section);
    setIsOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 shadcn-navbar ${isScrolled ? 'shadow-md' : ''}`}
      data-component-id="ShadcnNavbar"
    >
      <div className="shadcn-navbar-container">
        <div className="flex-none">
          <a 
            href="#home"
            className="shadcn-navbar-logo"
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

        {/* Mobile menu button - using class names to show/hide */}
        <button 
          className="shadcn-navbar-mobile-trigger"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile navigation menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="shadcn-navbar-mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {sections.map((section) => (
              <motion.a
                key={section}
                href={`#${section}`}
                className={`shadcn-navbar-link ${activeSection === section ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, section)}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: sections.indexOf(section) * 0.05 }}
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