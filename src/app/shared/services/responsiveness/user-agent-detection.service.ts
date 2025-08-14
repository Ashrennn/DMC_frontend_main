import { Injectable } from '@angular/core';
import { 
  DeviceType, 
  DeviceInfo, 
  IUserAgentDetectionService 
} from './responsive.types';

@Injectable({
  providedIn: 'root'
})
export class UserAgentDetectionService implements IUserAgentDetectionService {
  
  constructor() {}

  /**
   * Get device type from user agent
   */
  getDeviceType(): DeviceType {
    // Check if navigator exists (for SSR)
    if (typeof navigator === 'undefined') {
      return 'desktop'; // Default for SSR
    }
    
    const userAgent = navigator.userAgent.toLowerCase();
    
    // Mobile detection
    if (this.isMobileDevice(userAgent)) {
      return 'mobile';
    }
    
    // Tablet detection
    if (this.isTabletDevice(userAgent)) {
      return 'tablet';
    }
    
    // Default to desktop
    return 'desktop';
  }

  /**
   * Get comprehensive device information
   */
  getDeviceInfo(): DeviceInfo {
    // Check if navigator exists (for SSR)
    if (typeof navigator === 'undefined') {
      return {
        type: 'desktop',
        hasTouch: false,
        memory: null,
        cpuCores: null,
        networkType: null,
        userAgent: 'SSR',
        platform: 'SSR',
        language: 'en'
      };
    }
    
    const userAgent = navigator.userAgent;
    const deviceType = this.getDeviceType();
    
    return {
      type: deviceType,
      hasTouch: this.hasTouchCapability(),
      memory: this.getDeviceMemory(),
      cpuCores: this.getCPUCount(),
      networkType: this.getNetworkType(),
      userAgent: userAgent,
      platform: navigator.platform,
      language: navigator.language
    };
  }

  /**
   * Get raw user agent string
   */
  getUserAgent(): string {
    // Check if navigator exists (for SSR)
    if (typeof navigator === 'undefined') {
      return 'SSR';
    }
    
    return navigator.userAgent;
  }

  /**
   * Check if device is mobile based on user agent
   */
  private isMobileDevice(userAgent: string): boolean {
    const mobileKeywords = [
      'mobile', 'android', 'iphone', 'ipod', 'blackberry', 
      'windows phone', 'opera mini', 'iemobile'
    ];
    
    return mobileKeywords.some(keyword => userAgent.includes(keyword));
  }

  /**
   * Check if device is tablet based on user agent
   */
  private isTabletDevice(userAgent: string): boolean {
    const tabletKeywords = [
      'tablet', 'ipad', 'playbook', 'kindle'
    ];
    
    return tabletKeywords.some(keyword => userAgent.includes(keyword));
  }

  /**
   * Check if device has touch capability
   */
  private hasTouchCapability(): boolean {
    // Check if navigator exists (for SSR)
    if (typeof navigator === 'undefined') {
      return false;
    }
    
    return navigator.maxTouchPoints > 0 || 
           'ontouchstart' in window || 
           navigator.userAgent.includes('Mobile');
  }

  /**
   * Get device memory (if available)
   */
  private getDeviceMemory(): number | null {
    // Check if navigator exists (for SSR)
    if (typeof navigator === 'undefined') {
      return null;
    }
    
    return (navigator as any).deviceMemory || null;
  }

  /**
   * Get CPU core count (if available)
   */
  private getCPUCount(): number | null {
    // Check if navigator exists (for SSR)
    if (typeof navigator === 'undefined') {
      return null;
    }
    
    return (navigator as any).hardwareConcurrency || null;
  }

  /**
   * Get network connection type (if available)
   */
  private getNetworkType(): string | null {
    // Check if navigator exists (for SSR)
    if (typeof navigator === 'undefined') {
      return null;
    }
    
    const connection = (navigator as any).connection;
    return connection?.effectiveType || null;
  }

