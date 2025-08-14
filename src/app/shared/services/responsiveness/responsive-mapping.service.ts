import { Injectable } from '@angular/core';
import { 
  Breakpoint, 
  DeviceType, 
  DetectionResult,
  IResponsiveMappingService,
  BREAKPOINT_THRESHOLDS,
  DEVICE_TYPE_MAPPING
} from './responsive.types';
import { BreakpointDetectionService } from './breakpoint-detection.service';
import { UserAgentDetectionService } from './user-agent-detection.service';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveMappingService implements IResponsiveMappingService {
  
  constructor(
    private breakpointService: BreakpointDetectionService,
    private userAgentService: UserAgentDetectionService
  ) {}

  /**
   * Get mapped breakpoint combining both detection methods
   */
  getMappedBreakpoint(): Breakpoint {
    // Check if window exists (for SSR)
    if (typeof window === 'undefined') {
      return 'desktop-large'; // Default for SSR
    }
    
    const sizeBreakpoint = this.breakpointService.getBreakpointBySize();
    const userAgentDeviceType = this.userAgentService.getDeviceType();
    
    // Check for conflicts between methods
    if (this.hasConflict(sizeBreakpoint, userAgentDeviceType)) {
      const resolvedBreakpoint = this.resolveConflict(sizeBreakpoint, userAgentDeviceType);
      return resolvedBreakpoint;
    }
    
    // No conflict, use screen size as primary
    return sizeBreakpoint;
  }

  /**
   * Resolve conflicts between screen size and user agent detection
   */
  resolveConflict(sizeBP: Breakpoint, userAgentDeviceType: DeviceType): Breakpoint {
    // Check if window exists (for SSR)
    if (typeof window === 'undefined') {
      return 'desktop-large'; // Default for SSR
    }
    
    const width = window.innerWidth;
    const userAgent = this.userAgentService.getUserAgent();
    
    // For tablet ranges, prioritize screen size over user agent
    if (sizeBP === 'tablet-small' || sizeBP === 'tablet-large') {
      return sizeBP;
    }
    
    // If screen size is in ambiguous range, trust user agent
    if (this.isAmbiguousSize(width)) {
      const mappedBP = this.mapUserAgentToBreakpoint(userAgentDeviceType);
      return mappedBP;
    }
    
    // If user agent is generic, trust screen size
    if (this.userAgentService.isGenericUserAgent()) {
      return sizeBP;
    }
    
    // If user agent is very specific (mobile/tablet), trust it more
    if (this.isSpecificUserAgent(userAgent)) {
      const mappedBP = this.mapUserAgentToBreakpoint(userAgentDeviceType);
      return mappedBP;
    }
    
    // Default to screen size
    return sizeBP;
  }

  /**
   * Check if breakpoint string is valid
   */
  isValidBreakpoint(breakpoint: string): boolean {
    return Object.keys(BREAKPOINT_THRESHOLDS).includes(breakpoint);
  }

  /**
   * Check if there's a conflict between screen size and user agent
   */
  private hasConflict(sizeBP: Breakpoint, userAgentDeviceType: DeviceType): boolean {
    const sizeDeviceType = DEVICE_TYPE_MAPPING[sizeBP];
    return sizeDeviceType !== userAgentDeviceType;
  }

  /**
   * Check if screen size is in ambiguous range
   */
  private isAmbiguousSize(width: number): boolean {
    // Tablet range is often ambiguous
    return width >= 768 && width <= 1024;
  }

  /**
   * Check if user agent is specific (more reliable)
   */
  private isSpecificUserAgent(userAgent: string): boolean {
    const specificKeywords = [
      'iphone', 'ipad', 'android', 'mobile', 'tablet',
      'blackberry', 'windows phone', 'kindle'
    ];
    
    return specificKeywords.some(keyword => 
      userAgent.toLowerCase().includes(keyword)
    );
  }

  /**
   * Map user agent device type to breakpoint
   */
  private mapUserAgentToBreakpoint(deviceType: DeviceType): Breakpoint {
    // Check if window exists (for SSR)
    if (typeof window === 'undefined') {
      return 'desktop-large'; // Default for SSR
    }
    
    const width = window.innerWidth;
    
    switch (deviceType) {
      case 'mobile':
        return width < 480 ? 'mobile-small' : 'mobile-large';
      case 'tablet':
        return width < 1024 ? 'tablet-small' : 'tablet-large';
      case 'desktop':
        if (width < 1280) return 'desktop-small';
        if (width < 1440) return 'desktop-large';
        return 'ultra-wide';
      default:
        return 'desktop-large';
    }
  }

  /**
   * Get detection result with confidence level
   */
  getDetectionResult(): DetectionResult {
    // Check if window exists (for SSR)
    if (typeof window === 'undefined') {
      return {
        breakpoint: 'desktop-large',
        deviceType: 'desktop',
        confidence: 0.5,
        method: 'screen-size'
      };
    }
    
    const sizeBreakpoint = this.breakpointService.getBreakpointBySize();
    const userAgentDeviceType = this.userAgentService.getDeviceType();
    const finalBreakpoint = this.getMappedBreakpoint();
    
    // Calculate confidence based on agreement between methods
    const hasConflict = this.hasConflict(sizeBreakpoint, userAgentDeviceType);
    const confidence = hasConflict ? 0.7 : 0.95; // Lower confidence if conflict
    
    return {
      breakpoint: finalBreakpoint,
      deviceType: DEVICE_TYPE_MAPPING[finalBreakpoint],
      confidence: confidence,
      method: hasConflict ? 'combined' : 'screen-size'
    };
  }

  /**
   * Get detailed mapping information for debugging
   */
  getMappingDebugInfo(): {
    sizeBreakpoint: Breakpoint;
    userAgentDeviceType: DeviceType;
    finalBreakpoint: Breakpoint;
    hasConflict: boolean;
    confidence: number;
    method: string;
    screenWidth: number;
    userAgent: string;
  } {
    // Check if window exists (for SSR)
    if (typeof window === 'undefined') {
      return {
        sizeBreakpoint: 'desktop-large',
        userAgentDeviceType: 'desktop',
        finalBreakpoint: 'desktop-large',
        hasConflict: false,
        confidence: 0.5,
        method: 'screen-size',
        screenWidth: 1920,
        userAgent: 'SSR'
      };
    }
    
    const sizeBreakpoint = this.breakpointService.getBreakpointBySize();
    const userAgentDeviceType = this.userAgentService.getDeviceType();
    const finalBreakpoint = this.getMappedBreakpoint();
    const hasConflict = this.hasConflict(sizeBreakpoint, userAgentDeviceType);
    const confidence = hasConflict ? 0.7 : 0.95;
    
    return {
      sizeBreakpoint,
      userAgentDeviceType,
      finalBreakpoint,
      hasConflict,
      confidence,
      method: hasConflict ? 'combined' : 'screen-size',
      screenWidth: window.innerWidth,
      userAgent: this.userAgentService.getUserAgent()
    };
  }

  /**
   * Get all possible breakpoints for current screen
   */
  getPossibleBreakpoints(): Breakpoint[] {
    // Check if window exists (for SSR)
    if (typeof window === 'undefined') {
      return ['desktop-large'];
    }
    
    const width = window.innerWidth;
    return this.breakpointService.getPossibleBreakpoints(width);
  }

  /**
   * Check if current breakpoint is optimal for device
   */
  isOptimalBreakpoint(breakpoint: Breakpoint): boolean {
    const detectionResult = this.getDetectionResult();
    return detectionResult.breakpoint === breakpoint && detectionResult.confidence > 0.8;
  }

  /**
   * Get recommended breakpoint based on device capabilities
   */
  getRecommendedBreakpoint(): Breakpoint {
    // Check if window exists (for SSR)
    if (typeof window === 'undefined') {
      return 'desktop-large';
    }
    
    const deviceInfo = this.userAgentService.getDeviceInfo();
    const deviceCapabilities = this.userAgentService.getDeviceCapabilities();
    
    // Consider device capabilities in recommendation
    if (deviceCapabilities.hasTouch && !deviceCapabilities.hasHover) {
      // Touch device without hover - likely mobile
      return this.getMappedBreakpoint();
    }
    
    if (deviceInfo.memory && deviceInfo.memory < 4) {
      // Low memory device - optimize for performance
      const currentBP = this.getMappedBreakpoint();
      return this.optimizeForLowMemory(currentBP);
    }
    
    return this.getMappedBreakpoint();
  }

  /**
   * Optimize breakpoint for low memory devices
   */
  private optimizeForLowMemory(breakpoint: Breakpoint): Breakpoint {
    // For low memory devices, prefer simpler layouts
    switch (breakpoint) {
      case 'desktop-large':
      case 'ultra-wide':
        return 'desktop-small';
      case 'tablet-large':
        return 'tablet-small';
      default:
        return breakpoint;
    }
  }
}
