import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const Navigation: React.FC = () => {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-80 backdrop-blur-md shadow-lg"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center"
        >
          <Link to="/" className="flex items-center text-white hover:text-blue-400 transition-colors">
            <Home className="w-5 h-5 mr-2" />
            <span className="font-medium">Home</span>
          </Link>
        </motion.div>
        
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/tech-card-builder"
              className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-colors"
            >
              Tech Card Builder
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Navigation; 