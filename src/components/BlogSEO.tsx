import React from 'react';
import { Helmet } from 'react-helmet';
import { BlogPostingStructuredData } from './StructuredData';
import BreadcrumbSchema from './BreadcrumbSchema';
import { Blog } from '../data/blogs';

interface BlogSEOProps {
  blog: Blog;
  url: string;
}

const BlogSEO: React.FC<BlogSEOProps> = ({ blog, url }) => {
  // Create meta description by truncating content
  const getMetaDescription = () => {
    if (!blog?.content) return "";
    const firstPara = blog.content.split('\n\n')[0];
    return firstPara.length > 160 ? firstPara.substring(0, 157) + '...' : firstPara;
  };

  // Use the specific thumbnail or fall back
  const thumbnailSrc = blog._thumbnailOverride || 
    (blog.id === '5' ? "https://i.ibb.co/27jPk2CL/chatgpt-4o-ghibli-style-images-jpg.webp" : blog.src);

  // Generate breadcrumb items
  const breadcrumbItems = [
    { name: 'Home', url: 'https://iamshreyas.live/' },
    { name: 'Blogs', url: 'https://iamshreyas.live/blogs' },
    { name: blog.title, url }
  ];

  return (
    <>
      <Helmet>
        <title>{blog.title} | Shreyas J</title>
        <meta name="description" content={getMetaDescription()} />
        <meta name="author" content="Shreyas J" />
        <meta name="keywords" content={blog.tags?.join(', ') || blog.category} />
        <link rel="canonical" href={url} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={getMetaDescription()} />
        {thumbnailSrc && <meta property="og:image" content={thumbnailSrc} />}
        <meta property="article:published_time" content={blog.created_at} />
        {blog.updated_at && <meta property="article:modified_time" content={blog.updated_at} />}
        <meta property="article:section" content={blog.category} />
        {blog.tags?.map((tag, index) => (
          <meta property="article:tag" content={tag} key={index} />
        ))}
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content={blog.title} />
        <meta property="twitter:description" content={getMetaDescription()} />
        {thumbnailSrc && <meta property="twitter:image" content={thumbnailSrc} />}
        
        {/* Article specific metadata */}
        <meta property="article:author" content="https://iamshreyas.live" />
        <meta property="article:publisher" content="https://iamshreyas.live" />
        
        {/* Additional SEO improvements */}
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        
        {/* Rich snippets enhancement */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": "${blog.title}",
              "description": "${getMetaDescription().replace(/"/g, '\\"')}",
              "image": "${thumbnailSrc || ''}",
              "author": {
                "@type": "Person",
                "name": "Shreyas J",
                "url": "https://iamshreyas.live"
              },
              "publisher": {
                "@type": "Organization",
                "name": "Shreyas J Portfolio",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://iamshreyas.live/logo.png"
                }
              },
              "datePublished": "${blog.created_at}",
              "dateModified": "${blog.updated_at || blog.created_at}"
            }
          `}
        </script>
      </Helmet>
      
      <BlogPostingStructuredData
        url={url}
        headline={blog.title}
        description={getMetaDescription()}
        imageUrl={thumbnailSrc || ''}
        datePublished={blog.created_at}
        dateModified={blog.updated_at || blog.created_at}
        authorName="Shreyas J"
        authorUrl="https://iamshreyas.live"
        publisherName="Shreyas J"
        publisherLogo="https://iamshreyas.live/logo.png"
      />
      
      <BreadcrumbSchema items={breadcrumbItems} />
    </>
  );
};

export default BlogSEO; 