/**
 * Preload Metrics
 * 
 * This module tracks performance metrics for component preloading
 * to analyze and optimize the preloading strategy.
 */

interface PerformanceSnapshot {
  timestamp: number;
  event: string;
  metrics: {
    memory?: {
      jsHeapSizeLimit?: number;
      totalJSHeapSize?: number;
      usedJSHeapSize?: number;
    };
    timing: {
      navigationStart?: number;
      loadEventEnd?: number;
      domContentLoaded?: number;
      firstPaint?: number;
      firstContentfulPaint?: number;
    };
    resourceCount: number;
    preloadedComponents: number;
    pendingComponents: number;
  };
}

interface ComponentMetric {
  componentId: string;
  loadStartTime: number;
  loadEndTime?: number;
  renderStartTime?: number;
  renderEndTime?: number;
  size?: number;
  loadDuration?: number;
  renderDuration?: number;
  status: 'loading' | 'loaded' | 'rendering' | 'rendered' | 'error';
  priority: 'critical' | 'high' | 'medium' | 'low';
  errorMessage?: string;
}

class PreloadMetrics {
  private performanceSnapshots: PerformanceSnapshot[] = [];
  private componentMetrics: Record<string, ComponentMetric> = {};
  private sessionStartTime: number = performance.now();
  private interactionCount: number = 0;
  
  constructor() {
    this.setupEventListeners();
  }
  
