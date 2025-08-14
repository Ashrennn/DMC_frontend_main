# Floating Menu - Menu Structure Details

## Table of Contents
1. [Complete Menu Hierarchy](#complete-menu-hierarchy)
2. [Menu Item Specifications](#menu-item-specifications)
3. [Sub-Menu Item Details](#sub-menu-item-details)
4. [Icon Specifications](#icon-specifications)
5. [URL Structure](#url-structure)
6. [Content Translations](#content-translations)
7. [Accessibility Labels](#accessibility-labels)

---

## 1. Complete Menu Hierarchy

```
Floating Menu
├── 🚢 Bunkering
│   ├── ⛽ Bunker Inquiry
│   ├── 📋 Vessel Registration
│   └── 📦 Order Processing
├── ⚙️ Operations
│   ├── 🛠️ Vessel Chandlery
│   └── 🚢 Fleets
├── 💻 Trade Desk
└── ❤️ Mohade Charity
```

---

## 2. Menu Item Specifications

### 2.1 🚢 Bunkering
- **ID**: `bunkering`
- **Type**: Expandable with sub-menus
- **Icon**: 🚢 (Ship/Shipping)
- **English Label**: "Bunkering"
- **Arabic Label**: "تزويد الوقود"
- **URL**: None (parent menu item)
- **Sub-Menu Count**: 3

### 2.2 ⚙️ Operations
- **ID**: `operations`
- **Type**: Expandable with sub-menus
- **Icon**: ⚙️ (Operations/Management)
- **English Label**: "Operations"
- **Arabic Label**: "العمليات"
- **URL**: None (parent menu item)
- **Sub-Menu Count**: 2

### 2.3 💻 Trade Desk
- **ID**: `tradeDesk`
- **Type**: Direct link (no sub-menus)
- **Icon**: 💻 (Computer/Trading)
- **English Label**: "Trade Desk"
- **Arabic Label**: "مكتب التداول"
- **URL**: `/trade-desk`
- **Sub-Menu Count**: 0

### 2.4 ❤️ Mohade Charity
- **ID**: `mohadeCharity`
- **Type**: Direct link (no sub-menus)
- **Icon**: ❤️ (Heart/Donation)
- **English Label**: "Mohade Charity"
- **Arabic Label**: "مؤسسة محاد الخيرية"
- **URL**: `/mohade-charity`
- **Sub-Menu Count**: 0

---

## 3. Sub-Menu Item Details

### 3.1 Bunkering Sub-Menus

#### **⛽ Bunker Inquiry**
- **ID**: `bunkerInquiry`
- **Parent**: Bunkering
- **Icon**: ⛽ (Fuel/Energy)
- **English Label**: "Bunker Inquiry"
- **Arabic Label**: "استفسار الوقود"
- **URL**: `/bunkering/bunker-inquiry`
- **Description**: Fuel inquiry and pricing information
- **Page Component**: `BunkerInquiryComponent`

#### **📋 Vessel Registration**
- **ID**: `vesselRegistration`
- **Parent**: Bunkering
- **Icon**: 📋 (Document/Registration)
- **English Label**: "Vessel Registration"
- **Arabic Label**: "تسجيل السفن"
- **URL**: `/bunkering/vessel-registration`
- **Description**: Vessel registration and documentation
- **Page Component**: `VesselRegistrationComponent`

#### **📦 Order Processing**
- **ID**: `orderProcessing`
- **Parent**: Bunkering
- **Icon**: 📦 (Order/Processing)
- **English Label**: "Order Processing"
- **Arabic Label**: "معالجة الطلبات"
- **URL**: `/bunkering/order-processing`
- **Description**: Order management and processing
- **Page Component**: `OrderProcessingComponent`

### 3.2 Operations Sub-Menus

#### **🛠️ Vessel Chandlery**
- **ID**: `vesselChandlery`
- **Parent**: Operations
- **Icon**: 🛠️ (Tools/Services)
- **English Label**: "Vessel Chandlery"
- **Arabic Label**: "خدمات تموين السفن البحرية"
- **URL**: `/operations/vessel-chandlery`
- **Description**: Vessel supply and waste collection services
- **Page Component**: `VesselChandleryComponent`

#### **🚢 Fleets**
- **ID**: `fleets`
- **Parent**: Operations
- **Icon**: 🚢 (Fleet Management)
- **English Label**: "Fleets"
- **Arabic Label**: "الأساطيل البحرية"
- **URL**: `/operations/fleets`
- **Description**: Fleet management and vessel operations
- **Page Component**: `FleetsComponent`

---

## 4. Icon Specifications

### 4.1 Main Menu Icons
| Menu Item | Icon | Unicode | Description |
|-----------|------|---------|-------------|
| **Bunkering** | 🚢 | U+1F6A2 | Ship/Shipping vessel |
| **Operations** | ⚙️ | U+2699 | Gear/Operations |
| **Trade Desk** | 💻 | U+1F4BB | Computer/Laptop |
| **Mohade Charity** | ❤️ | U+2764 | Heart/Charity |

### 4.2 Sub-Menu Icons
| Sub-Menu Item | Icon | Unicode | Description |
|---------------|------|---------|-------------|
| **Bunker Inquiry** | ⛽ | U+26FD | Fuel pump |
| **Vessel Registration** | 📋 | U+1F4CB | Clipboard/Document |
| **Order Processing** | 📦 | U+1F4E6 | Package/Order |
| **Vessel Chandlery** | 🛠️ | U+1F6E0 | Tools/Equipment |
| **Fleets** | 🚢 | U+1F6A2 | Ship/Fleet |

---

## 5. URL Structure

### 5.1 Route Hierarchy
```
/                           # Home page
├── /bunkering/            # Bunkering section
│   ├── /bunker-inquiry    # Bunker inquiry page
│   ├── /vessel-registration # Vessel registration page
│   └── /order-processing  # Order processing page
├── /operations/           # Operations section
│   ├── /vessel-chandlery  # Vessel chandlery page
│   └── /fleets           # Fleets page
├── /trade-desk           # Trade desk page
└── /mohade-charity       # Mohade charity page
```

### 5.2 Component Naming Convention
- **Route**: `/bunkering/bunker-inquiry`
- **Component**: `BunkerInquiryComponent`
- **Module**: `BunkeringModule`
- **File**: `bunker-inquiry.component.ts`

---

## 6. Content Translations

### 6.1 English Content
```typescript
export const EnglishContent = {
  // Main Menu Items
  bunkering: 'Bunkering',
  operations: 'Operations',
  tradeDesk: 'Trade Desk',
  mohadeCharity: 'Mohade Charity',
  
  // Bunkering Sub-Menus
  bunkerInquiry: 'Bunker Inquiry',
  vesselRegistration: 'Vessel Registration',
  orderProcessing: 'Order Processing',
  
  // Operations Sub-Menus
  vesselChandlery: 'Vessel Chandlery',
  fleets: 'Fleets'
};
```

### 6.2 Arabic Content
```typescript
export const ArabicContent = {
  // Main Menu Items
  bunkering: 'تزويد الوقود',
  operations: 'العمليات',
  tradeDesk: 'مكتب التداول',
  mohadeCharity: 'مؤسسة محاد الخيرية',
  
  // Bunkering Sub-Menus
  bunkerInquiry: 'استفسار الوقود',
  vesselRegistration: 'تسجيل السفن',
  orderProcessing: 'معالجة الطلبات',
  
  // Operations Sub-Menus
  vesselChandlery: 'خدمات تموين السفن البحرية',
  fleets: 'الأساطيل البحرية'
};
```

---

## 7. Accessibility Labels

### 7.1 Menu Navigation Labels
```typescript
export const AccessibilityLabels = {
  // Menu Controls
  openLeftMenu: {
    en: 'Open left menu',
    ar: 'افتح القائمة اليسرى'
  },
  openRightMenu: {
    en: 'Open right menu',
    ar: 'افتح القائمة اليمنى'
  },
  closeLeftMenu: {
    en: 'Close left menu',
    ar: 'أغلق القائمة اليسرى'
  },
  closeRightMenu: {
    en: 'Close right menu',
    ar: 'أغلق القائمة اليمنى'
  },
  
  // Menu Container
  mobileFloatingMenu: {
    en: 'Mobile floating menu',
    ar: 'القائمة العائمة للموبايل'
  }
};
```

### 7.2 Menu Item Labels
```typescript
export const MenuItemLabels = {
  // Main Menu Items
  bunkering: {
    en: 'Bunkering section',
    ar: 'قسم تزويد الوقود'
  },
  operations: {
    en: 'Operations section',
    ar: 'قسم العمليات'
  },
  tradeDesk: {
    en: 'Trade desk section',
    ar: 'قسم مكتب التداول'
  },
  mohadeCharity: {
    en: 'Mohade charity section',
    ar: 'قسم مؤسسة محاد الخيرية'
  }
};
```

---

## 8. Data Structure Interfaces

### 8.1 Complete Menu Structure
```typescript
export interface FloatingMenuContent {
  menuItems: FloatingMenuItem[];
  styling: StylingConfig;
  accessibility: AccessibilityLabels;
}

export interface FloatingMenuItem {
  id: string;
  label: { en: string; ar: string };
  icon: string;
  url?: string;
  subItems?: FloatingSubMenuItem[];
  accessibilityLabel?: { en: string; ar: string };
}

export interface FloatingSubMenuItem {
  id: string;
  label: { en: string; ar: string };
  icon: string;
  url: string;
  accessibilityLabel?: { en: string; ar: string };
}
```

### 8.2 Menu Data Example
```typescript
export const MenuData: FloatingMenuItem[] = [
  {
    id: 'bunkering',
    label: { en: 'Bunkering', ar: 'تزويد الوقود' },
    icon: '🚢',
    subItems: [
      {
        id: 'bunkerInquiry',
        label: { en: 'Bunker Inquiry', ar: 'استفسار الوقود' },
        icon: '⛽',
        url: '/bunkering/bunker-inquiry'
      },
      {
        id: 'vesselRegistration',
        label: { en: 'Vessel Registration', ar: 'تسجيل السفن' },
        icon: '📋',
        url: '/bunkering/vessel-registration'
      },
      {
        id: 'orderProcessing',
        label: { en: 'Order Processing', ar: 'معالجة الطلبات' },
        icon: '📦',
        url: '/bunkering/order-processing'
      }
    ]
  },
  {
    id: 'operations',
    label: { en: 'Operations', ar: 'العمليات' },
    icon: '⚙️',
    subItems: [
      {
        id: 'vesselChandlery',
        label: { en: 'Vessel Chandlery', ar: 'خدمات تموين السفن البحرية' },
        icon: '🛠️',
        url: '/operations/vessel-chandlery'
      },
      {
        id: 'fleets',
        label: { en: 'Fleets', ar: 'الأساطيل البحرية' },
        icon: '🚢',
        url: '/operations/fleets'
      }
    ]
  },
  {
    id: 'tradeDesk',
    label: { en: 'Trade Desk', ar: 'مكتب التداول' },
    icon: '💻',
    url: '/trade-desk'
  },
  {
    id: 'mohadeCharity',
    label: { en: 'Mohade Charity', ar: 'مؤسسة محاد الخيرية' },
    icon: '❤️',
    url: '/mohade-charity'
  }
];
```

---

## 9. Implementation Notes

### 9.1 Current Status
- ✅ **Menu Structure**: Complete and implemented
- ✅ **Responsive Design**: All breakpoints configured
- ✅ **Content Management**: Centralized language system
- ✅ **Styling**: Material Design overrides and custom styling
- ✅ **Accessibility**: ARIA labels and screen reader support

### 9.2 Next Steps
1. **Page Components**: Create individual page components for each menu item
2. **Routing**: Configure Angular routes for all menu items
3. **Content**: Populate each page with actual content
4. **Testing**: Test responsive behavior and accessibility

### 9.3 Technical Requirements
- **Angular 19**: Latest version with Material Design
- **Responsive Service**: Breakpoint detection and management
- **Language Service**: Dynamic language switching
- **Content Service**: Centralized menu content management

---

## 10. Current Mobile Implementation

### 10.1 Side Panel System
The mobile floating menu now uses a modern, simplified side panel system that has replaced the previous complex implementation.

#### **Key Changes from Previous Version**
- **Removed**: Complex body scroll manipulation (`disableBodyScroll`, `enableBodyScroll`)
- **Removed**: Auto-close timers and mutual exclusion logic
- **Removed**: Gap overlays and complex state management
- **Added**: Clean, independent side panel state management
- **Added**: Angular Material `mat-accordion` integration for single expansion behavior

#### **Current Panel Structure**
```typescript
// New side panel properties
leftSidePanelOpen: boolean = false;
rightSidePanelOpen: boolean = false;

// New side panel methods
openLeftSidePanel(): void
openRightSidePanel(): void
closeLeftSidePanel(): void
closeRightSidePanel(): void
closeAllSidePanels(): void
```

#### **Responsive Panel Widths**
- **Mobile-Large**: `60vw` (60% of viewport width)
- **Mobile-Small**: `85vw` (85% of viewport width)

#### **Expansion Panel Behavior**
- **Single Expansion**: Only one menu item can be expanded at a time
- **Implementation**: Uses `mat-accordion multi="false"`
- **No Custom Logic**: Relies on Angular Material's built-in single expansion behavior

#### **State Management**
- **Simple Boolean Flags**: Clean, predictable state management
- **Independent Panels**: Left and right panels operate independently
- **No Complex Dependencies**: Removed all complex interdependencies and timers

---

**📝 Document Information:**
- **Last Updated**: March 24, 2025
- **Current Version**: v1.1.0
- **Document Status**: ✅ **ACTIVE & COMPLETE**
- **Menu Items**: 4 main + 5 sub-menu items documented
- **Mobile Implementation**: ✅ **UPDATED** - New side panel system documented

*Menu structure documentation completed successfully! All menu items, sub-menus, icons, and technical details accurately documented. Mobile implementation updated to reflect current side panel system.*
