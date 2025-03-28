/**
 * Streaming Renderer for React
 * 
 * Implements a high-performance rendering pipeline that optimizes the critical rendering path
 * through advanced partial hydration and progressive component rendering.
 */

import criticalResourceLoader from './criticalResourceLoader';

interface RenderPriority {
  componentId: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  viewport: 'above-fold' | 'initial-viewport' | 'below-fold' | 'offscreen';
  complexity: 'static' | 'interactive' | 'animated';
  dependencies: string[];
}

interface RenderStats {
  timeToFirstByte: number;
  timeToFirstPaint: number;
  timeToFirstContentfulPaint: number;
  timeToFirstInteractive: number;
  totalRenderTime: number;
  hydrationTime: number;
  jsExecutionTime: number;
}

/**
 * StreamingRenderer manages the component rendering pipeline with partial hydration,
 * progressive rendering, and intelligent dependency resolution.
 */
class StreamingRenderer {
  private componentRegistry: Map<string, RenderPriority> = new Map();
  private renderedComponents: Set<string> = new Set();
  private pendingComponents: Map<string, Promise<void>> = new Map();
  private renderStats: Partial<RenderStats> = {};
  private pageStart: number = performance.now();
  private isInitialRenderComplete: boolean = false;
  private intersectionObserver: IntersectionObserver | null = null;
  private postRenderTasks: Function[] = [];
  private hydrationMap: WeakMap<Element, boolean> = new WeakMap();
  private mutationObserver: MutationObserver | null = null;
  
