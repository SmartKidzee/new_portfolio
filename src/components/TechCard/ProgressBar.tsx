import React from 'react';
import { motion } from 'framer-motion';

interface Step {
  id: number;
  title: string;
  description: string;
}

interface ProgressBarProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="w-full py-4">
      {/* Mobile View - Simplified Steps */}
      <div className="lg:hidden mb-4">
        <div className="flex items-center justify-between bg-gray-800 bg-opacity-50 rounded-lg p-3">
          <div className="font-medium">
            Step {currentStep} of {steps.length}
          </div>
          <div className="text-sm text-gray-300">
            {steps[currentStep - 1]?.title}
          </div>
        </div>
        
        <div className="relative w-full h-2 bg-gray-700 rounded-full overflow-hidden mt-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute h-full bg-gradient-to-r from-blue-500 to-indigo-500"
          />
        </div>
      </div>
      
      {/* Desktop View - Full Stepper */}
      <div className="hidden lg:block relative">
        <div 
          className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-700 -translate-y-1/2"
          style={{ zIndex: 0 }}
        ></div>
        
        <div className="relative flex items-center justify-between">
          {steps.map((step) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            const isClickable = step.id <= currentStep;
            
            // Colors based on state
            const bgColor = isCompleted 
              ? 'bg-green-500' 
              : isCurrent 
                ? 'bg-blue-500' 
                : 'bg-gray-700';
                
            const textColor = isCompleted || isCurrent
              ? 'text-white'
              : 'text-gray-400';
              
            const borderColor = isCompleted
              ? 'border-green-500'
              : isCurrent
                ? 'border-blue-500'
                : 'border-gray-700';
                
            const hoverScale = isClickable ? 1.1 : 1;
            const hoverBrightness = isClickable ? 1.2 : 1;
            
            return (
              <div 
                key={step.id} 
                className={`flex flex-col items-center relative ${isClickable ? 'cursor-pointer group' : ''}`}
                onClick={() => isClickable && onStepClick(step.id)}
                style={{ zIndex: 1 }}
              >
                <div className="mb-2 flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ 
                      scale: isCurrent ? 1.1 : 1,
                      boxShadow: isCurrent 
                        ? '0 0 15px rgba(59, 130, 246, 0.6)' 
                        : isCompleted 
                          ? '0 0 10px rgba(74, 222, 128, 0.4)' 
                          : 'none' 
                    }}
                    whileHover={isClickable ? { scale: hoverScale, filter: `brightness(${hoverBrightness})` } : {}}
                    whileTap={isClickable ? { scale: 0.95 } : {}}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${bgColor} ${textColor} border-4 ${borderColor} ${isCurrent ? 'ring-4 ring-blue-300 ring-opacity-30' : ''}`}
                  >
                    {isCompleted ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="text-sm font-medium">{step.id}</span>
                    )}
                  </motion.div>
                  
                  {/* Conditional connector line */}
                  {step.id < steps.length && (
                    <motion.div 
                      className="hidden absolute w-full h-0.5 top-5 left-[50%]"
                      initial={{ scaleX: 0 }}
                      animate={{ 
                        scaleX: isCompleted ? 1 : 0,
                        backgroundColor: isCompleted ? '#4ade80' : '#374151'
                      }}
                      style={{ 
                        width: '101%', 
                        transformOrigin: 'left',
                        zIndex: -1
                      }}
                    />
                  )}
                </div>
                
                <motion.div 
                  initial={{ opacity: 0.6 }}
                  animate={{ 
                    opacity: isCurrent ? 1 : isCompleted ? 0.9 : 0.6,
                    y: isCurrent ? -2 : 0 
                  }}
                  whileHover={isClickable ? { opacity: 0.9 } : {}}
                  className={`text-center transition-all duration-300 ${isCurrent ? 'text-white' : isCompleted ? 'text-green-300' : 'text-gray-400'}`}
                >
                  <p 
                    className={`text-sm font-medium whitespace-nowrap ${isCurrent ? 'font-bold' : ''}`}
                  >
                    {step.title}
                  </p>
                  <p 
                    className="text-xs hidden md:block max-w-[120px] mx-auto opacity-80 line-clamp-1"
                  >
                    {step.description}
                  </p>
                </motion.div>
                
                {/* Hover tooltip for truncated descriptions on mobile */}
                <div 
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full mt-1 py-1 px-2 bg-gray-800 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none md:hidden whitespace-nowrap"
                >
                  {step.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Progress Tracker */}
      <div className="hidden lg:block relative w-full h-1 mt-4 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ 
            width: `${(currentStep - 1) / (steps.length - 1) * 100}%`,
            background: [
              'linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)',
              'linear-gradient(90deg, #4f46e5 0%, #3b82f6 100%)',
              'linear-gradient(90deg, #3b82f6 0%, #6366f1 100%)'
            ]
          }}
          transition={{ 
            duration: 0.5, 
            ease: "easeInOut",
            background: {
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }
          }}
          className="absolute h-full"
        />
      </div>
    </div>
  );
};

export default ProgressBar; 