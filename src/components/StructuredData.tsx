import React from 'react';
import { Helmet } from 'react-helmet';

interface PersonStructuredDataProps {
  name: string;
  jobTitle: string;
  description: string;
  imageUrl: string;
  sameAsLinks: string[];
  url: string;
}

export const PersonStructuredData: React.FC<PersonStructuredDataProps> = ({
  name,
  jobTitle,
  description,
  imageUrl,
  sameAsLinks,
  url,
}) => {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    description,
    image: imageUrl,
    url,
    sameAs: sameAsLinks,
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
    </Helmet>
  );
};

interface WebsiteStructuredDataProps {
  url: string;
  name: string;
  description: string;
  searchUrl: string;
}

export const WebsiteStructuredData: React.FC<WebsiteStructuredDataProps> = ({
  url,
  name,
  description,
  searchUrl,
}) => {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url,
    name,
    description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${searchUrl}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
    </Helmet>
  );
};

interface BlogPostingStructuredDataProps {
  url: string;
  headline: string;
  description: string;
  imageUrl: string;
  datePublished: string;
  dateModified: string;
  authorName: string;
  authorUrl: string;
  publisherName: string;
  publisherLogo: string;
}

export const BlogPostingStructuredData: React.FC<BlogPostingStructuredDataProps> = ({
  url,
  headline,
  description,
  imageUrl,
  datePublished,
  dateModified,
  authorName,
  authorUrl,
  publisherName,
  publisherLogo,
}) => {
  const blogPostSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline,
    description,
    image: imageUrl,
    datePublished,
    dateModified,
    author: {
      '@type': 'Person',
      name: authorName,
      url: authorUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: publisherName,
      logo: {
        '@type': 'ImageObject',
        url: publisherLogo,
      },
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(blogPostSchema)}
      </script>
    </Helmet>
  );
};

export default {
  PersonStructuredData,
  WebsiteStructuredData,
  BlogPostingStructuredData,
}; 