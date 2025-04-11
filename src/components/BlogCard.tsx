import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Blog } from '../data/blogs';

interface BlogCardProps {
  blog: Blog;
  priority?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, priority = false }) => {
  // Strip markdown formatting and create a truncated version of the blog content
  const cleanContent = blog.content
    .replace(/\*\*(.*?)\*\*/g, '$1')  // Remove bold markdown
    .replace(/\*(.*?)\*/g, '$1');     // Remove italic markdown
  
  const truncatedContent = cleanContent.length > 150 
    ? cleanContent.substring(0, 150) + '...' 
    : cleanContent;
    
  // Use thumbnail override if available, otherwise use the special thumbnail for blog #5 or default src
  const thumbnailSrc = blog._thumbnailOverride || 
    (blog.id === '5' ? "https://i.ibb.co/27jPk2CL/chatgpt-4o-ghibli-style-images-jpg.webp" : blog.src);

  return (
    <motion.div
      className="relative overflow-hidden rounded-3xl h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay: priority ? 0 : 0.1,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{ 
        scale: 1.02, 
        transition: { duration: 0.2, ease: 'easeOut' } 
      }}
    >
      <Link 
        to={`/blogs/${blog.id}`}
        className="block h-full"
      >
        <div className="bg-black/10 backdrop-blur-xl border border-white/10 h-full flex flex-col shadow-lg rounded-3xl overflow-hidden group transition-all duration-300">
          {/* Image container */}
          {thumbnailSrc && (
            <div className="relative w-full pt-[56.25%] overflow-hidden">
              <img 
                src={thumbnailSrc} 
                alt={blog.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading={priority ? "eager" : "lazy"}
              />
              {blog.video && (
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                  Watch Video
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-6 flex flex-col flex-grow">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs font-semibold px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-full">
                {blog.category}
              </span>
              {blog.isAchievement && (
                <span className="text-xs font-semibold px-3 py-1 bg-amber-500/10 text-amber-300 rounded-full">
                  Achievement
                </span>
              )}
            </div>

            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-indigo-300 transition-colors">
              {blog.title}
            </h3>

            <p className="text-gray-300 text-sm mb-4 line-clamp-3 flex-grow">
              {truncatedContent}
            </p>

            <div className="mt-auto flex justify-between items-center">
              <span className="text-xs text-gray-400">
                {new Date(blog.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
              <div className="text-indigo-400 text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                Read more →
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard; 