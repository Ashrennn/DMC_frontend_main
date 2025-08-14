import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { FloatingSubMenuItem } from '../../content/language-content/floating-menu-content';

@Component({
  selector: 'dmc-stepper-dropdown',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MatIconModule],
  template: `
    <div class="stepper-dropdown" 
         [class.rtl]="isRTL" 
         [class.left-side]="position === 'left'" 
         [class.right-side]="position === 'right'" 
         [class.left-btn-1]="buttonId === 'left-btn-1'" 
         [class.left-btn-2]="buttonId === 'left-btn-2'" 
         [class.right-btn-1]="buttonId === 'right-btn-1'" 
         [class.right-btn-2]="buttonId === 'right-btn-2'">
      
      <!-- Main Dropdown Content -->
      <div class="dropdown-content main-content">
                 <ng-container *ngFor="let item of mainMenuItems; let i = index">
           <div 
             class="dropdown-item" 
             (click)="onItemClick(item)"
             [class.disabled]="item.disabled"
           >
             <mat-icon class="dropdown-icon">{{item.icon}}</mat-icon>
             <span class="dropdown-text">{{item.label}}</span>
           </div>
           <mat-divider 
             class="dropdown-divider" 
             *ngIf="i < mainMenuItems.length - 1"
           ></mat-divider>
         </ng-container>
         
         <!-- Divider between main menu and stepper item -->
         <mat-divider 
           class="dropdown-divider" 
           *ngIf="mainMenuItems.length > 0"
         ></mat-divider>
         
         <!-- Stepper Arrow Item -->
         <div class="dropdown-item stepper-item" 
              (click)="toggleStepper()"
              (mouseenter)="onStepperHover()"
              (mouseleave)="onStepperLeave()">
           <mat-icon class="dropdown-icon">{{stepperIcon}}</mat-icon>
           <span class="dropdown-text">{{stepperTitle}}</span>
           <mat-icon class="stepper-arrow">{{stepperArrowIcon}}</mat-icon>
         </div>
      </div>

      <!-- Stepper Side Panel -->
      <div class="stepper-panel" 
           *ngIf="isStepperOpen"
           (mouseenter)="onStepperHover()"
           (mouseleave)="onStepperLeave()">
        <div class="stepper-header">
          <span class="stepper-title">{{stepperTitle}}</span>
        </div>
        <div class="stepper-content">
          <ng-container *ngFor="let item of stepperMenuItems; let i = index">
            <div 
              class="stepper-item" 
              (click)="onStepperItemClick(item)"
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
    .stepper-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      z-index: 1002;
      margin-top: 5px;
    }

    /* Button-specific positioning to avoid logo overlap */
    .stepper-dropdown.left-btn-1 {
      left: 0 !important;
      right: auto !important;
      transform: none !important;
      width: auto !important;
      min-width: 180px;
    }

    .stepper-dropdown.left-btn-2 {
      left: auto !important;
      right: 0 !important;
      transform: none !important;
      width: auto !important;
      min-width: 180px;
    }

    .stepper-dropdown.right-btn-1 {
      left: 0 !important;
      right: auto !important;
      transform: none !important;
      width: auto !important;
      min-width: 180px;
    }

    .stepper-dropdown.right-btn-2 {
      left: auto !important;
      right: 0 !important;
      transform: none !important;
      width: auto !important;
      min-width: 180px;
    }

    /* RTL positioning - maintain logical positions regardless of language */
    .stepper-dropdown.rtl.left-btn-1 {
      left: 0 !important;
      right: auto !important;
    }

    .stepper-dropdown.rtl.left-btn-2 {
      left: auto !important;
      right: 0 !important;
    }

    .stepper-dropdown.rtl.right-btn-1 {
      left: 0 !important;
      right: auto !important;
    }

    .stepper-dropdown.rtl.right-btn-2 {
      left: auto !important;
      right: 0 !important;
    }

    /* Enhanced Glass Morphism Main Dropdown Content */
    .dropdown-content.main-content {
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

    /* Enhanced Dropdown Items - Uniform with Common Dropdown */
    .dropdown-item {
      padding: 12px 18px;
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 14px;
      color: #001B3F;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 2px 8px;
      border-radius: 10px;
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

    /* Enhanced Icons - Uniform with Common Dropdown */
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

    /* Enhanced Text - Uniform with Common Dropdown */
    .dropdown-text {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 500;
      letter-spacing: 0.2px;
    }

    /* Stepper Item Styling */
    .stepper-item {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .stepper-arrow {
      font-size: 16px;
      width: 16px;
      height: 16px;
      color: #001B3F;
      opacity: 0.6;
      transition: transform 0.3s ease;
    }

    .stepper-item:hover .stepper-arrow {
      transform: rotate(90deg);
    }

    /* Enhanced Glass Morphism Stepper Side Panel - Uniform with Main Dropdown */
    .stepper-panel {
      position: absolute;
      top: 50%;
      left: 100%;
      margin-left: 8px;
      background: rgba(215, 227, 255, 0.9);
      backdrop-filter: blur(20px);
      border-radius: 18px;
      box-shadow: 
        0 8px 32px rgba(0, 27, 63, 0.15),
        0 2px 8px rgba(255, 255, 255, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.25);
      min-width: 200px;
      animation: stepperSlideInRight 0.3s ease-out;
      z-index: 1003;
    }

    /* Right side buttons: stepper opens to the left */
    .stepper-dropdown.right-btn-1 .stepper-panel,
    .stepper-dropdown.right-btn-2 .stepper-panel {
      left: auto;
      right: 100%;
      margin-left: 0;
      margin-right: 8px;
      animation: stepperSlideInLeft 0.3s ease-out;
    }

    /* Enhanced Stepper Header - Uniform with Main Dropdown */
    .stepper-header {
      padding: 14px 18px 10px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 18px 18px 0 0;
      position: relative;
    }

    /* Header divider - exactly the same as other dividers for consistency */
    .stepper-header::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(
        to right,
        transparent 0%,
        rgba(0, 27, 63, 0.08) 20%,
        rgba(0, 27, 63, 0.25) 50%,
        rgba(0, 27, 63, 0.08) 80%,
        transparent 100%
      );
      border-radius: 0 0 18px 18px;
    }

    .stepper-title {
      font-size: 16px;
      font-weight: 600;
      color: #001B3F;
      letter-spacing: 0.3px;
    }

    .stepper-content {
      padding: 8px 0;
    }

    /* Enhanced Stepper Items - Uniform with Main Dropdown Items */
    .stepper-item {
      padding: 12px 18px;
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 14px;
      color: #001B3F;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 2px 8px;
      border-radius: 10px;
      position: relative;
      overflow: hidden;
    }

    .stepper-item::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
      transition: left 0.5s ease;
    }

    .stepper-item:hover::before {
      left: 100%;
    }

    .stepper-item:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    /* Enhanced Stepper Icons - Uniform with Main Dropdown Icons */
    .stepper-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
      color: #001B3F;
      opacity: 0.8;
      transition: all 0.2s ease;
    }

    .stepper-item:hover .stepper-icon {
      opacity: 1;
      transform: scale(1.1);
    }

    /* Enhanced Stepper Text - Uniform with Main Dropdown Text */
    .stepper-text {
      flex: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 500;
      letter-spacing: 0.2px;
    }

    /* Enhanced Divider Styling - Uniform with Common Dropdown */
    .dropdown-divider,
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

    /* Override Material Design default styles */
    ::ng-deep .dropdown-divider.mat-divider,
    ::ng-deep .stepper-divider.mat-divider {
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

    /* Animations */
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

    @keyframes stepperSlideInRight {
      from {
        opacity: 0;
        transform: translateX(-10px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes stepperSlideInLeft {
      from {
        opacity: 0;
        transform: translateX(10px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    /* RTL Support */
    .stepper-dropdown.rtl {
      .dropdown-item,
      .stepper-item {
        flex-direction: row-reverse;
        text-align: right;
      }

      .stepper-panel {
        top: 50%;
        left: auto;
        right: 100%;
        margin-left: 0;
        margin-right: 8px;
        animation: stepperSlideInLeft 0.3s ease-out;
      }

      /* RTL: Left side buttons now open stepper to the left */
      .stepper-dropdown.left-btn-1 .stepper-panel,
      .stepper-dropdown.left-btn-2 .stepper-panel {
        top: 50%;
        left: auto;
        right: 100%;
        margin-left: 0;
        margin-right: 8px;
        animation: stepperSlideInLeft 0.3s ease-out;
      }

      /* RTL: Right side buttons now open stepper to the right */
      .stepper-dropdown.right-btn-1 .stepper-panel,
      .stepper-dropdown.right-btn-2 .stepper-panel {
        top: 50%;
        left: 100%;
        right: auto;
        margin-left: 8px;
        margin-right: 0;
        animation: stepperSlideInRight 0.3s ease-out;
      }

      .dropdown-divider,
      .stepper-divider {
        margin: 8px 18px !important;
        background: linear-gradient(
          to left,
          transparent 0%,
          rgba(0, 27, 63, 0.08) 20%,
          rgba(0, 27, 63, 0.25) 50%,
          rgba(0, 27, 63, 0.08) 80%,
          transparent 100%
        ) !important;
        height: 1px !important;
        border: none !important;
        opacity: 1 !important;
        min-height: 1px !important;
        max-height: 1px !important;
        flex-shrink: 0 !important;
        flex-grow: 0 !important;
      }

      /* Override Material Design default styles for RTL */
      ::ng-deep .dropdown-divider.mat-divider,
      ::ng-deep .stepper-divider.mat-divider {
        margin: 8px 18px !important;
        background: linear-gradient(
          to left,
          transparent 0%,
          rgba(0, 27, 63, 0.08) 20%,
          rgba(0, 27, 63, 0.25) 50%,
          rgba(0, 27, 63, 0.08) 80%,
          transparent 100%
        ) !important;
        height: 1px !important;
        border: none !important;
        opacity: 1 !important;
        min-height: 1px !important;
        max-height: 1px !important;
        flex-shrink: 0 !important;
        flex-grow: 0 !important;
      }
    }

    /* RTL Font Size Enhancements for Arabic */
    .stepper-dropdown.rtl {
      .dropdown-item,
      .stepper-item {
        font-size: 17px !important;
        font-weight: 600 !important;
      }

      .dropdown-icon,
      .stepper-icon {
        font-size: 22px !important;
        width: 22px !important;
        height: 22px !important;
      }

      .dropdown-text,
      .stepper-text {
        letter-spacing: 0.3px;
      }
    }
  `]
})
export class StepperDropdownComponent implements OnInit, OnDestroy {
  @Input() mainMenuItems: FloatingSubMenuItem[] = [];
  @Input() stepperMenuItems: FloatingSubMenuItem[] = [];
  @Input() stepperTitle: string = '';
  @Input() isRTL: boolean = false;
  @Input() position: 'left' | 'right' | 'center' = 'center';
  @Input() buttonId: string = '';

