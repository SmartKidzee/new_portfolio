import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiArrowLeft, FiShare2, FiCopy, FiTwitter } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

interface DownloadShareButtonsProps {
  onDownload: () => void;
  onShare: (platform: 'whatsapp' | 'twitter' | 'copy') => void;
  onBack: () => void;
}

const DownloadShareButtons: React.FC<DownloadShareButtonsProps> = ({
  onDownload,
  onShare,
  onBack
}) => {
  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.1 } }
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Download Your Card</h2>
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={onDownload}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl shadow-lg flex items-center justify-center gap-2 font-medium"
        >
          <FiDownload className="text-xl" />
          <span>Download as PNG</span>
        </motion.button>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4 text-center">Share Your Card</h3>
        <div className="grid grid-cols-3 gap-4">
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => onShare('whatsapp')}
            className="flex flex-col items-center justify-center gap-2 p-4 bg-gray-800 hover:bg-gray-700 rounded-xl"
          >
            <FaWhatsapp className="text-2xl text-green-500" />
            <span className="text-sm">WhatsApp</span>
          </motion.button>
          
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => onShare('twitter')}
            className="flex flex-col items-center justify-center gap-2 p-4 bg-gray-800 hover:bg-gray-700 rounded-xl"
          >
            <FiTwitter className="text-2xl text-blue-400" />
            <span className="text-sm">X / Twitter</span>
          </motion.button>
          
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => onShare('copy')}
            className="flex flex-col items-center justify-center gap-2 p-4 bg-gray-800 hover:bg-gray-700 rounded-xl"
          >
            <FiCopy className="text-2xl text-yellow-400" />
            <span className="text-sm">Copy Link</span>
          </motion.button>
        </div>
      </div>
      
      <div>
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={onBack}
          className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl flex items-center justify-center gap-2 font-medium"
        >
          <FiArrowLeft className="text-xl" />
          <span>Go Back</span>
        </motion.button>
      </div>
    </div>
  );
};

export default DownloadShareButtons; 