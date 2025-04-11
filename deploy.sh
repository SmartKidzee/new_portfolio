#!/bin/bash

# Clear cache to ensure fresh build
rm -rf dist/ .vercel/output/ node_modules/.vite

# Install dependencies
npm install

# Build the project
npm run build

# Deploy to Vercel production
echo "Deploying to Vercel production..."
npx vercel --prod

echo "Deployment complete!" 