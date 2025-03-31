import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Check, Clipboard, Copy, ExternalLink, X } from 'lucide-react';
import { fetchGeminiSummary } from '../lib/api/gemini';

interface BlogSummarizerProps {
  blogContent: string;
  blogTitle: string;
}

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div className="relative inline-block" 
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1.5 bg-black/80 backdrop-blur-sm text-white text-xs font-medium rounded-md whitespace-nowrap z-[100]"
          >
            {text}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45 bg-black/80"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Helper function to convert plain text to clickable links
const formatTextWithLinks = (text: string) => {
  if (!text) return null;
  
  // Regex to detect URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  
  // Split the text by URLs
  const parts = text.split(urlRegex);
  
  // Find all URLs in the text
  const urls = text.match(urlRegex) || [];
  
  // If no URLs, return the text as is
  if (urls.length === 0) {
    return text;
  }
  
  // Create an array to hold the result (mix of text and link elements)
  const result = [];
  
  // Combine parts and URLs
  for (let i = 0; i < parts.length; i++) {
    // Add text part
    if (parts[i]) {
      result.push(<React.Fragment key={`text-${i}`}>{parts[i]}</React.Fragment>);
    }
    
    // Add URL part if there is one
    if (urls[i]) {
      result.push(
        <a 
          key={`url-${i}`} 
          href={urls[i]} 
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-400 hover:text-indigo-300 hover:underline inline-flex items-center gap-1 transition-colors"
        >
          {urls[i].length > 40 ? `${urls[i].substring(0, 37)}...` : urls[i]}
          <ExternalLink size={12} className="inline" />
        </a>
      );
    }
  }
  
  return result;
};

const BlogSummarizer: React.FC<BlogSummarizerProps> = ({ blogContent, blogTitle }) => {
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  
  const generateSummary = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Check if content is available
      if (!blogContent?.trim()) {
        throw new Error("No blog content available to summarize.");
      }
      
      // Call the API utility function
      const response = await fetchGeminiSummary(blogContent, blogTitle);
      
      // Handle potential errors
      if (!response) {
        throw new Error("Failed to get response from the AI model.");
      }
      
      // Extract the text from the response
      const resultText = response.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!resultText) {
        throw new Error("Received an empty summary from the AI model.");
      }
      
      // Clean up the response
      const cleanSummary = resultText.trim()
        .replace(/^Summary:/i, '')
        .replace(/^TL;DR:/i, '')
        .trim();
      
      setSummary(cleanSummary);
      setShowSummary(true);
    } catch (err: any) {
      console.error('Error generating summary:', err);
      setError(err.message || 'Failed to generate summary. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const copyToClipboard = () => {
    if (summary) {
      navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  const closeSummary = () => {
    setShowSummary(false);
  };
  
  return (
    <div className="mt-8 mb-4">
      {!showSummary ? (
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={generateSummary}
          disabled={loading}
          className="flex items-center justify-center gap-2 w-full p-3 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm border border-indigo-500/20"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-indigo-300 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm sm:text-base">Generating AI Summary...</span>
            </>
          ) : (
            <>
              <Brain size={18} />
              <span className="text-sm sm:text-base">Generate AI Summary with Gemini</span>
            </>
          )}
        </motion.button>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl overflow-hidden border border-indigo-500/20 shadow-xl backdrop-blur-sm bg-gradient-to-br from-indigo-900/20 to-purple-900/20"
          >
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-indigo-500/20 bg-black/20">
              <div className="flex items-center gap-2">
                <Brain size={18} className="text-indigo-400" />
                <h3 className="font-medium text-white text-sm sm:text-base">Gemini AI Summary</h3>
              </div>
              
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={copyToClipboard}
                  className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-colors ${
                    copied 
                      ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20' 
                      : 'bg-gray-500/10 text-gray-300 hover:bg-gray-500/20'
                  }`}
                  aria-label="Copy summary"
                >
                  {copied ? <Check size={14} className="sm:w-4 sm:h-4" /> : <Copy size={14} className="sm:w-4 sm:h-4" />}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={closeSummary}
                  className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-500/10 hover:bg-gray-500/20 text-gray-300 transition-colors"
                  aria-label="Close summary"
                >
                  <X size={14} className="sm:w-4 sm:h-4" />
                </motion.button>
              </div>
            </div>
            
            <div className="p-3 sm:p-4 md:p-6">
              {error ? (
                <p className="text-red-400 text-xs sm:text-sm">{error}</p>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="text-gray-300 leading-relaxed text-xs sm:text-sm md:text-base">
                    {formatTextWithLinks(summary || "")}
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default BlogSummarizer; 