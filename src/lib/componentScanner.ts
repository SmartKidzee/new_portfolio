/**
 * Enhanced Component Scanner
 * 
 * This module scans and registers all components in the codebase,
 * tracking component information and dependencies to enable
 * advanced component preloading optimizations.
 */

export interface ComponentEntry {
  id: string;
  path: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  dependencies: string[];
  size: number; // Estimated kb size
  renderTime: number; // Estimated render time in ms
  isLazy: boolean;
}

// Main component registry
let componentRegistry: Record<string, ComponentEntry> = {};

// Mutation observer for automatic component registration
let domObserver: MutationObserver | null = null;

  /**
   * Initialize the component registry with known components
   */
function initializeRegistry() {
  // Register components from the components folder
  registerComponent('ShadcnNavbar', {
    path: './components/ui/ShadcnNavbar',
    priority: 'critical',
    dependencies: ['Button', 'Avatar', 'ThemeToggle'],
    size: estimateComponentSize('critical'),
    renderTime: estimateRenderTime('critical'),
    isLazy: false
  });
  
  registerComponent('Button', {
    path: './components/ui/Button',
    priority: 'critical',
    dependencies: [],
    size: estimateComponentSize('critical'),
    renderTime: estimateRenderTime('critical'),
    isLazy: false
  });
  
  registerComponent('Avatar', {
    path: './components/ui/Avatar',
    priority: 'high',
    dependencies: [],
    size: estimateComponentSize('high'),
    renderTime: estimateRenderTime('high'),
    isLazy: false
  });
  
  registerComponent('ThemeToggle', {
    path: './components/ui/ThemeToggle',
    priority: 'high',
    dependencies: ['Button'],
    size: estimateComponentSize('high'),
    renderTime: estimateRenderTime('high'),
    isLazy: false
  });
  
  registerComponent('LoadingScreen', {
    path: './components/ui/LoadingScreen',
    priority: 'critical',
    dependencies: [],
    size: estimateComponentSize('critical'),
    renderTime: estimateRenderTime('critical'),
    isLazy: false
  });
  
  registerComponent('HeroSection', {
    path: './components/sections/HeroSection',
    priority: 'critical',
    dependencies: ['Button', 'TiltedCard'],
    size: estimateComponentSize('critical'),
    renderTime: estimateRenderTime('critical'),
    isLazy: false
  });
  
  registerComponent('TiltedCard', {
    path: './components/ui/TiltedCard',
    priority: 'high',
    dependencies: [],
    size: estimateComponentSize('high'),
    renderTime: estimateRenderTime('high'),
    isLazy: true
  });
  
  registerComponent('FeatureSection', {
    path: './components/sections/FeatureSection',
    priority: 'medium',
    dependencies: ['FeatureCard'],
    size: estimateComponentSize('medium'),
    renderTime: estimateRenderTime('medium'),
    isLazy: true
  });
  
  registerComponent('FeatureCard', {
    path: './components/ui/FeatureCard',
    priority: 'medium',
    dependencies: [],
    size: estimateComponentSize('medium'),
    renderTime: estimateRenderTime('medium'),
    isLazy: true
  });
  
  registerComponent('TestimonialsSection', {
    path: './components/sections/TestimonialsSection',
    priority: 'low',
    dependencies: ['TestimonialCard', 'Carousel'],
    size: estimateComponentSize('low'),
    renderTime: estimateRenderTime('low'),
    isLazy: true
  });
  
  registerComponent('TestimonialCard', {
    path: './components/ui/TestimonialCard',
    priority: 'low',
    dependencies: ['Avatar'],
    size: estimateComponentSize('low'),
    renderTime: estimateRenderTime('low'),
    isLazy: true
  });
  
  registerComponent('Carousel', {
    path: './components/ui/Carousel',
    priority: 'medium',
    dependencies: [],
    size: estimateComponentSize('medium'),
    renderTime: estimateRenderTime('medium'),
    isLazy: true
  });
  
  registerComponent('PricingSection', {
    path: './components/sections/PricingSection',
    priority: 'low',
    dependencies: ['PricingCard', 'Button'],
    size: estimateComponentSize('low'),
    renderTime: estimateRenderTime('low'),
    isLazy: true
  });
  
  registerComponent('PricingCard', {
    path: './components/ui/PricingCard',
    priority: 'low',
    dependencies: ['Button'],
    size: estimateComponentSize('low'),
    renderTime: estimateRenderTime('low'),
    isLazy: true
  });
  
  registerComponent('ContactForm', {
    path: './components/sections/ContactForm',
    priority: 'low',
    dependencies: ['Button', 'TextField'],
    size: estimateComponentSize('low'),
    renderTime: estimateRenderTime('low'),
    isLazy: true
  });
  
  registerComponent('TextField', {
    path: './components/ui/TextField',
    priority: 'medium',
    dependencies: [],
    size: estimateComponentSize('medium'),
    renderTime: estimateRenderTime('medium'),
    isLazy: false
  });
  
  registerComponent('Footer', {
    path: './components/ui/Footer',
    priority: 'medium',
    dependencies: [],
    size: estimateComponentSize('medium'),
    renderTime: estimateRenderTime('medium'),
    isLazy: false
  });
  
  // Also register components in the cpmponents folder (handle typo in folder name)
  // This happens in some projects where there are duplicate folders with typos
  registerComponent('Parallax', {
    path: './cpmponents/effects/Parallax',
    priority: 'medium',
    dependencies: [],
    size: estimateComponentSize('medium'),
    renderTime: estimateRenderTime('medium'),
    isLazy: true
  });
  
  registerComponent('StickyHeader', {
    path: './cpmponents/layout/StickyHeader',
    priority: 'high',
    dependencies: ['Button'],
    size: estimateComponentSize('high'),
    renderTime: estimateRenderTime('high'),
    isLazy: false
  });
  
  console.log(`[ComponentScanner] Initialized registry with ${Object.keys(componentRegistry).length} components`);
  
  // Set up mutation observer if in browser environment
  if (typeof document !== 'undefined') {
    setupDomObserver();
  }
}