  /**
   * Get detailed device information for debugging
   */
  getDetailedDeviceInfo(): {
    userAgent: string;
    platform: string;
    language: string;
    cookieEnabled: boolean;
    onLine: boolean;
    maxTouchPoints: number;
    deviceMemory: number | null;
    hardwareConcurrency: number | null;
    connectionType: string | null;
    deviceType: DeviceType;
  } {
    // Check if navigator exists (for SSR)
    if (typeof navigator === 'undefined') {
      return {
        userAgent: 'SSR',
        platform: 'SSR',
        language: 'en',
        cookieEnabled: false,
        onLine: false,
        maxTouchPoints: 0,
        deviceMemory: null,
        hardwareConcurrency: null,
        connectionType: null,
        deviceType: 'desktop'
      };
    }
    
    const connection = (navigator as any).connection;
    
    return {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      cookieEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine,
      maxTouchPoints: navigator.maxTouchPoints,
      deviceMemory: (navigator as any).deviceMemory || null,
      hardwareConcurrency: (navigator as any).hardwareConcurrency || null,
      connectionType: connection?.effectiveType || null,
      deviceType: this.getDeviceType()
    };
  }

  /**
   * Check if user agent is generic (less reliable for detection)
   */
  isGenericUserAgent(): boolean {
    // Check if navigator exists (for SSR)
    if (typeof navigator === 'undefined') {
      return true;
    }
    
    const userAgent = navigator.userAgent.toLowerCase();
    
    // Generic user agents that don't provide specific device info
    const genericKeywords = [
      'mozilla', 'chrome', 'safari', 'firefox', 'edge'
    ];
    
    // If user agent only contains generic browser info, it's less reliable
    return genericKeywords.every(keyword => userAgent.includes(keyword)) &&
           !this.isMobileDevice(userAgent) && 
           !this.isTabletDevice(userAgent);
  }

  /**
   * Get browser information
   */
  getBrowserInfo(): { name: string; version: string; engine: string } {
    // Check if navigator exists (for SSR)
    if (typeof navigator === 'undefined') {
      return {
        name: 'SSR',
        version: 'SSR',
        engine: 'SSR'
      };
    }
    
    const userAgent = navigator.userAgent;
    
    let browserName = 'Unknown';
    let browserVersion = 'Unknown';
    let engine = 'Unknown';
    
    // Detect browser
    if (userAgent.includes('Chrome')) {
      browserName = 'Chrome';
      const match = userAgent.match(/Chrome\/(\d+)/);
      browserVersion = match ? match[1] : 'Unknown';
    } else if (userAgent.includes('Firefox')) {
      browserName = 'Firefox';
      const match = userAgent.match(/Firefox\/(\d+)/);
      browserVersion = match ? match[1] : 'Unknown';
    } else if (userAgent.includes('Safari')) {
      browserName = 'Safari';
      const match = userAgent.match(/Version\/(\d+)/);
      browserVersion = match ? match[1] : 'Unknown';
    } else if (userAgent.includes('Edge')) {
      browserName = 'Edge';
      const match = userAgent.match(/Edge\/(\d+)/);
      browserVersion = match ? match[1] : 'Unknown';
    }
    
    // Detect engine
    if (userAgent.includes('Gecko')) {
      engine = 'Gecko';
    } else if (userAgent.includes('WebKit')) {
      engine = 'WebKit';
    } else if (userAgent.includes('Trident')) {
      engine = 'Trident';
    }
    
    return { name: browserName, version: browserVersion, engine };
  }

  /**
   * Check if device supports specific features
   */
  getDeviceCapabilities(): {
    hasTouch: boolean;
    hasPointer: boolean;
    hasHover: boolean;
    hasRetina: boolean;
    hasHighDPI: boolean;
  } {
    // Check if window exists (for SSR)
    if (typeof window === 'undefined') {
      return {
        hasTouch: false,
        hasPointer: false,
        hasHover: false,
        hasRetina: false,
        hasHighDPI: false
      };
    }
    
    const pixelRatio = window.devicePixelRatio || 1;
    
    return {
      hasTouch: this.hasTouchCapability(),
      hasPointer: 'onpointerdown' in window,
      hasHover: window.matchMedia('(hover: hover)').matches,
      hasRetina: pixelRatio > 1,
      hasHighDPI: pixelRatio >= 2
    };
  }
}
