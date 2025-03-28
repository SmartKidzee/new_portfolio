"use client";

import { cn } from "../../lib/utils";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect, useState } from "react";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  // split text inside of words into array of characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          display: "inline-block",
          opacity: 1,
          width: "fit-content",
        },
        {
          duration: 0.3,
          delay: stagger(0.1),
          ease: "easeInOut",
        }
      );
    }
  }, [isInView]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, idx) => {
          return (
            <div key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <motion.span
                  initial={{}}
                  key={`char-${index}`}
                  className={cn(
                    `dark:text-[#E2E8F0] text-[#E2E8F0] opacity-0 hidden`,
                    word.className
                  )}
                >
                  {char}
                </motion.span>
              ))}
              &nbsp;
            </div>
          );
        })}
      </motion.div>
    );
  };
  return (
    <div
      className={cn(
        "text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center",
        className
      )}
    >
      {renderWords()}
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className={cn(
          "inline-block rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-[#38BDF8]",
          cursorClassName
        )}
      ></motion.span>
    </div>
  );
};

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
  startDelay = 0,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
  startDelay?: number;
}) => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isDone, setIsDone] = useState(false);
  
  const fullText = words.map(word => word.text).join(" ");
  
  useEffect(() => {
    // Start after initial delay
    const initialTimer = setTimeout(() => {
      setIsTyping(true);
    }, startDelay);
    
    return () => clearTimeout(initialTimer);
  }, [startDelay]);
  
  useEffect(() => {
    if (!isTyping) return;
    
    let currentIndex = 0;
    
    // Function to type the next character
    const typeNextChar = () => {
      if (currentIndex < fullText.length) {
        setText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsDone(true);
        setIsTyping(false);
      }
    };
    
    // Start typing with interval
    const typingInterval = setInterval(typeNextChar, 10);
    
    return () => clearInterval(typingInterval);
  }, [fullText, isTyping]);
  
  return (
    <span className={className} style={{ display: 'inline-block', wordBreak: 'break-word' }}>
      {text}
      {!isDone && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className={cn(
            "inline-block rounded-sm w-[4px] h-[1.1em] ml-[2px] align-middle bg-[#38BDF8]",
            cursorClassName
          )}
        />
      )}
    </span>
  );
}; 