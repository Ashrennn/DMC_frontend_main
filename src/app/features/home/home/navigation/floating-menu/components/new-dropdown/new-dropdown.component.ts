import { Component, Input, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'dmc-new-dropdown',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MatIconModule],
  template: `
    <div class="dropdown-container" [class.rtl]="isRTL" [attr.data-position]="position">
      <div class="dropdown-content">
        <ng-container *ngFor="let item of menuItems; let i = index">
          <div 
            class="dropdown-item" 
            (click)="onItemClick(item)"
            [class.disabled]="item.disabled">
            <mat-icon class="dropdown-icon">{{item.icon}}</mat-icon>
            <span class="dropdown-text">{{item.label}}</span>
          </div>
          <mat-divider 
            class="dropdown-divider" 
            *ngIf="i < menuItems.length - 1">
          </mat-divider>
        </ng-container>
        
        <!-- Stepper Item (only show if stepperMenuItems exist) -->
        <ng-container *ngIf="stepperMenuItems && stepperMenuItems.length > 0">
          <mat-divider class="dropdown-divider"></mat-divider>
          <div 
            class="dropdown-item stepper-item" 
            (click)="toggleStepper()"
            (mouseenter)="onStepperHover()"
            (mouseleave)="onStepperLeave()">
            <mat-icon class="dropdown-icon">sort</mat-icon>
            <span class="dropdown-text">{{stepperTitle}}</span>
            <mat-icon class="stepper-arrow">{{stepperArrowIcon}}</mat-icon>
          </div>
        </ng-container>
      </div>

      <!-- Stepper Side Panel - Positioned based on LTR/RTL -->
      <div class="stepper-panel" 
           *ngIf="isStepperOpen && stepperMenuItems && stepperMenuItems.length > 0"
           [class.stepper-left]="stepperPosition === 'left'"
           [class.stepper-right]="stepperPosition === 'right'"
           (mouseenter)="onStepperHover()"
           (mouseleave)="onStepperLeave()">
        <div class="stepper-header">
          <span class="stepper-title">{{stepperTitle}}</span>
        </div>
        <div class="stepper-content">
          <ng-container *ngFor="let item of stepperMenuItems; let i = index">
            <div 
              class="stepper-item" 
              (click)="onItemClick(item)"
              [class.disabled]="item.disabled"
            >
              <mat-icon class="stepper-icon">{{item.icon}}</mat-icon>
              <span class="stepper-text">{{item.label}}</span>
            </div>
            <mat-divider 
              class="stepper-divider" 
              *ngIf="i < stepperMenuItems.length - 1"
            ></mat-divider>
          </ng-container>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Base Dropdown Container */
    .dropdown-container {
      position: absolute;
      z-index: 1002;
      margin-top: 30px;
      min-width: 200px;
      /* Ensure proper positioning context */
      left: 0;
      right: auto;
    }

    /* Dropdown Content */
    .dropdown-content {
      background: rgba(215, 227, 255, 0.9);
      backdrop-filter: blur(20px);
      border-radius: 18px;
      box-shadow: 
        0 8px 32px rgba(0, 27, 63, 0.15),
        0 2px 8px rgba(255, 255, 255, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
      padding: 8px 0;
      min-width: 200px;
      border: 1px solid rgba(255, 255, 255, 0.25);
      animation: dropdownSlideIn 0.3s ease-out;
      position: relative;
    }

    /* Dropdown Items */
    .dropdown-item {
      padding: 8px 16px;
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 14px;
      color: #001B3F;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 2px 6px;
      border-radius: 8px;
      position: relative;
      overflow: hidden;
    }

    .dropdown-item::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
      transition: left 0.5s ease;
    }

    .dropdown-item:hover::before {
      left: 100%;
    }

    .dropdown-item.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    /* Icons */
    .dropdown-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
      color: #001B3F;
      opacity: 0.8;
      transition: all 0.2s ease;
    }

    .dropdown-item:hover .dropdown-icon {
      opacity: 1;
      transform: scale(1.1);
    }

    /* Text */
    .dropdown-text {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 500;
      letter-spacing: 0.2px;
    }

    /* Stepper Arrow */
    .stepper-arrow {
      font-size: 18px;
      color: #001B3F;
      opacity: 0.6;
      transition: all 0.2s ease;
    }

    .stepper-item:hover .stepper-arrow {
      opacity: 1;
      transform: translateX(2px);
    }

    /* Divider */
    .dropdown-divider {
      margin: 8px 18px !important;
      height: 1px !important;
      background: linear-gradient(
        to right,
        transparent 0%,
        rgba(0, 27, 63, 0.08) 20%,
        rgba(0, 27, 63, 0.25) 50%,
        rgba(0, 27, 63, 0.08) 80%,
        transparent 100%
      ) !important;
      border: none !important;
      opacity: 1 !important;
      min-height: 1px !important;
      max-height: 1px !important;
      flex-shrink: 0 !important;
      flex-grow: 0 !important;
    }

    /* RTL Support */
    :dir(rtl) .dropdown-divider {
      background: linear-gradient(
        to left,
        transparent 0%,
        rgba(0, 27, 63, 0.08) 20%,
        rgba(0, 27, 63, 0.25) 50%,
        rgba(0, 27, 63, 0.08) 80%,
        transparent 100%
      ) !important;
    }

    /* Animation */
    @keyframes dropdownSlideIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Stepper Panel - Positioned based on LTR/RTL */
    .stepper-panel {
      position: absolute;
      top: 50%;
      background: rgba(215, 227, 255, 0.95);
      backdrop-filter: blur(20px);
      border-radius: 18px;
      box-shadow: 
        0 8px 32px rgba(0, 27, 63, 0.2),
        0 2px 8px rgba(255, 255, 255, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.25);
      min-width: 220px;
      animation: stepperSlideIn 0.3s ease-out;
      z-index: 1003;
    }

    /* LTR Mode: Stepper opens to the right side for left buttons, left side for right buttons */
    .stepper-panel.stepper-right {
      left: 100%;
      margin-left: 10px;
    }

    /* RTL Mode: Stepper opens to the left side for left buttons, right side for right buttons */
    .stepper-panel.stepper-left {
      right: 100%;
      margin-right: 10px;
    }

    /* Special case: Right-positioned buttons should open stepper to the left in LTR, right in RTL */
    .dropdown-container[data-position="right"] .stepper-panel.stepper-right {
      left: auto;
      right: 100%;
      margin-left: 0;
      margin-right: 10px;
    }

    /* RTL: Right-positioned buttons open stepper to the right side */
    .dropdown-container.rtl[data-position="right"] .stepper-panel.stepper-right {
      left: 100%;
      right: auto;
      margin-left: 10px;
      margin-right: 0;
    }

    /* Stepper Header */
    .stepper-header {
      padding: 16px 18px 12px;
      border-bottom: 1px solid rgba(0, 27, 63, 0.1);
    }

    .stepper-title {
      font-size: 16px;
      font-weight: 600;
      color: #001B3F;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
    }

    /* Stepper Content */
    .stepper-content {
      padding: 8px 0;
    }

    .stepper-content .stepper-item {
      padding: 8px 16px;
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 14px;
      color: #001B3F;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 2px 6px;
      border-radius: 8px;
      position: relative;
      overflow: hidden;
    }

    .stepper-content .stepper-item:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .stepper-content .stepper-item.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .stepper-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
      color: #001B3F;
      opacity: 0.8;
      transition: all 0.2s ease;
    }

    .stepper-content .stepper-item:hover .stepper-icon {
      opacity: 1;
      transform: scale(1.1);
    }

    .stepper-content .stepper-item:hover .stepper-text {
      /* No transform - text stays the same size */
    }

    .stepper-text {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 500;
      letter-spacing: 0.2px;
    }

    .stepper-divider {
      margin: 8px 18px !important;
      height: 1px !important;
      background: linear-gradient(
        to right,
        transparent 0%,
        rgba(0, 27, 63, 0.08) 20%,
        rgba(0, 27, 63, 0.25) 50%,
        rgba(0, 27, 63, 0.08) 80%,
        transparent 100%
      ) !important;
      border: none !important;
      opacity: 1 !important;
      min-height: 1px !important;
      max-height: 1px !important;
      flex-shrink: 0 !important;
      flex-grow: 0 !important;
    }

    /* RTL Stepper Divider */
    .dropdown-container.rtl .stepper-divider {
      background: linear-gradient(
        to left,
        transparent 0%,
        rgba(0, 27, 63, 0.08) 20%,
        rgba(0, 27, 63, 0.25) 50%,
        rgba(0, 27, 63, 0.08) 80%,
        transparent 100%
      ) !important;
    }

    @keyframes stepperSlideIn {
      from {
        opacity: 0;
        transform: translateX(-10px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    /* RTL Animation */
    .dropdown-container.rtl .stepper-panel.stepper-left {
      animation: stepperSlideInRTL 0.3s ease-out;
    }

    @keyframes stepperSlideInRTL {
      from {
        opacity: 0;
        transform: translateX(10px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
  `]
})
export class NewDropdownComponent implements OnInit, OnDestroy {
  @Input() menuItems: any[] = [];
  @Input() stepperMenuItems: any[] = [];
  @Input() stepperTitle: string = '';
  @Input() isRTL: boolean = false;
  @Input() position: 'left' | 'right' | 'center' = 'center';
  @Input() buttonId: string = '';

