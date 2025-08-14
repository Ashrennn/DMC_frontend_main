# Loader Implementation Documentation

## Overview
This document provides comprehensive technical details for the DMCNRG loader screen component implementation, including code examples, troubleshooting, and development guidelines.

**📋 Quick Reference:**
- **Component**: `src/app/shared/components/loader/loader.component.ts`
- **Type**: Standalone Angular Component
- **Status**: ✅ **IMPLEMENTED & WORKING**
- **Last Updated**: March 2025

## Implementation Details

### Component Structure
- **File**: `src/app/shared/components/loader/loader.component.ts`
- **Type**: Standalone Angular Component
- **Purpose**: Initial loading screen with progress animation

### Key Features
1. **Visual Design**
   - Gradient background (purple to blue)
   - Spinning loader animation
   - Progress bar with smooth transitions
   - DMCNRG branding

2. **Functionality**
   - 3-second loading duration
   - Progress bar updates every 30ms
   - Automatic navigation to `/home` after completion
   - Full-screen overlay with z-index: 9999

### Technical Specifications

#### Component Configuration
```typescript
@Component({
  selector: 'dmc-loader',
  standalone: true,
  imports: [CommonModule],
  // ... template and styles
})
```

#### Routing Integration
```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: '',
    component: LoaderComponent
  },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
  }
];
```

### Recent Fixes (March 2025)

#### Issues Resolved
1. **Standalone Configuration Mismatch**
   - Problem: Component was `standalone: false` but used in routes
   - Solution: Changed to `standalone: true` with proper imports

2. **Missing Dependencies**
   - Problem: Missing CommonModule for Angular directives
   - Solution: Added `imports: [CommonModule]`

3. **Module Cleanup**
   - Problem: SharedModule was trying to manage standalone component
   - Solution: Removed LoaderComponent from SharedModule declarations/exports

4. **Page Reload Issue**
   - Problem: Loader not showing on page refresh/reload
   - Solution: Enhanced routing with `pathMatch: 'full'` and improved navigation logic

#### Code Changes Made
```typescript
// Before
@Component({
  selector: 'dmc-loader',
  standalone: false,
  // ...
})

// After
@Component({
  selector: 'dmc-loader',
  standalone: true,
  imports: [CommonModule],
  // ...
})
```

### Styling Features
- **Responsive Design**: Full viewport coverage
- **Smooth Animations**: CSS keyframes for spinner rotation
- **Modern UI**: Gradient backgrounds and shadows
- **Accessibility**: High contrast text and proper z-indexing

### Usage
The loader automatically displays when users navigate to the root path (`/`) and redirects to the home page after completion.

### Testing
To test the loader:
1. Run `ng serve`
2. Navigate to `http://localhost:4200/`
3. Observe 3-second loading animation
4. Automatic redirect to `/home`

## Future Enhancements
- Add loading state management
- Implement configurable duration
- Add loading messages/status updates
- Consider adding skip option for returning users

---

## 🔧 Troubleshooting Guide

### Common Issues

#### **Issue 1: Loader Not Displaying**
**Symptoms:** Blank screen or no loader animation
**Solutions:**
1. Check if component is properly imported in routes
2. Verify standalone configuration
3. Ensure CommonModule is imported

#### **Issue 2: Navigation Not Working**
**Symptoms:** Loader shows but doesn't redirect to home
**Solutions:**
1. Check Router injection in component
2. Verify route configuration
3. Ensure HomeModule exists and is properly configured

#### **Issue 3: Styling Issues**
**Symptoms:** Loader appears but styling is broken
**Solutions:**
1. Check CSS encapsulation settings
2. Verify z-index values
3. Ensure viewport coverage styles

### Debug Commands
```bash
# Check component compilation
ng build --configuration development

# Check for TypeScript errors
ng build --watch

# Test specific component
ng test --include="**/loader.component.spec.ts"
```

---

## 📚 Related Documentation
- **[DMCNRG.md](./DMCNRG.md)** - Main project documentation
- **Angular Router Guide** - Official Angular routing documentation
- **Standalone Components** - Angular standalone component guide
