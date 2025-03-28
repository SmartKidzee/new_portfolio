/**
 * User Interaction Tracker
 * 
 * This module tracks user interactions to predict component usage patterns
 * and enable intelligent component preloading.
 */

export interface UserInteraction {
  type: 'click' | 'scroll' | 'hover' | 'componentRendered' | 'navigation';
  timestamp: number;
  target?: string; // Element ID or component ID
  componentId?: string;
  position?: { x: number; y: number }; // For click/hover
  data?: any; // Additional interaction data
}

export interface UserContext {
  currentRoute: string;
  previousRoute: string | null;
  viewportWidth: number;
  viewportHeight: number;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  scrollPosition: number;
  interactionFrequency: number; // Interactions per minute
}

type InteractionBatchCallback = (interactions: UserInteraction[]) => void;

class InteractionTracker {
  private static instance: InteractionTracker;
  private interactions: UserInteraction[] = [];
  private batchCallbacks: InteractionBatchCallback[] = [];
  private isTracking: boolean = false;
  private lastProcessedTimestamp: number = 0;
  private processingInterval: number | null = null;
  
  // Scroll tracking
  private lastScrollPosition: number = 0;
  private scrollDirection: 'up' | 'down' | 'none' = 'none';
  private scrollVelocity: number = 0;
  private scrollTimestamp: number = 0;
  
  // User context
  private currentContext: UserContext = {
    currentRoute: window.location.pathname,
    previousRoute: null,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
    deviceType: this.detectDeviceType(),
    scrollPosition: window.scrollY,
    interactionFrequency: 0
  };

  private constructor() {
    // Only initialize if in browser environment
    if (typeof window !== 'undefined') {
      this.setupEventListeners();
      this.startProcessingLoop();
    }
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): InteractionTracker {
    if (!InteractionTracker.instance) {
      InteractionTracker.instance = new InteractionTracker();
    }
    return InteractionTracker.instance;
  }