  isStepperOpen = false;
  private stepperTimer: any;

  constructor(private elementRef: ElementRef, private router: Router) {}

  ngOnInit() {
    // Initialize dropdown position based on buttonId
    this.updatePosition();
    

  }

  ngOnDestroy() {}

  @HostListener('window:resize')
  onWindowResize() {
    this.updatePosition();
  }

  private updatePosition() {
    const dropdown = this.elementRef.nativeElement.querySelector('.dropdown-container');
    if (!dropdown) return;

    // Get the button element to position relative to it
    const button = document.getElementById(this.buttonId);
    if (!button) return;

    const buttonRect = button.getBoundingClientRect();
    
    // Reset any existing positioning
    dropdown.style.left = 'auto';
    dropdown.style.right = 'auto';
    dropdown.style.top = 'auto';
    dropdown.style.bottom = 'auto';
    dropdown.style.transform = 'none';



    // Position based on button position
    if (this.position === 'left') {
      if (this.isRTL) {
        // RTL: Position at bottom right, but further right to avoid logo
        dropdown.style.left = 'auto';
        dropdown.style.right = '-50px';
      } else {
        // LTR: Position at bottom left, but further left to avoid logo
        dropdown.style.left = '-50px';
        dropdown.style.right = 'auto';
      }
    } else if (this.position === 'right') {
      if (this.isRTL) {
        // RTL: Position at bottom left
        dropdown.style.left = 'auto';
        dropdown.style.right = '0';
      } else {
        // LTR: Position at bottom right
        dropdown.style.left = '0';
        dropdown.style.right = 'auto';
      }
    } else {
      // Center position
      dropdown.style.left = '50%';
      dropdown.style.transform = 'translateX(-50%)';
    }

    // Ensure dropdown is visible within viewport
    this.ensureDropdownVisibility(dropdown, buttonRect);
  }

