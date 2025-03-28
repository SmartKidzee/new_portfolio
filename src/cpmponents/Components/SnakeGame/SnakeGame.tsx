import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Play, Pause, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

interface SnakeGameProps {
  onClose?: () => void;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Point = { x: number; y: number };

// Responsive grid sizes
const GRID_SIZE = 20;
const CELL_SIZES = {
  xs: 10, // For very small screens (< 360px)
  sm: 15, // For small screens (< 640px)
  md: 20  // For medium screens and up
};
const GAME_SPEED = 150;

const SnakeGame: React.FC<SnakeGameProps> = ({ onClose }) => {
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [paused, setPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [cellSize, setCellSize] = useState(CELL_SIZES.md);
  const directionRef = useRef<Direction>('RIGHT');
  const gameLoopRef = useRef<number | null>(null);
  const touchStartRef = useRef<{ x: number, y: number } | null>(null);
  const gameContainerRef = useRef<HTMLDivElement>(null);

  // Get high score from localStorage on component mount
  useEffect(() => {
    const storedHighScore = localStorage.getItem('snakeHighScore');
    if (storedHighScore) {
      setHighScore(parseInt(storedHighScore));
    }

    // Adjust cell size based on screen width
    const handleResize = () => {
      if (window.innerWidth < 360) {
        setCellSize(CELL_SIZES.xs);
      } else if (window.innerWidth < 640) {
        setCellSize(CELL_SIZES.sm);
      } else {
        setCellSize(CELL_SIZES.md);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Generate random food position
  const generateFood = useCallback((): Point => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
    
    // Ensure food doesn't spawn on the snake
    if (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
      return generateFood();
    }
    
    return newFood;
  }, [snake]);

  // Move the snake
  const moveSnake = useCallback(() => {
    if (gameOver || paused) return;

    setSnake(prevSnake => {
      const head = { ...prevSnake[0] };
      
      // Update head position based on current direction
      switch (directionRef.current) {
        case 'UP':
          head.y = (head.y - 1 + GRID_SIZE) % GRID_SIZE;
          break;
        case 'DOWN':
          head.y = (head.y + 1) % GRID_SIZE;
          break;
        case 'LEFT':
          head.x = (head.x - 1 + GRID_SIZE) % GRID_SIZE;
          break;
        case 'RIGHT':
          head.x = (head.x + 1) % GRID_SIZE;
          break;
      }
      
      // Check for collision with itself
      if (prevSnake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        if (score > highScore) {
          setHighScore(score);
          localStorage.setItem('snakeHighScore', score.toString());
        }
        return prevSnake;
      }
      
      const newSnake = [head, ...prevSnake];
      
      // Check if snake eats food
      if (head.x === food.x && head.y === food.y) {
        setScore(prevScore => prevScore + 1);
        setFood(generateFood());
      } else {
        // Remove tail if no food eaten
        newSnake.pop();
      }
      
      return newSnake;
    });
  }, [gameOver, paused, food, generateFood, score, highScore]);

  // Game loop
  useEffect(() => {
    const gameLoop = () => {
      moveSnake();
      gameLoopRef.current = window.setTimeout(gameLoop, GAME_SPEED);
    };
    
    if (!gameOver && !paused) {
      gameLoopRef.current = window.setTimeout(gameLoop, GAME_SPEED);
    }
    
    return () => {
      if (gameLoopRef.current) clearTimeout(gameLoopRef.current);
    };
  }, [moveSnake, gameOver, paused]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default actions for arrow keys to avoid page scrolling
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          if (directionRef.current !== 'DOWN') {
            directionRef.current = 'UP';
            setDirection('UP');
          }
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          if (directionRef.current !== 'UP') {
            directionRef.current = 'DOWN';
            setDirection('DOWN');
          }
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          if (directionRef.current !== 'RIGHT') {
            directionRef.current = 'LEFT';
            setDirection('LEFT');
          }
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          if (directionRef.current !== 'LEFT') {
            directionRef.current = 'RIGHT';
            setDirection('RIGHT');
          }
          break;
        case ' ':
          if (!gameOver) setPaused(prev => !prev);
          break;
        case 'r':
        case 'R':
          resetGame();
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver]);

  // Touch controls
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault(); // Prevent scrolling when touching the game
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault(); // Prevent scrolling when touching the game
    if (!touchStartRef.current) return;
    
    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY
    };
    
    const dx = touchEnd.x - touchStartRef.current.x;
    const dy = touchEnd.y - touchStartRef.current.y;
    
    // Only count as swipe if movement is significant
    if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
      touchStartRef.current = null;
      return;
    }
    
    // Determine swipe direction
    if (Math.abs(dx) > Math.abs(dy)) {
      // Horizontal swipe
      if (dx > 0 && directionRef.current !== 'LEFT') {
        directionRef.current = 'RIGHT';
        setDirection('RIGHT');
      } else if (dx < 0 && directionRef.current !== 'RIGHT') {
        directionRef.current = 'LEFT';
        setDirection('LEFT');
      }
    } else {
      // Vertical swipe
      if (dy > 0 && directionRef.current !== 'UP') {
        directionRef.current = 'DOWN';
        setDirection('DOWN');
      } else if (dy < 0 && directionRef.current !== 'DOWN') {
        directionRef.current = 'UP';
        setDirection('UP');
      }
    }
    
    touchStartRef.current = null;
  };

  // Handle direction button click
  const handleDirectionClick = (newDirection: Direction) => {
    if (
      (newDirection === 'UP' && directionRef.current !== 'DOWN') ||
      (newDirection === 'DOWN' && directionRef.current !== 'UP') ||
      (newDirection === 'LEFT' && directionRef.current !== 'RIGHT') ||
      (newDirection === 'RIGHT' && directionRef.current !== 'LEFT')
    ) {
      directionRef.current = newDirection;
      setDirection(newDirection);
    }
  };

  // Reset game
  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection('RIGHT');
    directionRef.current = 'RIGHT';
    setGameOver(false);
    setPaused(false);
    setScore(0);
  };

