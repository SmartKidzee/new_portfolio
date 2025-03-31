#!/usr/bin/env node

/**
 * This script generates a sitemap.xml file based on site content
 * It reads blog data and creates entries for each blog post
 * Run with: node scripts/generate-sitemap.js
 */

import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

// Get current file and directory paths for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base URL
const SITE_URL = 'https://iamshreyas.live';

// Static pages
const STATIC_PAGES = [
  {
    path: '/',
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: 1.0,
  },
  {
    path: '/about',
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/projects',
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    path: '/experience',
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    path: '/blogs',
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: 0.9,
  },
  {
    path: '/contact',
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly',
    priority: 0.7,
  },
];

// Try to read blog data directly from the source file
function getBlogs() {
  try {
    // This is a simplification - in a real app, you might need to parse the blogs.ts file
    // or have a dedicated export mechanism
    const blogDataPath = path.join(__dirname, '../src/data/blogs.ts');
    const blogData = fs.readFileSync(blogDataPath, 'utf8');
    
    // Extract blog entries
    const blogEntries = [];
    const regex = /id: '(\d+)'[\s\S]*?created_at: "([^"]+)"/g;
    let match;
    
    while ((match = regex.exec(blogData)) !== null) {
      const [_, id, createdAt] = match;
      blogEntries.push({
        path: `/blogs/${id}`,
        lastModified: createdAt,
        changeFrequency: 'yearly',
        priority: id === '5' ? 0.7 : 0.6, // Latest blog gets higher priority
      });
    }
    
    return blogEntries;
  } catch (error) {
    console.error('Error reading blog data:', error);
    return [];
  }
}

// Generate the sitemap
function generateSitemap() {
  const blogs = getBlogs();
  const pages = [...STATIC_PAGES, ...blogs];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  pages.forEach(page => {
    sitemap += `  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <lastmod>${page.lastModified}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  });

  sitemap += '</urlset>';
  
  const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemap);
  
  // Create gzipped version for better performance
  const gzipped = zlib.gzipSync(sitemap);
  const gzippedPath = path.join(__dirname, '../public/sitemap.xml.gz');
  fs.writeFileSync(gzippedPath, gzipped);
  
  console.log(`Sitemap generated at ${sitemapPath}`);
  console.log(`Gzipped sitemap generated at ${gzippedPath}`);
}

// Execute
generateSitemap(); 