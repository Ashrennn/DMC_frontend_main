# Header Dropdown Component Documentation

## Table of Contents
1. [Overview](#overview)
2. [Component Architecture](#component-architecture)
3. [Input Properties](#input-properties)
4. [Output Events](#output-events)
5. [Template Structure](#template-structure)
6. [Styling & Glassmorphism](#styling--glassmorphism)
7. [State Management](#state-management)
8. [Language Support](#language-support)
9. [Technical Implementation](#technical-implementation)
10. [Testing & Usage](#testing--usage)
11. [Performance & Optimization](#performance--optimization)

---

## 1. Overview

The **Header Dropdown Component** (`header-dropdown.component.ts`) is a reusable, standalone Angular component that provides consistent dropdown functionality across the application. It's specifically designed for mobile headers but can be used in any context requiring dropdown menus with glassmorphism styling.

### Key Features
- ✅ **Reusable Component**: Can be used across different header layouts
- ✅ **Glassmorphism Styling**: Modern visual design with backdrop blur
- ✅ **Language Support**: English and Arabic content support
- ✅ **Click-Away Detection**: Automatically closes when clicking outside
- ✅ **State Synchronization**: Integrates with HeaderStateService
- ✅ **Responsive Design**: Adapts to different screen sizes
- ✅ **Accessibility**: ARIA labels and keyboard navigation support

---

## 2. Component Architecture

### 2.1 File Location
```
src/app/features/home/home/navigation/header-strip/components/header-dropdown/header-dropdown.component.ts
```

### 2.2 Component Class
```typescript
@Component({
  selector: 'dmc-header-dropdown',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `...`,
  styles: [`...`]
})
export class HeaderDropdownComponent implements OnInit, OnDestroy {
  // Component implementation
}
```

### 2.3 Component Dependencies
```typescript
// Required services
constructor(
  private headerState: HeaderStateService,
  private renderer: Renderer2,
  private elementRef: ElementRef
) {}
```

---

## 3. Input Properties

### 3.1 Content Input
```typescript
@Input() content!: DropdownContent;

// DropdownContent interface
interface DropdownContent {
  id: string;
  title: {
    en: string;
    ar: string;
  };
  items: DropdownItem[];
}
```

### 3.2 Language Input
```typescript
@Input() currentLang: 'en' | 'ar' = 'en';

// Used for:
// - Displaying content in correct language
// - RTL layout support for Arabic
// - Dynamic text updates
```

### 3.3 Menu Configuration
```typescript
@Input() menuId!: string;           // Unique identifier for the dropdown
@Input() triggerIcon!: string;      // Material icon name for the trigger button
@Input() disabled: boolean = false; // Whether the dropdown is disabled
```

### 3.4 Styling Inputs
```typescript
@Input() customClass?: string;      // Additional CSS classes
@Input() position: 'bottom' | 'top' = 'bottom'; // Dropdown position
@Input() width?: string;            // Custom width (default: 220px)
```

---

## 4. Output Events

### 4.1 Item Selection Event
```typescript
@Output() itemSelected = new EventEmitter<DropdownItem>();

// Emitted when user selects an item from dropdown
// Parent component can handle navigation, actions, etc.
```

### 4.2 Dropdown State Events
```typescript
@Output() dropdownOpened = new EventEmitter<string>();   // Emitted when dropdown opens
@Output() dropdownClosed = new EventEmitter<string>();   // Emitted when dropdown closes
@Output() dropdownToggled = new EventEmitter<boolean>(); // Emitted when dropdown toggles
```

### 4.3 Event Usage Example
```typescript
<dmc-header-dropdown 
  [content]="dropdownContent"
  [currentLang]="currentLang"
  menuId="info"
  triggerIcon="info"
  (itemSelected)="onItemSelected($event)"
  (dropdownOpened)="onDropdownOpened($event)"
  (dropdownClosed)="onDropdownClosed($event)">
</dmc-header-dropdown>
```

---

## 5. Template Structure

### 5.1 Main Template
```html
<div class="header-dropdown" [ngClass]="getDropdownClasses()">
  <!-- Trigger Button -->
  <button 
    class="trigger-button"
    [class.active]="isOpen"
    [disabled]="disabled"
    (click)="toggleDropdown()"
    [attr.aria-expanded]="isOpen"
    [attr.aria-haspopup]="true"
    [attr.aria-label]="getAriaLabel()">
    
    <mat-icon [class]="getIconClass()">{{ triggerIcon }}</mat-icon>
  </button>
  
  <!-- Dropdown Menu -->
  <div 
    class="dropdown-menu"
    *ngIf="isOpen"
    [@dropdownAnimation]="isOpen ? 'open' : 'closed'"
    role="menu"
    [attr.aria-label]="getMenuAriaLabel()">
    
    <!-- Dropdown Header -->
    <div class="dropdown-header">
      <h3>{{ getDropdownTitle() }}</h3>
    </div>
    
    <!-- Dropdown Items -->
    <div class="dropdown-items">
      <button 
        *ngFor="let item of content.items; trackBy: trackByItem"
        class="dropdown-item"
        [class.disabled]="item.disabled"
        [disabled]="item.disabled"
        (click)="onItemClick(item)"
        role="menuitem"
        [attr.aria-label]="getItemAriaLabel(item)">
        
        <mat-icon *ngIf="item.icon" class="item-icon">{{ item.icon }}</mat-icon>
        <span class="item-label">{{ getItemLabel(item) }}</span>
      </button>
    </div>
  </div>
</div>
```

### 5.2 Conditional Rendering
```html
<!-- Show dropdown only when open -->
<div class="dropdown-menu" *ngIf="isOpen">

<!-- Show icon only if provided -->
<mat-icon *ngIf="item.icon" class="item-icon">{{ item.icon }}</mat-icon>

<!-- Disable item if specified -->
<button [class.disabled]="item.disabled" [disabled]="item.disabled">
```

---

## 6. Styling & Glassmorphism

### 6.1 Component Styling
```scss
.header-dropdown {
  position: relative;
  display: inline-block;
  z-index: 1000;
}
```

### 6.2 Trigger Button Styling
```scss
.trigger-button {
  /* Base button styles */
  width: var(--button-size, 40px);
  height: var(--button-size, 40px);
  border: none;
  border-radius: 50%;
  background: var(--primary-color, #001B3F);
  color: var(--secondary-color, #D7E3FF);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Hover effects */
  &:hover:not(:disabled) {
    background: var(--secondary-color, #D7E3FF);
    color: var(--primary-color, #001B3F);
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(215, 227, 255, 0.3);
  }
  
  /* Active state */
  &:active:not(:disabled) {
    transform: scale(0.95);
  }
  
  /* Disabled state */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  /* Active/open state */
  &.active {
    background: var(--secondary-color, #D7E3FF);
    color: var(--primary-color, #001B3F);
    box-shadow: 0 0 20px rgba(215, 227, 255, 0.5);
  }
}
```

### 6.3 Dropdown Menu Styling
```scss
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: var(--dropdown-width, 220px);
  z-index: 150000;
  margin-top: 8px;
  overflow: hidden;
  border-radius: 16px;
  
  /* Enhanced Glassmorphism */
  background: linear-gradient(
    to bottom,
    rgba(215, 227, 255, 0.45),
    rgba(215, 227, 255, 0.35)
  );
  backdrop-filter: blur(12px) saturate(180%);
  border: 1px solid rgba(215, 227, 255, 0.35);
  box-shadow: 
    0 8px 32px 0 rgba(0, 27, 63, 0.15),
    0 2px 8px 0 rgba(0, 27, 63, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}
```

### 6.4 Dropdown Header Styling
```scss
.dropdown-header {
  background: rgba(0, 27, 63, 0.15);
  padding: 0.5rem 0.75rem;
  border-bottom: 1px solid rgba(215, 227, 255, 0.45);
  backdrop-filter: blur(6px);
  
  h3 {
    margin: 0;
    color: #001B3F !important;
    font-size: 0.85rem;
    font-weight: 600;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
}
```

### 6.5 Dropdown Items Styling
```scss
.dropdown-items {
  padding: 0.5rem 0;
}

.dropdown-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  background: transparent;
  color: #001B3F;
  cursor: pointer;
  transition: all 0.2s ease;
  
  /* Hover effects */
  &:hover:not(:disabled) {
    background: rgba(0, 27, 63, 0.1);
    color: #001B3F;
  }
  
  /* Active state */
  &:active:not(:disabled) {
    background: rgba(0, 27, 63, 0.15);
    transform: translateX(4px);
  }
  
  /* Disabled state */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    color: #666;
  }
  
  /* Icon styling */
  .item-icon {
    margin-right: 0.75rem;
    font-size: 18px;
    width: 18px;
    height: 18px;
    color: #001B3F;
  }
  
  /* Label styling */
  .item-label {
    flex: 1;
    font-size: 0.9rem;
    font-weight: 500;
    text-align: left;
  }
}
```

---

## 7. State Management

### 7.1 Internal State
```typescript
export class HeaderDropdownComponent {
  isOpen = false;                    // Current dropdown state
  private clickListener?: () => void; // Click-away listener
  private subscription = new Subscription(); // Service subscriptions
}
```

### 7.2 Header State Service Integration
```typescript
ngOnInit(): void {
  // Subscribe to header state changes
  this.subscription.add(
    this.headerState.activeMenu$.subscribe(activeMenu => {
      // Close dropdown if another menu is opened
      if (activeMenu !== this.menuId) {
        this.closeDropdown();
      }
    })
  );
}
```

### 7.3 State Synchronization
```typescript
private openDropdown(): void {
  this.isOpen = true;
  this.headerState.openMenu(this.menuId);
  this.setupClickAwayListener();
  this.dropdownOpened.emit(this.menuId);
  this.dropdownToggled.emit(true);
}

private closeDropdown(): void {
  this.isOpen = false;
  this.headerState.closeMenu();
  this.removeClickAwayListener();
  this.dropdownClosed.emit(this.menuId);
  this.dropdownToggled.emit(false);
}
```

---

## 8. Language Support

### 8.1 Content Localization
```typescript
getDropdownTitle(): string {
  return this.content?.title?.[this.currentLang] || this.content?.id || 'Dropdown';
}

getItemLabel(item: DropdownItem): string {
  return item.label?.[this.currentLang] || item.label?.en || item.id || 'Item';
}
```

### 8.2 RTL Support
```scss
/* RTL layout support */
.header-dropdown[dir="rtl"] {
  .dropdown-menu {
    left: auto;
    right: 50%;
    transform: translateX(50%);
  }
  
  .dropdown-item {
    .item-icon {
      margin-right: 0;
      margin-left: 0.75rem;
    }
    
    &:active:not(:disabled) {
      transform: translateX(-4px);
    }
  }
}
```

### 8.3 Language-Specific Styling
```scss
/* Arabic-specific adjustments */
.header-dropdown[lang="ar"] {
  .dropdown-header h3 {
    font-family: 'Noto Sans Arabic', sans-serif;
  }
  
  .dropdown-item .item-label {
    font-family: 'Noto Sans Arabic', sans-serif;
  }
}
```

---

## 9. Technical Implementation

### 9.1 Component Lifecycle
```typescript
export class HeaderDropdownComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    this.setupStateSubscription();
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.removeClickAwayListener();
  }
}
```

### 9.2 Click-Away Detection
```typescript
private setupClickAwayListener(): void {
  this.clickListener = (event: Event) => {
    const target = event.target as HTMLElement;
    if (!this.elementRef.nativeElement.contains(target)) {
      this.closeDropdown();
    }
  };
  
  // Use renderer for better performance
  this.renderer.listen('document', 'click', this.clickListener);
}

private removeClickAwayListener(): void {
  if (this.clickListener) {
    this.renderer.destroy();
    this.clickListener = undefined;
  }
}
```

### 9.3 Dropdown Toggle Logic
```typescript
toggleDropdown(): void {
  if (this.disabled) return;
  
  if (this.isOpen) {
    this.closeDropdown();
  } else {
    // Close any other open dropdowns first
    if (this.headerState.activeMenuSubject.value) {
      this.headerState.closeMenu();
    }
    this.openDropdown();
  }
}
```

### 9.4 Item Click Handling
```typescript
onItemClick(item: DropdownItem): void {
  if (item.disabled) return;
  
  // Emit selection event
  this.itemSelected.emit(item);
  
  // Close dropdown after selection
  this.closeDropdown();
  
  // Handle item actions
  if (item.action) {
    this.handleItemAction(item.action);
  }
  
  if (item.url) {
    this.navigateToUrl(item.url);
  }
}
```

---

## 10. Testing & Usage

### 10.1 Manual Testing Checklist
- [ ] **Dropdown Opening**: Click trigger button opens dropdown
- [ ] **Dropdown Closing**: Click-away closes dropdown
- [ ] **Item Selection**: Clicking items emits events
- [ ] **State Synchronization**: Integrates with HeaderStateService
- [ ] **Language Switching**: Content updates with language changes
- [ ] **RTL Support**: Arabic layout works correctly
- [ ] **Accessibility**: ARIA labels and keyboard navigation
- [ ] **Responsive Design**: Works on different screen sizes

### 10.2 Component Testing
```bash
# Run HeaderDropdownComponent tests
ng test --include="**/header-dropdown.component.spec.ts"
```

### 10.3 Usage Examples
```typescript
// Basic usage
<dmc-header-dropdown 
  [content]="dropdownContent"
  [currentLang]="currentLang"
  menuId="info"
  triggerIcon="info">
</dmc-header-dropdown>

// With custom styling
<dmc-header-dropdown 
  [content]="dropdownContent"
  [currentLang]="currentLang"
  menuId="custom"
  triggerIcon="settings"
  customClass="custom-dropdown"
  position="top"
  width="300px">
</dmc-header-dropdown>

// With event handling
<dmc-header-dropdown 
  [content]="dropdownContent"
  [currentLang]="currentLang"
  menuId="actions"
  triggerIcon="more_vert"
  (itemSelected)="onItemSelected($event)"
  (dropdownOpened)="onDropdownOpened($event)">
</dmc-header-dropdown>
```

---

## 11. Performance & Optimization

### 11.1 Change Detection
```typescript
// Use OnPush strategy for better performance
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ... other properties
})
```

### 11.2 Event Optimization
```typescript
// Debounce rapid click events
private debounceTime = 300;
private lastClickTime = 0;

toggleDropdown(): void {
  const now = Date.now();
  if (now - this.lastClickTime < this.debounceTime) {
    return;
  }
  this.lastClickTime = now;
  
  // ... toggle logic
}
```

### 11.3 Memory Management
```typescript
ngOnDestroy(): void {
  // Clean up subscriptions
  this.subscription.unsubscribe();
  
  // Remove event listeners
  this.removeClickAwayListener();
  
  // Clear references
  this.clickListener = undefined;
}
```

---

## 📋 Implementation Status

### ✅ Completed Features
- **Reusable Component**: Standalone Angular component
- **Glassmorphism Styling**: Modern visual design
- **Language Support**: English and Arabic content
- **Click-Away Detection**: Automatic dropdown closing
- **State Synchronization**: HeaderStateService integration
- **Accessibility**: ARIA labels and keyboard support
- **Responsive Design**: Adapts to different screen sizes

### 🔄 In Progress
- **Performance Optimization**: Change detection improvements
- **Animation Enhancements**: Smooth transitions

### 📋 Planned
- **Virtual Scrolling**: For large dropdown lists
- **Search Functionality**: Quick item search
- **Custom Themes**: Multiple visual themes

---

## 📚 Related Documentation

- **[Header Strip Implementation](./Header_Strip_Implementation.md)**
- **[Mobile Header Implementation](./Mobile_Header_Implementation.md)**
- **[Tablet Header Implementation](./Tablet_Header_Implementation.md)**
- **[Desktop Header Implementation](./Desktop_Header_Implementation.md)**
- **[Floating Menu Implementation](../Floating_Menu/Floating_Menu_Implementation.md)**

---

**📝 Document Information:**
- **Last Updated**: March 24, 2025
- **Current Version**: v1.0.0
- **Document Status**: ✅ **ACTIVE & COMPLETE**
- **Implementation Status**: **Phase 1 Complete** - Ready for Phase 2

*Header Dropdown Component documentation created successfully! All reusable component features and technical implementation details accurately documented.*
