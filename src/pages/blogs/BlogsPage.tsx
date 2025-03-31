import React from "react";
import { motion } from "framer-motion";
import BlogList from "../../components/BlogList";
import { Helmet } from "react-helmet";

export default function BlogsPage() {
  const pageTitle = "Blog | Shreyas";
  const pageDescription = "Discover articles about software development, technology insights, project updates, and more. Stay updated with the latest in tech and software engineering.";
  const canonicalUrl = "https://shreyas.com/blogs";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="software engineering blogs, tech blog, web development, React, TypeScript, programming tutorials" />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content="https://i.ibb.co/0R4T8BNg/finalfavicon2.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://i.ibb.co/0R4T8BNg/finalfavicon2.png" />
        <meta name="twitter:creator" content="@KidzeeSmart" />
        
        {/* CollectionPage structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "headline": "Blog Posts by Shreyas",
            "description": pageDescription,
            "url": canonicalUrl,
            "publisher": {
              "@type": "Person",
              "name": "Shreyas",
              "url": "https://shreyas.com"
            },
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "url": "https://shreyas.com/blogs/5"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "url": "https://shreyas.com/blogs/1"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "url": "https://shreyas.com/blogs/2"
                }
              ]
            }
          })}
        </script>
        
        {/* BreadcrumbList structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://shreyas.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Blogs",
                "item": canonicalUrl
              }
            ]
          })}
        </script>
      </Helmet>
      
      <div className="py-16 px-4 sm:px-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Blog</h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Explore my thoughts on software development, tech trends, and project updates.
            </p>
          </motion.div>
          
          <BlogList />
        </div>
      </div>
    </>
  );
} 