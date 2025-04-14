import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { motion } from 'framer-motion';
import { Home, Copy, Share2, Download, Code, PenTool, BrainCircuit, Cog } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import { toPng } from 'html-to-image';
import PageSEO from '../../components/PageSEO'; // Import PageSEO component

// Define Firestore tech item type (without icon property)
interface FirestoreTechItem {
  id: string;
  name: string;
  category: string;
}

// Define Firestore tech card data type
interface FirestoreTechCardData {
  photo: string | null;
  name: string;
  bio: string;
  role: string;
  theme: string;
  customThemeFrom?: string;
  customThemeTo?: string;
  languages: FirestoreTechItem[];
  frameworks: FirestoreTechItem[];
  ai: FirestoreTechItem[];
  tools: FirestoreTechItem[];
  socials: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };
  image?: string;
  createdAt?: any;
}

// Function to render an appropriate icon based on the tech category
const renderTechIcon = (category: string) => {
  switch (category) {
    case 'languages':
      return <Code className="w-4 h-4" />;
    case 'frameworks':
      return <PenTool className="w-4 h-4" />;
    case 'ai':
      return <BrainCircuit className="w-4 h-4" />;
    case 'tools':
      return <Cog className="w-4 h-4" />;
    default:
      return <Code className="w-4 h-4" />;
  }
};

const CardPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [cardData, setCardData] = useState<FirestoreTechCardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCard = async () => {
      if (!id) {
        setError('No card ID provided');
        setLoading(false);
        return;
      }

      try {
        // Get the card from Firestore
        const docRef = doc(db, 'cards', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCardData(docSnap.data() as FirestoreTechCardData);
          setLoading(false);
          return;
        } 
        
        // If we get here, the card was not found
        setError('Card not found');
      } catch (err) {
        console.error('Error fetching card:', err);
        setError('Failed to load card');
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [id]);

  const copyLinkToClipboard = () => {
    const url = window.location.href;
    
    // Simple loading toast
    toast.loading('Copying link...', { id: 'clipboard' });
    
    // Try modern clipboard API first
    try {
      navigator.clipboard.writeText(url)
        .then(() => {
          toast.success('Link copied to clipboard!', { id: 'clipboard' });
        })
        .catch((err) => {
          console.error('Clipboard API error:', err);
          // Fallback method
          simpleCopyFallback(url);
        });
    } catch (err) {
      console.error('Clipboard error:', err);
      // Fallback method
      simpleCopyFallback(url);
    }
  };
  
  // Simple fallback that doesn't show a textarea
  const simpleCopyFallback = (text: string) => {
    // Create a hidden textarea
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Make it completely hidden
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    textArea.style.opacity = '0';
    textArea.style.pointerEvents = 'none';
    document.body.appendChild(textArea);
    
    try {
      textArea.focus();
      textArea.select();
      
      // Execute copy command and show feedback
      const successful = document.execCommand('copy');
      if (successful) {
        toast.success('Link copied to clipboard!', { id: 'clipboard' });
    } else {
        toast.error('Unable to copy. Try copying the browser URL manually.', { id: 'clipboard' });
      }
    } catch (err) {
      console.error('execCommand error:', err);
      toast.error('Failed to copy. Try copying the browser URL manually.', { id: 'clipboard' });
    }
    
    // Clean up
    document.body.removeChild(textArea);
  };

  const shareCard = (platform: 'whatsapp' | 'twitter') => {
    const shareUrl = window.location.href;
    const shareMessage = "Check out my Tech Card! Create your own on Shreyas's Portfolio: ";
    const hashtags = "#TechCard #DeveloperCard #TechStack";
    
    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareMessage + shareUrl + "\n\n" + hashtags)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(shareUrl)}&hashtags=TechCard,DeveloperCard,TechStack`, '_blank');
        break;
    }
  };
  
  const downloadCard = async () => {
    if (cardRef.current) {
      try {
        toast.loading('Generating your tech card...', { id: 'download' });
        
        // Ensure proper proportions for mobile devices before capture
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
          // Add mobile-specific class directly for better styling
          cardRef.current.setAttribute('data-exporting', 'true');
          
          // Force fixed dimensions for mobile
          cardRef.current.style.width = '380px';
          cardRef.current.style.minHeight = '600px';
          cardRef.current.style.display = 'flex';
          cardRef.current.style.flexDirection = 'column';
          cardRef.current.style.alignItems = 'center';
          cardRef.current.style.justifyContent = 'center';
          
          // Find and style the profile container
          const profileContainer = cardRef.current.querySelector('div.rounded-full');
          if (profileContainer) {
            (profileContainer as HTMLElement).style.width = '120px';
            (profileContainer as HTMLElement).style.height = '120px';
            (profileContainer as HTMLElement).style.margin = '0 auto 1rem auto';
          }
          
          // Find and style the tech stack
          const techStack = cardRef.current.querySelector('div.flex.flex-wrap.justify-center');
          if (techStack) {
            (techStack as HTMLElement).style.display = 'flex';
            (techStack as HTMLElement).style.flexWrap = 'wrap';
            (techStack as HTMLElement).style.justifyContent = 'center';
            (techStack as HTMLElement).style.width = '100%';
          }
        }
        
        // Use html-to-image for better quality export with transparent background
        const dataUrl = await toPng(cardRef.current, {
          cacheBust: true,
          pixelRatio: 3, // Higher resolution for better quality
          quality: 1.0,
          backgroundColor: undefined, // Set to undefined for transparent background
          style: {
            // Ensure proper rendering
            borderRadius: '24px',
            overflow: 'hidden'
          },
          // Disable web font embedding to prevent CSP errors
          skipFonts: true,
          fontEmbedCSS: ''
        });
        
        // Restore original styles if on mobile
        if (isMobile && cardRef.current) {
          // Remove exporting attribute
          cardRef.current.removeAttribute('data-exporting');
          
          // Reset all explicit styles
          cardRef.current.style.width = '';
          cardRef.current.style.minHeight = '';
          cardRef.current.style.display = '';
          cardRef.current.style.flexDirection = '';
          cardRef.current.style.alignItems = '';
          cardRef.current.style.justifyContent = '';
          
          // Reset profile container styles
          const profileContainer = cardRef.current.querySelector('div.rounded-full');
          if (profileContainer) {
            (profileContainer as HTMLElement).style.width = '';
            (profileContainer as HTMLElement).style.height = '';
            (profileContainer as HTMLElement).style.margin = '';
          }
          
          // Reset tech stack styles
          const techStack = cardRef.current.querySelector('div.flex.flex-wrap.justify-center');
          if (techStack) {
            (techStack as HTMLElement).style.display = '';
            (techStack as HTMLElement).style.flexWrap = '';
            (techStack as HTMLElement).style.justifyContent = '';
            (techStack as HTMLElement).style.width = '';
          }
        }
        
        // For mobile, create a direct download approach
        if (isMobile) {
          // Create an image to display
          const img = document.createElement('img');
          img.src = dataUrl;
          
          // Create a link with download attribute for direct download
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = `tech-card-${cardData?.name?.toLowerCase().replace(/\s+/g, '-') || 'tech-card'}.png`;
          
          // Directly trigger the click event which works better on mobile
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          // Show the success message
          toast.success('Card generated! Check your downloads folder.', { id: 'download' });
          return;
        }
        
        // Desktop download approach
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `tech-card-${cardData?.name?.toLowerCase().replace(/\s+/g, '-') || 'tech-card'}.png`;
        link.click();
        
        toast.success('Card downloaded!', { id: 'download' });
      } catch (error) {
        console.error('Error generating card:', error);
        toast.error('Failed to generate tech card. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-t-2 border-b-2 border-blue-500 rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="max-w-md p-8 bg-gray-900 rounded-xl shadow-2xl">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
          <p className="text-white mb-6">{error}</p>
          <Link 
            to="/tech-card-builder" 
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 inline-flex items-center"
          >
            Create a Card
          </Link>
        </div>
      </div>
    );
  }

  if (!cardData) {
    return (
      <div className="min-h-screen bg-[#030014] flex items-center justify-center">
        <div className="max-w-md p-8 bg-gray-900 rounded-xl shadow-2xl">
          <h1 className="text-2xl font-bold text-yellow-500 mb-4">Card Not Found</h1>
          <p className="text-white mb-6">The card you're looking for doesn't exist or has been removed.</p>
          <Link 
            to="/tech-card-builder" 
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 inline-flex items-center"
          >
            Create a Card
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030014] flex flex-col items-center justify-center p-4">
      <PageSEO 
        title={`${cardData?.name}'s Tech Stack Card | Developer Profile`}
        description={`Check out ${cardData?.name}'s Tech Stack Card featuring their programming skills, frameworks, AI tools, and development stack. ${cardData?.bio || 'Create your own tech card today!'}`}
        canonical={`https://iamshreyas.live/card/${id}`}
        keywords={`tech card, developer profile, ${cardData?.name}, ${cardData?.role}, programming skills, tech stack`}
        image={cardData?.image || 'https://iamshreyas.live/tech-card-preview.png'}
      />
      
      {/* Floating top navigation */}
      <div className="fixed top-4 left-4 z-50">
        <Link 
          to="/" 
          className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors flex items-center justify-center"
          aria-label="Go home"
        >
          <Home className="w-5 h-5 text-white" />
        </Link>
      </div>

      <Toaster position="top-center" />

      <div className="max-w-4xl w-full my-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">{cardData.name}'s Tech Card</h1>
        
        {/* Exact card from live preview */}
        <div className="w-full flex items-center justify-center min-h-[400px] py-6 px-4 
          bg-gradient-to-br from-gray-900 to-black rounded-xl sm:rounded-3xl shadow-2xl mb-8">
          <div className="w-full max-w-[380px] mx-auto">
            {/* Card container with shiny border */}
            <div className="w-full mx-auto rounded-3xl p-[2px] relative overflow-hidden bg-black transition-all" 
              style={{ minHeight: '400px', height: 'auto' }}>
              {/* Shiny border effect */}
              <div className="absolute inset-0 rounded-3xl z-0 animate-border-glow">
                <div className="absolute inset-0 rounded-3xl bg-[conic-gradient(from_0deg,#7b61ff,#00ccb1,#ffc414,#1ca0fb,#7b61ff)] blur-sm opacity-70 animate-spin-slow"></div>
              </div>

              <div 
                className="relative overflow-hidden rounded-3xl w-full h-full mx-auto z-10 flex flex-col items-center justify-center" 
                ref={cardRef}
              >
                {/* Card content with theme styles and social links */}
                <div className={`relative w-full flex flex-col p-4 sm:p-6 rounded-3xl overflow-hidden ${
                  cardData.theme === 'dark'
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900 text-white'
                    : cardData.theme === 'midnight'
                    ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white'
                    : cardData.theme === 'cyberpunk'
                    ? 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white'
                    : cardData.theme === 'neon'
                    ? 'bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 text-white'
                    : cardData.theme === 'galaxy'
                    ? 'bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900 text-white'
                    : cardData.theme === 'gradient-blue'
                    ? 'bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 text-white'
                    : cardData.theme === 'gradient-purple'
                    ? 'bg-gradient-to-br from-purple-700 via-purple-600 to-purple-900 text-white'
                    : cardData.theme === 'gradient-green'
                    ? 'bg-gradient-to-br from-green-700 via-green-600 to-green-900 text-white'
                    : cardData.theme === 'gradient-orange'
                    ? 'bg-gradient-to-br from-orange-600 via-amber-600 to-red-700 text-white'
                    : cardData.theme === 'gradient-red'
                    ? 'bg-gradient-to-br from-red-700 via-rose-600 to-red-900 text-white'
                    : cardData.theme === 'custom'
                    ? 'text-white'
                    : 'bg-gradient-to-br from-gray-800 to-gray-900 text-white'
                }`}
                  style={cardData.theme === 'custom' && cardData.customThemeFrom && cardData.customThemeTo ? { 
                    background: `linear-gradient(to bottom right, ${cardData.customThemeFrom}, ${cardData.customThemeTo})`,
                    minHeight: '400px', 
                  } : { minHeight: '400px' }}
                >
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white border-opacity-30 mb-4 shadow-lg relative bg-black">
                      {cardData.photo ? (
                  <img 
                    src={cardData.photo} 
                    alt={cardData.name} 
                          className="w-full h-full object-cover absolute inset-0"
                  />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 sm:h-12 w-8 sm:w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                </div>
              )}
                    </div>
                    
                    <div className="mx-auto text-center text-lg sm:text-xl font-bold px-3 sm:px-4 py-1 sm:py-2 mb-2 rounded-xl">
                      {cardData.name}
                    </div>

                {cardData.bio && (
                      <p className="text-center text-xs sm:text-sm mb-3 px-2 opacity-90 max-w-[250px] mx-auto whitespace-pre-wrap break-words">
                        {cardData.bio}
                      </p>
                )}
                    
                    <div className="px-4 sm:px-6 py-1 sm:py-1.5 rounded-full bg-white bg-opacity-20 backdrop-blur-sm text-opacity-90 text-xs sm:text-sm font-medium">
                      {cardData.role}
                    </div>

                {/* Social links */}
                    {(cardData.socials.linkedin || cardData.socials.github || cardData.socials.twitter || cardData.socials.website) && (
                      <div className="flex justify-center mt-3 space-x-2 sm:space-x-3">
                        {cardData.socials.linkedin && (
                          <a className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-blue-600/50 transition-colors"
                             href={`https://linkedin.com/in/${cardData.socials.linkedin}`} target="_blank" rel="noopener noreferrer">
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path>
                            </svg>
                      </a>
                    )}
                        
                        {cardData.socials.github && (
                          <a className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-gray-700/70 transition-colors"
                             href={`https://github.com/${cardData.socials.github}`} target="_blank" rel="noopener noreferrer">
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                      </a>
                    )}
                        
                    {cardData.socials.twitter && (
                          <a className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-black/50 transition-colors"
                             href={`https://twitter.com/${cardData.socials.twitter}`} target="_blank" rel="noopener noreferrer">
                            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                      </a>
                    )}
                        
                    {cardData.socials.website && (
                          <a className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-green-600/50 transition-colors"
                             href={cardData.socials.website.startsWith('http') ? cardData.socials.website : `https://${cardData.socials.website}`} 
                             target="_blank" rel="noopener noreferrer">
                            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm7.931 9h-2.764a14.67 14.67 0 0 0-1.792-6.243A8.013 8.013 0 0 1 19.931 11zM12.53 4.027c1.035 1.364 2.427 3.78 2.627 6.973H9.03c.139-2.596.994-5.028 2.451-6.974.172-.01.344-.026.519-.026.179 0 .354.016.53.027zm-3.842.7C7.704 6.618 7.136 8.762 7.03 11H4.069a8.013 8.013 0 0 1 4.619-6.273zM4.069 13h2.974c.136 2.379.665 4.478 1.556 6.23A8.01 8.01 0 0 1 4.069 13zm7.381 6.973C10.049 18.275 9.222 15.896 9.041 13h6.113c-.208 2.773-1.117 5.196-2.603 6.972-.182.012-.364.028-.551.028-.186 0-.367-.016-.55-.027zm4.011-.772c.955-1.794 1.538-3.901 1.691-6.201h2.778a8.005 8.005 0 0 1-4.469 6.201z"/>
                            </svg>
                      </a>
                    )}
                  </div>
                )}
              </div>
              
                  {/* Tech stack display - responsive for mobile */}
                  <div className="w-full mt-auto pt-3 sm:pt-4">
                    <h4 className="text-xs font-semibold text-center mb-2 text-white/80 uppercase tracking-wider">MY TECH STACK</h4>
                    <div className="flex flex-wrap justify-center gap-1 sm:gap-1.5 px-1 py-0.5">
                {/* Languages */}
                      {cardData.languages.map((tech) => (
                      <div
                        key={tech.id}
                          className="bg-gray-900/90 backdrop-blur-sm rounded-lg px-1.5 sm:px-2 py-1 sm:py-1.5 shadow-md flex items-center gap-1 sm:gap-1.5 border border-blue-500/40 mb-1"
                        >
                          <div className="flex items-center justify-center text-blue-400 flex-shrink-0">
                            {renderTechIcon('languages')}
                          </div>
                          <span className="text-xs font-medium text-white truncate max-w-[55px] sm:max-w-[70px]">{tech.name}</span>
                        </div>
                      ))}

                {/* Frameworks */}
                      {cardData.frameworks.map((tech) => (
                        <div
                          key={tech.id}
                          className="bg-gray-900/90 backdrop-blur-sm rounded-lg px-1.5 sm:px-2 py-1 sm:py-1.5 shadow-md flex items-center gap-1 sm:gap-1.5 border border-purple-500/40 mb-1"
                        >
                          <div className="flex items-center justify-center text-purple-400 flex-shrink-0">
                            {renderTechIcon('frameworks')}
                          </div>
                          <span className="text-xs font-medium text-white truncate max-w-[55px] sm:max-w-[70px]">{tech.name}</span>
                        </div>
                      ))}
                      
                      {/* AI tools */}
                      {cardData.ai.map((tech) => (
                        <div
                          key={tech.id}
                          className="bg-gray-900/90 backdrop-blur-sm rounded-lg px-1.5 sm:px-2 py-1 sm:py-1.5 shadow-md flex items-center gap-1 sm:gap-1.5 border border-green-500/40 mb-1"
                        >
                          <div className="flex items-center justify-center text-green-400 flex-shrink-0">
                            {renderTechIcon('ai')}
                    </div>
                          <span className="text-xs font-medium text-white truncate max-w-[55px] sm:max-w-[70px]">{tech.name}</span>
                        </div>
                      ))}
                      
                      {/* Other tools */}
                      {cardData.tools.map((tech) => (
                        <div
                          key={tech.id}
                          className="bg-gray-900/90 backdrop-blur-sm rounded-lg px-1.5 sm:px-2 py-1 sm:py-1.5 shadow-md flex items-center gap-1 sm:gap-1.5 border border-orange-500/40 mb-1"
                        >
                          <div className="flex items-center justify-center text-orange-400 flex-shrink-0">
                            {renderTechIcon('tools')}
                    </div>
                          <span className="text-xs font-medium text-white truncate max-w-[55px] sm:max-w-[70px]">{tech.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-4 mt-6 flex-wrap">
          <button
            onClick={downloadCard}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full flex items-center gap-2 transition-colors"
          >
            <Download size={18} />
            <span>Download as PNG</span>
          </button>
          <button
            onClick={copyLinkToClipboard}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-full flex items-center gap-2 transition-colors"
          >
            <Copy size={18} />
            <span>Copy Link</span>
          </button>
          <button
            onClick={() => shareCard('whatsapp')}
            className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-full flex items-center gap-2 transition-colors"
          >
            <Share2 size={18} />
            <span>WhatsApp</span>
          </button>
          <button
            onClick={() => shareCard('twitter')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full flex items-center gap-2 transition-colors"
          >
            <Share2 size={18} />
            <span>X / Twitter</span>
          </button>
          <Link
            to="/tech-card-builder"
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-full flex items-center gap-2 transition-colors"
          >
            Create Your Own
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardPage; 