  private ensureDropdownVisibility(dropdown: HTMLElement, buttonRect: DOMRect) {
    const dropdownRect = dropdown.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Check horizontal overflow
    if (dropdownRect.right > viewportWidth) {
      dropdown.style.left = 'auto';
      dropdown.style.right = '0';
    } else if (dropdownRect.left < 0) {
      dropdown.style.left = '0';
      dropdown.style.right = 'auto';
    }

    // Check vertical overflow
    if (dropdownRect.bottom > viewportHeight) {
      dropdown.style.top = 'auto';
      dropdown.style.bottom = '100%';
    }
  }

  onItemClick(item: any) {
    if (item.disabled) return;
    
    if (item.url) {
      this.router.navigate([item.url]);
    } else if (item.action) {
      item.action();
    }
  }

  toggleStepper() {
    this.isStepperOpen = !this.isStepperOpen;
  }

  onStepperHover() {
    // Keep stepper open while hovering
    if (this.stepperTimer) {
      clearTimeout(this.stepperTimer);
    }
  }

  onStepperLeave() {
    // Auto-close stepper after delay
    this.stepperTimer = setTimeout(() => {
      this.isStepperOpen = false;
    }, 2000);
  }

  // Calculate stepper position based on LTR/RTL and button position
  get stepperPosition(): 'left' | 'right' {
    if (this.position === 'right') {
      // Right-positioned buttons: opposite direction based on language
      if (this.isRTL) {
        // RTL: Right buttons open stepper to the right
        return 'right';
      } else {
        // LTR: Right buttons open stepper to the left
        return 'left';
      }
    } else {
      // Left-positioned buttons: same direction based on language
      if (this.isRTL) {
        // RTL: Left buttons open stepper to the left
        return 'left';
      } else {
        // LTR: Left buttons open stepper to the right
        return 'right';
      }
    }
  }

  // Get stepper arrow icon based on state and direction
  get stepperArrowIcon(): string {
    if (!this.isStepperOpen) {
      // Default state: point towards text
      return 'expand_more';
    } else {
      // When open: point towards stepper menu direction
      if (this.position === 'right') {
        // Right-positioned buttons
        if (this.isRTL) {
          // RTL: stepper opens to the right, so arrow points right
          return 'chevron_right';
        } else {
          // LTR: stepper opens to the left, so arrow points left
          return 'chevron_left';
        }
      } else {
        // Left-positioned buttons
        if (this.isRTL) {
          // RTL: stepper opens to the left, so arrow points left
          return 'chevron_left';
        } else {
          // LTR: stepper opens to the right, so arrow points right
          return 'chevron_right';
        }
      }
    }
  }
}
