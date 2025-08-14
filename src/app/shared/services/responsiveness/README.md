# Responsive Services Architecture

## Overview
This folder contains the responsive design services for the DMCNRG application. The architecture uses Angular Signals for real-time responsive detection and provides a clean API for components.

## Services Structure

### 1. **ResponsiveService** (`responsive.service.ts`)
**Main Public API** - The primary service that components should use.

**Key Features:**
- Angular Signals for reactive updates
- Real-time breakpoint detection
- Computed signals for device types
- Automatic resize handling

**Usage:**
```typescript
constructor(private responsiveService: ResponsiveService) {}

// Get current breakpoint
const breakpoint = this.responsiveService.getCurrentBreakpoint();

// Reactive signals
const isMobile = this.responsiveService.isMobile;
const isDesktop = this.responsiveService.isDesktop;
```

### 2. **BreakpointDetectionService** (`breakpoint-detection.service.ts`)
**Screen Size Detection** - Handles window size detection and breakpoint mapping.

**Features:**
- Window resize detection with debouncing
- Breakpoint threshold mapping
- Screen size information
- Performance optimizations

### 3. **UserAgentDetectionService** (`user-agent-detection.service.ts`)
**Device Type Detection** - Analyzes user agent for device capabilities.

**Features:**
- User agent parsing
- Device capability detection
- Touch/hover detection
- Memory and CPU detection

### 4. **ResponsiveMappingService** (`responsive-mapping.service.ts`)
**Conflict Resolution** - Combines screen size and user agent detection.

**Features:**
- Conflict resolution between detection methods
- Confidence scoring
- Optimal breakpoint selection
- Device capability optimization

### 5. **ResponsiveTypes** (`responsive.types.ts`)
**Type Definitions** - All TypeScript interfaces and types.

**Key Types:**
- `Breakpoint` - 7 breakpoint categories
- `DeviceType` - Mobile/Tablet/Desktop
- `DeviceInfo` - Comprehensive device information
- `DetectionResult` - Detection with confidence

## Breakpoint Categories

| Breakpoint | Width Range | Device Type |
|------------|-------------|-------------|
| mobile-small | 320px - 479px | Mobile |
| mobile-large | 480px - 767px | Mobile |
| tablet-small | 768px - 1023px | Tablet |
| tablet-large | 1024px - 1279px | Tablet |
| desktop-small | 1280px - 1439px | Desktop |
| desktop-large | 1440px - 1919px | Desktop |
| ultra-wide | 1920px+ | Desktop |

## Real-Time Responsiveness

The system provides **real-time responsive detection** with:

- **Debounced Updates**: 100ms delay after resize stops
- **Throttled Performance**: Max 50ms between updates
- **Signal Updates**: Angular Signals for reactive components
- **Conflict Resolution**: Smart resolution between detection methods

## Usage Examples

### Component Usage
```typescript
export class MyComponent {
  constructor(private responsiveService: ResponsiveService) {}
  
  // Get current breakpoint
  currentBreakpoint = this.responsiveService.getCurrentBreakpoint();
  
  // Reactive computed signals
  isMobile = this.responsiveService.isMobile;
  isDesktop = this.responsiveService.isDesktop;
}
```

### Template Usage
```html
@switch (responsiveService.getCurrentBreakpoint()) {
  @case ('mobile-small') {
    <app-mobile-layout></app-mobile-layout>
  }
  @case ('desktop-large') {
    <app-desktop-layout></app-desktop-layout>
  }
}
```

## Architecture Benefits

1. **Signals-Based**: Angular 19 Signals for optimal performance
2. **Real-Time**: Immediate updates on window resize
3. **Redundant Detection**: Screen size + User Agent for reliability
4. **Conflict Resolution**: Smart handling of detection conflicts
5. **Performance Optimized**: Debouncing and throttling
6. **Type Safe**: Full TypeScript support
7. **Extensible**: Easy to add new detection methods

## Debug Information

Access debug information for troubleshooting:
```typescript
const debugInfo = this.responsiveService.getDebugInfo();
console.log('Debug:', debugInfo);
```

This provides comprehensive information about:
- Current breakpoint
- Device information
- Screen size
- Detection confidence
- Mapping decisions
