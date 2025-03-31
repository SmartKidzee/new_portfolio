#!/bin/bash

# Ensure vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Installing Vercel CLI..."
    npm install -g vercel
fi

# Deploy with production flag if specified
if [ "$1" == "prod" ]; then
    echo "Deploying to production..."
    vercel --prod
else
    echo "Deploying to preview environment..."
    vercel
fi

echo "Deployment complete!" 