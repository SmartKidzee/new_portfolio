import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';
import viteCompression from 'vite-plugin-compression';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  // Load env variables
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    server: {
      headers: {
        "Content-Security-Policy": "default-src 'self'; connect-src 'self' localhost:* ws://localhost:* http://localhost:* https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://*.formspree.io https://formspree.io https://api.formspree.io https://api.hunter.io https://generativelanguage.googleapis.com https://firestore.googleapis.com https://*.firebaseio.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://api.emailjs.com https://vitals.vercel-insights.com https://*.vercel-insights.com https://*.vercel-analytics.com https://vercel.com https://*.vercel.app https://ipapi.co; img-src 'self' data: blob: https://i.ibb.co https://images.unsplash.com https://assets.aceternity.com https://www.google-analytics.com https://grainy-gradients.vercel.app; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://*.vercel-scripts.com https://*.vercel-insights.com https://*.vercel-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.googleapis.com; font-src 'self' data: https://fonts.gstatic.com https://*.gstatic.com https://fonts.googleapis.com; frame-src 'self' https://www.youtube.com; form-action 'self' https://formspree.io api.formspree.io; worker-src 'self' blob:;",
      },
      proxy: {
        '/api/formspree': {
          target: 'https://formspree.io/f/xkndlgya',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/formspree/, ''),
          secure: true,
          headers: {
            'Referer': 'https://formspree.io'
          }
        }
      },
      fs: {
        strict: true, // ensures Vite only serves files from the root
      }
    },
    plugins: [
      react({
        babel: {
          plugins: [
            ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]
          ]
        }
      }),
      viteCompression({
        algorithm: 'gzip',
        threshold: 1024, // Lower threshold to 1kb
        deleteOriginFile: false,
        compressionOptions: {
          level: 9 // Maximum compression
        },
      }),
      viteCompression({
        algorithm: 'brotliCompress',
        threshold: 1024, // Lower threshold to 1kb
        deleteOriginFile: false,
        compressionOptions: {
          level: 11 // Maximum compression for Brotli
        },
      }),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['og-image.png', 'logo192.png', 'favicon.ico'],
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif,webp,woff,woff2,ttf,eot}'],
          maximumFileSizeToCacheInBytes: 4 * 1024 * 1024, // 4MB - increased from default 2MB
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            },
            {
              urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'images-cache',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
                }
              }
            },
            {
              urlPattern: /^https:\/\/i\.ibb\.co\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'external-images-cache',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
                }
              }
            },
            {
              urlPattern: /^https:\/\/assets\.aceternity\.com\/.*/i,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'aceternity-assets-cache',
                expiration: {
                  maxEntries: 20,
                  maxAgeSeconds: 60 * 60 * 24 * 7 // 7 days
                }
              }
            }
          ]
        }
      }),
      visualizer({
        open: false,
        gzipSize: true,
        brotliSize: true,
        filename: 'stats.html',
      }),
    ],
    base: '/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './'),
      },
    },
    define: {
      'process.env': {
        __NEXT_IMAGE_OPTS: {
          deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
          imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
          domains: ['images.unsplash.com', 'assets.aceternity.com', 'i.ibb.co'],
          path: '/',
          loader: 'default'
        }
      },
      'process.browser': true,
      'process.version': JSON.stringify(process.version),
    },
    build: {
      minify: 'terser',
      cssMinify: true,
      sourcemap: false,
      reportCompressedSize: false,
      chunkSizeWarningLimit: 1000,
      assetsInlineLimit: 4096, // Inline assets < 4kb
      rollupOptions: {
        treeshake: true,
        output: {
          manualChunks: (id) => {
            // Core React libraries in one chunk
            if (id.includes('node_modules/react/') || 
                id.includes('node_modules/react-dom/') || 
                id.includes('node_modules/scheduler/')) {
              return 'react-core';
            }
            
            // Router in one chunk
            if (id.includes('node_modules/react-router') || 
                id.includes('node_modules/@remix-run')) {
              return 'router';
            }
            
            // Animation libraries in one chunk
            if (id.includes('node_modules/framer-motion') || 
                id.includes('node_modules/gsap') || 
                id.includes('node_modules/@react-spring')) {
              return 'animations';
            }
            
            // UI component libraries in one chunk
            if (id.includes('node_modules/react-icons') || 
                id.includes('node_modules/@tabler/icons-react') || 
                id.includes('node_modules/lucide-react')) {
              return 'ui-icons';
            }
            
            // Three.js and related in one chunk
            if (id.includes('node_modules/three') || 
                id.includes('node_modules/postprocessing') || 
                id.includes('node_modules/ogl')) {
              return '3d-libs';
            }
            
            // Other node modules
            if (id.includes('node_modules/')) {
              return 'vendor';
            }
          },
          inlineDynamicImports: false,
          entryFileNames: 'assets/[name].[hash].js',
          chunkFileNames: 'assets/[name].[hash].js',
          assetFileNames: (assetInfo) => {
            // Use a special directory for images
            if (assetInfo.name && /\.(png|jpe?g|svg|gif|webp|ico)$/.test(assetInfo.name)) {
              return 'assets/images/[name].[hash][extname]';
            }
            // Special directory for fonts
            if (assetInfo.name && /\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
              return 'assets/fonts/[name].[hash][extname]';
            }
            // Default is assets folder
            return 'assets/[name].[hash][extname]';
          },
        },
      },
      terserOptions: {
        compress: {
          drop_console: false, // Changed to false to help with debugging
          drop_debugger: false, // Changed to false to help with debugging
          pure_funcs: [], // Removed console functions to help with debugging
        },
        format: {
          comments: false,
        },
        mangle: {
          safari10: true,
        },
      },
      target: 'es2018',
    },
    
    preview: {
      port: 4000,
      open: true,
      headers: {
        "Content-Security-Policy": "default-src 'self'; connect-src 'self' localhost:* ws://localhost:* http://localhost:* https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://*.formspree.io https://formspree.io https://api.formspree.io https://api.hunter.io https://generativelanguage.googleapis.com https://firestore.googleapis.com https://*.firebaseio.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://api.emailjs.com https://vitals.vercel-insights.com https://*.vercel-insights.com https://*.vercel-analytics.com https://vercel.com https://*.vercel.app https://ipapi.co; img-src 'self' data: blob: https://i.ibb.co https://images.unsplash.com https://assets.aceternity.com https://www.google-analytics.com https://grainy-gradients.vercel.app; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://*.vercel-scripts.com https://*.vercel-insights.com https://*.vercel-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.googleapis.com; font-src 'self' data: https://fonts.gstatic.com https://*.gstatic.com https://fonts.googleapis.com; frame-src 'self' https://www.youtube.com; form-action 'self' https://formspree.io api.formspree.io; worker-src 'self' blob:;"
      }
    },
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' }
    },
    optimizeDeps: {
      include: [
        'react', 
        'react-dom', 
        'react-router-dom',
        'framer-motion',
        'gsap',
        '@react-spring/web'
      ],
      exclude: []
    }
  };
});

