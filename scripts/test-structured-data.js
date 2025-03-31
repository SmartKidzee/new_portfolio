#!/usr/bin/env node

/**
 * This script validates structured data using the Google Rich Results Test API
 * It requires a Google API key with access to the Rich Results Test API
 * 
 * Usage: 
 * 1. Set GOOGLE_API_KEY in your environment
 * 2. Run: node scripts/test-structured-data.js https://iamshreyas.live/blogs/5
 */

import https from 'https';
import querystring from 'querystring';
import { env, argv, exit } from 'process';

// Get URL from command line
const url = argv[2];
if (!url) {
  console.error('Please provide a URL to test.');
  console.error('Example: node scripts/test-structured-data.js https://iamshreyas.live/blogs/5');
  exit(1);
}

// Google API key should be set in environment
const apiKey = env.GOOGLE_API_KEY;
if (!apiKey) {
  console.error('GOOGLE_API_KEY environment variable is not set.');
  console.error('Please set your Google API key with access to the Rich Results Test API.');
  exit(1);
}

// Prepare request data
const data = querystring.stringify({
  key: apiKey,
  url: url
});

const options = {
  hostname: 'searchconsole.googleapis.com',
  path: '/v1/urlTestingTools/mobileFriendlyTest:run',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': data.length
  }
};

// Make request to the API
const req = https.request(options, (res) => {
  let responseData = '';
  
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    try {
      const result = JSON.parse(responseData);
      
      if (result.error) {
        console.error('Error:', result.error.message);
        exit(1);
      }
      
      // Parse and display the result
      console.log('Structured Data Validation Results:');
      console.log('---------------------------------');
      
      if (result.richResultsResult && result.richResultsResult.detectedItems) {
        console.log('✅ Structured data detected!');
        
        result.richResultsResult.detectedItems.forEach((item, index) => {
          console.log(`\nItem #${index + 1}:`);
          console.log(`Type: ${item.type}`);
          
          if (item.items && item.items.length > 0) {
            console.log('Properties:');
            item.items.forEach(prop => {
              console.log(`- ${prop.name}: ${prop.value}`);
            });
          }
          
          if (item.issues && item.issues.length > 0) {
            console.log('\nIssues:');
            item.issues.forEach(issue => {
              console.log(`- ${issue.severity}: ${issue.message}`);
            });
          }
        });
      } else {
        console.log('❌ No structured data detected.');
      }
      
      // Mobile-friendliness check
      if (result.mobileFriendliness) {
        console.log('\nMobile-Friendliness:');
        console.log(`Result: ${result.mobileFriendliness}`);
      }
      
    } catch (e) {
      console.error('Error parsing response:', e);
      console.log('Raw response:', responseData);
    }
  });
});

req.on('error', (e) => {
  console.error('Request error:', e.message);
});

// Send the request
req.write(data);
req.end();

console.log(`Testing structured data for URL: ${url}`);
console.log('This may take a few seconds...'); 