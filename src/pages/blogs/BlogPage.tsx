import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock } from "lucide-react";
import ReactPlayer from "react-player";
import ShareButtons from "../../components/ShareButtons";
import BlogSummarizer from "../../components/BlogSummarizer";
import LikeButton from "../../components/LikeButton";
import { getBlogById } from "../../data/blogs";
import BlogSEO from "../../components/BlogSEO";

export default function BlogPage() {
  const { blogId } = useParams<{ blogId: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  const blog = blogId ? getBlogById(blogId) : undefined;
  
  // Format content paragraphs
  const formattedContent = React.useMemo(() => {
    if (!blog?.content) return [];
    
    const lines = blog.content.split('\n');
    const contentElements = lines.map((line, i) => {
      // If the line is empty, render it as a paragraph break
      if (!line.trim()) {
        return <div key={`line-${i}`} className="h-4" />;
      }
      
      // Special case for Ghibli blog's image grid - directly render the HTML instead of replacing
      if (blogId === '5' && line.includes('<div class="blog-image-grid">')) {
        return (
          <div 
            key={`line-${i}`}
            dangerouslySetInnerHTML={{ 
              __html: `<div class="blog-image-grid">
                <img src="https://i.ibb.co/ZRk7vtrT/Chat-GPT-Image-Mar-29-2025-02-17-16-PM.png" alt="AI Ghibli landscape" />
                <img src="https://i.ibb.co/ZRTvPz88/Chat-GPT-Image-Mar-29-2025-02-17-24-PM.png" alt="AI Ghibli character" />
                <img src="https://i.ibb.co/d4Y4nMv1/Chat-GPT-Image-Mar-29-2025-02-22-13-PM.png" alt="AI Ghibli scene" />
                <img src="https://i.ibb.co/840khZ2X/Chat-GPT-Image-Mar-29-2025-02-57-13-PM.png" alt="AI Ghibli cityscape" />
                <img src="https://i.ibb.co/WpfYRyt6/Chat-GPT-Image-Mar-29-2025-05-42-15-PM.png" alt="AI Ghibli fantasy" />
              </div>`
            }}
            className="w-full my-8"
          />
        );
      }
      
      // Skip the closing div for the image grid and images inside grid 
      // since we're rendering them manually above
      if (blogId === '5' && (
          (line.includes('</div>') && i > 0 && lines[i-1].includes('<img src="https://i.ibb.co/WpfYRyt6')) ||
          (line.includes('<img src="https://i.ibb.co/') && 
            (line.includes('ZRk7vtrT') || line.includes('ZRTvPz88') || 
             line.includes('d4Y4nMv1') || line.includes('840khZ2X') || 
             line.includes('WpfYRyt6')))
        )) {
        return null;
      }
      
      // Check if the line contains HTML tags
      if (line.includes('<') && line.includes('>')) {
        // For image tags specifically
        if (line.includes('<img')) {
          return (
            <div 
              key={`line-${i}`} 
              className="my-4 w-full text-center" 
              dangerouslySetInnerHTML={{ __html: line }}
            />
          );
        }
        
        // For other HTML tags like links
        return (
          <div 
            key={`line-${i}`} 
            className="mb-4 text-gray-300 leading-relaxed" 
            dangerouslySetInnerHTML={{ __html: line }}
          />
        );
      }
      
      // Process markdown-style bold text (**text**)
      if (line.includes('**')) {
        const parts = line.split(/(\*\*.*?\*\*)/g);
        return (
          <p key={`line-${i}`} className="mb-4 text-gray-300 leading-relaxed">
            {parts.map((part, j) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                // Remove the ** markers and make text bold
                const boldText = part.slice(2, -2);
                return <strong key={j} className="font-bold text-white">{boldText}</strong>;
              }
              return part;
            })}
          </p>
        );
      }
      
      // Render each line as a paragraph with proper spacing
      return (
        <p key={`line-${i}`} className="mb-4 text-gray-300 leading-relaxed">
          {line}
        </p>
      );
    }).filter(Boolean); // Filter out null elements
    
    // Find the middle point to insert the image
    const middleIndex = Math.floor(contentElements.length / 2);
    
    // Only insert image if blog has an image source and it's not blog #5 (which has image at the top)
    if (blog.src && blogId !== '5') {
      contentElements.splice(
        middleIndex, 
        0, 
        <div key="thumbnail-container" className="my-8 flex justify-center">
          <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg max-w-sm bg-white/5 backdrop-blur-sm p-3">
            <img 
              src={blog.src} 
              alt={blog.title}
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>
        </div>
      );
    }
    
    return contentElements;
  }, [blog, blogId]);
  
  // Create meta description by truncating content
  const getMetaDescription = () => {
    if (!blog?.content) return "";
    const firstPara = blog.content.split('\n\n')[0];
    return firstPara.length > 160 ? firstPara.substring(0, 157) + '...' : firstPara;
  };
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate loading for smoother transitions
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [blogId]);
  
  // If blog is not found, redirect to blog list page
  useEffect(() => {
    if (!isLoading && !blog) {
      setTimeout(() => navigate('/blogs'), 100);
    }
  }, [blog, isLoading, navigate]);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-10 h-10 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!blog) {
    return null; // Will redirect in the useEffect
  }
  
  // Generate the absolute URL for sharing
  const shareUrl = `${window.location.origin}/blogs/${blog.id}`;
  
  // Use the specific thumbnail for blog #5
  const thumbnailSrc = blog._thumbnailOverride || 
    (blogId === '5' ? "https://i.ibb.co/27jPk2CL/chatgpt-4o-ghibli-style-images-jpg.webp" : blog.src);
  
  return (
    <>
      <BlogSEO blog={blog} url={shareUrl} />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto pt-16 px-4 pb-16"
      >
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <Link 
                to="/blogs" 
                className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span>Back to Blog Posts</span>
              </Link>
              <Link 
                to="/#blogs" 
                className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
          
          <article className="bg-black/10 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-xl">
            {/* Featured Image */}
            {thumbnailSrc && (
              <motion.div 
                className="w-full h-[40vh] relative overflow-hidden p-3 bg-white/5 backdrop-blur-sm rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <img 
                  src={thumbnailSrc} 
                  alt={blog.title} 
                  className="w-full h-full object-cover rounded-xl"
                />
              </motion.div>
            )}
            
            {/* Video Player */}
            {blog.video && (
              <motion.div 
                className="w-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="aspect-w-16 aspect-h-9 relative pt-[56.25%] bg-black/30">
                  <ReactPlayer
                    url={blog.video}
                    className="absolute top-0 left-0"
                    width="100%"
                    height="100%"
                    controls={true}
                    playing={false}
                    light={true}
                    config={{
                      youtube: {
                        playerVars: {
                          origin: window.location.origin,
                          modestbranding: 1,
                          rel: 0
                        }
                      }
                    }}
                    onError={(err: any) => {
                      console.error("ReactPlayer error:", err);
                      // Set a flag that ReactPlayer failed
                      const videoContainer = document.getElementById('video-fallback');
                      if (videoContainer) {
                        videoContainer.style.display = 'block';
                      }
                    }}
                  />
                  {/* Fallback iframe for YouTube videos */}
                  <div id="video-fallback" style={{ display: 'none' }} className="absolute top-0 left-0 w-full h-full">
                    {blog.video && blog.video.includes('youtube') && (
                      <iframe
                        src={blog.video}
                        title={blog.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full"
                      ></iframe>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
            
            <div className="p-6 sm:p-8 md:p-10">
              {/* Category and Date */}
              <motion.div 
                className="flex flex-wrap gap-3 mb-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300">
                  {blog.category}
                </span>
                
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-700/50 text-gray-300">
                  <Clock className="w-3 h-3 mr-1" />
                  {new Date(blog.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                
                {blog.isAchievement && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-300">
                    Achievement
                  </span>
                )}
              </motion.div>
              
              {/* Blog Title */}
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                {blog.title}
              </motion.h1>
              
              {/* Share Buttons */}
              <motion.div 
                className="mb-8 pb-8 border-b border-white/10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-400">Share this post:</span>
                  <ShareButtons 
                    title={blog.title} 
                    url={shareUrl} 
                    category={blog.category} 
                    tags={blog.tags} 
                    content={blog.content} 
                  />
                </div>
              </motion.div>
              
              {/* AI Summarizer */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.45 }}
              >
                <BlogSummarizer 
                  blogContent={blog.content}
                  blogTitle={blog.title}
                />
              </motion.div>
              
              {/* Blog Content */}
              <motion.div
                className="prose prose-lg prose-invert max-w-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {formattedContent}
              </motion.div>
              
              {/* Like Button */}
              <motion.div 
                className="mt-8 pt-6 border-t border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.6 }}
              >
                <LikeButton blogId={blogId || ""} />
              </motion.div>
              
              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <motion.div 
                  className="mt-10 pt-6 border-t border-white/10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                >
                  <h3 className="text-lg font-semibold mb-3 text-white">Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map(tag => (
                      <Link 
                        key={tag} 
                        to={`/blogs?tag=${tag}`}
                        className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full hover:bg-gray-700 transition-colors"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {/* Share Buttons (Bottom) */}
              <motion.div 
                className="mt-10 pt-6 border-t border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.8 }}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                    <Link 
                      to="/blogs" 
                      className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      <span>Back to Blog Posts</span>
                    </Link>
                    <Link 
                      to="/#blogs" 
                      className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      <span>Back to Home</span>
                    </Link>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-400">Share this post:</span>
                    <ShareButtons 
                      title={blog.title} 
                      url={shareUrl} 
                      category={blog.category} 
                      tags={blog.tags} 
                      content={blog.content} 
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </article>
        </div>
      </motion.div>
    </>
  );
} 