  isStepperOpen = false;
  private stepperTimer: any;

  ngOnInit() {
    // Component initialization
  }

  ngOnDestroy() {
    if (this.stepperTimer) {
      clearTimeout(this.stepperTimer);
    }
  }

  get stepperIcon(): string {
    // Return appropriate icon based on stepper content
    if (this.stepperTitle.toLowerCase().includes('dmc')) return 'business';
    if (this.stepperTitle.toLowerCase().includes('contact')) return 'phone';
    return 'more_horiz';
  }

  get stepperArrowIcon(): string {
    return this.isStepperOpen ? 'expand_less' : 'expand_more';
  }

  onItemClick(item: FloatingSubMenuItem) {
    if (item.disabled) return;
    
    if (item.action) {
      item.action();
    } else if (item.url) {
      console.log('Navigate to:', item.url);
    }
  }

  onStepperItemClick(item: FloatingSubMenuItem) {
    if (item.disabled) return;
    
    if (item.action) {
      item.action();
    } else if (item.url) {
      console.log('Navigate to stepper item:', item.url);
    }
  }

  toggleStepper() {
    this.isStepperOpen = !this.isStepperOpen;
  }

  onStepperHover() {
    this.isStepperOpen = true;
    if (this.stepperTimer) {
      clearTimeout(this.stepperTimer);
    }
  }

  onStepperLeave() {
    this.stepperTimer = setTimeout(() => {
      this.isStepperOpen = false;
    }, 300);
  }
}
