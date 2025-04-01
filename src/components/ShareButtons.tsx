import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Copy, Check } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  url: string;
  category?: string;
  tags?: string[];
  content?: string;
}

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

// Completely rewritten tooltip component with direct positioning
const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div 
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      
      {isVisible && (
        <div 
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '8px',
            padding: '4px 8px',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            color: 'white',
            fontSize: '12px',
            fontWeight: '500',
            borderRadius: '4px',
            whiteSpace: 'nowrap',
            zIndex: 1000,
          }}
        >
          {text}
          <div 
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%) rotate(45deg)',
              width: '8px',
              height: '8px',
              backgroundColor: 'rgba(0, 0, 0, 0.85)',
            }}
          />
        </div>
      )}
    </div>
  );
};

const ShareButtons: React.FC<ShareButtonsProps> = ({ 
  title, 
  url, 
  category = "", 
  tags = [], 
  content = "" 
}) => {
  const [copied, setCopied] = useState(false);
  
  // Generate a short summary from the content if available
  const getSummary = () => {
    if (!content) return "";
    // Get first sentence or first 100 characters
    const firstSentence = content.split('.')[0];
    return firstSentence.length > 100 ? firstSentence.substring(0, 97) + '...' : firstSentence;
  };
  
  // Generate engaging captions based on category
  const getEngagingCaption = () => {
    const emojis = {
      "Tech": ["🚀", "💻", "⚡", "🔥", "🤖"],
      "Development": ["💻", "⚙️", "🧰", "🔧", "🛠️"],
      "Academic": ["🎓", "📚", "✏️", "🧠", "📝"],
      "Education": ["📚", "🎓", "🧠", "✏️", "📝"],
      "Gaming": ["🎮", "🕹️", "🎯", "🏆", "🎲"],
      "Achievement": ["🏆", "🎯", "✨", "🌟", "🔥"]
    };
    
    const captionStarters = {
      "Tech & Development": [
        "Transforming the digital world! ",
        "Tech innovation at its finest! ",
        "Coding magic revealed! ",
        "The future of development is here! ",
        "Web development leveled up! "
      ],
      "Academic Achievement": [
        "Academic excellence unlocked! ",
        "Knowledge journey milestone! ",
        "Learning never stops! ",
        "Skills over grades! ",
        "Educational insights revealed! "
      ],
      "Gaming": [
        "Gaming experience elevated! ",
        "Level up your gaming setup! ",
        "Gaming revolution is here! ",
        "Next-gen gaming unlocked! ",
        "Controller in hand, world at your fingertips! "
      ],
      "Education": [
        "Learning journey continues! ",
        "Education reimagined! ",
        "Knowledge expansion in progress! ",
        "Building the future through education! ",
        "Skills for tomorrow, today! "
      ]
    };
    
    // Select random emoji and caption based on category
    let selectedEmojis: string[] = [];
    let selectedStarters: string[] = [];
    
    // Find matching category or use parts of the category
    Object.keys(captionStarters).forEach(key => {
      if (category.includes(key)) {
        selectedStarters = captionStarters[key as keyof typeof captionStarters];
      }
    });
    
    Object.keys(emojis).forEach(key => {
      if (category.includes(key)) {
        selectedEmojis = [...selectedEmojis, ...emojis[key as keyof typeof emojis]];
      }
    });
    
    // Default if no match found
    if (selectedEmojis.length === 0) {
      selectedEmojis = ["✨", "🔥", "📱", "🌟", "💯"];
    }
    
    if (selectedStarters.length === 0) {
      selectedStarters = [
        "Must-read content! ",
        "You don't want to miss this! ",
        "Exciting update! ",
        "Check this out! ",
        "Fantastic insights! "
      ];
    }
    
    const randomEmoji1 = selectedEmojis[Math.floor(Math.random() * selectedEmojis.length)];
    const randomEmoji2 = selectedEmojis[Math.floor(Math.random() * selectedEmojis.length)];
    const randomStarter = selectedStarters[Math.floor(Math.random() * selectedStarters.length)];
    
    return `${randomEmoji1} ${randomStarter}${randomEmoji2} `;
  };
  
  // Generate relevant hashtags
  const getRelevantHashtags = () => {
    // Start with tags from the blog
    let hashtags = [...tags];
    
    // Add category as hashtag if not already included
    const categoryTags = category.split('&').map(cat => cat.trim());
    categoryTags.forEach(cat => {
      const normalizedCat = cat.replace(/[^a-zA-Z0-9]/g, '');
      if (normalizedCat && !hashtags.includes(normalizedCat)) {
        hashtags.push(normalizedCat);
      }
    });
    
    // Add some general popular hashtags based on category
    if (category.includes('Tech') || category.includes('Development')) {
      const techHashtags = ['WebDev', 'Technology', 'Innovation', 'Programming'];
      techHashtags.forEach(tag => {
        if (!hashtags.includes(tag)) hashtags.push(tag);
      });
    }
    
    if (category.includes('Academic') || category.includes('Education')) {
      const eduHashtags = ['Learning', 'Education', 'Student', 'Knowledge'];
      eduHashtags.forEach(tag => {
        if (!hashtags.includes(tag)) hashtags.push(tag);
      });
    }
    
    if (category.includes('Gaming')) {
      const gameHashtags = ['GamerLife', 'Gaming', 'PlayStation', 'VideoGames'];
      gameHashtags.forEach(tag => {
        if (!hashtags.includes(tag)) hashtags.push(tag);
      });
    }
    
    // Limit to 5 hashtags max to avoid spam
    hashtags = hashtags.slice(0, 5);
    
    // Format hashtags
    return hashtags.map(tag => `#${tag}`).join(' ');
  };
  
  // Create the share text for X (Twitter)
  const createTwitterShareText = () => {
    const caption = getEngagingCaption();
    const summary = getSummary() ? `${getSummary()}\n\n` : '';
    const hashtags = getRelevantHashtags();
    
    // Format with title and call to action
    return `${caption}${title}\n\n${summary}Read more: ${url}\n\n${hashtags}`;
  };
  
  // Create the share text for WhatsApp
  const createWhatsAppShareText = () => {
    const caption = getEngagingCaption();
    const summary = getSummary() ? `${getSummary()}\n\n` : '';
    
    // WhatsApp format (more concise, without hashtags)
    return `${caption}*${title}*\n\n${summary}Read more: ${url}`;
  };
  
  const shareOnX = () => {
    const shareText = createTwitterShareText();
    const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(xUrl, '_blank');
  };
  
  const shareOnWhatsApp = () => {
    const shareText = createWhatsAppShareText();
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank');
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px' }}>
      <Tooltip text="Share on X (Twitter)">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-black/10 hover:bg-black/20 text-white transition-colors"
          onClick={shareOnX}
          aria-label="Share on X (Twitter)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </motion.button>
      </Tooltip>
      
      <Tooltip text="Share on WhatsApp">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-[#25d366]/10 hover:bg-[#25d366]/20 text-[#25d366] transition-colors"
          onClick={shareOnWhatsApp}
          aria-label="Share on WhatsApp"
        >
          <Send size={18} />
        </motion.button>
      </Tooltip>
      
      <Tooltip text="Copy link to clipboard">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
            copied 
              ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20' 
              : 'bg-gray-500/10 text-gray-300 hover:bg-gray-500/20'
          }`}
          onClick={copyToClipboard}
          aria-label="Copy link"
        >
          {copied ? <Check size={18} /> : <Copy size={18} />}
        </motion.button>
      </Tooltip>

      {copied && (
        <div 
          style={{
            fontSize: '12px',
            color: '#10b981',
            marginLeft: '8px',
            animation: 'fadeIn 0.3s'
          }}
        >
          Copied!
        </div>
      )}
    </div>
  );
};

export default ShareButtons; 