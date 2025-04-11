import React from 'react';
import { Helmet } from 'react-helmet';

interface PageSEOProps {
  title: string;
  description: string;
  canonical: string;
  keywords?: string;
  image?: string;
}

const PageSEO: React.FC<PageSEOProps> = ({
  title,
  description,
  canonical,
  keywords = '',
  image = 'https://iamshreyas.live/og-image.png',
}) => {
  // Ensure title is not too long
  const formattedTitle = title.length > 60 
    ? `${title.substring(0, 57)}...` 
    : title;
  
  // Ensure description is not too long
  const formattedDescription = description.length > 160 
    ? `${description.substring(0, 157)}...` 
    : description;

  return (
    <Helmet>
      <title>{formattedTitle}</title>
      <meta name="description" content={formattedDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={formattedDescription} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={formattedTitle} />
      <meta name="twitter:description" content={formattedDescription} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO tags */}
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="bingbot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    </Helmet>
  );
};

export default PageSEO; 