  /**
   * Set up event listeners for user interactions
   */
  private setupEventListeners(): void {
    // Track clicks
    window.addEventListener('click', this.handleClick.bind(this), { passive: true });
    
    // Track scrolls
    window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true });
    
    // Track hovers
    window.addEventListener('mousemove', this.throttle(this.handleMouseMove.bind(this), 200), { passive: true });
    
    // Track navigation
    window.addEventListener('popstate', this.handleNavigation.bind(this));
    
    // Track window resize
    window.addEventListener('resize', this.throttle(this.handleResize.bind(this), 200), { passive: true });
    
    // Track component rendering
    document.addEventListener('componentRendered', ((event: CustomEvent) => {
      this.trackInteraction({
        type: 'componentRendered',
        timestamp: performance.now(),
        componentId: event.detail.componentId,
        data: {
          renderTime: event.detail.renderTime,
          isInitialRender: event.detail.isInitialRender
        }
      });
    }) as EventListener);
    
    // Mark that we're tracking
    this.isTracking = true;
    console.log('[InteractionTracker] Event listeners initialized');
  }

  /**
   * Simple throttle function for high-frequency events
   */
  private throttle(callback: (...args: any[]) => void, delay: number): (...args: any[]) => void {
    let lastCall = 0;
    return (...args: any[]) => {
      const now = performance.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        callback(...args);
      }
    };
  }

  /**
   * Handle click events
   */
  private handleClick(event: MouseEvent): void {
    // Find target element
    const target = event.target as HTMLElement;
    const componentId = this.findComponentId(target);
    
    this.trackInteraction({
      type: 'click',
      timestamp: performance.now(),
      target: target.id || target.tagName,
      componentId,
      position: { x: event.clientX, y: event.clientY }
    });
  }

  /**
   * Handle scroll events
   */
  private handleScroll(): void {
    const now = performance.now();
    const currentPosition = window.scrollY;
    const timeDelta = now - this.scrollTimestamp;
    
    // Only process if enough time has passed to calculate meaningful velocity
    if (timeDelta > 50) {
      // Calculate scroll velocity (pixels per second)
      if (this.scrollTimestamp > 0) {
        const positionDelta = currentPosition - this.lastScrollPosition;
        this.scrollVelocity = Math.abs(positionDelta) / (timeDelta / 1000);
        
        // Determine scroll direction
        if (positionDelta > 0) {
          this.scrollDirection = 'down';
        } else if (positionDelta < 0) {
          this.scrollDirection = 'up';
        } else {
          this.scrollDirection = 'none';
        }
      }
      
      // Update context
      this.currentContext.scrollPosition = currentPosition;
      
      // Track scroll interaction
      this.trackInteraction({
        type: 'scroll',
        timestamp: now,
        data: {
          position: currentPosition,
          direction: this.scrollDirection,
          velocity: this.scrollVelocity
        }
      });
      
      // Update state for next calculation
      this.lastScrollPosition = currentPosition;
      this.scrollTimestamp = now;
    }
  }

  /**
   * Handle mouse movement events
   */
  private handleMouseMove(event: MouseEvent): void {
    // Find target element
    const target = event.target as HTMLElement;
    const componentId = this.findComponentId(target);
    
    // Only track if hovering over a component
    if (componentId) {
      this.trackInteraction({
        type: 'hover',
        timestamp: performance.now(),
        target: target.id || target.tagName,
        componentId,
        position: { x: event.clientX, y: event.clientY }
      });
    }
  }

  /**
   * Handle navigation events
   */
  private handleNavigation(): void {
    const previousRoute = this.currentContext.currentRoute;
    const currentRoute = window.location.pathname;
    
    // Update context
    this.currentContext.previousRoute = previousRoute;
    this.currentContext.currentRoute = currentRoute;
    
    this.trackInteraction({
      type: 'navigation',
      timestamp: performance.now(),
      data: {
        from: previousRoute,
        to: currentRoute
      }
    });
    
    console.log(`[InteractionTracker] Navigation detected: ${previousRoute} -> ${currentRoute}`);
  }

  /**
   * Handle resize events
   */
  private handleResize(): void {
    // Update viewport dimensions
    this.currentContext.viewportWidth = window.innerWidth;
    this.currentContext.viewportHeight = window.innerHeight;
    this.currentContext.deviceType = this.detectDeviceType();
  }

  /**
   * Find the component ID for an element
   */
  private findComponentId(element: HTMLElement | null): string | undefined {
    if (!element) return undefined;
    
    // Look for data-component-id attribute
    const componentId = element.getAttribute('data-component-id');
    if (componentId) return componentId;
    
    // Look for common component patterns
    if (element.className) {
      // Check for component class naming patterns
      const classNames = element.className.split(' ');
      for (const className of classNames) {
        if (className.endsWith('Component') || className.endsWith('-component')) {
          return className;
        }
      }
    }
    
    // Recurse up the DOM tree
    return this.findComponentId(element.parentElement);
  }

  /**
   * Detect device type based on viewport width
   */
  private detectDeviceType(): 'mobile' | 'tablet' | 'desktop' {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  /**
   * Track a user interaction
   */
  private trackInteraction(interaction: UserInteraction): void {
    this.interactions.push(interaction);
    
    // Limit the queue size to prevent memory issues
    if (this.interactions.length > 1000) {
      this.interactions.splice(0, this.interactions.length - 1000);
    }
  }

  /**
   * Start the interaction processing loop
   */
  private startProcessingLoop(): void {
    // Process interactions every 5 seconds
    this.processingInterval = window.setInterval(() => {
      this.processInteractionBatch();
    }, 5000);
  }

  /**
   * Process a batch of interactions
   */
  private processInteractionBatch(): void {
    // Get new interactions since last processing
    const now = performance.now();
    const newInteractions = this.interactions.filter(i => i.timestamp > this.lastProcessedTimestamp);
    
    if (newInteractions.length === 0) return;
    
    // Update interaction frequency
    const timeWindow = (now - this.lastProcessedTimestamp) / 1000 / 60; // in minutes
    this.currentContext.interactionFrequency = newInteractions.length / Math.max(0.1, timeWindow);
    
    // Call all registered callbacks with the new interactions
    this.batchCallbacks.forEach(callback => {
      try {
        callback(newInteractions);
      } catch (err) {
        console.error('[InteractionTracker] Error in interaction batch callback:', err);
      }
    });
    
    // Update last processed timestamp
    this.lastProcessedTimestamp = now;
  }

  /**
   * Register a callback for interaction batches
   */
  public onInteractionBatch(callback: InteractionBatchCallback): void {
    this.batchCallbacks.push(callback);
  }

  /**
   * Unregister a callback
   */
  public offInteractionBatch(callback: InteractionBatchCallback): void {
    const index = this.batchCallbacks.indexOf(callback);
    if (index !== -1) {
      this.batchCallbacks.splice(index, 1);
    }
  }

  /**
   * Get the current user context
   */
  public getCurrentUserContext(): UserContext {
    return { ...this.currentContext };
  }

  /**
   * Get recent interactions
   */
  public getRecentInteractions(count: number = 10): UserInteraction[] {
    return this.interactions.slice(-count);
  }

  /**
   * Get scroll direction
   */
  public getScrollDirection(): 'up' | 'down' | 'none' {
    return this.scrollDirection;
  }

  /**
   * Get scroll velocity in pixels per second
   */
  public getScrollVelocity(): number {
    return this.scrollVelocity;
  }

  /**
   * Clean up resources
   */
  public cleanup(): void {
    if (!this.isTracking) return;
    
    // Remove event listeners
    window.removeEventListener('click', this.handleClick.bind(this));
    window.removeEventListener('scroll', this.handleScroll.bind(this));
    window.removeEventListener('mousemove', this.throttle(this.handleMouseMove.bind(this), 200));
    window.removeEventListener('popstate', this.handleNavigation.bind(this));
    window.removeEventListener('resize', this.throttle(this.handleResize.bind(this), 200));
    
    // Clear interval
    if (this.processingInterval !== null) {
      clearInterval(this.processingInterval);
      this.processingInterval = null;
    }
    
    // Clear data
    this.interactions = [];
    this.batchCallbacks = [];
    this.isTracking = false;
    
    console.log('[InteractionTracker] Resources cleaned up');
  }
}

// Create and export singleton instance
const interactionTracker = InteractionTracker.getInstance();
export default interactionTracker; 