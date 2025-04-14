import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FormData, ThemeType, TechItem, TechCategory } from '../../pages/card-builder/TechCardBuilder';
import { FiUpload, FiX, FiCrop, FiCheck, FiRefreshCw } from 'react-icons/fi';
import { allTechnologies } from '../../lib/technologies';
import { IconType } from 'react-icons';

// Helper function to render React icons
function renderIcon(Icon: IconType) {
  return <Icon size={20} />;
}

interface StepFormProps {
  currentStep: number;
  formData: FormData;
  handleChange: (field: keyof FormData, value: any) => void;
  nextStep: () => void;
  prevStep: () => void;
}

// Interface for cropping area
interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

const StepForm: React.FC<StepFormProps> = ({
  currentStep,
  formData,
  handleChange,
  nextStep,
  prevStep
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropAreaRef = useRef<HTMLDivElement>(null);
  const [nameCharCount, setNameCharCount] = useState<number>(formData.name?.length || 0);
  const [isDragging, setIsDragging] = useState(false);
  const [isCropping, setIsCropping] = useState(false);
  const [cropAreaPosition, setCropAreaPosition] = useState<CropArea>({ x: 0, y: 0, width: 100, height: 100 });
  const [tempImage, setTempImage] = useState<string | null>(null);

  // Handle file selection from input
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    processFile(file);
  }, []);
  
  // Process the selected file
  const processFile = useCallback((file: File) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      if (event.target?.result) {
        setTempImage(event.target.result as string);
        setIsCropping(true);
      }
    };
    
    reader.readAsDataURL(file);
  }, []);
  
  // Handle name input change
  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNameCharCount(value.length);
    handleChange('name', value);
  }, [handleChange]);
  
  // Handle theme selection
  const handleThemeChange = useCallback((theme: ThemeType) => {
    handleChange('theme', theme);
  }, [handleChange]);
  
  // Direct tech selection function without useCallback
  function selectTech(type: 'languages' | 'frameworks' | 'ai' | 'tools', tech: TechItem) {
    console.log(`Selecting ${tech.name} in category ${type}`);
    
    // Check if already selected
    const currentItems = [...formData[type]];
    const exists = currentItems.some(item => item.id === tech.id);
    
    if (exists) {
      // Remove tech
      console.log(`Removing ${tech.name} from ${type}`);
      const updatedItems = currentItems.filter(item => item.id !== tech.id);
      handleChange(type, updatedItems);
    } else {
      // Add tech if under limit
      if (currentItems.length < 5) {
        console.log(`Adding ${tech.name} to ${type}`);
        const updatedItems = [...currentItems, tech];
        handleChange(type, updatedItems);
      } else {
        alert(`You can only select up to 5 ${type}`);
      }
    }
  }
  
  // Remove the photo
  const removePhoto = useCallback(() => {
    handleChange('photo', null);
    setTempImage(null);
  }, [handleChange]);

  // Handle drag and drop events
  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      
      // Check if it's an image file
      if (file.type.startsWith('image/')) {
        processFile(file);
      }
    }
  }, [processFile]);

  // Apply cropping to the image
  const applyCrop = useCallback(() => {
    if (!tempImage) return;
    
    // In a real implementation, we would crop the image here
    // For demo purposes, let's just use the tempImage directly
    handleChange('photo', tempImage);
    setIsCropping(false);
    setTempImage(null);
  }, [tempImage, handleChange]);

  // Cancel cropping
  const cancelCrop = useCallback(() => {
    setIsCropping(false);
    setTempImage(null);
  }, []);

  // Adjust the crop area (simplified simulation)
  const adjustCrop = useCallback((type: 'zoom-in' | 'zoom-out' | 'move-left' | 'move-right' | 'move-up' | 'move-down') => {
    // This is just a simplified simulation of cropping functionality
    setCropAreaPosition(prev => {
      switch (type) {
        case 'zoom-in':
          return { ...prev, width: Math.min(prev.width + 10, 100), height: Math.min(prev.height + 10, 100) };
        case 'zoom-out':
          return { ...prev, width: Math.max(prev.width - 10, 50), height: Math.max(prev.height - 10, 50) };
        case 'move-left':
          return { ...prev, x: Math.max(prev.x - 5, 0) };
        case 'move-right':
          return { ...prev, x: Math.min(prev.x + 5, 100 - prev.width) };
        case 'move-up':
          return { ...prev, y: Math.max(prev.y - 5, 0) };
        case 'move-down':
          return { ...prev, y: Math.min(prev.y + 5, 100 - prev.height) };
        default:
          return prev;
      }
    });
  }, []);

  // Render different form based on step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Upload Image
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-center">Upload Your Photo</h2>
            <p className="text-gray-300 mb-8">Choose a professional photo for your tech card</p>
            
            {isCropping && tempImage ? (
              <div className="w-full max-w-md">
                <div className="relative bg-gray-900 rounded-xl p-4 mb-4">
                  <h3 className="text-lg font-medium mb-4 text-center">Adjust Your Photo</h3>
                  
                  <div className="relative w-64 h-64 mx-auto mb-6 overflow-hidden rounded-xl">
                    <img 
                      src={tempImage} 
                      alt="Crop preview" 
                      className="absolute object-cover w-full h-full"
                      style={{ 
                        transform: `scale(${cropAreaPosition.width / 100})`,
                        transformOrigin: 'center'
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 pointer-events-none"></div>
                    <div 
                      className="absolute border-2 border-white rounded-full"
                      style={{ 
                        width: `${cropAreaPosition.width}%`, 
                        height: `${cropAreaPosition.width}%`,
                        left: `${50 - (cropAreaPosition.width / 2)}%`,
                        top: `${50 - (cropAreaPosition.width / 2)}%`
                      }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-center mb-4 gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => adjustCrop('zoom-out')}
                      className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => adjustCrop('zoom-in')}
                      className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </motion.button>
                  </div>
                  
                  <div className="flex justify-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={cancelCrop}
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center"
                    >
                      <FiX className="mr-2" /> Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={applyCrop}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg flex items-center"
                    >
                      <FiCheck className="mr-2" /> Apply
                    </motion.button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full max-w-md">
                {formData.photo ? (
                  <div className="flex flex-col items-center">
                    <div className="relative w-64 h-64 mx-auto mb-6">
                      <motion.img 
                        src={formData.photo} 
                        alt="Profile" 
                        className="w-full h-full object-cover rounded-xl shadow-lg"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="absolute -bottom-3 right-0 flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-blue-500 text-white rounded-full p-3 shadow-lg"
                        >
                          <FiRefreshCw size={18} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={removePhoto}
                          className="bg-red-500 text-white rounded-full p-3 shadow-lg"
                        >
                          <FiX size={18} />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <motion.div 
                    ref={dropAreaRef}
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-64 h-64 mx-auto mb-6 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                      isDragging 
                        ? 'border-blue-400 bg-blue-500 bg-opacity-10 scale-105' 
                        : 'border-blue-400 hover:border-blue-300 bg-gray-800 bg-opacity-40 hover:bg-opacity-60'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    animate={{ 
                      borderColor: isDragging ? ['#3b82f6', '#60a5fa', '#3b82f6'] : '#3b82f6',
                    }}
                    transition={isDragging ? { 
                      duration: 1.5, 
                      repeat: Infinity,
                      ease: "easeInOut" 
                    } : { duration: 0.2 }}
                  >
                    <motion.div
                      initial={{ scale: 1 }}
                      animate={{ 
                        scale: isDragging ? [1, 1.1, 1] : 1,
                        y: isDragging ? [0, -5, 0] : 0
                      }}
                      transition={isDragging ? { 
                        duration: 1.5, 
                        repeat: Infinity,
                        ease: "easeInOut" 
                      } : { duration: 0.2 }}
                    >
                      <FiUpload size={40} className="text-blue-400 mb-2" />
                    </motion.div>
                    <p className="text-sm text-center text-gray-300">
                      {isDragging ? (
                        <span className="font-medium text-blue-300">Drop your image here</span>
                      ) : (
                        <>Click to upload<br />or drag and drop</>
                      )}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">Supports JPG, PNG, GIF</p>
                  </motion.div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
            )}
          </div>
        );
        
      case 2: // Enter Name
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-center">Enter Your Name</h2>
            <p className="text-gray-300 mb-8">How should your name appear on the card?</p>
            
            <div className="w-full max-w-md">
              <div className="relative">
                <input
                  type="text"
                  value={formData.name}
                  onChange={handleNameChange}
                  placeholder="Your Name"
                  maxLength={20}
                  className="w-full bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-lg py-4 px-5 text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <div className={`absolute right-3 bottom-3 text-xs ${nameCharCount > 15 ? 'text-red-400' : 'text-gray-400'}`}>
                  {nameCharCount}/20
                </div>
              </div>
            </div>
          </div>
        );
        
      case 3: // Choose Theme
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-center">Choose Your Theme</h2>
            <p className="text-gray-300 mb-8">Select a visual style for your tech card</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-2xl">
              {[
                { id: 'dark', name: 'Dark', icon: '🌙', gradient: 'from-gray-800 to-gray-900' },
                { id: 'midnight', name: 'Midnight', icon: '🌌', gradient: 'from-gray-900 via-blue-900 to-gray-900' },
                { id: 'cyberpunk', name: 'Cyberpunk', icon: '⚡', gradient: 'from-indigo-900 via-purple-900 to-pink-900' },
                { id: 'neon', name: 'Neon', icon: '💫', gradient: 'from-green-900 via-emerald-800 to-teal-900' },
                { id: 'galaxy', name: 'Galaxy', icon: '🔭', gradient: 'from-purple-900 via-violet-800 to-indigo-900' }
              ].map((theme) => (
                <motion.div
                  key={theme.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleThemeChange(theme.id as ThemeType)}
                  className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
                    formData.theme === theme.id
                      ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-50 shadow-lg shadow-blue-500/20'
                      : 'border-gray-700'
                  }`}
                >
                  <div className={`bg-gradient-to-br ${theme.gradient} p-5 h-40 flex flex-col items-center justify-center text-white`}>
                    <div className="text-3xl mb-2">
                      {theme.icon}
                    </div>
                    <span className="font-medium text-lg">{theme.name}</span>
                    <span className="text-xs text-gray-300 mt-1 text-center">Theme</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
        
      case 4: // Select Technologies
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-center">Select Technologies</h2>
            <p className="text-gray-300 mb-8">Choose languages and frameworks you work with (up to 5 each)</p>
            
            {/* Debug display */}
            <div className="mb-4 p-3 text-xs text-white bg-gray-800 rounded-lg w-full max-w-2xl">
              <details>
                <summary className="cursor-pointer">Debug: Selected Technologies</summary>
                <div className="mt-2 pl-2">
                  <p>Languages: {formData.languages.map(t => t.name).join(', ')}</p>
                  <p>Frameworks: {formData.frameworks.map(t => t.name).join(', ')}</p>
                  <p>AI: {formData.ai.map(t => t.name).join(', ')}</p>
                  <p>Tools: {formData.tools.map(t => t.name).join(', ')}</p>
                </div>
              </details>
            </div>
            
            <div className="w-full max-w-2xl">
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Programming Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {allTechnologies.languages.map((lang) => {
                    // Check if this language is already selected
                    const isSelected = formData.languages.some(item => item.id === lang.id);
                    return (
                      <motion.button
                        key={lang.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          console.log('Selected language:', lang.id);
                          selectTech('languages', lang);
                        }}
                        className={`cursor-pointer py-2 px-4 rounded-full flex items-center transition-all ${
                          isSelected
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        <span className="mr-2">{renderIcon(lang.icon as IconType)}</span>
                        <span>{lang.name}</span>
                        {isSelected && (
                          <span className="ml-2 opacity-70">×</span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
                {formData.languages.length > 0 && (
                  <p className="text-sm mt-2 text-gray-400">
                    Selected: {formData.languages.length}/5
                  </p>
                )}
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">Frameworks & Libraries</h3>
                <div className="flex flex-wrap gap-2">
                  {allTechnologies.frameworks.map((framework) => {
                    // Check if this framework is already selected
                    const isSelected = formData.frameworks.some(item => item.id === framework.id);
                    return (
                      <motion.button
                        key={framework.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          console.log('Selected framework:', framework.id);
                          selectTech('frameworks', framework);
                        }}
                        className={`cursor-pointer py-2 px-4 rounded-full flex items-center transition-all ${
                          isSelected
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        <span className="mr-2">{renderIcon(framework.icon as IconType)}</span>
                        <span>{framework.name}</span>
                        {isSelected && (
                          <span className="ml-2 opacity-70">×</span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
                {formData.frameworks.length > 0 && (
                  <p className="text-sm mt-2 text-gray-400">
                    Selected: {formData.frameworks.length}/5
                  </p>
                )}
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-3">AI Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {allTechnologies.ai.map((ai) => {
                    // Check if this AI tech is already selected
                    const isSelected = formData.ai.some(item => item.id === ai.id);
                    return (
                      <motion.button
                        key={ai.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          console.log('Selected AI tech:', ai.id);
                          selectTech('ai', ai);
                        }}
                        className={`cursor-pointer py-2 px-4 rounded-full flex items-center transition-all ${
                          isSelected
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        <span className="mr-2">{renderIcon(ai.icon as IconType)}</span>
                        <span>{ai.name}</span>
                        {isSelected && (
                          <span className="ml-2 opacity-70">×</span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
                {formData.ai.length > 0 && (
                  <p className="text-sm mt-2 text-gray-400">
                    Selected: {formData.ai.length}/5
                  </p>
                )}
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-3">Tools & Platforms</h3>
                <div className="flex flex-wrap gap-2">
                  {allTechnologies.tools.map((tool) => {
                    // Check if this tool is already selected
                    const isSelected = formData.tools.some(item => item.id === tool.id);
                    return (
                      <motion.button
                        key={tool.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          console.log('Selected tool:', tool.id);
                          selectTech('tools', tool);
                        }}
                        className={`cursor-pointer py-2 px-4 rounded-full flex items-center transition-all ${
                          isSelected
                            ? 'bg-orange-600 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        <span className="mr-2">{renderIcon(tool.icon as IconType)}</span>
                        <span>{tool.name}</span>
                        {isSelected && (
                          <span className="ml-2 opacity-70">×</span>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
                {formData.tools.length > 0 && (
                  <p className="text-sm mt-2 text-gray-400">
                    Selected: {formData.tools.length}/5
                  </p>
                )}
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          {renderStepContent()}
        </motion.div>
      </AnimatePresence>
      
      <div className="flex justify-between mt-10">
        {currentStep > 1 ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={prevStep}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-full text-white transition-all"
          >
            Back
          </motion.button>
        ) : (
          <div></div>
        )}
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextStep}
          className="px-8 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-full text-white font-medium transition-all shadow-lg"
        >
          {currentStep === 4 ? 'Preview' : 'Continue'}
        </motion.button>
      </div>
    </div>
  );
};

export default StepForm; 