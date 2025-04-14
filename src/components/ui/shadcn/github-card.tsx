import * as React from "react";
import { cn } from "../../../lib/utils";
import { motion, MotionProps } from "framer-motion";
import { Button } from "../../../../components/ui/button";

interface GithubCardProps extends React.HTMLAttributes<HTMLDivElement> {
  username?: string;
  name?: string;
  bio?: string;
  avatar?: string;
  stats?: {
    repos?: number;
    followers?: number;
    following?: number;
  };
  languages?: Array<{
    name: string;
    color: string;
    percentage?: number;
  }>;
  theme?: "light" | "dark" | "system";
  accentColor?: string;
  withAnimation?: boolean;
}

const GithubCard = React.forwardRef<HTMLDivElement, GithubCardProps>(
  ({ 
    className, 
    username = "octocat", 
    name = "The Octocat",
    bio = "This is a bio description for the GitHub profile.",
    avatar = "https://github.com/octocat.png",
    stats = { repos: 8, followers: 3938, following: 9 },
    languages = [
      { name: "JavaScript", color: "#f1e05a", percentage: 40 },
      { name: "TypeScript", color: "#3178c6", percentage: 30 },
      { name: "CSS", color: "#563d7c", percentage: 15 },
      { name: "HTML", color: "#e34c26", percentage: 15 },
    ],
    theme = "dark",
    accentColor = "#7c3aed",
    withAnimation = true,
    ...props 
  }, ref) => {
    // Function to determine contrast text color
    const getContrastColor = (hexColor: string) => {
      // Convert hex to RGB
      const r = parseInt(hexColor.slice(1, 3), 16);
      const g = parseInt(hexColor.slice(3, 5), 16);
      const b = parseInt(hexColor.slice(5, 7), 16);
      
      // Calculate luminance
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      
      // Return black for bright colors, white for dark ones
      return luminance > 0.5 ? "#000000" : "#ffffff";
    };

    const cardVariants = {
      initial: { y: 20, opacity: 0 },
      animate: { 
        y: 0, 
        opacity: 1,
        transition: { 
          duration: 0.5,
          ease: [0.23, 1, 0.32, 1]
        }
      },
      hover: { 
        y: -5,
        boxShadow: `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 2px ${accentColor}40`
      }
    };

    // Create proper rendering logic based on animation flag
    const renderCard = () => {
      const cardContent = (
        <>
          {/* Header with user info */}
          <div className="p-6">
            <div className="flex items-start space-x-4">
              {/* Avatar */}
              <div 
                className="rounded-full overflow-hidden border-2 flex-shrink-0"
                style={{ borderColor: accentColor }}
              >
                <img 
                  src={avatar} 
                  alt={name} 
                  className="h-16 w-16 object-cover"
                />
              </div>
              
              {/* User info */}
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-semibold truncate">{name}</h2>
                <p className="text-sm opacity-70 mb-2">@{username}</p>
                <p className="text-sm line-clamp-2">{bio}</p>
              </div>
            </div>
          </div>
          
          {/* Stats section */}
          <div 
            className="grid grid-cols-3 divide-x border-t"
            style={{ 
              borderColor: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
            }}
          >
            <div className="p-4 text-center">
              <div className="text-sm font-medium" style={{ color: accentColor }}>{stats.repos}</div>
              <div className="text-xs opacity-70">Repositories</div>
            </div>
            <div className="p-4 text-center">
              <div className="text-sm font-medium" style={{ color: accentColor }}>{stats.followers}</div>
              <div className="text-xs opacity-70">Followers</div>
            </div>
            <div className="p-4 text-center">
              <div className="text-sm font-medium" style={{ color: accentColor }}>{stats.following}</div>
              <div className="text-xs opacity-70">Following</div>
            </div>
          </div>
          
          {/* Languages section */}
          <div className="p-6 pt-4">
            <h3 className="text-xs uppercase tracking-wider opacity-70 mb-3">Top Languages</h3>
            
            {/* Language bar */}
            <div className="h-2 w-full rounded-full overflow-hidden flex mb-3">
              {languages.map((lang, index) => (
                <div 
                  key={index}
                  style={{ 
                    backgroundColor: lang.color,
                    width: `${lang.percentage}%` 
                  }}
                />
              ))}
            </div>
            
            {/* Language labels */}
            <div className="flex flex-wrap gap-2 mt-3">
              {languages.map((lang, index) => (
                <div 
                  key={index}
                  className="text-xs rounded-full px-2 py-1 flex items-center"
                  style={{ 
                    backgroundColor: `${lang.color}30`,
                    color: lang.color 
                  }}
                >
                  <span 
                    className="w-2 h-2 rounded-full mr-1"
                    style={{ backgroundColor: lang.color }}
                  />
                  <span>{lang.name}</span>
                  {lang.percentage && (
                    <span className="ml-1 opacity-70">{lang.percentage}%</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Footer */}
          <div 
            className="px-6 py-4 border-t flex justify-between items-center"
            style={{ borderColor: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)" }}
          >
            <div className="text-xs opacity-70">
              View on GitHub
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline"
                size="sm"
                className="text-xs rounded-md"
                style={{ 
                  color: accentColor,
                  borderColor: accentColor
                }}
              >
                Follow
              </Button>
              <Button 
                variant="default"
                size="sm"
                className="text-xs rounded-md"
                style={{ 
                  backgroundColor: accentColor,
                  color: getContrastColor(accentColor)
                }}
              >
                View Profile
              </Button>
            </div>
          </div>
        </>
      );
      
      const baseClassNames = cn(
        "rounded-xl border overflow-hidden",
        theme === "dark" 
          ? "bg-gray-800 border-gray-700 text-gray-100" 
          : "bg-white border-gray-200 text-gray-800",
        className
      );
      
      if (withAnimation) {
        return (
          <motion.div
            ref={ref as React.Ref<HTMLDivElement>}
            className={baseClassNames}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            transition={{ duration: 0.3 }}
            {...props as MotionProps}
          >
            {cardContent}
          </motion.div>
        );
      }
      
      return (
        <div
          ref={ref}
          className={baseClassNames}
          {...props}
        >
          {cardContent}
        </div>
      );
    };

    return renderCard();
  }
);

GithubCard.displayName = "GithubCard";

export { GithubCard }; 