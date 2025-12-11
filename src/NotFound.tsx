import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SnakeGame from './cpmponents/Components/SnakeGame/SnakeGame';
import { Gamepad } from 'lucide-react';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const [showSnakeGame, setShowSnakeGame] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [konami, setKonami] = useState<string[]>([]);
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  useEffect(() => {
    // Create random stars in background
    const createStars = () => {
      const container = document.querySelector('.stars-container');
      if (container) {
        container.innerHTML = '';
        const numStars = 100;
        
        for (let i = 0; i < numStars; i++) {
          const star = document.createElement('div');
          star.classList.add('star');
          
          const size = Math.random() * 3 + 1;
          star.style.width = `${size}px`;
          star.style.height = `${size}px`;
          
          star.style.left = `${Math.random() * 100}%`;
          star.style.top = `${Math.random() * 100}%`;
          
          star.style.animationDelay = `${Math.random() * 2}s`;
          star.style.animationDuration = `${Math.random() * 3 + 2}s`;
          
          container.appendChild(star);
        }
      }
    };

    createStars();

    // Listen for Konami code
    const handleKeydown = (e: KeyboardEvent) => {
      setKonami(prev => {
        const newKonami = [...prev, e.key];
        if (newKonami.length > konamiCode.length) {
          newKonami.shift(); // Remove the first item
        }
        
        // Check if the konami code is entered
        if (newKonami.length === konamiCode.length && 
            newKonami.every((key, i) => key === konamiCode[i])) {
          setShowSnakeGame(true);
        }
        
        return newKonami;
      });
    };

    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  const handleEasterEggClick = () => {
    setClicks(prev => {
      const newClicks = prev + 1;
      if (newClicks >= 5) {
        setShowSnakeGame(true);
      }
      return newClicks;
    });
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white relative flex items-center justify-center overflow-hidden">
      <div className="stars-container absolute inset-0 z-0"></div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-[#800000]/20 to-[#FF0000]/20 z-0"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {!showSnakeGame ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="glitch-wrapper"
              onClick={handleEasterEggClick}
            >
              <div 
                className="glitch-text" 
                data-text="404"
                style={{ 
                  textShadow: '0 0 5px #FF0000, 0 0 10px #FF0000, 0 0 15px #800000',
                  color: 'white'
                }}
              >
                404
              </div>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-3xl md:text-4xl font-bold mt-8 mb-4"
              style={{
                background: 'linear-gradient(to right, #FF0000, #800000)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Page Not Found
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-xl text-gray-300 mb-8"
            >
              The page you're looking for doesn't exist or has been moved.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex flex-col md:flex-row justify-center gap-4 mb-16"
            >
              <button
                onClick={() => navigate('/')}
                className="cosmic-button"
              >
                <span className="cosmic-button-text">Go Home</span>
                <div className="cosmic-button-glow"></div>
              </button>

              <button
                onClick={() => setShowSnakeGame(true)}
                className="cosmic-button"
                style={{ background: 'rgba(255, 0, 0, 0.2)' }}
              >
                <span className="cosmic-button-text flex items-center justify-center gap-2">
                  <Gamepad size={20} />
                  Play Game
                </span>
                <div className="cosmic-button-glow" style={{ background: 'radial-gradient(circle at center, #FF0000 0%, transparent 70%)' }}></div>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="text-center text-gray-500 text-sm mt-10 pt-4"
            >
              © {new Date().getFullYear()} Shreyas. All rights reserved.
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="easter-egg-revealed py-8"
          >
            <h2 
              className="text-2xl md:text-3xl font-bold mb-6"
              style={{
                background: 'linear-gradient(to right, #FF0000, #800000)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              You found the secret game!
            </h2>
            
            <SnakeGame />
            
            <button
              onClick={() => setShowSnakeGame(false)}
              className="mt-8 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Back to 404
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default NotFound; 