  // Calculate container size
  const containerSize = GRID_SIZE * cellSize;

  return (
    <motion.div 
      className="snake-game-container bg-[#09090b] shadow-lg rounded-xl border border-[#38BDF8]/30 p-4 md:p-6"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      ref={gameContainerRef}
    >
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
        <div className="text-white font-bold text-lg">
          <span className="text-[#38BDF8]">Snake</span>
          <span className="text-[#A855F7]">Game</span>
        </div>
        <div className="flex space-x-4">
          <div className="text-[#e2e8f0] text-sm">
            Score: <span className="text-[#38BDF8] font-bold">{score}</span>
          </div>
          <div className="text-[#e2e8f0] text-sm">
            High Score: <span className="text-[#A855F7] font-bold">{highScore}</span>
          </div>
        </div>
      </div>

      <div 
        className="relative bg-[#030014] border border-[#38BDF8]/20 rounded-lg overflow-hidden mx-auto"
        style={{ 
          width: `${containerSize}px`, 
          height: `${containerSize}px`,
          maxWidth: '100%',
          maxHeight: `calc(100vh - 400px)`,
          touchAction: 'none' 
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={(e) => e.preventDefault()} // Prevent scrolling
      >
        {/* Grid background with subtle lines */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(to right, #38BDF8 1px, transparent 1px), linear-gradient(to bottom, #38BDF8 1px, transparent 1px)',
          backgroundSize: `${cellSize}px ${cellSize}px`,
          opacity: 0.05 
        }}></div>

        {/* Snake */}
        {snake.map((segment, index) => (
          <div
            key={`${segment.x}-${segment.y}-${index}`}
            className={`absolute rounded-sm ${index === 0 ? 'bg-gradient-to-r from-[#38BDF8] to-[#A855F7]' : 'bg-[#A855F7]'}`}
            style={{
              left: `${segment.x * cellSize}px`,
              top: `${segment.y * cellSize}px`,
              width: `${cellSize}px`,
              height: `${cellSize}px`,
              transition: 'all 0.1s linear'
            }}
          />
        ))}

        {/* Food */}
        <div
          className="absolute bg-[#38BDF8] rounded-full animate-pulse"
          style={{
            left: `${food.x * cellSize + cellSize / 4}px`,
            top: `${food.y * cellSize + cellSize / 4}px`,
            width: `${cellSize / 2}px`,
            height: `${cellSize / 2}px`
          }}
        />

        {/* Game over overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-4">
            <h2 className="text-[#A855F7] text-xl sm:text-2xl md:text-3xl font-bold mb-2">Game Over!</h2>
            <p className="text-white mb-4">Final Score: {score}</p>
            <button
              className="px-4 py-2 bg-gradient-to-r from-[#38BDF8] to-[#A855F7] text-white rounded-lg hover:opacity-90 transition-opacity"
              onClick={resetGame}
            >
              Play Again
            </button>
          </div>
        )}

        {/* Pause overlay */}
        {paused && !gameOver && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <h2 className="text-[#38BDF8] text-xl sm:text-2xl md:text-3xl font-bold">Paused</h2>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="mt-6 flex flex-col items-center">
        {/* Top row - Up */}
        <div className="flex justify-center mb-2">
          <button
            className="snake-control-button"
            onClick={() => handleDirectionClick('UP')}
            aria-label="Move Up"
          >
            <ChevronUp size={window.innerWidth < 380 ? 16 : 24} />
          </button>
        </div>
        
        {/* Middle row - Left, Pause/Play, Right */}
        <div className="flex justify-center space-x-2 mb-2">
          <button
            className="snake-control-button"
            onClick={() => handleDirectionClick('LEFT')}
            aria-label="Move Left"
          >
            <ChevronLeft size={window.innerWidth < 380 ? 16 : 24} />
          </button>
          
          <button
            className="snake-control-button bg-gradient-to-r from-[#38BDF8] to-[#A855F7]"
            onClick={() => {
              if (!gameOver) setPaused(prev => !prev);
            }}
            aria-label={paused ? "Resume Game" : "Pause Game"}
          >
            {paused ? <Play size={window.innerWidth < 380 ? 16 : 24} /> : <Pause size={window.innerWidth < 380 ? 16 : 24} />}
          </button>
          
          <button
            className="snake-control-button"
            onClick={() => handleDirectionClick('RIGHT')}
            aria-label="Move Right"
          >
            <ChevronRight size={window.innerWidth < 380 ? 16 : 24} />
          </button>
        </div>
        
        {/* Bottom row - Down and Reset */}
        <div className="flex justify-center space-x-2">
          <button
            className="snake-control-button"
            onClick={() => handleDirectionClick('DOWN')}
            aria-label="Move Down"
          >
            <ChevronDown size={window.innerWidth < 380 ? 16 : 24} />
          </button>
          
          <button
            className="snake-control-button bg-[#09090b]"
            onClick={resetGame}
            aria-label="Reset Game"
          >
            <RotateCcw size={window.innerWidth < 380 ? 16 : 24} />
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-4 text-gray-400 text-xs text-center">
        <p>Use arrow keys (or WASD) or buttons to control the snake.</p>
        <p>Press space to pause/resume. Press 'R' to reset.</p>
      </div>
    </motion.div>
  );
};

export default SnakeGame; 