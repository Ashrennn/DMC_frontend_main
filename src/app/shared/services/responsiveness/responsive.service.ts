import { Injectable, signal, computed, effect } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, throttleTime, distinctUntilChanged, map } from 'rxjs/operators';
import { 
  Breakpoint, 
  DeviceType, 
  DeviceInfo, 
  ScreenSize,
  ResponsiveState 
} from './responsive.types';
import { BreakpointDetectionService } from './breakpoint-detection.service';
import { UserAgentDetectionService } from './user-agent-detection.service';
import { ResponsiveMappingService } from './responsive-mapping.service';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  
  // Main signals that components will read
  private currentBreakpoint = signal<Breakpoint>('desktop-large');
  private deviceInfo = signal<DeviceInfo | null>(null);
  private screenSize = signal<ScreenSize | null>(null);
  private lastUpdated = signal<Date>(new Date());

  // Computed signals for easy access
  isMobile = computed(() => this.isMobileBreakpoint(this.currentBreakpoint()));
  isTablet = computed(() => this.isTabletBreakpoint(this.currentBreakpoint()));
  isDesktop = computed(() => this.isDesktopBreakpoint(this.currentBreakpoint()));

  constructor(
    private breakpointService: BreakpointDetectionService,
    private userAgentService: UserAgentDetectionService,
    private mappingService: ResponsiveMappingService
  ) {
    // Delay initialization to avoid SSR issues
    if (typeof window !== 'undefined') {
      this.initializeResponsiveDetection();
    }
  }

  /**
   * Get current breakpoint signal
   */
  getCurrentBreakpoint(): Breakpoint {
    return this.currentBreakpoint();
  }

  /**
   * Get current breakpoint as signal (for reactive components)
   */
  getBreakpointSignal() {
    return this.currentBreakpoint;
  }

  /**
   * Get device info signal
   */
  getDeviceInfo(): DeviceInfo | null {
    return this.deviceInfo();
  }

  /**
   * Get screen size signal
   */
  getScreenSize(): ScreenSize | null {
    return this.screenSize();
  }

  /**
   * Get responsive state
   */
  getResponsiveState(): ResponsiveState {
    return {
      currentBreakpoint: this.currentBreakpoint(),
      deviceInfo: this.deviceInfo()!,
      screenSize: this.screenSize()!,
      lastUpdated: this.lastUpdated()
    };
  }

  /**
   * Check if current breakpoint is mobile
   */
  isMobileDevice(): boolean {
    return this.isMobile();
  }

  /**
   * Check if current breakpoint is tablet
   */
  isTabletDevice(): boolean {
    return this.isTablet();
  }

  /**
   * Check if current breakpoint is desktop
   */
  isDesktopDevice(): boolean {
    return this.isDesktop();
  }

  /**
   * Get debug information
   */
  getDebugInfo(): {
    breakpoint: Breakpoint;
    deviceInfo: DeviceInfo | null;
    screenSize: ScreenSize | null;
    mappingDebug: any;
    lastUpdated: Date;
  } {
    return {
      breakpoint: this.currentBreakpoint(),
      deviceInfo: this.deviceInfo(),
      screenSize: this.screenSize(),
      mappingDebug: this.mappingService.getMappingDebugInfo(),
      lastUpdated: this.lastUpdated()
    };
  }

  /**
   * Initialize responsive detection with real-time updates
   */
  private initializeResponsiveDetection(): void {
    // Test breakpoint detection
    this.breakpointService.testBreakpointDetection();
    
    // Initial detection
    this.updateResponsiveState();

    // Set up real-time resize detection
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(100),        // Wait 100ms after resize stops
        throttleTime(50),         // Update max every 50ms
        map(() => this.mappingService.getMappedBreakpoint()),
        distinctUntilChanged()    // Only update if breakpoint actually changed
      )
      .subscribe(newBreakpoint => {
        this.currentBreakpoint.set(newBreakpoint);
        this.lastUpdated.set(new Date());
        
        // Update device info and screen size
        this.updateDeviceInfo();
        this.updateScreenSize();
      });

    // Set up effect for reactive updates
    effect(() => {
      const breakpoint = this.currentBreakpoint();
      // Reactive updates can be observed by components via signals
    });
  }

  /**
   * Update responsive state
   */
  private updateResponsiveState(): void {
    const newBreakpoint = this.mappingService.getMappedBreakpoint();
    this.currentBreakpoint.set(newBreakpoint);
    this.updateDeviceInfo();
    this.updateScreenSize();
    this.lastUpdated.set(new Date());
  }

  /**
   * Update device information
   */
  private updateDeviceInfo(): void {
    const deviceInfo = this.userAgentService.getDeviceInfo();
    this.deviceInfo.set(deviceInfo);
  }

  /**
   * Update screen size information
   */
  private updateScreenSize(): void {
    const screenSize = this.breakpointService.getScreenSize();
    this.screenSize.set(screenSize);
  }

  /**
   * Check if breakpoint is mobile
   */
  private isMobileBreakpoint(breakpoint: Breakpoint): boolean {
    return breakpoint === 'mobile-small' || breakpoint === 'mobile-large';
  }

  /**
   * Check if breakpoint is tablet
   */
  private isTabletBreakpoint(breakpoint: Breakpoint): boolean {
    return breakpoint === 'tablet-small' || breakpoint === 'tablet-large';
  }

  /**
   * Check if breakpoint is desktop
   */
  private isDesktopBreakpoint(breakpoint: Breakpoint): boolean {
    return breakpoint === 'desktop-small' || breakpoint === 'desktop-large' || breakpoint === 'ultra-wide';
  }

  /**
   * Force refresh of responsive state
   */
  refresh(): void {
    this.updateResponsiveState();
  }

  /**
   * Get detection result with confidence
   */
  getDetectionResult() {
    return this.mappingService.getDetectionResult();
  }

  /**
   * Check if current breakpoint is optimal
   */
  isOptimalBreakpoint(): boolean {
    return this.mappingService.isOptimalBreakpoint(this.currentBreakpoint());
  }

  /**
   * Get recommended breakpoint
   */
  getRecommendedBreakpoint(): Breakpoint {
    return this.mappingService.getRecommendedBreakpoint();
  }
}