  /**
   * Set up event listeners for various metrics
   */
  private setupEventListeners(): void {
    if (typeof window === 'undefined') return;
    
    // Listen for component load events
    document.addEventListener('componentLoaded', ((event: CustomEvent) => {
      this.recordComponentLoaded(
        event.detail.componentId,
        event.detail.loadStartTime,
        event.detail.loadEndTime
      );
    }) as EventListener);
    
    // Listen for component render events
    document.addEventListener('componentRendered', ((event: CustomEvent) => {
      this.recordComponentRendered(
        event.detail.componentId,
        event.detail.renderTime,
        event.detail.isInitialRender
      );
    }) as EventListener);
    
    // Listen for component errors
    document.addEventListener('componentLoadError', ((event: CustomEvent) => {
      this.recordComponentError(
        event.detail.componentId,
        event.detail.errorMessage
      );
    }) as EventListener);
    
    // Record interaction metrics
    document.addEventListener('click', () => this.interactionCount++);
    document.addEventListener('keydown', () => this.interactionCount++);
    
    // Performance Observer for paint metrics
    if ('PerformanceObserver' in window) {
      try {
        const paintObserver = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (entry.name === 'first-paint') {
              this.performanceSnapshots.forEach(snapshot => {
                snapshot.metrics.timing.firstPaint = entry.startTime;
              });
            } else if (entry.name === 'first-contentful-paint') {
              this.performanceSnapshots.forEach(snapshot => {
                snapshot.metrics.timing.firstContentfulPaint = entry.startTime;
              });
            }
          }
        });
        paintObserver.observe({ type: 'paint', buffered: true });
      } catch (e) {
        console.warn('[PreloadMetrics] Paint observation not supported');
      }
    }
    
    console.log('[PreloadMetrics] Event listeners initialized');
  }
  
  /**
   * Log a performance snapshot with the current state
   */
  logPerformanceSnapShot(event: string): void {
    const snapshot: PerformanceSnapshot = {
      timestamp: performance.now(),
      event,
      metrics: {
        timing: {
          navigationStart: performance.timing?.navigationStart,
          loadEventEnd: performance.timing?.loadEventEnd,
          domContentLoaded: performance.timing?.domContentLoadedEventEnd,
          firstPaint: undefined,
          firstContentfulPaint: undefined
        },
        resourceCount: performance.getEntriesByType('resource').length,
        preloadedComponents: Object.values(this.componentMetrics).filter(m => 
          m.status === 'loaded' || m.status === 'rendered'
        ).length,
        pendingComponents: Object.values(this.componentMetrics).filter(m =>
          m.status === 'loading' || m.status === 'rendering'
        ).length
      }
    };
    
    // Add memory info if available
    if ((performance as any).memory) {
      snapshot.metrics.memory = {
        jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit,
        totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
        usedJSHeapSize: (performance as any).memory.usedJSHeapSize
      };
    }
    
    this.performanceSnapshots.push(snapshot);
    console.log(`[PreloadMetrics] Snapshot recorded: ${event}`);
  }
  
  /**
   * Record when a component starts loading
   */
  recordComponentLoadStart(componentId: string, priority: 'critical' | 'high' | 'medium' | 'low'): void {
    this.componentMetrics[componentId] = {
      componentId,
      loadStartTime: performance.now(),
      status: 'loading',
      priority
    };
  }

  /**
   * Record when a component finishes loading
   */
  recordComponentLoaded(componentId: string, loadStartTime?: number, loadEndTime?: number): void {
    const now = performance.now();
    
    // Update existing metric or create new one
    if (this.componentMetrics[componentId]) {
      this.componentMetrics[componentId].status = 'loaded';
      this.componentMetrics[componentId].loadEndTime = loadEndTime || now;
      
      if (loadStartTime && !this.componentMetrics[componentId].loadStartTime) {
        this.componentMetrics[componentId].loadStartTime = loadStartTime;
      }
    } else {
      this.componentMetrics[componentId] = {
        componentId,
        loadStartTime: loadStartTime || now - 100, // Estimate if not provided
        loadEndTime: loadEndTime || now,
        status: 'loaded',
        priority: 'medium' // Default priority if not known
      };
    }
    
    // Calculate load duration
    const metric = this.componentMetrics[componentId];
    if (metric.loadStartTime && metric.loadEndTime) {
      metric.loadDuration = metric.loadEndTime - metric.loadStartTime;
    }
    
    console.log(`[PreloadMetrics] Component loaded: ${componentId} (${metric.loadDuration?.toFixed(2)}ms)`);
  }
  
  /**
   * Record when a component is rendered
   */
  recordComponentRendered(componentId: string, renderTime?: number, isInitialRender: boolean = true): void {
    const now = performance.now();
    
    // Update existing metric or create new one
    if (this.componentMetrics[componentId]) {
      if (isInitialRender) {
        this.componentMetrics[componentId].renderStartTime = renderTime || now - 50; // Estimate render start
        this.componentMetrics[componentId].renderEndTime = now;
        this.componentMetrics[componentId].status = 'rendered';
      }
    } else {
      // Component was rendered without explicit loading (direct import or SSR)
      this.componentMetrics[componentId] = {
      componentId,
        loadStartTime: renderTime ? renderTime - 100 : now - 150, // Estimate
        loadEndTime: renderTime ? renderTime - 10 : now - 60, // Estimate
        renderStartTime: renderTime || now - 50,
        renderEndTime: now,
        status: 'rendered',
        priority: 'medium' // Default priority if not known
      };
    }
    
    // Calculate render duration
    const metric = this.componentMetrics[componentId];
    if (metric.renderStartTime && metric.renderEndTime) {
      metric.renderDuration = metric.renderEndTime - metric.renderStartTime;
    }
    
    console.log(`[PreloadMetrics] Component rendered: ${componentId} (${metric.renderDuration?.toFixed(2)}ms)`);
  }
  
  /**
   * Record component loading errors
   */
  recordComponentError(componentId: string, errorMessage: string): void {
    if (this.componentMetrics[componentId]) {
      this.componentMetrics[componentId].status = 'error';
      this.componentMetrics[componentId].errorMessage = errorMessage;
    } else {
      this.componentMetrics[componentId] = {
        componentId,
        loadStartTime: performance.now() - 100, // Estimate
        status: 'error',
        priority: 'medium',
        errorMessage
      };
    }
    
    console.error(`[PreloadMetrics] Component error: ${componentId} - ${errorMessage}`);
  }
  
  /**
   * Get all collected metrics
   */
  getMetrics() {
    return {
      snapshots: this.performanceSnapshots,
      components: this.componentMetrics,
      session: {
        duration: performance.now() - this.sessionStartTime,
        interactionCount: this.interactionCount,
        totalComponents: Object.keys(this.componentMetrics).length,
        loadedComponents: Object.values(this.componentMetrics).filter(m => 
          m.status === 'loaded' || m.status === 'rendered'
        ).length,
        errorComponents: Object.values(this.componentMetrics).filter(m => 
          m.status === 'error'
        ).length
      }
    };
  }
  
  /**
   * Get metrics for a specific component
   */
  getComponentMetrics(componentId: string): ComponentMetric | undefined {
    return this.componentMetrics[componentId];
  }
  
  /**
   * Get load time statistics
   */
  getLoadTimeStats() {
    const loadTimes = Object.values(this.componentMetrics)
      .filter(m => m.loadDuration !== undefined)
      .map(m => m.loadDuration!);
    
    if (loadTimes.length === 0) {
      return { min: 0, max: 0, avg: 0, median: 0, total: 0 };
    }
    
    // Sort for median calculation
    loadTimes.sort((a, b) => a - b);
    
    return {
      min: Math.min(...loadTimes),
      max: Math.max(...loadTimes),
      avg: loadTimes.reduce((sum, time) => sum + time, 0) / loadTimes.length,
      median: loadTimes[Math.floor(loadTimes.length / 2)],
      total: loadTimes.reduce((sum, time) => sum + time, 0)
    };
  }
  
  /**
   * Generate a performance report
   */
  generateReport() {
    const loadStats = this.getLoadTimeStats();
    const components = Object.values(this.componentMetrics);
    
    // Calculate critical path timing
    const criticalComponents = components.filter(c => c.priority === 'critical');
    const criticalPathTime = criticalComponents.reduce((max, comp) => {
      const endTime = comp.renderEndTime || comp.loadEndTime || 0;
      return Math.max(max, endTime);
    }, 0);
    
    // Format the report
    return {
      summary: {
        totalComponents: components.length,
        loadedComponents: components.filter(c => c.status === 'loaded' || c.status === 'rendered').length,
        errorComponents: components.filter(c => c.status === 'error').length,
        criticalComponents: criticalComponents.length,
        criticalPathTime,
        averageLoadTime: loadStats.avg,
        medianLoadTime: loadStats.median,
        totalLoadTime: loadStats.total,
        sessionDuration: performance.now() - this.sessionStartTime,
        snapshots: this.performanceSnapshots.length,
        userInteractions: this.interactionCount
      },
      components: this.componentMetrics,
      snapshots: this.performanceSnapshots
    };
  }
  
  /**
   * Clear all collected metrics
   */
  clearMetrics(): void {
    this.performanceSnapshots = [];
    this.componentMetrics = {};
    this.sessionStartTime = performance.now();
    this.interactionCount = 0;
    
    console.log('[PreloadMetrics] Metrics cleared');
  }
}

// Create and export singleton instance
const preloadMetrics = new PreloadMetrics();
export default preloadMetrics; 