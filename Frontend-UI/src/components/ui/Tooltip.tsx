// Tooltip.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

const Tooltip: React.FC<TooltipProps> = ({ 
  content, 
  children, 
  position = 'top',
  delay = 300
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const positionClasses = {
    top: 'bottom-full mb-2 left-1/2 transform -translate-x-1/2',
    bottom: 'top-full mt-2 left-1/2 transform -translate-x-1/2',
    left: 'right-full mr-2 top-1/2 transform -translate-y-1/2',
    right: 'left-full ml-2 top-1/2 transform -translate-y-1/2'
  };

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className={`absolute ${positionClasses[position]} z-50`}
          >
            <div className="bg-stone-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap shadow-lg">
              {content}
              <div className={`absolute w-2 h-2 bg-stone-800 transform rotate-45 ${
                position === 'top' ? 'bottom-[-2px] left-1/2 -translate-x-1/2' :
                position === 'bottom' ? 'top-[-2px] left-1/2 -translate-x-1/2' :
                position === 'left' ? 'right-[-2px] top-1/2 -translate-y-1/2' :
                'left-[-2px] top-1/2 -translate-y-1/2'
              }`} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;