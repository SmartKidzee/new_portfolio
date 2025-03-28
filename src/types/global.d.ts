interface Window {
  process: {
    env: {
      // Add any string indexer to accept any property
      [key: string]: any;
      __NEXT_IMAGE_OPTS?: {
        deviceSizes: number[];
        imageSizes: number[];
        domains: string[];
        path: string;
        loader: string;
      }
    };
    browser: boolean;
    version: string;
  };
}

// Add to make it recognized as module
export {}; 