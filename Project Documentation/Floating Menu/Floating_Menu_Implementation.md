# Floating Menu Implementation Documentation

## Table of Contents
1. [Overview](#overview)
2. [Architecture & Structure](#architecture--structure)
3. [Menu Items & Sub-Menu Structure](#menu-items--sub-menu-structure)
4. [Technical Implementation](#technical-implementation)
5. [Responsive Design](#responsive-design)
6. [Content Management](#content-management)
7. [Styling & Visual Design](#styling--visual-design)
8. [Accessibility Features](#accessibility-features)
9. [Required Page Creation](#required-page-creation)
10. [Implementation Status](#implementation-status)

---

## 1. Overview

The Floating Menu is a responsive navigation system that provides access to all major sections of the DMCNRG application. It features a collapsible design with main menu items and expandable sub-menus, supporting both English and Arabic languages.

### Key Features
- **Responsive Design**: Adapts to mobile-small, mobile-large, tablet, and desktop breakpoints
- **Multilingual Support**: English and Arabic content with dynamic language switching
- **Expandable Sub-Menus**: Collapsible sections for better organization
- **Centralized Content Management**: All text content managed from language files
- **Accessibility**: ARIA labels and screen reader support

---

## 2. Architecture & Structure

### 2.1 File Organization
```
src/app/features/home/home/navigation/floating-menu/
├── components/                    # Reusable UI components
├── content/                       # Content management
│   ├── floating-menu-content.service.ts
│   ├── floating-menu-content.types.ts
│   └── language-content/
│       └── floating-menu-content.ts
├── layouts/                       # Responsive layout components
│   ├── desktop-floating-menu.component.ts
│   ├── mobile-menu.component.ts
│   └── tablet-floating-menu.component.ts
└── floating-menu.component.ts     # Main component
```

### 2.2 Component Hierarchy
```
FloatingMenuComponent (Main)
├── DesktopFloatingMenuComponent
├── MobileFloatingMenuComponent
└── TabletFloatingMenuComponent
```

---

## 3. Menu Items & Sub-Menu Structure

### 3.1 Main Menu Items

#### **1. Bunkering**
- **Icon**: 🚢 (Ship/Shipping related)
- **Sub-Menu Items**:
  - **Bunker Inquiry** - Icon: ⛽ (Fuel/Energy)
  - **Vessel Registration** - Icon: 📋 (Document/Registration)
  - **Order Processing** - Icon: 📦 (Order/Processing)

#### **2. Operations**
- **Icon**: ⚙️ (Operations/Management)
- **Sub-Menu Items**:
  - **Vessel Chandlery** - Icon: 🛠️ (Tools/Services)
  - **Fleets** - Icon: 🚢 (Fleet Management)

#### **3. Trade Desk**
- **Icon**: 💻 (Computer/Trading)
- **Sub-Menu Items**: None (Direct link)

#### **4. Mohade Charity**
- **Icon**: ❤️ (Heart/Donation)
- **Sub-Menu Items**: None (Direct link)

### 3.2 Menu Content Data Structure

```typescript
export interface FloatingMenuItem {
  id: string;
  label: { en: string; ar: string };
  icon: string;
  url?: string;
  subItems?: FloatingSubMenuItem[];
}

export interface FloatingSubMenuItem {
  id: string;
  label: { en: string; ar: string };
  icon: string;
  url: string;
}
```

---

## 4. Technical Implementation

### 4.1 Core Services

#### **FloatingMenuContentService**
- Provides centralized access to menu content
- Handles language-specific content retrieval
- Manages accessibility labels

#### **LanguageService**
- Handles current language detection
- Provides language switching functionality
- Manages language state

### 4.2 Component Features

#### **MobileFloatingMenuComponent**
- **Responsive Breakpoints**: mobile-small, mobile-large, tablet, desktop
- **New Side Panel System**: Independent left and right side panels with smooth animations
- **Angular Material Integration**: Uses `mat-accordion` with `multi="false"` for single expansion panel behavior
- **Touch Gestures**: Mobile-optimized interactions with proper touch targets (44px minimum)
- **Responsive Panel Widths**: 60vw for mobile-large, 85vw for mobile-small

#### **Key Methods**
```typescript
getBreakpointClass(): string                    // Returns current breakpoint class
openLeftSidePanel() / openRightSidePanel(): void // Opens left/right side panels
closeLeftSidePanel() / closeRightSidePanel(): void // Closes individual side panels
closeAllSidePanels(): void                      // Closes all side panels
getCurrentLanguageCode(): string                // Returns current language
getAccessibilityLabel(key: string): string      // Returns localized ARIA labels
selectItem(item: string): void                  // Handles menu item selection
```

---

## 5. Responsive Design

### 5.1 Breakpoint System

#### **Mobile-Small**
```css
--button-size: 32px;
--icon-size: 22px;
--header-height: 50px;
--side-panel-width: 85vw;
--floating-width: 70%;
--floating-max-width: 320px;
--floating-min-width: 220px;
```

#### **Mobile-Large**
```css
--button-size: 44px;
--icon-size: 28px;
--header-height: 68px;
--side-panel-width: 60vw;
--floating-width: 75%;
--floating-max-width: 400px;
--floating-min-width: 280px;
```

#### **Tablet**
```css
--button-size: 48px;
--icon-size: 30px;
--header-height: 72px;
--menu-width: 75vw;
--floating-width: 80%;
--floating-max-width: 450px;
--floating-min-width: 300px;
```

#### **Desktop**
```css
--button-size: 52px;
--icon-size: 32px;
--header-height: 76px;
--menu-width: 70vw;
--floating-width: 85%;
--floating-max-width: 500px;
--floating-min-width: 350px;
```

### 5.2 Responsive Features
- **Dynamic Sizing**: CSS variables for breakpoint-specific dimensions
- **Adaptive Layouts**: Different component implementations per breakpoint
- **Flexible Positioning**: Responsive positioning and spacing

---

## 6. Content Management

### 6.1 Language Content Structure

#### **English Content**
```typescript
bunkering: {
  en: 'Bunkering',
  ar: 'تزويد الوقود'
},
operations: {
  en: 'Operations',
  ar: 'العمليات'
},
tradeDesk: {
  en: 'Trade Desk',
  ar: 'مكتب التداول'
},
mohadeCharity: {
  en: 'Mohade Charity',
  ar: 'مؤسسة محاد الخيرية'
}
```

#### **Arabic Content**
- **Bunkering**: تزويد الوقود
- **Operations**: العمليات
- **Trade Desk**: مكتب التداول
- **Mohade Charity**: مؤسسة محاد الخيرية

### 6.2 Sub-Menu Content

#### **Bunkering Sub-Menus**
- **Bunker Inquiry**: استفسار الوقود
- **Vessel Registration**: تسجيل السفن
- **Order Processing**: معالجة الطلبات

#### **Operations Sub-Menus**
- **Vessel Chandlery**: خدمات تموين السفن البحرية
- **Fleets**: الأساطيل البحرية

---

## 7. Styling & Visual Design

### 7.1 Material Design Overrides
```css
::ng-deep .menu-expansion-panel {
  box-shadow: none !important;
  border: none !important;
}

::ng-deep .menu-expansion-panel .mat-expansion-panel-header {
  padding: 0 !important;
  background: transparent !important;
}
```

### 7.2 Gradient Dividers
- **Menu Header**: Thicker gradient divider for visual separation
- **Main Menu Items**: Medium gradient dividers between sections
- **Sub-Menu Items**: Thin gradient dividers for subtle separation

#### **Divider Styling**
```css
.menu-header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 10%;
  right: 10%;
  height: 2px;
  background: linear-gradient(90deg, transparent 0%, rgba(0, 27, 63, 0.3) 20%, rgba(0, 27, 63, 0.3) 80%, transparent 100%);
}
```

### 7.3 Enhanced Drop Shadows
- **Default**: `0 6px 15px rgba(0, 27, 63, 0.12)`
- **Mobile-Small**: `0 8px 20px rgba(0, 27, 63, 0.18)`
- **Mobile-Large**: `0 10px 25px rgba(0, 27, 63, 0.22)`

---

## 8. Accessibility Features

### 8.1 ARIA Labels
```typescript
export interface AccessibilityLabels {
  openLeftMenu: { en: string; ar: string };
  openRightMenu: { en: string; ar: string };
  closeLeftMenu: { en: string; ar: string };
  closeRightMenu: { en: string; ar: string };
  mobileFloatingMenu: { en: string; ar: string };
}
```

### 8.2 Localized Accessibility
- **English**: "Open left menu", "Close right menu", etc.
- **Arabic**: "افتح القائمة اليسرى", "أغلق القائمة اليمنى", etc.

### 8.3 Screen Reader Support
- Semantic HTML structure
- Proper ARIA attributes
- Keyboard navigation support
- Focus management

---

## 9. Required Page Creation

### 9.1 Bunkering Section

#### **Bunker Inquiry Page**
- **Route**: `/bunkering/bunker-inquiry`
- **Component**: `BunkerInquiryComponent`
- **Features**:
  - Fuel inquiry form
  - Pricing calculator
  - Request submission
  - Status tracking

#### **Vessel Registration Page**
- **Route**: `/bunkering/vessel-registration`
- **Component**: `VesselRegistrationComponent`
- **Features**:
  - Vessel information form
  - Document upload
  - Registration status
  - Compliance checking

#### **Order Processing Page**
- **Route**: `/bunkering/order-processing`
- **Component**: `OrderProcessingComponent`
- **Features**:
  - Order management
  - Processing workflow
  - Status updates
  - Invoice generation

### 9.2 Operations Section

#### **Vessel Chandlery Page**
- **Route**: `/operations/vessel-chandlery`
- **Component**: `VesselChandleryComponent`
- **Features**:
  - Service catalog
  - Request management
  - Supply tracking
  - Waste collection

#### **Fleets Page**
- **Route**: `/operations/fleets`
- **Component**: `FleetsComponent`
- **Features**:
  - Fleet overview
  - Vessel management
  - Maintenance scheduling
  - Performance metrics

### 9.3 Direct Link Pages

#### **Trade Desk Page**
- **Route**: `/trade-desk`
- **Component**: `TradeDeskComponent`
- **Features**:
  - Trading interface
  - Market data
  - Order execution
  - Portfolio management

#### **Mohade Charity Page**
- **Route**: `/mohade-charity`
- **Component**: `MohadeCharityComponent`
- **Features**:
  - Donation portal
  - Project showcase
  - Impact reporting
  - Volunteer opportunities

---

## 10. Implementation Status

### 10.1 ✅ Completed
- **Component Architecture**: All layout components created
- **Responsive Design**: Mobile, tablet, and desktop layouts
- **Content Management**: Centralized language content system
- **Styling**: Material Design overrides and custom styling
- **Accessibility**: ARIA labels and screen reader support
- **Responsive Breakpoints**: All breakpoint configurations
- **Enhanced Shadows**: Progressive shadow enhancement

### 10.2 🔄 In Progress
- **Page Creation**: Individual page components for menu items
- **Routing**: Route configuration for all menu items
- **Content Population**: Actual content for each page

### 10.3 📋 Pending
- **Backend Integration**: API endpoints for dynamic content
- **User Authentication**: Role-based menu access
- **Analytics**: Menu usage tracking
- **Performance Optimization**: Lazy loading for sub-menus

---

## 11. Next Steps

### 11.1 Immediate Actions
1. **Create Page Components**: Generate all required page components
2. **Configure Routing**: Set up routes for all menu items
3. **Content Population**: Add actual content to each page
4. **Testing**: Test responsive behavior across all breakpoints

### 11.2 Future Enhancements
1. **Dynamic Menu Loading**: Load menu items from backend
2. **User Permissions**: Role-based menu access control
3. **Menu Analytics**: Track user interaction patterns
4. **Performance Optimization**: Implement lazy loading

---

## 📋 Technical Specifications

### File Locations
- **Main Component**: `src/app/features/home/home/navigation/floating-menu/floating-menu.component.ts`
- **Mobile Layout**: `src/app/features/home/home/navigation/floating-menu/layouts/mobile-menu.component.ts`
- **Content Service**: `src/app/features/home/home/navigation/floating-menu/content/floating-menu-content.service.ts`
- **Language Content**: `src/app/features/home/home/navigation/floating-menu/content/language-content/floating-menu-content.ts`

### Dependencies
- **Angular Material**: Expansion panels, icons, animations
- **Language Service**: Dynamic language switching
- **Responsive Service**: Breakpoint detection and management

### Browser Support
- **Modern Browsers**: Chrome, Firefox, Safari, Edge
- **Mobile Browsers**: iOS Safari, Chrome Mobile
- **Responsive**: All screen sizes from 320px to 4K+

---

**📝 Document Information:**
- **Last Updated**: March 24, 2025
- **Current Version**: v1.0.0
- **Document Status**: ✅ **ACTIVE & COMPLETE**
- **Implementation Status**: **Phase 1 Complete** - Ready for Page Creation

*Floating Menu documentation completed successfully! All technical details, menu structure, and implementation status accurately documented.*
