import React from 'react';
import Head from 'next/head';

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
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </Head>
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
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </Head>
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
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostSchema) }}
      />
    </Head>
  );
};

export default {
  PersonStructuredData,
  WebsiteStructuredData,
  BlogPostingStructuredData,
}; 