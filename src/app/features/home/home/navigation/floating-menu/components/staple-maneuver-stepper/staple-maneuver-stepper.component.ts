import { Component, Input, OnInit, OnDestroy, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'dmc-staple-maneuver-stepper',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MatIconModule],
  template: `
    <div class="staple-stepper-dropdown" 
         [class.rtl]="isRTL" 
         [class.left-side]="position === 'left'" 
         [class.right-side]="position === 'right'">
      
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

      <!-- Stepper Side Panel - Positioned based on LTR/RTL -->
      <div class="stepper-panel" 
           *ngIf="isStepperOpen"
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
    .staple-stepper-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      z-index: 1002;
      margin-top: 15px;
      min-width: 200px;
    }

    /* Main Dropdown Content */
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

    .dropdown-item:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateX(4px);
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

    /* RTL Divider Support */
    .staple-stepper-dropdown.rtl .dropdown-divider {
      background: linear-gradient(
        to left,
        transparent 0%,
        rgba(0, 27, 63, 0.08) 20%,
        rgba(0, 27, 63, 0.25) 50%,
        rgba(0, 27, 63, 0.08) 80%,
        transparent 100%
      ) !important;
    }

    /* Stepper Panel - Positioned based on LTR/RTL */
    .stepper-panel {
      position: absolute;
      top: 0;
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

    /* LTR Mode: Stepper opens to the right */
    .stepper-panel.stepper-right {
      left: 100%;
      margin-left: 10px;
    }

    /* RTL Mode: Stepper opens to the left */
    .stepper-panel.stepper-left {
      right: 100%;
      margin-right: 10px;
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
    }

    /* Stepper Content */
    .stepper-content {
      padding: 8px 0;
    }

    .stepper-content .stepper-item {
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

    .stepper-content .stepper-item:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateX(4px);
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
    .staple-stepper-dropdown.rtl .stepper-divider {
      background: linear-gradient(
        to left,
        transparent 0%,
        rgba(0, 27, 63, 0.08) 20%,
        rgba(0, 27, 63, 0.25) 50%,
        rgba(0, 27, 63, 0.08) 80%,
        transparent 100%
      ) !important;
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
    .staple-stepper-dropdown.rtl .stepper-panel.stepper-left {
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
export class StapleManeuverStepperComponent implements OnInit, OnDestroy {
  @Input() mainMenuItems: any[] = [];
  @Input() stepperMenuItems: any[] = [];
  @Input() stepperTitle: string = '';
  @Input() isRTL: boolean = false;
  @Input() position: 'left' | 'right' | 'center' = 'center';
  @Input() buttonId: string = '';

  isStepperOpen = false;
  private stepperTimer: any;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    // Initialize component
    console.log('StapleManeuverStepper initialized:', {
      mainMenuItems: this.mainMenuItems,
      stepperMenuItems: this.stepperMenuItems,
      stepperTitle: this.stepperTitle,
      isRTL: this.isRTL,
      position: this.position,
      buttonId: this.buttonId
    });
  }

  ngOnDestroy() {
    if (this.stepperTimer) {
      clearTimeout(this.stepperTimer);
    }
  }

  get stepperIcon(): string {
    return 'expand_more';
  }

  get stepperArrowIcon(): string {
    return this.isStepperOpen ? 'expand_less' : 'expand_more';
  }

  // Calculate stepper position based on LTR/RTL and button position
  get stepperPosition(): 'left' | 'right' {
    if (this.isRTL) {
      // RTL: Stepper opens to the left
      return 'left';
    } else {
      // LTR: Stepper opens to the right
      return 'right';
    }
  }

  onItemClick(item: any) {
    if (item.disabled) return;
    console.log('Main menu item clicked:', item);
    // Handle main menu item click
  }

  onStepperItemClick(item: any) {
    if (item.disabled) return;
    console.log('Stepper item clicked:', item);
    // Handle stepper item click
  }

  toggleStepper() {
    this.isStepperOpen = !this.isStepperOpen;
    console.log('Stepper toggled:', this.isStepperOpen);
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
}
