import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin } from 'lucide-react';

interface GeoGreetingPopupProps {
  section?: string;
}

// Define a fallback city in case the API fails
const FALLBACK_CITIES = [
  "the Internet",
  "Techville",
  "Digital Land",
  "Webville",
  "Cloudland"
];

const GeoGreetingPopup: React.FC<GeoGreetingPopupProps> = ({ section = 'default' }) => {
  const [greeting, setGreeting] = useState<string>("Hey there 👋");
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set initial greeting immediately
    const defaultGreeting = section === 'contact' 
      ? 'Want to get in touch? 👋' 
      : 'Hey there 👋';
    setGreeting(defaultGreeting);
    
    // Create a unique storage key for this section
    const storageKey = `geoGreeting_${section}_dismissed`;
    
    // Check if this section's greeting was already dismissed (but skip this in development)
    if (process.env.NODE_ENV !== 'development') {
      const wasDismissed = localStorage.getItem(storageKey) === 'true';
      if (wasDismissed) {
        setVisible(false);
        return;
      }
    }
    
    // Fetch location
    const fetchLocation = async () => {
      try {
        // Use a timeout to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        
        const response = await fetch('https://ipapi.co/json', { 
          signal: controller.signal 
        });
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Geolocation API response:', data);
        
        if (data && data.city) {
          // We got a real city!
          const personalizedGreeting = section === 'contact' 
            ? `Want to chat from ${data.city}? 👋` 
            : `Hey there from ${data.city} 👋`;
          setGreeting(personalizedGreeting);
        } else {
          // No city in the response, use a fun random fallback
          const randomCity = FALLBACK_CITIES[Math.floor(Math.random() * FALLBACK_CITIES.length)];
          const fallbackGreeting = section === 'contact' 
            ? `Want to chat from ${randomCity}? 👋` 
            : `Hey there from ${randomCity} 👋`;
          setGreeting(fallbackGreeting);
        }
      } catch (error) {
        console.error('Geolocation API error:', error);
        // Use a fun random fallback on error
        const randomCity = FALLBACK_CITIES[Math.floor(Math.random() * FALLBACK_CITIES.length)];
        const fallbackGreeting = section === 'contact' 
          ? `Want to chat from ${randomCity}? 👋` 
          : `Hey there from ${randomCity} 👋`;
        setGreeting(fallbackGreeting);
      } finally {
        setLoading(false);
      }
    };
    
    // Start fetching
    fetchLocation();
    
    // Auto-dismiss after 5 seconds
    const timer = setTimeout(() => {
      setVisible(false);
      try {
        localStorage.setItem(storageKey, 'true');
      } catch (e) {
        console.error('Error setting localStorage:', e);
      }
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [section]);

  const handleClose = () => {
    setVisible(false);
    try {
      localStorage.setItem(`geoGreeting_${section}_dismissed`, 'true');
    } catch (e) {
      console.error('Error setting localStorage:', e);
    }
  };

  // Don't render if not visible
  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 25 }}
          className="fixed top-20 sm:top-24 right-4 z-50 sm:right-8 md:right-12 max-w-[calc(100vw-2rem)] sm:max-w-sm"
        >
          <div className="relative group">
            {/* Shadow effect that moves with hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#38BDF8] to-[#A855F7] opacity-70 rounded-2xl blur transition-all group-hover:blur-md group-hover:opacity-80"></div>
            
            <div className="relative bg-[#1E293B] text-white px-4 py-3 sm:px-6 sm:py-4 rounded-xl shadow-lg border border-white/10 backdrop-blur-lg flex items-center gap-3 group-hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-2 text-sm sm:text-base overflow-hidden">
                {loading ? (
                  <div className="animate-pulse flex items-center">
                    <div className="w-4 h-4 rounded-full bg-blue-400 mr-2"></div>
                    <div className="h-4 w-28 bg-gray-600 rounded"></div>
                  </div>
                ) : (
                  <>
                    <div className="flex-shrink-0 text-[#38BDF8]">
                      <MapPin size={16} className="animate-bounce" />
                    </div>
                    <span className="font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                      {greeting}
                    </span>
                  </>
                )}
              </div>
              <button 
                onClick={handleClose}
                className="text-gray-400 hover:text-white transition-colors ml-1 flex-shrink-0 hover:bg-gray-700/50 p-1 rounded-full"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GeoGreetingPopup; 