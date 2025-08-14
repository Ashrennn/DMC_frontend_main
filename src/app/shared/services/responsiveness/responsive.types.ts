import { Observable } from 'rxjs';

// Responsive Types and Interfaces
// This file contains all TypeScript definitions for the responsive system

// Breakpoint types - 7 categories as discussed
export type Breakpoint = 
  | 'mobile-small'    // 320px - 479px
  | 'mobile-large'    // 480px - 767px
  | 'tablet-small'    // 768px - 1023px
  | 'tablet-large'    // 1024px - 1279px
  | 'desktop-small'   // 1280px - 1439px
  | 'desktop-large'   // 1440px - 1919px
  | 'ultra-wide';     // 1920px+

// Device type categories
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

// Screen size interface
export interface ScreenSize {
  width: number;
  height: number;
  pixelRatio: number;
  orientation: 'portrait' | 'landscape';
}

// Device information interface
export interface DeviceInfo {
  type: DeviceType;
  hasTouch: boolean;
  memory: number | null;
  cpuCores: number | null;
  networkType: string | null;
  userAgent: string;
  platform: string;
  language: string;
}

// Breakpoint configuration interface
export interface BreakpointConfig {
  minWidth: number;
  maxWidth: number;
  name: Breakpoint;
  deviceType: DeviceType;
}

// Detection result interface
export interface DetectionResult {
  breakpoint: Breakpoint;
  deviceType: DeviceType;
  confidence: number; // 0-1 confidence level
  method: 'screen-size' | 'user-agent' | 'combined';
}

// Responsive state interface
export interface ResponsiveState {
  currentBreakpoint: Breakpoint;
  deviceInfo: DeviceInfo;
  screenSize: ScreenSize;
  lastUpdated: Date;
}

// Service interfaces for dependency injection
export interface IBreakpointDetectionService {
  getBreakpointBySize(): Breakpoint;
  getScreenSize(): ScreenSize;
  onResize(): Observable<Breakpoint>;
}

export interface IUserAgentDetectionService {
  getDeviceType(): DeviceType;
  getDeviceInfo(): DeviceInfo;
  getUserAgent(): string;
}

export interface IResponsiveMappingService {
  getMappedBreakpoint(): Breakpoint;
  resolveConflict(sizeBP: Breakpoint, userAgentDeviceType: DeviceType): Breakpoint;
  isValidBreakpoint(breakpoint: string): boolean;
}

// Constants for breakpoint thresholds
export const BREAKPOINT_THRESHOLDS: Record<Breakpoint, { min: number; max: number }> = {
  'mobile-small': { min: 320, max: 479 },
  'mobile-large': { min: 480, max: 767 },
  'tablet-small': { min: 768, max: 1023 },
  'tablet-large': { min: 1024, max: 1279 },
  'desktop-small': { min: 1280, max: 1439 },
  'desktop-large': { min: 1440, max: 1919 },
  'ultra-wide': { min: 1920, max: Infinity }
};

// Device type mapping
export const DEVICE_TYPE_MAPPING: Record<Breakpoint, DeviceType> = {
  'mobile-small': 'mobile',
  'mobile-large': 'mobile',
  'tablet-small': 'tablet',
  'tablet-large': 'tablet',
  'desktop-small': 'desktop',
  'desktop-large': 'desktop',
  'ultra-wide': 'desktop'
};
