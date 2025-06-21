import React, { useState, useRef, useCallback } from 'react';
import html2canvas from 'html-to-image';
import { toast, Toaster } from 'react-hot-toast';
import { Filter } from 'bad-words';
import { toPng } from 'html-to-image';
import { ContainerTextFlip } from '../../components/ui/container-text-flip';
import { ImageCropper } from '../../components/ImageCropper/ImageCropper';
import { BackgroundBeamsWithCollision } from '../../components/ui/background-beams-with-collision';
import { BackgroundGradient } from '../../components/ui/background-gradient';
import { cn } from "../../lib/utils";
import { allTechnologies } from '../../lib/technologies';
import { Button } from '../../components/ui/button';
import { IconType } from 'react-icons';
import '../../styles/mobile-card-fix.css'; // Import mobile fixes
import { saveTechCard } from '../../lib/saveTechCard';
import { useNavigate } from 'react-router-dom';
import PageSEO from '../../components/PageSEO'; // Import the SEO component

// Initialize profanity filter
const profanityFilter = new Filter();

// Define theme types with expanded options
export type ThemeType = 
  | 'dark' 
  | 'midnight' 
  | 'cyberpunk' 
  | 'neon' 
  | 'galaxy' 
  | 'gradient-blue' 
  | 'gradient-purple' 
  | 'gradient-green' 
  | 'gradient-orange' 
  | 'gradient-red' 
  | 'custom';

// Define technology categories
export type TechCategory = 'languages' | 'frameworks' | 'ai' | 'tools';

// Define technology item type
export interface TechItem {
  id: string;
  name: string;
  icon: IconType;
  category: TechCategory;
}

// Define the form data interface with custom theme colors
export interface FormData {
  photo: string | null;
  name: string;
  bio: string;
  role: string;
  theme: ThemeType;
  customThemeFrom: string;
  customThemeTo: string;
  languages: TechItem[];
  frameworks: TechItem[];
  ai: TechItem[];
  tools: TechItem[];
  socials: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
  };
  image?: string;
}

// Helper function to render React icons
const IconRenderer = ({ icon: Icon }: { icon: IconType }) => {
  try {
    // Increase size slightly and ensure color is preserved
    return <Icon size={22} className="text-current" />;
  } catch (error) {
    console.error("Error rendering icon:", error);
    return <span>•</span>;
  }
};

// Alternative icon rendering function that's more direct
function renderIcon(Icon: IconType) {
  try {
    // Increase size slightly and ensure color is preserved
    return <Icon size={22} className="text-current" />;
  } catch (error) {
    console.error("Error rendering icon directly:", error);
    return <span>•</span>;
  }
}