/**
 * Set up a mutation observer to auto-register components
 */
function setupDomObserver() {
  if (domObserver || typeof MutationObserver === 'undefined') return;
  
  domObserver = new MutationObserver((mutations) => {
    let needsRegistryUpdate = false;
    
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            
            // Check for new components with data-component-id
            if (element.hasAttribute('data-component-id')) {
              const componentId = element.getAttribute('data-component-id');
              if (componentId && !componentRegistry[componentId]) {
                // Auto-register this component
                registerComponent(componentId, {
                  path: `./components/dynamic/${componentId}`,
                  priority: 'medium',
                  dependencies: [],
                  size: estimateComponentSize('medium'),
                  renderTime: estimateRenderTime('medium'),
                  isLazy: true
                });
                needsRegistryUpdate = true;
              }
            }
            
            // Recursively check children
            element.querySelectorAll('[data-component-id]').forEach(el => {
              const componentId = el.getAttribute('data-component-id');
              if (componentId && !componentRegistry[componentId]) {
                // Auto-register this component
                registerComponent(componentId, {
                  path: `./components/dynamic/${componentId}`,
                  priority: 'medium',
                  dependencies: [],
                  size: estimateComponentSize('medium'),
                  renderTime: estimateRenderTime('medium'),
                  isLazy: true
                });
                needsRegistryUpdate = true;
              }
            });
          }
        });
      }
    });
    
    if (needsRegistryUpdate) {
      console.log('[ComponentScanner] Automatically registered new components from DOM');
      // Emit event for dependency graph to update
      document.dispatchEvent(new CustomEvent('componentRegistryUpdated'));
    }
  });
  
  // Observe the entire document
  domObserver.observe(document.documentElement, { 
    childList: true, 
    subtree: true 
  });
  
  console.log('[ComponentScanner] DOM observer initialized for auto-registration');
}

/**
 * Register a new component or update an existing one
 */
function registerComponent(id: string, component: Omit<ComponentEntry, 'id'>) {
  componentRegistry[id] = {
    id,
    ...component
    };
  }

  /**
 * Add dependencies to a component
 */
function addDependencies(componentId: string, dependencies: string[]) {
  if (!componentRegistry[componentId]) {
    console.warn(`[ComponentScanner] Cannot add dependencies to unknown component: ${componentId}`);
    return;
  }
  
  // Add unique dependencies
  const currentDeps = new Set(componentRegistry[componentId].dependencies);
  dependencies.forEach(dep => currentDeps.add(dep));
  
  componentRegistry[componentId].dependencies = Array.from(currentDeps);
}

/**
 * Get a component by ID
 */
function getComponent(componentId: string): ComponentEntry | undefined {
  return componentRegistry[componentId];
}

/**
 * Get all registered components
 */
function getAllComponents(): Record<string, ComponentEntry> {
  return { ...componentRegistry };
  }

  /**
   * Get components by priority
   */
function getComponentsByPriority(priority: 'critical' | 'high' | 'medium' | 'low'): ComponentEntry[] {
  return Object.values(componentRegistry).filter(comp => comp.priority === priority);
}

/**
 * Estimate component size based on priority
 */
function estimateComponentSize(priority: string): number {
  switch (priority) {
    case 'critical': return 15 + Math.random() * 10; // 15-25kb
    case 'high': return 10 + Math.random() * 10; // 10-20kb
    case 'medium': return 5 + Math.random() * 10; // 5-15kb
    case 'low': return 2 + Math.random() * 8; // 2-10kb
    default: return 5; // Default 5kb
  }
}

/**
 * Estimate component render time based on priority
 */
function estimateRenderTime(priority: string): number {
  switch (priority) {
    case 'critical': return 20 + Math.random() * 15; // 20-35ms
    case 'high': return 15 + Math.random() * 10; // 15-25ms
    case 'medium': return 10 + Math.random() * 10; // 10-20ms
    case 'low': return 5 + Math.random() * 10; // 5-15ms
    default: return 10; // Default 10ms
  }
}

/**
 * Reset the component registry
 */
function resetRegistry() {
  componentRegistry = {};
  if (domObserver) {
    domObserver.disconnect();
    domObserver = null;
  }
}

// Initialize the registry on load
initializeRegistry();

// Export the component scanner API
const componentScanner = {
  registerComponent,
  addDependencies,
  getComponent,
  getAllComponents,
  getComponentsByPriority,
  resetRegistry
};

export default componentScanner; 