  constructor() {
    this.initializeMetrics();
    this.setupViewportObserver();
    this.interceptDomMutations();
    
    // Register completion handlers
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.isInitialRenderComplete = true;
        this.finalizeRenderStats();
        this.schedulePostRenderTasks();
      }, 50);
    });
  }
  
  /**
   * Initialize performance metrics tracking
   */
  private initializeMetrics(): void {
    this.pageStart = performance.now();
    
    // Use Performance API for precision timing
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        switch (entry.name) {
          case 'first-paint':
            this.renderStats.timeToFirstPaint = entry.startTime;
            break;
          case 'first-contentful-paint':
            this.renderStats.timeToFirstContentfulPaint = entry.startTime;
            break;
        }
      }
    });
    
    // Observe paint timing events
    observer.observe({ entryTypes: ['paint'] });
    
    // Track time to first byte
    if (performance.timing) {
      this.renderStats.timeToFirstByte = 
        performance.timing.responseStart - performance.timing.navigationStart;
    }
  }
  
  /**
   * Register component with rendering priorities
   */
  public registerComponent(component: RenderPriority): void {
    this.componentRegistry.set(component.componentId, component);
  }
  
  /**
   * Start the optimized rendering process
   */
  public startOptimizedRendering(): void {
    // First identify the absolute critical path components
    const criticalPath = this.identifyCriticalPath();
    
    // Pre-optimize DOM elements for critical components
    this.preOptimizeDomElements(criticalPath);
    
    // Resolve rendering in dependency order
    this.renderInPriorityOrder(criticalPath);
  }
  
  /**
   * Identify the critical rendering path based on component priorities
   * and dependency relationships
   */
  private identifyCriticalPath(): string[] {
    const criticalComponents: string[] = [];
    const highPriorityComponents: string[] = [];
    
    // First identify components by priority level
    this.componentRegistry.forEach((component, id) => {
      if (component.priority === 'critical' && 
          (component.viewport === 'above-fold' || component.viewport === 'initial-viewport')) {
        criticalComponents.push(id);
      } else if (component.priority === 'high' && component.viewport === 'initial-viewport') {
        highPriorityComponents.push(id);
      }
    });
    
    // Resolve component dependencies (topological sort)
    const resolvedOrder: string[] = [];
    const visited = new Set<string>();
    const inProgress = new Set<string>();
    
    const visit = (id: string) => {
      if (visited.has(id)) return;
      if (inProgress.has(id)) {
        // Circular dependency detected
        console.warn(`Circular dependency detected for component: ${id}`);
        return;
      }
      
      inProgress.add(id);
      
      const component = this.componentRegistry.get(id);
      if (component) {
        // Visit dependencies first
        component.dependencies.forEach(depId => {
          if (this.componentRegistry.has(depId)) {
            visit(depId);
          }
        });
      }
      
      visited.add(id);
      inProgress.delete(id);
      resolvedOrder.push(id);
    };
    
    // Visit all critical components first
    criticalComponents.forEach(visit);
    
    // Then visit high priority components
    highPriorityComponents.forEach(visit);
    
    return resolvedOrder;
  }
  
  /**
   * Optimize DOM elements for critical path components
   */
  private preOptimizeDomElements(criticalPath: string[]): void {
    criticalPath.forEach(componentId => {
      const elements = document.querySelectorAll(`[data-component="${componentId}"]`);
      
      elements.forEach(element => {
        if (element instanceof HTMLElement) {
          // Prevent layout shifts with explicit dimensions
          const rect = element.getBoundingClientRect();
          if (rect.height > 0 && !element.style.height) {
            element.style.minHeight = `${rect.height}px`;
          }
          
          // Mark for streaming hydration
          element.setAttribute('data-hydrate', 'pending');
          
          // Apply content-visibility optimization when appropriate
          const component = this.componentRegistry.get(componentId);
          if (component && component.viewport === 'below-fold') {
            element.style.contentVisibility = 'auto';
          }
        }
      });
    });
  }
  
  /**
   * Render components in priority order with dependency resolution
   */
  private async renderInPriorityOrder(orderedComponents: string[]): Promise<void> {
    const startTime = performance.now();
    
    // Use Promise.all to parallelize where possible while respecting dependencies
    const renderPromises: Promise<void>[] = [];
    
    for (const componentId of orderedComponents) {
      const component = this.componentRegistry.get(componentId);
      if (!component) continue;
      
      // Ensure all dependencies are rendered first
      const dependencyPromises = component.dependencies
        .map(depId => this.pendingComponents.get(depId))
        .filter(Boolean) as Promise<void>[];
      
      // Create a promise for this component's rendering
      const renderPromise = Promise.all(dependencyPromises)
        .then(() => this.renderComponent(componentId, component))
        .catch(err => {
          console.error(`Error rendering component ${componentId}:`, err);
        });
      
      this.pendingComponents.set(componentId, renderPromise);
      renderPromises.push(renderPromise);
      
      // Non-critical components can be rendered in parallel for better performance
      // while critical ones are rendered in strict order
      if (component.priority === 'critical') {
        await renderPromise;
      }
    }
    
    // Wait for all components to render
    await Promise.all(renderPromises);
    
    // Record the total render time
    this.renderStats.totalRenderTime = performance.now() - startTime;
  }
  
  /**
   * Render individual component with optimizations
   */
  private async renderComponent(componentId: string, priority: RenderPriority): Promise<void> {
    if (this.renderedComponents.has(componentId)) return;
    
    const elements = document.querySelectorAll(`[data-component="${componentId}"]`);
    if (elements.length === 0) return;
    
    // Create a promise for streaming content availability
    let resolveContentReady: (value: void | PromiseLike<void>) => void = () => {}; // Initialize with no-op
    const contentReady = new Promise<void>(resolve => {
      resolveContentReady = resolve;
    });
    
    // For critical components, ensure resources are preloaded
    if (priority.priority === 'critical' || priority.priority === 'high') {
      const resources = this.getComponentResources(componentId);
      criticalResourceLoader.registerAbsoluteCriticalResources(resources);
    }
    
    // Apply progressive hydration
    elements.forEach(element => {
      if (element instanceof HTMLElement) {
        this.hydrateElement(element, priority);
      }
    });
    
    // Mark as rendered
    this.renderedComponents.add(componentId);
    resolveContentReady();
    
    // For non-critical components, observe viewport entry
    if (priority.priority !== 'critical' && this.intersectionObserver) {
      elements.forEach(element => {
        this.intersectionObserver?.observe(element);
      });
    }
  }
  
  /**
   * Get resources required by a component
   */
  private getComponentResources(componentId: string): any[] {
    // In a real implementation, this would map components to their required resources
    // This is a placeholder implementation
    return [];
  }
  
  /**
   * Apply streaming hydration to element
   */
  private hydrateElement(element: HTMLElement, priority: RenderPriority): void {
    // Skip if already hydrated
    if (this.hydrationMap.get(element)) return;
    
    // Start measuring hydration time
    const startTime = performance.now();
    
    // For static components, minimal hydration is needed
    if (priority.complexity === 'static') {
      // Just ensure content is visible
      element.setAttribute('data-hydrate', 'complete');
      this.hydrationMap.set(element, true);
      return;
    }
    
    // For interactive components, ensure event handlers are attached
    if (priority.complexity === 'interactive') {
      // In a real implementation, this would attach event handlers
      // or trigger React hydration for this specific component
      if (window.React && (window as any).ReactDOM) {
        // Simulate React hydration
        setTimeout(() => {
          element.setAttribute('data-hydrate', 'complete');
          this.hydrationMap.set(element, true);
        }, 10);
      }
    }
    
    // For animated components, ensure animations are properly registered
    if (priority.complexity === 'animated') {
      // Add animation class when ready
      setTimeout(() => {
        element.classList.add('ready-for-animation');
        element.setAttribute('data-hydrate', 'complete');
        this.hydrationMap.set(element, true);
      }, priority.priority === 'critical' ? 100 : 300);
    }
    
    // Track hydration time
    if (!this.renderStats.hydrationTime) {
      this.renderStats.hydrationTime = 0;
    }
    this.renderStats.hydrationTime += (performance.now() - startTime);
  }
  
  /**
   * Setup viewport-based observation for lazy hydration
   */
  private setupViewportObserver(): void {
    if (!('IntersectionObserver' in window)) return;
    
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target;
            if (element instanceof HTMLElement) {
              const componentId = element.getAttribute('data-component');
              if (componentId) {
                const priority = this.componentRegistry.get(componentId);
                if (priority) {
                  this.hydrateElement(element, priority);
                }
              }
            }
            
            // Stop observing after hydration
            this.intersectionObserver?.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '200px 0px',
        threshold: 0.1
      }
    );
  }
  
  /**
   * Intercept DOM mutations to optimize newly added elements
   */
  private interceptDomMutations(): void {
    if (!('MutationObserver' in window)) return;
    
    this.mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node instanceof HTMLElement) {
              const componentId = node.getAttribute('data-component');
              if (componentId && this.componentRegistry.has(componentId)) {
                const priority = this.componentRegistry.get(componentId)!;
                this.hydrateElement(node, priority);
                
                // Observe for viewport entry if not critical
                if (priority.priority !== 'critical' && this.intersectionObserver) {
                  this.intersectionObserver.observe(node);
                }
              }
            }
          });
        }
      }
    });
    
    // Start observing the document
    this.mutationObserver.observe(document.body, { 
      childList: true, 
      subtree: true 
    });
  }
  
  /**
   * Finalize render statistics
   */
  private finalizeRenderStats(): void {
    // Determine time to interactive
    // A simple heuristic: when hydration is complete and no long tasks are pending
    if (!this.renderStats.timeToFirstInteractive) {
      this.renderStats.timeToFirstInteractive = performance.now() - this.pageStart;
    }
    
    // Calculate JS execution time
    const jsEntries = performance.getEntriesByType('resource')
      .filter(entry => {
        // Cast to PerformanceResourceTiming which has initiatorType
        const resourceEntry = entry as PerformanceResourceTiming;
        return resourceEntry.initiatorType === 'script';
      });
    
    let totalJsTime = 0;
    jsEntries.forEach(entry => {
      totalJsTime += entry.duration;
    });
    
    this.renderStats.jsExecutionTime = totalJsTime;
    
    // Log performance metrics in development
    if (process.env.NODE_ENV !== 'production') {
      console.log('Render Performance Stats:', this.renderStats);
    }
    
    // Send performance data to analytics in production
    if (process.env.NODE_ENV === 'production') {
      this.reportPerformanceMetrics();
    }
  }
  
  /**
   * Report performance metrics to analytics
   */
  private reportPerformanceMetrics(): void {
    // In a real implementation, this would send data to your analytics service
    const metricsToReport = {
      ...this.renderStats,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent
    };
    
    // Use sendBeacon for non-blocking reporting when available
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/metrics', JSON.stringify(metricsToReport));
    } else {
      // Fallback to async fetch
      fetch('/api/metrics', {
        method: 'POST',
        body: JSON.stringify(metricsToReport),
        keepalive: true
      }).catch(() => {});
    }
  }
  
  /**
   * Schedule non-critical tasks for after initial render
   */
  private schedulePostRenderTasks(): void {
    // Use requestIdleCallback when available for non-critical work
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback((deadline) => {
        this.executePostRenderTasks(deadline);
      });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        this.executePostRenderTasks(null);
      }, 200);
    }
  }
  
  /**
   * Execute tasks after initial render is complete
   */
  private executePostRenderTasks(deadline: IdleDeadline | null): void {
    let taskIndex = 0;
    
    // Execute tasks until we run out of idle time or tasks
    while (taskIndex < this.postRenderTasks.length && 
           (deadline === null || deadline.timeRemaining() > 0)) {
      try {
        this.postRenderTasks[taskIndex]();
      } catch (err) {
        console.error('Error in post-render task:', err);
      }
      taskIndex++;
    }
    
    // If we have remaining tasks, schedule them for the next idle period
    if (taskIndex < this.postRenderTasks.length) {
      const remainingTasks = this.postRenderTasks.slice(taskIndex);
      this.postRenderTasks = remainingTasks;
      
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback((deadline) => {
          this.executePostRenderTasks(deadline);
        });
      } else {
        setTimeout(() => {
          this.executePostRenderTasks(null);
        }, 50);
      }
    } else {
      // All tasks complete
      this.postRenderTasks = [];
    }
  }
  
  /**
   * Add a task to be executed after initial render
   */
  public addPostRenderTask(task: Function): void {
    this.postRenderTasks.push(task);
    
    // If initial render is already complete, schedule execution
    if (this.isInitialRenderComplete) {
      this.schedulePostRenderTasks();
    }
  }
  
  /**
   * Register a component element for optimized rendering
   */
  public registerElement(element: HTMLElement, componentId: string): void {
    element.setAttribute('data-component', componentId);
    
    const priority = this.componentRegistry.get(componentId);
    if (!priority) return;
    
    // Apply optimizations based on priority
    if (priority.priority === 'critical') {
      // Critical elements get immediate hydration
      this.hydrateElement(element, priority);
    } else {
      // Non-critical elements get lazy hydration
      if (this.intersectionObserver) {
        this.intersectionObserver.observe(element);
      }
    }
  }
  
  /**
   * Get render stats (for debugging/development)
   */
  public getRenderStats(): Partial<RenderStats> {
    return { ...this.renderStats };
  }
}

// Create singleton instance
const streamingRenderer = new StreamingRenderer();
export default streamingRenderer; 