const TechCardBuilder: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    photo: null,
    name: '',
    bio: '',
    role: 'Developer',
    theme: 'dark',
    customThemeFrom: '#1e293b',
    customThemeTo: '#0f172a',
    languages: [],
    frameworks: [],
    ai: [],
    tools: [],
    socials: {
      linkedin: '',
      github: '',
      twitter: '',
      website: ''
    }
  });
  const [showCropper, setShowCropper] = useState(false);
  const [tempImage, setTempImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // State for Step 4 (Technologies) - Moved to top level
  const [techSearchQuery, setTechSearchQuery] = useState("");
  const [activeTechCategory, setActiveTechCategory] = useState<TechCategory>("languages");

  // Add drag and drop functionality to the image upload component
  const [isDragging, setIsDragging] = useState(false);

  // Define steps
  const steps = [
    { id: 1, title: 'Upload Image', description: 'Choose your profile picture' },
    { id: 2, title: 'Personal Details', description: 'Tell us about yourself' },
    { id: 3, title: 'Choose Theme', description: 'Select your card style' },
    { id: 4, title: 'Select Technologies', description: 'Add your favorite tech stack' },
    { id: 5, title: 'Social Links', description: 'Add your professional profiles' },
    { id: 6, title: 'Download & Share', description: 'Get your card and share it' },
  ];

  // Handle form data change
  const handleChange = (field: keyof FormData, value: any) => {
    console.log(`TechCardBuilder handleChange: field=${field}, value=`, value);
    
    // For name field, check for profanity and character limit
    if (field === 'name' || field === 'bio' || field === 'role') {
      if (typeof value === 'string') {
        if (field === 'name' && value.length > 20) {
        setError('Name cannot exceed 20 characters');
        return;
      }
        if (field === 'bio' && value.length > 100) {
            setError('Bio cannot exceed 100 characters');
        return;
        }
         if (field === 'role' && value.length > 30) {
          setError('Role cannot exceed 30 characters');
          return;
        }

        // Use the profanity filter library
        if (profanityFilter.isProfane(value)) {
          setError('Please use appropriate language for a professional profile.');
          return; // Prevent updating state if profane
        }
      }
    }

    setError(null);
    setFormData(prevData => {
      console.log('Updating formData:', { ...prevData, [field]: value });
      return { ...prevData, [field]: value };
    });
  };

  // Handle file upload
  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }

    setError('');
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setTempImage(e.target.result as string);
          setShowCropper(true);
        }
      };
      reader.readAsDataURL(file);
  };

  // Handle crop complete
  const handleCropComplete = (croppedImage: string) => {
    handleChange('photo', croppedImage);
    setTempImage(null);
    setShowCropper(false);
  };

  // Handle trigger file input
  const handleTriggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Handle drag and drop events with improved handling
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  // Validate current step
  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.photo) {
          setError('Please upload a profile photo to continue.');
          return false;
        }
        break;
      case 2:
        if (!formData.name.trim()) {
          setError('Please enter your name to continue.');
          return false;
        }
        if (formData.name.length > 20) {
          setError('Your name should be 20 characters or less.');
          return false;
        }
        if (profanityFilter.isProfane(formData.name)) {
          setError('Please use appropriate language for your professional name.');
          return false;
        }
        if (formData.bio.length > 100) {
          setError('Your bio should be 100 characters or less.');
          return false;
        }
        if (profanityFilter.isProfane(formData.bio)) {
          setError('Please use appropriate language in your professional bio.');
          return false;
        }
        if (!formData.role.trim()) {
          setError('Please enter your professional role to continue.');
          return false;
        }
        if (formData.role.length > 30) {
          setError('Your role should be 30 characters or less.');
          return false;
        }
        if (profanityFilter.isProfane(formData.role)) {
          setError('Please use appropriate language in your professional role.');
          return false;
        }
        break;
      case 3:
        if (!formData.theme) {
          setError('Please select a visual theme for your card.');
          return false;
        }
        break;
      case 4:
        const totalTechs = formData.languages.length + formData.frameworks.length + formData.ai.length + formData.tools.length;
        if (totalTechs === 0) {
          setError('Please select at least one technology to showcase your skills.');
          return false;
        }
        if (formData.languages.length > 5) {
          setError('You can select a maximum of 5 programming languages.');
          return false;
        }
        if (formData.frameworks.length > 5) {
          setError('You can select a maximum of 5 frameworks.');
          return false;
        }
        if (formData.ai.length > 5) {
          setError('You can select a maximum of 5 AI tools.');
          return false;
        }
        if (formData.tools.length > 5) {
          setError('You can select a maximum of 5 development tools.');
          return false;
        }
        break;
      case 5:
        // Validate website URL format if provided
        if (formData.socials.website && !formData.socials.website.match(/^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/)) {
          setError('Please enter a valid website URL.');
          return false;
        }
        
        // No required fields in social links step, so we'll always return true
        return true;
      case 6:
        return true;
      default:
        return true;
    }
    return true;
  };

  // Navigate to next step
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  // Navigate to previous step
  const prevStep = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
    setError(null);
    window.scrollTo(0, 0);
  };

  // Jump to specific step
  const jumpToStep = (step: number) => {
    // Validate all previous steps
    for (let i = 1; i < step; i++) {
      if (!validateStep(i)) {
        setCurrentStep(i);
        window.scrollTo(0, 0);
        return;
      }
    }
    setCurrentStep(step);
    setError(null);
    window.scrollTo(0, 0);
  };

  // Download card as image - using html-to-image for better quality with transparent background
  const downloadCard = useCallback(async () => {
    if (cardRef.current) {
      try {
        toast.loading('Generating your tech card...', { id: 'download' });
        
        // Force fixed dimensions and styles for capture
        // Increasing width to ensure content doesn't get cut off
        cardRef.current.style.width = '420px'; // Further increased from 360px to prevent any cutting
        cardRef.current.style.minHeight = '650px'; // Increased for better proportions
        cardRef.current.style.margin = '0 auto';
        
        // Force profile image to be visible (fix for mobile)
        const profileContainer = cardRef.current.querySelector('.mobile-profile-container');
        if (profileContainer) {
          (profileContainer as HTMLElement).style.position = 'relative';
          (profileContainer as HTMLElement).style.zIndex = '50';
          (profileContainer as HTMLElement).style.display = 'block';
          
          // Ensure the image inside is visible
          const profileImg = profileContainer.querySelector('img');
          if (profileImg) {
            (profileImg as HTMLElement).style.position = 'relative';
            (profileImg as HTMLElement).style.opacity = '1';
            (profileImg as HTMLElement).style.visibility = 'visible';
          }
        }
        
        // Small delay to ensure styles are applied
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Generate the image with higher quality options
        const dataUrl = await toPng(cardRef.current, {
          cacheBust: true,
          pixelRatio: 3, // Increased from 2 for higher quality
          quality: 1.0, // Maximum quality
          width: 420, // Explicit width matching the style
          height: 650, // Explicit height
          canvasWidth: 1260, // 3x the width for higher resolution
          canvasHeight: 1950, // 3x the height for higher resolution
          skipAutoScale: false // Don't skip auto scaling
        });
        
        // Reset styles
        cardRef.current.style.width = '';
        cardRef.current.style.minHeight = '';
        cardRef.current.style.margin = '';
        
        // Reset profile container styles
        if (profileContainer) {
          (profileContainer as HTMLElement).style.position = '';
          (profileContainer as HTMLElement).style.zIndex = '';
          (profileContainer as HTMLElement).style.display = '';
          
          // Reset image styles
          const profileImg = profileContainer.querySelector('img');
          if (profileImg) {
            (profileImg as HTMLElement).style.position = '';
            (profileImg as HTMLElement).style.opacity = '';
            (profileImg as HTMLElement).style.visibility = '';
          }
        }
        
        // Save the image URL to formData
        handleChange('image', dataUrl);
        
        // Save the card to Firestore
        await saveTechCard({...formData, image: dataUrl});
        
        // Create a temporary image to confirm the data URL is valid
        const img = new Image();
        img.src = dataUrl;
        
        // Wait for image to load to confirm it's valid
        img.onload = () => {
        // Direct download approach - create a direct download link in the current page
        const downloadLink = document.createElement('a');
        downloadLink.href = dataUrl;
        downloadLink.download = `tech-card-${formData.name.toLowerCase().replace(/\s+/g, '-') || 'tech-card'}.png`;
        document.body.appendChild(downloadLink);
          
          // For mobile Safari, we need a different approach
          if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
            window.open(dataUrl, '_blank');
          }
          
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        toast.success('Card downloaded and saved!', { id: 'download' });
        };
        
        img.onerror = () => {
          toast.error('Could not generate image. Please try again.', { id: 'download' });
        };
      } catch (error) {
        console.error('Error generating card:', error);
        toast.error('Failed to generate tech card. Please try again.');
      }
    }
  }, [formData, handleChange]);

  // Render a copy of the card for the preview in step 6
  const renderCard = () => (
    <div className="w-full max-w-[380px] mx-auto">
      <div className="p-[2px] rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <div className={`p-4 rounded-3xl ${
          formData.theme === 'dark' ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 
          'bg-gradient-to-br from-blue-900 to-gray-900'} text-white`}
        >
          <div className="flex flex-col items-center">
            {/* Profile pic */}
            <div className="w-32 h-32 rounded-full mb-4 overflow-hidden border-2 border-white/30">
              {formData.photo && (
                <img src={formData.photo} alt={formData.name} className="w-full h-full object-cover" />
              )}
            </div>
            
            {/* Name & role */}
            <h3 className="text-xl font-bold text-center">{formData.name || "Your Name"}</h3>
            
            {formData.bio && (
              <p className="text-sm text-center my-2 text-gray-300">{formData.bio}</p>
            )}
            
            <div className="px-3 py-1 bg-white/20 rounded-full text-sm mt-2">
              {formData.role}
            </div>
            
            {/* Tech stack preview */}
            <div className="w-full mt-6">
              <h4 className="text-xs uppercase tracking-wider text-center mb-2">My Tech Stack</h4>
              <div className="flex flex-wrap justify-center gap-2">
                {[...formData.languages, ...formData.frameworks, ...formData.ai, ...formData.tools]
                  .slice(0, 6)
                  .map(tech => (
                    <div key={tech.id} className="px-2 py-1 bg-gray-800/70 rounded-md text-xs flex items-center gap-1.5">
                      <span>{tech.name}</span>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Share card - Update with improved share message
  const shareCard = useCallback(async (platform: 'whatsapp' | 'twitter' | 'copy') => {
    if (cardRef.current) {
      try {
        toast.loading('Saving your tech card...', { id: 'share' });
        
        // First, ensure we have the card image for proper storage
        if (!formData.image) {
          // Use html-to-image for better quality export
          const dataUrl = await toPng(cardRef.current, {
            cacheBust: true,
            pixelRatio: 2,
            quality: 0.95
          });
          
          // Update form data with the generated image
          formData.image = dataUrl;
        }
        
        // Save the card to Firestore
        const cardId = await saveTechCard(formData);
        
        // Create share URL with the actual card ID
        const shareUrl = `${window.location.origin}/card/${cardId}`;
        const shareMessage = "Check out my Tech Card! Create your own on Shreyas's Portfolio: ";
        const hashtags = "#TechCard #DeveloperCard #TechStack";

        toast.success('Card saved successfully!', { id: 'share' });
        
        // Mobile detection
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
        // Try various clipboard methods for best device support
        let copySuccess = false;
        
        // First try the clipboard API with fallbacks
        try {
          await navigator.clipboard.writeText(shareUrl);
          copySuccess = true;
          toast.success('Link copied to clipboard!');
        } catch (err) {
          console.log('Clipboard API failed, trying fallbacks...');
          
          // For iOS devices
          if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            try {
              // Create temporary editable element
              const el = document.createElement('input');
              el.value = shareUrl;
              el.contentEditable = 'true';
              el.readOnly = false;
              
              // Specific iOS styles for visibility
              el.style.position = 'fixed';
              el.style.left = '0';
              el.style.top = '0';
              el.style.opacity = '1';
              el.style.fontSize = '16px'; // iOS zooms in with smaller fonts
              document.body.appendChild(el);
              
              // Select and focus
              const range = document.createRange();
              range.selectNodeContents(el);
              
              const selection = window.getSelection();
              if (selection) {
                selection.removeAllRanges();
                selection.addRange(range);
                el.setSelectionRange(0, 999999);
              }
              
              // Show visible feedback so user knows to copy manually if needed
              toast.success('Press Copy on your keyboard');
              
              // Try execCommand
              copySuccess = document.execCommand('copy');
              if (copySuccess) {
                toast.success('Link copied to clipboard!');
              } else {
                // Show URL for manual copy
                toast.success('Copy manually: ' + shareUrl);
              }
              
              document.body.removeChild(el);
            } catch (e) {
              console.error('iOS copy failed', e);
              copySuccess = false;
            }
          } else {
            // For Android and other devices
            try {
          const textArea = document.createElement('textarea');
          textArea.value = shareUrl;
          textArea.style.position = 'fixed';
              textArea.style.top = '0';
              textArea.style.left = '0';
              textArea.style.width = '100%';
              textArea.style.opacity = '0';
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          
          try {
                copySuccess = document.execCommand('copy');
                if (copySuccess) {
            toast.success('Link copied to clipboard!');
                }
          } catch (e) {
                console.error('execCommand failed', e);
                copySuccess = false;
          }
          
          document.body.removeChild(textArea);
            } catch (e) {
              console.error('Android copy failed', e);
              copySuccess = false;
            }
          }
        }
        
        // If all else fails, at least show the URL
        if (!copySuccess) {
          // Create modal or popup with the URL to make it obvious
          toast.success('Copy this manually: ' + shareUrl);
          
          // If on mobile, try to make the URL selectable
          if (isMobile) {
            // Create a visible element for manual selection on mobile
            const urlDisplay = document.createElement('div');
            urlDisplay.style.position = 'fixed';
            urlDisplay.style.left = '10%';
            urlDisplay.style.right = '10%';
            urlDisplay.style.top = '40%';
            urlDisplay.style.padding = '20px';
            urlDisplay.style.backgroundColor = '#333';
            urlDisplay.style.color = 'white';
            urlDisplay.style.borderRadius = '12px';
            urlDisplay.style.zIndex = '9999';
            urlDisplay.style.textAlign = 'center';
            urlDisplay.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
            
            urlDisplay.innerHTML = `
              <p style="margin-bottom:10px;font-weight:bold;">Copy this link:</p>
              <p style="background:#222;padding:10px;border-radius:6px;word-break:break-all;margin-bottom:10px;user-select:all;">${shareUrl}</p>
              <button id="url-close-btn" style="background:#4a5568;border:none;padding:8px 16px;border-radius:6px;color:white;">Close</button>
            `;
            
            document.body.appendChild(urlDisplay);
            
            // Add close handler
            document.getElementById('url-close-btn')?.addEventListener('click', () => {
              document.body.removeChild(urlDisplay);
            });
            
            // Auto-remove after 10 seconds
            setTimeout(() => {
              if (document.body.contains(urlDisplay)) {
                document.body.removeChild(urlDisplay);
              }
            }, 10000);
          }
        }
        
        // Continue with platform sharing
        switch (platform) {
          case 'whatsapp':
            // Create the message text
            const whatsappText = encodeURIComponent(shareMessage + shareUrl + "\n\n" + hashtags);
            
            // Try direct app URL for both iOS and Android
            const whatsappAppUrl = `whatsapp://send?text=${whatsappText}`;
            
            // First try to open the app - this is direct and more reliable than iframe
            window.location.href = whatsappAppUrl;
            
            // After a short delay, check if we need to fallback to web version
            // This approach works better because window.location.href doesn't give feedback if app opened
            setTimeout(() => {
              // If we're still on the same page, fallback to web version
              window.open(`https://wa.me/?text=${whatsappText}`, '_blank');
            }, 500);
            break;
            
          case 'twitter':
            // Create the tweet text
            const tweetText = encodeURIComponent(shareMessage + shareUrl);
            const tweetHashtags = "TechCard,DeveloperCard,TechStack";
            
            // Try multiple URI schemes for X app (formerly Twitter)
            // Different versions work on different devices/OS versions
            try {
              // Try the newer X app schemes first
              window.location.href = `x://compose?text=${tweetText}&hashtags=${tweetHashtags}`;
              
              // Set a short timeout to try alternate schemes if the first one doesn't work
              setTimeout(() => {
                try {
                  // Fallback to twitter schemes which may still work in the X app
                  window.location.href = `twitter://post?message=${tweetText}&hashtags=${tweetHashtags}`;
                  
                  // Final fallback to tweet intent
                  setTimeout(() => {
                    // If we're still here, try one more app URI scheme
                    window.location.href = `twitter://compose?text=${tweetText}&hashtags=${tweetHashtags}`;
                    
                    // Web fallback as final option
                    setTimeout(() => {
                      window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(shareUrl)}&hashtags=TechCard,DeveloperCard,TechStack`, '_blank');
                    }, 300);
                  }, 300);
                } catch (e) {
                  // If any error occurs, use web fallback
                  window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(shareUrl)}&hashtags=TechCard,DeveloperCard,TechStack`, '_blank');
                }
              }, 300);
            } catch (e) {
              // If any error occurs, use web fallback
              window.open(`https://x.com/intent/tweet?text=${encodeURIComponent(shareMessage)}&url=${encodeURIComponent(shareUrl)}&hashtags=TechCard,DeveloperCard,TechStack`, '_blank');
            }
            break;
            
          case 'copy':
            // Already copied above, do nothing else
            break;
        }
      } catch (error) {
        console.error('Error sharing card:', error);
        toast.error('Failed to share card. Please try again.');
      }
    }
  }, [formData, navigate]);

  // Render form based on current step
  const renderForm = () => {
    switch (currentStep) {
      case 1: // Upload Image
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-center">Upload Your Photo</h2>
            <p className="text-gray-300 mb-8">Choose a professional photo for your tech card</p>
            
            <div 
              className={`w-64 h-64 mx-auto mb-6 border-2 ${
                isDragging 
                  ? 'border-blue-500 bg-blue-500/20 scale-105 shadow-xl transform transition-all duration-200'
                  : formData.photo
                    ? 'border-gray-600 hover:border-blue-400 hover:shadow-lg'
                    : 'border-dashed border-gray-600 hover:border-blue-400'
              } rounded-xl flex flex-col items-center justify-center cursor-pointer bg-gray-800 hover:bg-gray-700 transition-all`}
              onClick={handleTriggerFileInput}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {formData.photo ? (
                <div className="w-full h-full relative group">
                  <img 
                    src={formData.photo} 
                    alt="Preview" 
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-xl transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
                    </svg>
                    <span className="ml-2 text-white font-medium">Change Photo</span>
                  </div>
                </div>
              ) : (
                <>
                  <div className={`transition-transform ${isDragging ? 'scale-110' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-14 w-14 ${isDragging ? 'text-blue-400' : 'text-gray-400'} mb-3`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className={`text-sm text-center ${isDragging ? 'text-blue-300' : 'text-gray-300'}`}>
                    {isDragging ? 'Drop your file here' : 'Click to upload\nor drag and drop'}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">Supports JPG, PNG, GIF</p>
                </>
              )}
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                ref={fileInputRef}
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
              />
            </div>
            
            {/* Image Cropper */}
            {tempImage && (
              <ImageCropper
                image={tempImage}
                onCropComplete={handleCropComplete}
                open={showCropper}
                onClose={() => {
                  setShowCropper(false);
                  setTempImage(null);
                }}
                aspectRatio={1}
              />
            )}

            {formData.photo && (
              <div className="flex space-x-3">
              <button
                onClick={handleTriggerFileInput}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-full text-white transition-all"
              >
                Change Photo
              </button>
                <button
                  onClick={() => {
                    setTempImage(formData.photo);
                    setShowCropper(true);
                  }}
                  className="px-6 py-2 bg-green-600 hover:bg-green-500 rounded-full text-white transition-all"
                >
                  Crop Again
                </button>
              </div>
            )}
          </div>
        );
        
      case 2: // Personal Details
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-center">Personal Details</h2>
            <p className="text-gray-300 mb-8">Tell us about yourself</p>
            
            <div className="w-full max-w-md space-y-6">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Your Name"
                  maxLength={20}
                  className="w-full bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-lg py-3 px-4 text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <div className={`absolute right-3 bottom-3 text-xs ${formData.name.length > 15 ? 'text-red-400' : 'text-gray-400'}`}>
                  {formData.name.length}/20
                </div>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-1">Professional Role</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => handleChange('role', e.target.value)}
                  placeholder="e.g. Frontend Developer, UX Designer"
                  maxLength={30}
                  className="w-full bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-lg py-3 px-4 text-white text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <div className={`absolute right-3 bottom-3 text-xs ${formData.role.length > 25 ? 'text-red-400' : 'text-gray-400'}`}>
                  {formData.role.length}/30
                </div>
              </div>
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-300 mb-1">Short Bio <span className="text-gray-400">(optional)</span></label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleChange('bio', e.target.value)}
                  placeholder="Brief description about yourself"
                  maxLength={100}
                  rows={4}
                  className="w-full bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-lg py-3 px-4 text-white text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
                <div className={`absolute right-3 bottom-3 text-xs ${formData.bio.length > 90 ? 'text-red-400' : 'text-gray-400'}`}>
                  {formData.bio.length}/100
                </div>
              </div>
            </div>
          </div>
        );
        
      case 3: // Choose Theme
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-center">Choose Your Theme</h2>
            <p className="text-gray-300 mb-6">Select a visual style for your tech card or create your own</p>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 w-full max-w-3xl">
              {([
                { 
                  id: 'dark',
                  name: 'Dark Mode',
                  icon: '🌙',
                  gradient: 'from-gray-800 to-gray-900',
                  description: 'Classic dark mode'
                },
                { 
                  id: 'midnight',
                  name: 'Midnight Blue',
                  icon: '🌌',
                  gradient: 'from-gray-900 via-blue-900 to-gray-900',
                  description: 'Deep blue night sky'
                },
                { 
                  id: 'cyberpunk',
                  name: 'Cyberpunk',
                  icon: '⚡',
                  gradient: 'from-indigo-900 via-purple-900 to-pink-900',
                  description: 'Neon futuristic vibes'
                },
                { 
                  id: 'neon',
                  name: 'Neon Glow',
                  icon: '💫',
                  gradient: 'from-green-900 via-emerald-800 to-teal-900',
                  description: 'Glowing electric feel'
                },
                { 
                  id: 'galaxy',
                  name: 'Galaxy',
                  icon: '🔭',
                  gradient: 'from-purple-900 via-violet-800 to-indigo-900',
                  description: 'Cosmic space theme'
                },
                { 
                  id: 'gradient-blue',
                  name: 'Ocean Blue',
                  icon: '🌊',
                  gradient: 'from-blue-700 via-blue-600 to-blue-800',
                  description: 'Deep ocean feel'
                },
                { 
                  id: 'gradient-purple',
                  name: 'Mystic Purple',
                  icon: '🔮',
                  gradient: 'from-purple-700 via-purple-600 to-purple-900',
                  description: 'Magical purple tones'
                },
                { 
                  id: 'gradient-green',
                  name: 'Forest Green',
                  icon: '🌲',
                  gradient: 'from-green-700 via-green-600 to-green-900',
                  description: 'Natural forest vibe'
                },
                { 
                  id: 'gradient-orange',
                  name: 'Sunset Orange',
                  icon: '🌅',
                  gradient: 'from-orange-600 via-amber-600 to-red-700',
                  description: 'Warm sunset colors'
                },
                { 
                  id: 'gradient-red',
                  name: 'Ruby Red',
                  icon: '❤️',
                  gradient: 'from-red-700 via-rose-600 to-red-900',
                  description: 'Bold ruby red theme'
                },
                { 
                  id: 'custom',
                  name: 'Custom Gradient',
                  icon: '🎨',
                  gradient: 'from-blue-600 to-purple-600',
                  description: 'Create your own gradient'
                }
              ] as { id: ThemeType, name: string, icon: string, gradient: string, description: string }[]).map((theme) => (
                <div
                  key={theme.id}
                  onClick={() => handleChange('theme', theme.id)}
                  className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all transform hover:scale-105 hover:-translate-y-1 ${
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
                    <span className="text-xs text-gray-300 mt-1 text-center">{theme.description}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {formData.theme === 'custom' && (
              <div className="mt-8 w-full max-w-md p-6 bg-gray-800 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold mb-4">Customize Your Gradient</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Start Color</label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={formData.customThemeFrom}
                        onChange={(e) => handleChange('customThemeFrom', e.target.value)}
                        className="h-10 w-10 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={formData.customThemeFrom}
                        onChange={(e) => handleChange('customThemeFrom', e.target.value)}
                        className="bg-gray-700 rounded-lg px-3 py-2 text-sm w-full"
                        placeholder="#RRGGBB"
                      />
          </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">End Color</label>
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        value={formData.customThemeTo}
                        onChange={(e) => handleChange('customThemeTo', e.target.value)}
                        className="h-10 w-10 rounded cursor-pointer"
                      />
                      <input
                        type="text"
                        value={formData.customThemeTo}
                        onChange={(e) => handleChange('customThemeTo', e.target.value)}
                        className="bg-gray-700 rounded-lg px-3 py-2 text-sm w-full"
                        placeholder="#RRGGBB"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm text-gray-400 mb-2">Preview:</p>
                    <div 
                      className="h-16 w-full rounded-lg"
                      style={{
                        background: `linear-gradient(to right, ${formData.customThemeFrom}, ${formData.customThemeTo})`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
        
      case 4: // Select Technologies
        const filteredTechnologies = techSearchQuery
          ? Object.values(allTechnologies).flat().filter(tech => 
              tech.name.toLowerCase().includes(techSearchQuery.toLowerCase())
            )
          : allTechnologies[activeTechCategory];
          
        const handleTechSelect = (tech: TechItem) => {
          const category = tech.category;
          console.log(`TechCardBuilder - Selecting ${tech.name} in category ${category}`);
          
          const currentTechs = [...formData[category]];
          const exists = currentTechs.some(item => item.id === tech.id);
          
          if (exists) {
            console.log(`Removing ${tech.name} from ${category}`);
            const updatedTechs = currentTechs.filter(item => item.id !== tech.id);
            console.log(`${category} after removal:`, updatedTechs.map(t => t.name));
            handleChange(category, updatedTechs);
            toast.success(`Removed ${tech.name} from your tech stack`, { duration: 2000 });
          } else {
            if (currentTechs.length < 5) {
              console.log(`Adding ${tech.name} to ${category}`);
              const updatedTechs = [...currentTechs, tech];
              console.log(`${category} after addition:`, updatedTechs.map(t => t.name));
              handleChange(category, updatedTechs);
              toast.success(`Added ${tech.name} to your tech stack`, { duration: 2000 });
              setError(null);
            } else {
              toast.error(`You can select a maximum of 5 ${category === 'languages' ? 'programming languages' : 
                                                 category === 'frameworks' ? 'frameworks' : 
                                                 category === 'ai' ? 'AI tools' : 'development tools'}.`, 
                          { duration: 3000 });
            }
          }
        };
        
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-center">Select Technologies</h2>
            <p className="text-gray-300 mb-6">Choose the technologies you work with (maximum 5 per category)</p>
            
            <div className="w-full max-w-3xl">
              {/* Search Bar - more Apple-like */}
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={techSearchQuery}
                  onChange={(e) => setTechSearchQuery(e.target.value)}
                  placeholder="Search technologies..."
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-lg"
                />
                {techSearchQuery && (
                  <button 
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    onClick={() => setTechSearchQuery("")}
                  >
                    <svg className="h-5 w-5 text-gray-400 hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              
              {/* Category Tabs - more Apple-like */}
              {!techSearchQuery && (
                <div className="flex space-x-2 mb-6 bg-gray-800/60 p-1.5 rounded-2xl shadow-lg backdrop-blur-sm">
                  {(['languages', 'frameworks', 'ai', 'tools'] as TechCategory[]).map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveTechCategory(category)}
                      className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
                        activeTechCategory === category
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-gray-300 hover:bg-gray-700/70'
                      }`}
                    >
                      {category === 'languages' ? 'Languages' : 
                       category === 'frameworks' ? 'Frameworks' :
                       category === 'ai' ? 'AI Tools' : 'Dev Tools'}
                      {formData[category].length > 0 && (
                        <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs bg-blue-500 rounded-full">
                          {formData[category].length}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
              
              {/* Selected Technologies */}
              {(formData.languages.length > 0 || formData.frameworks.length > 0 || formData.ai.length > 0 || formData.tools.length > 0) && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-300 mb-3">Selected Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(formData).map(([category, techs]) => {
                      if (Array.isArray(techs) && techs.length > 0) {
                        return techs.map((tech) => (
                          <div
                            key={tech.id}
                            onClick={() => handleTechSelect(tech)}
                            className={`cursor-pointer py-2 px-4 rounded-full flex items-center transition-all shadow-md
                              ${tech.category === 'languages' ? 'bg-gradient-to-r from-blue-600 to-blue-500' :
                                tech.category === 'frameworks' ? 'bg-gradient-to-r from-purple-600 to-purple-500' :
                                tech.category === 'ai' ? 'bg-gradient-to-r from-green-600 to-green-500' : 
                                'bg-gradient-to-r from-orange-600 to-orange-500'} text-white hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0`
                            }
                          >
                            <span className="mr-2 flex-shrink-0">{renderIcon(tech.icon)}</span>
                            <span className="font-medium truncate max-w-[120px]">{tech.name}</span>
                            <span className="ml-2 opacity-70 hover:opacity-100 flex-shrink-0">×</span>
                          </div>
                        ));
                      }
                      return null;
                    })}
                  </div>
                </div>
              )}
              
              {/* Technology Selection Grid - Apple-like design with improved spacing */}
              <div className="bg-gray-900/90 rounded-2xl p-5 border border-gray-800 min-h-[200px] shadow-lg backdrop-blur-sm">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
                  {filteredTechnologies.map((tech) => {
                    const isSelected = formData[tech.category].some(item => item.id === tech.id);
                    return (
                      <div
                        key={tech.id}
                        onClick={() => {
                          console.log("Clicking tech item:", tech.name);
                          handleTechSelect(tech);
                        }}
                        className={`cursor-pointer py-2.5 px-2 sm:px-4 rounded-xl flex items-center transition-all ${
                          isSelected
                            ? tech.category === 'languages' ? 'bg-blue-600/20 border border-blue-500 shadow-md shadow-blue-500/20' :
                              tech.category === 'frameworks' ? 'bg-purple-600/20 border border-purple-500 shadow-md shadow-purple-500/20' :
                              tech.category === 'ai' ? 'bg-green-600/20 border border-green-500 shadow-md shadow-green-500/20' :
                              'bg-orange-600/20 border border-orange-500 shadow-md shadow-orange-500/20'
                            : 'bg-gray-800/95 hover:bg-gray-700/95 border border-gray-700 hover:border-gray-600 hover:shadow-md'
                        }`}
                      >
                        <span className="mr-1.5 sm:mr-3 text-lg flex-shrink-0 flex items-center justify-center">{renderIcon(tech.icon)}</span>
                        <span className="text-xs sm:text-sm font-medium truncate max-w-[60px] sm:max-w-none">{tech.name}</span>
                        {isSelected && (
                          <svg className="ml-auto h-3.5 w-3.5 sm:h-4 sm:w-4 text-white flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    );
                  })}
                </div>
                
                {filteredTechnologies.length === 0 && (
                  <div className="py-10 text-center text-gray-400">
                    <p>{techSearchQuery ? 'No technologies found matching your search.' : 'Select a category above.'}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
        
      case 5: // Social Links
        const handleSocialChange = (platform: keyof FormData['socials'], value: string) => {
          setFormData({
            ...formData,
            socials: {
              ...formData.socials,
              [platform]: value
            }
          });
        };
        
        return (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 text-center">Add Your Social Links</h2>
            <p className="text-gray-300 mb-6">Connect your professional profiles (all fields optional)</p>
            
            <div className="w-full max-w-md space-y-5">
              <div className="relative">
                <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2 text-blue-500" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path>
                    </svg>
                  LinkedIn Profile
                </label>
                <div className="flex">
                  <div className="bg-gray-700 rounded-l-lg px-3 py-3 flex items-center">
                    <span className="text-gray-400">linkedin.com/in/</span>
                  </div>
                  <input
                    type="text"
                    value={formData.socials.linkedin || ''}
                    onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                    placeholder="username"
                    className="w-full bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 border-l-0 rounded-r-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              
              <div className="relative">
                <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2 text-gray-400" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  GitHub Profile
                </label>
                <div className="flex">
                  <div className="bg-gray-700 rounded-l-lg px-3 py-3 flex items-center">
                    <span className="text-gray-400">github.com/</span>
                </div>
                  <input
                    type="text"
                    value={formData.socials.github || ''}
                    onChange={(e) => handleSocialChange('github', e.target.value)}
                    placeholder="username"
                    className="w-full bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 border-l-0 rounded-r-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              
              <div className="relative">
                <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2 text-black" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  X (Twitter) Profile
                </label>
                <div className="flex">
                  <div className="bg-gray-700 rounded-l-lg px-3 py-3 flex items-center">
                    <span className="text-gray-400">twitter.com/</span>
                  </div>
                  <input
                    type="text"
                    value={formData.socials.twitter || ''}
                    onChange={(e) => handleSocialChange('twitter', e.target.value)}
                    placeholder="username"
                    className="w-full bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 border-l-0 rounded-r-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              
              <div className="relative">
                <label className="flex items-center text-sm font-medium text-gray-300 mb-2">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2 text-green-500" fill="currentColor">
                    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm7.931 9h-2.764a14.67 14.67 0 0 0-1.792-6.243A8.013 8.013 0 0 1 19.931 11zM12.53 4.027c1.035 1.364 2.427 3.78 2.627 6.973H9.03c.139-2.596.994-5.028 2.451-6.974.172-.01.344-.026.519-.026.179 0 .354.016.53.027zm-3.842.7C7.704 6.618 7.136 8.762 7.03 11H4.069a8.013 8.013 0 0 1 4.619-6.273zM4.069 13h2.974c.136 2.379.665 4.478 1.556 6.23A8.01 8.01 0 0 1 4.069 13zm7.381 6.973C10.049 18.275 9.222 15.896 9.041 13h6.113c-.208 2.773-1.117 5.196-2.603 6.972-.182.012-.364.028-.551.028-.186 0-.367-.016-.55-.027zm4.011-.772c.955-1.794 1.538-3.901 1.691-6.201h2.778a8.005 8.005 0 0 1-4.469 6.201z"/>
                  </svg>
                  Personal Website
                </label>
                <input
                  type="url"
                  value={formData.socials.website || ''}
                  onChange={(e) => handleSocialChange('website', e.target.value)}
                  placeholder="https://yourwebsite.com"
                  className="w-full bg-gray-800 bg-opacity-50 backdrop-blur-sm border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>
        );
        
      case 6: // Download & Share
        return (
          <div className="flex flex-col items-center mobile-card-wrapper">
            <h2 className="text-2xl font-bold mb-4 text-center">Your Tech Card is Ready!</h2>
            <p className="text-gray-300 mb-4 text-center">Here's your personalized tech card to share with the world</p>
            
            {/* Mobile-optimized preview container */}
            <div className="w-full flex items-center justify-center min-h-[400px] py-6 px-4 
              bg-gradient-to-br from-gray-900 to-black rounded-xl sm:rounded-3xl shadow-2xl mb-8 mobile-card-container">
              <div className="w-full max-w-[380px] mx-auto">
                {/* Card container with mobile classes */}
                <div className="w-full mx-auto rounded-3xl p-[2px] relative overflow-hidden bg-black transition-all" 
                  style={{ minHeight: '400px', height: 'auto' }}
                  data-mobile-card="true">
                  {/* Shiny border effect */}
                  <div className="absolute inset-0 rounded-3xl z-0 animate-border-glow">
                    <div className="absolute inset-0 rounded-3xl bg-[conic-gradient(from_0deg,#7b61ff,#00ccb1,#ffc414,#1ca0fb,#7b61ff)] blur-sm opacity-70 animate-spin-slow"></div>
                  </div>

                  <div 
                    className="relative overflow-hidden rounded-3xl w-full h-full mx-auto z-10 flex flex-col items-center justify-center mobile-card-content" 
                    ref={cardRef}
                  >
                    {/* Card content with new theme styles and social links */}
                    <div className={`relative w-full flex flex-col p-4 sm:p-6 rounded-3xl overflow-hidden ${
                      formData.theme === 'dark'
                        ? 'bg-gradient-to-br from-gray-800 to-gray-900 text-white'
                        : formData.theme === 'midnight'
                        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white'
                        : formData.theme === 'cyberpunk'
                        ? 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white'
                        : formData.theme === 'neon'
                        ? 'bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 text-white'
                        : formData.theme === 'galaxy'
                        ? 'bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900 text-white'
                        : formData.theme === 'gradient-blue'
                        ? 'bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 text-white'
                        : formData.theme === 'gradient-purple'
                        ? 'bg-gradient-to-br from-purple-700 via-purple-600 to-purple-900 text-white'
                        : formData.theme === 'gradient-green'
                        ? 'bg-gradient-to-br from-green-700 via-green-600 to-green-900 text-white'
                        : formData.theme === 'gradient-orange'
                        ? 'bg-gradient-to-br from-orange-600 via-amber-600 to-red-700 text-white'
                        : formData.theme === 'gradient-red'
                        ? 'bg-gradient-to-br from-red-700 via-rose-600 to-red-900 text-white'
                        : formData.theme === 'custom'
                        ? 'text-white'
                        : 'bg-gradient-to-br from-gray-800 to-gray-900 text-white'
                    }`}
                      style={formData.theme === 'custom' ? { 
                        background: `linear-gradient(to bottom right, ${formData.customThemeFrom}, ${formData.customThemeTo})`,
                        minHeight: '400px', 
                      } : { minHeight: '400px' }}
                    >
                      <div className="flex-1 flex flex-col items-center justify-center mobile-text-content">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white border-opacity-30 mb-4 shadow-lg relative bg-black mobile-profile-container">
                          {formData.photo ? (
                            <img 
                              src={formData.photo} 
                              alt={formData.name} 
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
                          {formData.name || "Your Name"}
                        </div>
                        
                        {formData.bio && (
                          <p className="text-center text-xs sm:text-sm mb-3 px-2 opacity-90 max-w-[250px] mx-auto whitespace-pre-wrap break-words">
                            {formData.bio}
                          </p>
                        )}
                        
                        <div className="px-4 sm:px-6 py-1 sm:py-1.5 rounded-full bg-white bg-opacity-20 backdrop-blur-sm text-opacity-90 text-xs sm:text-sm font-medium">
                          {formData.role}
                        </div>
                        
                        {/* Social links */}
                        {(formData.socials.linkedin || formData.socials.github || formData.socials.twitter || formData.socials.website) && (
                          <div className="flex justify-center mt-3 space-x-2 sm:space-x-3">
                            {formData.socials.linkedin && (
                              <a className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-blue-600/50 transition-colors"
                                 href={`https://linkedin.com/in/${formData.socials.linkedin}`} target="_blank" rel="noopener noreferrer">
                                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path>
                                </svg>
                              </a>
                            )}
                            
                            {formData.socials.github && (
                              <a className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-gray-700/70 transition-colors"
                                 href={`https://github.com/${formData.socials.github}`} target="_blank" rel="noopener noreferrer">
                                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                              </a>
                            )}
                            
                            {formData.socials.twitter && (
                              <a className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-black/50 transition-colors"
                                 href={`https://twitter.com/${formData.socials.twitter}`} target="_blank" rel="noopener noreferrer">
                                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                              </a>
                            )}
                            
                            {formData.socials.website && (
                              <a className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-green-600/50 transition-colors"
                                 href={formData.socials.website.startsWith('http') ? formData.socials.website : `https://${formData.socials.website}`} 
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
                      <div className="w-full mt-auto pt-3 sm:pt-4 mobile-tech-stack">
                        <h4 className="text-xs font-semibold text-center mb-2 text-white/80 uppercase tracking-wider">MY TECH STACK</h4>
                        <div className="flex flex-wrap justify-center gap-1 sm:gap-1.5 px-1 py-0.5">
                          {/* Languages with improved styling */}
                          {formData.languages.map((tech) => (
                          <div
                            key={tech.id}
                              className="bg-gray-900/90 backdrop-blur-sm rounded-lg px-1.5 sm:px-2 py-1 sm:py-1.5 shadow-md flex items-center gap-1 sm:gap-1.5 border border-blue-500/40 mb-1"
                            >
                              <div className="flex items-center justify-center text-blue-400 flex-shrink-0">
                                {renderIcon(tech.icon)}
                            </div>
                              <span className="text-xs font-medium text-white truncate max-w-[55px] sm:max-w-[70px]">{tech.name}</span>
                          </div>
                        ))}
                        
                          {/* Frameworks */}
                          {formData.frameworks.map((tech) => (
                            <div
                              key={tech.id}
                              className="bg-gray-900/90 backdrop-blur-sm rounded-lg px-1.5 sm:px-2 py-1 sm:py-1.5 shadow-md flex items-center gap-1 sm:gap-1.5 border border-purple-500/40 mb-1"
                            >
                              <div className="flex items-center justify-center text-purple-400 flex-shrink-0">
                                {renderIcon(tech.icon)}
                            </div>
                              <span className="text-xs font-medium text-white truncate max-w-[55px] sm:max-w-[70px]">{tech.name}</span>
                          </div>
                          ))}
                          
                          {/* AI tools */}
                          {formData.ai.map((tech) => (
                            <div
                              key={tech.id}
                              className="bg-gray-900/90 backdrop-blur-sm rounded-lg px-1.5 sm:px-2 py-1 sm:py-1.5 shadow-md flex items-center gap-1 sm:gap-1.5 border border-green-500/40 mb-1"
                            >
                              <div className="flex items-center justify-center text-green-400 flex-shrink-0">
                                {renderIcon(tech.icon)}
                              </div>
                              <span className="text-xs font-medium text-white truncate max-w-[55px] sm:max-w-[70px]">{tech.name}</span>
                            </div>
                          ))}
                          
                          {/* Other tools */}
                          {formData.tools.map((tech) => (
                            <div
                              key={tech.id}
                              className="bg-gray-900/90 backdrop-blur-sm rounded-lg px-1.5 sm:px-2 py-1 sm:py-1.5 shadow-md flex items-center gap-1 sm:gap-1.5 border border-orange-500/40 mb-1"
                            >
                              <div className="flex items-center justify-center text-orange-400 flex-shrink-0">
                                {renderIcon(tech.icon)}
                              </div>
                              <span className="text-xs font-medium text-white truncate max-w-[55px] sm:max-w-[70px]">{tech.name}</span>
                            </div>
                          ))}
                          
                          {/* If no technologies selected, show placeholder */}
                          {(formData.languages.length === 0 && formData.frameworks.length === 0 && 
                            formData.ai.length === 0 && formData.tools.length === 0) && (
                            <>
                              <div className="text-xs text-center w-full text-gray-400">
                                Select technologies to display here
                              </div>
                              <div className="flex justify-center gap-2 w-full">
                            {[1, 2, 3].map((i) => (
                              <div
                                key={i}
                                    className="bg-gray-900/90 backdrop-blur-sm rounded-lg p-1.5 sm:p-2 shadow-sm border border-gray-800"
                              >
                                    <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center opacity-40">
                                  •
                                </div>
                              </div>
                            ))}
                              </div>
                          </>
                        )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
              <Button
                onClick={downloadCard}
                className="w-full sm:w-auto px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full flex items-center justify-center mobile-card-button"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                Download Card
              </Button>
              
              {/* Share buttons */}
              <Button
                onClick={() => shareCard('copy')}
                className="w-full sm:w-auto px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-full flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy Link
              </Button>
            </div>
            
            <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => shareCard('twitter')}
                className="p-3 rounded-full bg-gray-800 hover:bg-blue-800 transition-colors"
                >
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </button>
                <button
                onClick={() => shareCard('whatsapp')}
                className="p-3 rounded-full bg-gray-800 hover:bg-green-800 transition-colors"
                >
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path>
                  </svg>
                </button>
            </div>
            
            <div className="mt-16 text-center">
              <p className="text-gray-400 text-sm mb-4">Want to create another tech card?</p>
              <button
                onClick={() => {
                  // Reset form data and go back to step 1
                  setFormData({
                    photo: null,
                    name: '',
                    bio: '',
                    role: 'Developer',
                    theme: 'dark',
                    customThemeFrom: '#1e293b',
                    customThemeTo: '#0f172a',
                    languages: [],
                    frameworks: [],
                    ai: [],
                    tools: [],
                    socials: {
                      linkedin: '',
                      github: '',
                      twitter: '',
                      website: ''
                    }
                  });
                  setCurrentStep(1);
                }}
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full transition-colors"
              >
                Create New Card
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Render progress bar - made responsive for mobile
  const renderProgressBar = () => {
    return (
      <div className="w-full py-4 px-2 sm:px-6 md:px-10 max-w-[800px] mx-auto overflow-x-auto mb-4">
        <div className="flex items-center justify-between min-w-[500px] sm:min-w-0">
          {steps.map((step) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            const isClickable = step.id <= currentStep;
            
            return (
              <div 
                key={step.id} 
                className={`flex flex-col items-center relative flex-1 ${isClickable ? 'cursor-pointer' : ''}`}
                onClick={() => isClickable && jumpToStep(step.id)}
              >
                <div 
                  className={`w-7 sm:w-8 md:w-10 h-7 sm:h-8 md:h-10 rounded-full flex items-center justify-center ${
                    isCompleted 
                      ? 'bg-green-500' 
                      : isCurrent 
                        ? 'bg-blue-500' 
                        : 'bg-gray-700'
                  } ${
                    isCompleted || isCurrent
                      ? 'text-white'
                      : 'text-gray-400'
                  } border-3 sm:border-4 ${
                    isCompleted
                      ? 'border-green-500'
                      : isCurrent
                        ? 'border-blue-500'
                        : 'border-gray-700'
                  }`}
                >
                  {isCompleted ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 sm:h-4 md:h-5 w-3 sm:w-4 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <span className="text-[10px] sm:text-xs md:text-sm font-medium">{step.id}</span>
                  )}
                </div>
                
                <div className={`text-center mt-1 sm:mt-2 ${isCurrent ? 'text-white' : isCompleted ? 'text-green-300' : 'text-gray-400'}`}>
                  <p className={`text-[10px] sm:text-xs md:text-sm font-medium whitespace-nowrap ${isCurrent ? 'font-bold' : ''}`}>
                    {step.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="relative w-full h-1 mt-3 sm:mt-4 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="absolute h-full bg-gradient-to-r from-blue-500 to-indigo-500"
            style={{ width: `${(currentStep - 1) / (steps.length - 1) * 100}%` }}
          />
        </div>
      </div>
    );
  };

  // Render error message
  const renderError = () => {
    if (!error) return null;
    
    return (
      <div className="mt-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-red-300 text-sm flex items-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5 mr-2 flex-shrink-0" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
            clipRule="evenodd" 
          />
        </svg>
        <span>{error}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen min-w-full bg-black text-white overflow-x-hidden">
      <PageSEO 
        title="Create Your Tech Stack Card | Tech Card Builder"
        description="Create your personalized Tech Stack Card to showcase your programming languages, frameworks, AI tools, and development tools. Share your developer profile with the world."
        canonical="https://iamshreyas.live/card-builder"
        keywords="tech card, tech stack, developer card, coding profile, programming languages, frameworks, AI tools, development tools, share tech stack"
        image="https://iamshreyas.live/tech-card-preview.png"
      />
      
      <BackgroundBeamsWithCollision className="fixed inset-0 z-0 min-h-screen w-screen">
        <div className="h-full w-full"></div>
      </BackgroundBeamsWithCollision>
      
      <div className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-80 backdrop-blur-md shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <a href="/" className="flex items-center text-white hover:text-blue-400 transition-colors bg-black/60 px-3 py-2 rounded-lg shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="font-medium">Home</span>
            </a>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-colors cursor-default"
              disabled
            >
              Tech Card Builder
            </button>
          </div>
        </div>
      </div>
      
      <Toaster position="top-center" />
      
      <div className="container mx-auto py-8 px-2 sm:px-4 md:px-8 pt-24 relative z-10">
        <div
          className="text-center mb-8 sm:mb-12"
        >
          {/* Fix text alignment for the flip text component */}
          <ContainerTextFlip 
            words={["Tech Card Builder", "Showcase Your Skills", "Create Your Developer Profile", "Design Your Tech Card"]} 
            interval={3000}
            className="mx-auto px-4 sm:px-8 py-2 sm:py-3 mb-4 !text-xl sm:!text-2xl md:!text-4xl !rounded-xl text-center max-w-full overflow-hidden"
            textClassName="whitespace-nowrap overflow-hidden text-center mx-auto text-ellipsis"
          />
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto px-4">
            Create a personalized tech card to showcase your programming skills and share with your professional network
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {renderProgressBar()}

          <div className="mt-6 sm:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8">
            {/* Step Form */}
            <div
              className="lg:col-span-7 p-4 sm:p-8 bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-2xl shadow-xl"
            >
              {renderForm()}
              {renderError()}
              
              <div className="flex justify-between mt-6 sm:mt-10">
                {currentStep > 1 ? (
                  <button
                    onClick={prevStep}
                    className="px-4 sm:px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-full text-white transition-all"
                  >
                    Back
                  </button>
                ) : (
                  <div></div>
                )}
                
                {currentStep < 6 && (
                  <button
                    onClick={nextStep}
                    className="px-6 sm:px-8 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 rounded-full text-white font-medium transition-all shadow-lg"
                  >
                    {currentStep === 5 ? 'Finish' : 'Continue'}
                  </button>
                )}
              </div>
            </div>

            {/* Live Preview - Made properly responsive */}
            <div 
              className="lg:col-span-5 flex flex-col items-center justify-center mt-4 lg:mt-0"
            >
              <div className="sticky top-24 w-full max-w-[280px] sm:max-w-[320px] md:max-w-sm">
                <h3 className={`text-center text-xl font-semibold mb-4 text-white transition-opacity duration-500 ${currentStep === 6 ? 'opacity-0' : 'opacity-100'}`}>
                  Live Preview
                </h3>
                {/* Card preview with shiny border */}
                <div 
                  className={`w-full mx-auto rounded-3xl p-[2px] relative overflow-hidden bg-black transition-all duration-1000 ease-in-out ${
                    currentStep === 6 ? 'scale-110 transform' : ''
                  }`} 
                  style={{ minHeight: '400px', height: 'auto' }}
                >
                  {/* Shiny border effect */}
                  <div className="absolute inset-0 rounded-3xl z-0 animate-border-glow">
                    <div className="absolute inset-0 rounded-3xl bg-[conic-gradient(from_0deg,#7b61ff,#00ccb1,#ffc414,#1ca0fb,#7b61ff)] blur-sm opacity-70 animate-spin-slow"></div>
                  </div>

                  <div 
                    className="relative overflow-hidden rounded-3xl w-full h-full mx-auto z-10 flex flex-col items-center justify-center" 
                    ref={cardRef}
                  >
                    {/* Card content with new theme styles and social links */}
                    <div className={`relative w-full flex flex-col p-4 sm:p-6 rounded-3xl overflow-hidden ${
                      formData.theme === 'dark'
                        ? 'bg-gradient-to-br from-gray-800 to-gray-900 text-white'
                        : formData.theme === 'midnight'
                        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white'
                        : formData.theme === 'cyberpunk'
                        ? 'bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white'
                        : formData.theme === 'neon'
                        ? 'bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 text-white'
                        : formData.theme === 'galaxy'
                        ? 'bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900 text-white'
                        : formData.theme === 'gradient-blue'
                        ? 'bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 text-white'
                        : formData.theme === 'gradient-purple'
                        ? 'bg-gradient-to-br from-purple-700 via-purple-600 to-purple-900 text-white'
                        : formData.theme === 'gradient-green'
                        ? 'bg-gradient-to-br from-green-700 via-green-600 to-green-900 text-white'
                        : formData.theme === 'gradient-orange'
                        ? 'bg-gradient-to-br from-orange-600 via-amber-600 to-red-700 text-white'
                        : formData.theme === 'gradient-red'
                        ? 'bg-gradient-to-br from-red-700 via-rose-600 to-red-900 text-white'
                        : formData.theme === 'custom'
                        ? 'text-white'
                        : 'bg-gradient-to-br from-gray-800 to-gray-900 text-white'
                    }`}
                      style={formData.theme === 'custom' ? { 
                        background: `linear-gradient(to bottom right, ${formData.customThemeFrom}, ${formData.customThemeTo})`,
                        minHeight: '400px', 
                      } : { minHeight: '400px' }}
                    >
                      <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white border-opacity-30 mb-4 shadow-lg relative bg-black">
                          {formData.photo ? (
                            <img 
                              src={formData.photo} 
                              alt={formData.name} 
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
                          {formData.name || "Your Name"}
                        </div>
                        
                        {formData.bio && (
                          <p className="text-center text-xs sm:text-sm mb-3 px-2 opacity-90 max-w-[250px] mx-auto whitespace-pre-wrap break-words">
                            {formData.bio}
                          </p>
                        )}
                        
                        <div className="px-4 sm:px-6 py-1 sm:py-1.5 rounded-full bg-white bg-opacity-20 backdrop-blur-sm text-opacity-90 text-xs sm:text-sm font-medium">
                          {formData.role}
                        </div>
                        
                        {/* Social links */}
                        {(formData.socials.linkedin || formData.socials.github || formData.socials.twitter || formData.socials.website) && (
                          <div className="flex justify-center mt-3 space-x-2 sm:space-x-3">
                            {formData.socials.linkedin && (
                              <a className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-blue-600/50 transition-colors"
                                 href={`https://linkedin.com/in/${formData.socials.linkedin}`} target="_blank" rel="noopener noreferrer">
                                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path>
                                </svg>
                              </a>
                            )}
                            
                            {formData.socials.github && (
                              <a className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-gray-700/70 transition-colors"
                                 href={`https://github.com/${formData.socials.github}`} target="_blank" rel="noopener noreferrer">
                                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                              </a>
                            )}
                            
                            {formData.socials.twitter && (
                              <a className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-black/50 transition-colors"
                                 href={`https://twitter.com/${formData.socials.twitter}`} target="_blank" rel="noopener noreferrer">
                                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                              </a>
                            )}
                            
                            {formData.socials.website && (
                              <a className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm hover:bg-green-600/50 transition-colors"
                                 href={formData.socials.website.startsWith('http') ? formData.socials.website : `https://${formData.socials.website}`} 
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
                          {/* Languages with improved styling */}
                          {formData.languages.map((tech) => (
                          <div
                            key={tech.id}
                              className="bg-gray-900/90 backdrop-blur-sm rounded-lg px-1.5 sm:px-2 py-1 sm:py-1.5 shadow-md flex items-center gap-1 sm:gap-1.5 border border-blue-500/40 mb-1"
                            >
                              <div className="flex items-center justify-center text-blue-400 flex-shrink-0">
                                {renderIcon(tech.icon)}
                            </div>
                              <span className="text-xs font-medium text-white truncate max-w-[55px] sm:max-w-[70px]">{tech.name}</span>
                          </div>
                        ))}
                        
                          {/* Frameworks */}
                          {formData.frameworks.map((tech) => (
                            <div
                              key={tech.id}
                              className="bg-gray-900/90 backdrop-blur-sm rounded-lg px-1.5 sm:px-2 py-1 sm:py-1.5 shadow-md flex items-center gap-1 sm:gap-1.5 border border-purple-500/40 mb-1"
                            >
                              <div className="flex items-center justify-center text-purple-400 flex-shrink-0">
                                {renderIcon(tech.icon)}
                            </div>
                              <span className="text-xs font-medium text-white truncate max-w-[55px] sm:max-w-[70px]">{tech.name}</span>
                          </div>
                          ))}
                          
                          {/* AI tools */}
                          {formData.ai.map((tech) => (
                            <div
                              key={tech.id}
                              className="bg-gray-900/90 backdrop-blur-sm rounded-lg px-1.5 sm:px-2 py-1 sm:py-1.5 shadow-md flex items-center gap-1 sm:gap-1.5 border border-green-500/40 mb-1"
                            >
                              <div className="flex items-center justify-center text-green-400 flex-shrink-0">
                                {renderIcon(tech.icon)}
                              </div>
                              <span className="text-xs font-medium text-white truncate max-w-[55px] sm:max-w-[70px]">{tech.name}</span>
                            </div>
                          ))}
                          
                          {/* Other tools */}
                          {formData.tools.map((tech) => (
                            <div
                              key={tech.id}
                              className="bg-gray-900/90 backdrop-blur-sm rounded-lg px-1.5 sm:px-2 py-1 sm:py-1.5 shadow-md flex items-center gap-1 sm:gap-1.5 border border-orange-500/40 mb-1"
                            >
                              <div className="flex items-center justify-center text-orange-400 flex-shrink-0">
                                {renderIcon(tech.icon)}
                              </div>
                              <span className="text-xs font-medium text-white truncate max-w-[55px] sm:max-w-[70px]">{tech.name}</span>
                            </div>
                          ))}
                          
                          {/* If no technologies selected, show placeholder */}
                          {(formData.languages.length === 0 && formData.frameworks.length === 0 && 
                            formData.ai.length === 0 && formData.tools.length === 0) && (
                            <>
                              <div className="text-xs text-center w-full text-gray-400">
                                Select technologies to display here
                              </div>
                              <div className="flex justify-center gap-2 w-full">
                            {[1, 2, 3].map((i) => (
                              <div
                                key={i}
                                    className="bg-gray-900/90 backdrop-blur-sm rounded-lg p-1.5 sm:p-2 shadow-sm border border-gray-800"
                              >
                                    <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center opacity-40">
                                  •
                                </div>
                              </div>
                            ))}
                              </div>
                          </>
                        )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Card info - hide on last step - simplified for mobile */}
                <div className={`mt-4 p-2 sm:p-3 bg-gray-800 bg-opacity-50 rounded-xl text-xs sm:text-sm text-gray-300 transition-opacity duration-500 ${currentStep === 6 ? 'opacity-0' : 'opacity-100'}`}>
                  <p className="mb-1"><span className="font-medium text-blue-400">Current Step:</span> {steps[currentStep-1]?.title}</p>
                  <p><span className="font-medium text-blue-400">Progress:</span> {Math.round((currentStep - 1) / (steps.length - 1) * 100)}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechCardBuilder; 