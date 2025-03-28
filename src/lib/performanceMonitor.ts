/**
 * Performance Monitoring Utility
 * 
 * Tracks critical performance metrics without affecting the UX
 * - First Contentful Paint (FCP)
 * - Largest Contentful Paint (LCP)
 * - Time to Interactive (TTI)
 * - Total Blocking Time (TBT)
 * - Cumulative Layout Shift (CLS)
 */

// Performance metrics types
interface PerformanceMetrics {
  fcp: number | null;
  lcp: number | null;
  tti: number | null;
  tbt: number | null;
  cls: number | null;
  fullyLoaded: number | null;
}

// LCP observer
interface LCPObserverEntry extends PerformanceEntry {
  element: Element;
  renderTime: number;
  loadTime: number;
  size: number;
  startTime: number;
  duration: number;
  entryType: 'largest-contentful-paint';
}

// Layout Shift interface
interface LayoutShift extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
  lastInputTime: number;
  sources: Array<{
    node: Node | null;
    currentRect: DOMRectReadOnly;
    previousRect: DOMRectReadOnly;
  }>;
}

// Performance observer types
type PerformanceEntryHandler = (entry: PerformanceEntry) => void;

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    fcp: null,
    lcp: null,
    tti: null,
    tbt: null,
    cls: null,
    fullyLoaded: null
  };

  private lcpObserver: PerformanceObserver | null = null;
  private fcpObserver: PerformanceObserver | null = null;
  private layoutShiftObserver: PerformanceObserver | null = null;
  private longTaskObserver: PerformanceObserver | null = null;
  
  private tbtValue = 0;
  private clsValue = 0;
  private navigationStart = 0;
  private isMonitoring = false;
  private onMetricsCallback: ((metrics: PerformanceMetrics) => void) | null = null;

  constructor() {
    // Get navigation start time
    if (typeof performance !== 'undefined') {
      const navigationEntries = performance.getEntriesByType('navigation');
      if (navigationEntries.length > 0) {
        this.navigationStart = navigationEntries[0].startTime;
      } else {
        this.navigationStart = performance.timing.navigationStart || 0;
      }
    }
  }

  /**
   * Start monitoring performance metrics
   */
  public startMonitoring(callback?: (metrics: PerformanceMetrics) => void): void {
    if (this.isMonitoring) return;
    this.isMonitoring = true;
    
    if (callback) {
      this.onMetricsCallback = callback;
    }

    // Only run in browser environment with Performance API
    if (typeof window === 'undefined' || typeof PerformanceObserver === 'undefined') {
      return;
    }

    this.observeFCP();
    this.observeLCP();
    this.observeCLS();
    this.observeLongTasks();
    
    // Estimate TTI after a reasonable delay
    setTimeout(() => {
      this.estimateTTI();
    }, 5000);
    
    // Measure fully loaded time
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.metrics.fullyLoaded = performance.now();
        this.updateMetrics();
      }, 1000);
    });
  }

  /**
   * Stop monitoring performance metrics
   */
  public stopMonitoring(): void {
    this.disconnectObservers();
    this.isMonitoring = false;
  }

  /**
   * Get current performance metrics
   */
  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  /**
   * Observe First Contentful Paint (FCP)
   */
  private observeFCP(): void {
    try {
      this.fcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        if (entries.length > 0) {
          const fcpEntry = entries[0];
          this.metrics.fcp = fcpEntry.startTime;
          this.updateMetrics();
          
          // Can disconnect after getting FCP
          if (this.fcpObserver) {
            this.fcpObserver.disconnect();
          }
        }
      });
      
      this.fcpObserver.observe({ type: 'paint', buffered: true });
    } catch (e) {
      console.error('Error observing FCP:', e);
    }
  }

  /**
   * Observe Largest Contentful Paint (LCP)
   */
  private observeLCP(): void {
    try {
      this.lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        
        // We use the latest LCP value
        if (entries.length > 0) {
          const lcpEntry = entries[entries.length - 1] as LCPObserverEntry;
          this.metrics.lcp = lcpEntry.startTime;
          this.updateMetrics();
        }
      });
      
      this.lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      
      // LCP is finalized when the page's lifecycle state changes to hidden
      window.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden' && this.lcpObserver) {
          this.lcpObserver.takeRecords().map(entry => {
            const lcpEntry = entry as LCPObserverEntry;
            this.metrics.lcp = lcpEntry.startTime;
            this.updateMetrics();
          });
          
          this.lcpObserver.disconnect();
        }
      }, { once: true });
    } catch (e) {
      console.error('Error observing LCP:', e);
    }
  }

  /**
   * Observe Cumulative Layout Shift (CLS)
   */
  private observeCLS(): void {
    try {
      let sessionEntries: LayoutShift[] = [];
      let sessionValue = 0;
      let firstSessionEntry: number = 0;
      
      const entryHandler = (entry: PerformanceEntry) => {
        // Only count layout shifts without recent user input
        const layoutShift = entry as LayoutShift;
        if (!layoutShift.hadRecentInput) {
          // If it's the first entry in a session (or first ever) start a session
          if (sessionEntries.length === 0) {
            firstSessionEntry = entry.startTime;
          }
          
          // Add the entry to the current session
          sessionEntries.push(layoutShift);
          
          // Close the session if the entry occurred more than 1 second after
          // the previous entry or 5 seconds have passed since the first entry
          const elapsed = entry.startTime - firstSessionEntry;
          if (elapsed >= 1000 || sessionEntries.length === 1) {
            const sessionGap = entry.startTime - (sessionEntries[sessionEntries.length - 1]?.startTime || 0);
            if (sessionGap >= 1000 || elapsed >= 5000) {
              // Calculate the CLS value for this session
              const sessionValueCalculated = sessionEntries.reduce((sum, entry) => {
                return sum + entry.value;
              }, 0);
              
              // Update the CLS to the max session value
              if (sessionValueCalculated > sessionValue) {
                sessionValue = sessionValueCalculated;
                this.clsValue = sessionValue;
                this.metrics.cls = this.clsValue;
                this.updateMetrics();
              }
              
              // Reset for a new session
              sessionEntries = [];
            }
          }
        }
      };
      
      this.layoutShiftObserver = new PerformanceObserver((entryList) => {
        entryList.getEntries().forEach(entryHandler);
      });
      
      this.layoutShiftObserver.observe({ type: 'layout-shift', buffered: true });
      
      // Ensure we process any pending entries when the page is hidden
      window.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          // Process any pending entries
          if (this.layoutShiftObserver) {
            this.layoutShiftObserver.takeRecords().forEach(entryHandler);
            this.layoutShiftObserver.disconnect();
          }
        }
      }, { once: true });
    } catch (e) {
      console.error('Error observing CLS:', e);
    }
  }

  /**
   * Observe long tasks for Total Blocking Time (TBT)
   */
  private observeLongTasks(): void {
    try {
      this.longTaskObserver = new PerformanceObserver((entryList) => {
        entryList.getEntries().forEach(entry => {
          // Only measure TBT for tasks that occurred after FCP
          if (this.metrics.fcp !== null && entry.startTime > this.metrics.fcp) {
            // Any task over 50ms is considered a long task
            // TBT is the sum of task duration - 50ms for each long task
            const taskDuration = entry.duration;
            const blockingTime = taskDuration > 50 ? taskDuration - 50 : 0;
            this.tbtValue += blockingTime;
            this.metrics.tbt = this.tbtValue;
            this.updateMetrics();
          }
        });
      });
      
      this.longTaskObserver.observe({ type: 'longtask', buffered: true });
      
      // Stop measuring after a reasonable amount of time
      setTimeout(() => {
        if (this.longTaskObserver) {
          this.longTaskObserver.disconnect();
        }
      }, 15000);
    } catch (e) {
      console.error('Error observing long tasks:', e);
    }
  }

  /**
   * Estimate Time to Interactive (TTI)
   * This is a simplified version, as the true TTI requires additional analysis
   */
  private estimateTTI(): void {
    try {
      if (typeof performance.timing.domInteractive !== 'undefined') {
        this.metrics.tti = performance.timing.domInteractive - this.navigationStart;
        this.updateMetrics();
      } else {
        // Simplified estimation based on when main thread is quiet
        const quietPeriodLength = 5000; // 5 seconds of quiet period
        let lastLongTaskEnd = 0;
        
        this.longTaskObserver = new PerformanceObserver((entryList) => {
          entryList.getEntries().forEach(entry => {
            lastLongTaskEnd = Math.max(lastLongTaskEnd, entry.startTime + entry.duration);
          });
        });
        
        this.longTaskObserver.observe({ type: 'longtask', buffered: true });
        
        // Check if the main thread has been quiet for the required period
        const checkQuietPeriod = () => {
          const now = performance.now();
          if (now - lastLongTaskEnd >= quietPeriodLength) {
            this.metrics.tti = lastLongTaskEnd;
            this.updateMetrics();
            
            if (this.longTaskObserver) {
              this.longTaskObserver.disconnect();
            }
          } else {
            // Check again in a second
            setTimeout(checkQuietPeriod, 1000);
          }
        };
        
        // Start checking after a brief delay to let the page settle
        setTimeout(checkQuietPeriod, 3000);
      }
    } catch (e) {
      console.error('Error estimating TTI:', e);
    }
  }

  /**
   * Notify metrics update
   */
  private updateMetrics(): void {
    if (this.onMetricsCallback) {
      this.onMetricsCallback({ ...this.metrics });
    }
    
    // You can send metrics to an analytics service here
    if (this.hasAllMetrics()) {
      this.reportMetricsToConsole();
    }
  }

  /**
   * Check if all essential metrics are collected
   */
  private hasAllMetrics(): boolean {
    return this.metrics.fcp !== null && 
           this.metrics.lcp !== null && 
           this.metrics.cls !== null && 
           this.metrics.tbt !== null;
  }

  /**
   * Report metrics to console for debugging
   */
  private reportMetricsToConsole(): void {
    if (process.env.NODE_ENV !== 'production') {
      console.log('Performance Metrics:', {
        FCP: `${Math.round(this.metrics.fcp || 0)}ms`,
        LCP: `${Math.round(this.metrics.lcp || 0)}ms`,
        TTI: `${Math.round(this.metrics.tti || 0)}ms`,
        TBT: `${Math.round(this.metrics.tbt || 0)}ms`,
        CLS: this.metrics.cls?.toFixed(3),
        FullyLoaded: `${Math.round(this.metrics.fullyLoaded || 0)}ms`
      });
    }
  }

  /**
   * Disconnect all observers
   */
  private disconnectObservers(): void {
    if (this.lcpObserver) {
      this.lcpObserver.disconnect();
    }
    
    if (this.fcpObserver) {
      this.fcpObserver.disconnect();
    }
    
    if (this.layoutShiftObserver) {
      this.layoutShiftObserver.disconnect();
    }
    
    if (this.longTaskObserver) {
      this.longTaskObserver.disconnect();
    }
  }
}

// Export a singleton instance
const performanceMonitor = new PerformanceMonitor();
export default performanceMonitor; 