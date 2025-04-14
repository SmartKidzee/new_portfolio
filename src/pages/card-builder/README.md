# Tech Card Builder

A multi-step interactive form to create personalized tech profile cards that can be shared on social media or downloaded.

## Features

- Multi-step form with validation and timeline progress bar
- Upload profile photo
- Enter name with character count and profanity filter
- Select from multiple themes (light/dark/apple/glass)
- Choose programming languages and frameworks
- Live preview of the card
- Download as PNG
- Share via WhatsApp, Twitter, or copy link

## Components

- **TechCardBuilder**: Main page component
- **ProgressBar**: Timeline progress tracking
- **StepForm**: Form steps handling
- **CardPreview**: Live preview of the card
- **ErrorDisplay**: Error messages display
- **DownloadShareButtons**: Sharing and downloading functionality
- **Navigation**: Page navigation

## Technologies Used

- React with TypeScript
- Framer Motion for animations
- Tailwind CSS for styling
- HTML2Canvas for PNG download

## Usage

Navigate to `/tech-card-builder` to access the application.

## Development

The components are located in `src/components/TechCard/` and the main page is in `src/pages/card-builder/TechCardBuilder.tsx`. 