import { Injectable } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { debounceTime, throttleTime, distinctUntilChanged, map } from 'rxjs/operators';
import { 
  Breakpoint, 
  ScreenSize, 
  BREAKPOINT_THRESHOLDS,
  IBreakpointDetectionService 
} from './responsive.types';

@Injectable({
  providedIn: 'root'
})
export class BreakpointDetectionService implements IBreakpointDetectionService {
  
  constructor() {}

  /**
   * Get current breakpoint based on screen width
   */
  getBreakpointBySize(): Breakpoint {
    // Check if window exists (for SSR)
    if (typeof window === 'undefined') {
      return 'desktop-large'; // Default for SSR
    }
    
    const width = window.innerWidth;
    return this.mapWidthToBreakpoint(width);
  }

  /**
   * Get current screen size information
   */
  getScreenSize(): ScreenSize {
    // Check if window exists (for SSR)
    if (typeof window === 'undefined') {
      return {
        width: 1920,
        height: 1080,
        pixelRatio: 1,
        orientation: 'landscape'
      };
    }
    
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      pixelRatio: window.devicePixelRatio || 1,
      orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait'
    };
  }

  /**
   * Observable that emits breakpoint changes on window resize
   */
  onResize(): Observable<Breakpoint> {
    // Check if window exists (for SSR)
    if (typeof window === 'undefined') {
      return new Observable<Breakpoint>();
    }
    
    return fromEvent(window, 'resize').pipe(
      debounceTime(100),        // Wait 100ms after resize stops
      throttleTime(50),         // Update max every 50ms
      map(() => this.getBreakpointBySize()),
      distinctUntilChanged()    // Only emit if breakpoint actually changed
    );
  }

  /**
   * Map window width to breakpoint category
   */
  private mapWidthToBreakpoint(width: number): Breakpoint {
    
    // Handle very small screens (below mobile-small minimum)
    if (width < 320) {
      return 'mobile-small';
    }
    
    // Check breakpoints in specific order (largest to smallest to avoid conflicts)
    const breakpoints: Breakpoint[] = [
      'ultra-wide',
      'desktop-large', 
      'desktop-small',
      'tablet-large',
      'tablet-small',
      'mobile-large',
      'mobile-small'
    ];
    
    for (const breakpoint of breakpoints) {
      const threshold = BREAKPOINT_THRESHOLDS[breakpoint];
      
      if (width >= threshold.min && width <= threshold.max) {
        return breakpoint;
      }
    }
    
    // Fallback to mobile-small for any other edge cases
    return 'mobile-small';
  }

  /**
   * Get breakpoint for a specific width (useful for testing)
   */
  getBreakpointForWidth(width: number): Breakpoint {
    return this.mapWidthToBreakpoint(width);
  }

  /**
   * Check if a width falls within a specific breakpoint
   */
  isWidthInBreakpoint(width: number, breakpoint: Breakpoint): boolean {
    const threshold = BREAKPOINT_THRESHOLDS[breakpoint];
    return width >= threshold.min && width <= threshold.max;
  }

  /**
   * Get all breakpoints that a width could belong to
   */
  getPossibleBreakpoints(width: number): Breakpoint[] {
    return Object.entries(BREAKPOINT_THRESHOLDS)
      .filter(([_, threshold]) => width >= threshold.min && width <= threshold.max)
      .map(([breakpoint, _]) => breakpoint as Breakpoint);
  }

  /**
   * Get the next breakpoint up from current width
   */
  getNextBreakpoint(width: number): Breakpoint | null {
    const currentBreakpoint = this.getBreakpointForWidth(width);
    const breakpoints = Object.keys(BREAKPOINT_THRESHOLDS) as Breakpoint[];
    const currentIndex = breakpoints.indexOf(currentBreakpoint);
    
    return currentIndex < breakpoints.length - 1 ? breakpoints[currentIndex + 1] : null;
  }

  /**
   * Get the previous breakpoint down from current width
   */
  getPreviousBreakpoint(width: number): Breakpoint | null {
    const currentBreakpoint = this.getBreakpointForWidth(width);
    const breakpoints = Object.keys(BREAKPOINT_THRESHOLDS) as Breakpoint[];
    const currentIndex = breakpoints.indexOf(currentBreakpoint);
    
    return currentIndex > 0 ? breakpoints[currentIndex - 1] : null;
  }

  /**
   * Check if current screen is mobile
   */
  isMobile(): boolean {
    const breakpoint = this.getBreakpointBySize();
    return breakpoint === 'mobile-small' || breakpoint === 'mobile-large';
  }

  /**
   * Check if current screen is tablet
   */
  isTablet(): boolean {
    const breakpoint = this.getBreakpointBySize();
    return breakpoint === 'tablet-small' || breakpoint === 'tablet-large';
  }

  /**
   * Check if current screen is desktop
   */
  isDesktop(): boolean {
    const breakpoint = this.getBreakpointBySize();
    return breakpoint === 'desktop-small' || breakpoint === 'desktop-large' || breakpoint === 'ultra-wide';
  }

  /**
   * Test breakpoint detection for specific widths
   */
  testBreakpointDetection(): void {
    const testWidths = [320, 480, 768, 1024, 1280, 1440, 1920];
    
    testWidths.forEach(width => {
      const breakpoint = this.mapWidthToBreakpoint(width);
    });
  }

  /**
   * Get debug information for current screen
   */
  getDebugInfo(): { width: number; height: number; breakpoint: Breakpoint; devicePixelRatio: number } {
    // Check if window exists (for SSR)
    if (typeof window === 'undefined') {
      return {
        width: 1920,
        height: 1080,
        breakpoint: 'desktop-large',
        devicePixelRatio: 1
      };
    }
    
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      breakpoint: this.getBreakpointBySize(),
      devicePixelRatio: window.devicePixelRatio || 1
    };
  }
}
