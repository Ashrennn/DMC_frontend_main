import { Component, Input, OnInit, OnDestroy, HostListener, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { FloatingMenuContentService } from '../content/floating-menu-content.service';
import { LanguageService } from '../../../../../../shared/services/language.service';
import { AccessibilityLabels } from '../content/language-content/floating-menu-content';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dmc-mobile-floating-menu',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatIconModule],
  template: `
    <div class="mobile-floating-menu" [ngClass]="getBreakpointClass()" role="navigation" [attr.aria-label]="getAccessibilityLabel('mobileFloatingMenu')">
      <div class="floating-menu">
        <button class="hamburger left" (click)="openLeftSidePanel()" [attr.aria-label]="getAccessibilityLabel('openLeftMenu')">☰</button>
        <div class="logo"></div>
        <button class="hamburger right" (click)="openRightSidePanel()" [attr.aria-label]="getAccessibilityLabel('openRightMenu')">☰</button>
      </div>




      
      <!-- Left side panel -->
      <div class="side-panel left-panel" [class.open]="leftSidePanelOpen">
        <div class="menu-header">
          <button class="close" (click)="closeLeftSidePanel()" [attr.aria-label]="getAccessibilityLabel('closeLeftMenu')">✕</button>
          <div class="separator"></div>
        </div>
        <div class="menu-content">
          <mat-accordion multi="false">
            <mat-expansion-panel *ngFor="let item of leftMenuItems" 
                               class="menu-expansion-panel">
              <mat-expansion-panel-header class="menu-panel-header">
                <mat-panel-title class="menu-panel-title">
                  <mat-icon class="icon">{{item.icon}}</mat-icon>
                  <span class="label" [attr.lang]="getCurrentLanguageCode()">{{item.label}}</span>
                </mat-panel-title>
              </mat-expansion-panel-header>
              
              <div class="sub-menu-items">
                <div class="sub-menu-item" *ngFor="let subItem of item.subMenuItems"
                     (click)="selectItem(subItem.id)"
                     [title]="subItem.label[getCurrentLanguageCode()]">
                  <mat-icon class="sub-icon">{{subItem.icon}}</mat-icon>
                  <span class="sub-label" [attr.lang]="getCurrentLanguageCode()">{{subItem.label[getCurrentLanguageCode()]}}</span>
                </div>
              </div>
            </mat-expansion-panel>
          </mat-accordion>
        </div>
      </div>
      
      <!-- Right side panel -->
      <div class="side-panel right-panel" [class.open]="rightSidePanelOpen">
        <div class="menu-header">
          <button class="close" (click)="closeRightSidePanel()" [attr.aria-label]="getAccessibilityLabel('closeRightMenu')">✕</button>
          <div class="separator"></div>
        </div>
        <div class="menu-content">
          <mat-accordion multi="false">
            <mat-expansion-panel *ngFor="let item of rightMenuItems" 
                               class="menu-expansion-panel">
              <mat-expansion-panel-header class="menu-panel-header">
                <mat-panel-title class="menu-panel-title">
                  <mat-icon class="icon">{{item.icon}}</mat-icon>
                  <span class="label" [attr.lang]="getCurrentLanguageCode()">{{item.label}}</span>
                </mat-panel-title>
              </mat-expansion-panel-header>
              
              <div class="sub-menu-items">
                <div class="sub-menu-item" *ngFor="let subItem of item.subMenuItems"
                     (click)="selectItem(subItem.id)"
                     [title]="subItem.label[getCurrentLanguageCode()]">
                  <mat-icon class="sub-icon">{{subItem.icon}}</mat-icon>
                  <span class="sub-label" [attr.lang]="getCurrentLanguageCode()">{{subItem.label[getCurrentLanguageCode()]}}</span>
                </div>
              </div>
            </mat-expansion-panel>
          </mat-accordion>
        </div>
      </div>
      
      <!-- Overlay to close side panels -->
      <div class="side-panel-overlay" *ngIf="leftSidePanelOpen || rightSidePanelOpen" (click)="closeAllSidePanels()"></div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .mobile-floating-menu {
      /* Full-bleed, no padding/margins - consistent with header strip */
      width: 100vw;
      margin: 0;
      padding: 0;
      
      /* Ensure proper stacking context */
      position: relative;
      z-index: 100; /* Reduced to avoid conflicts with side panels */
    }

    .mobile-floating-menu.mobile-large {
      --button-size: 44px;
      --icon-size: 28px;
      --header-height: 68px;
      --floating-width: 75%;
      --floating-max-width: 400px;
      --floating-min-width: 280px;
      --side-panel-width: 60vw;
    }

    .mobile-floating-menu.mobile-large .logo {
      width: 110px;
      height: 110px;
      margin-top: 36px;
    }

    .mobile-floating-menu.mobile-large .menu-header {
      padding-top: 58px;
    }

    .mobile-floating-menu.mobile-large .floating-menu {
      box-shadow: 0 10px 25px rgba(0, 27, 63, 0.22);
    }

    .mobile-floating-menu.mobile-small {
      --button-size: 32px;
      --icon-size: 22px;
      --header-height: 50px;
      --floating-width: 70%;
      --floating-max-width: 320px;
      --floating-min-width: 220px;
      --side-panel-width: 85vw;
    }

    .mobile-floating-menu.mobile-small .floating-menu {
      box-shadow: 0 8px 20px rgba(0, 27, 63, 0.18);
    }

    .floating-menu {
      position: relative;
      width: var(--floating-width, 60%);
      max-width: var(--floating-max-width, 300px);
      min-width: var(--floating-min-width, 210px);
      height: var(--header-height, 60px);
      background: var(--secondary-color, #D7E3FF);
      border-radius: 0 0 25px 25px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      box-shadow: 0 6px 15px rgba(0, 27, 63, 0.12);
    }

    .hamburger {
      background: none;
      border: none;
      font-size: var(--icon-size, 26px);
      cursor: pointer;
      color: var(--primary-color, #001B3F);
      width: var(--button-size, 40px);
      height: var(--button-size, 40px);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      transition: background-color 0.2s ease;
      position: relative;
      left: 8px;
    }

    .hamburger.right {
      left: auto;
      right: 8px;
    }

    .hamburger:hover {
      background-color: rgba(0, 27, 63, 0.1);
    }

    .logo {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: var(--secondary-color, #D7E3FF) url('/images/header/logo/dmclogo-cr.svg') center/contain no-repeat;
      margin-top: 30px; /* Push down so half is outside */
      box-shadow: 0 8px 20px rgba(0, 27, 63, 0.2);
      z-index: 1;
      overflow: hidden;
    }



    .menu-header {
      padding: 15px 25px;
      padding-top: 50px;
      padding-bottom: 15px;
      position: relative;
    }

    .close {
      background: none;
      border: none;
      font-size: 24px;
      color: var(--primary-color, #001B3F);
      cursor: pointer;
      float: right;
      margin: 0;
      padding: 5px;
      border-radius: 4px;
      transition: background-color 0.2s ease;
    }

    .close:hover {
      background-color: rgba(0, 27, 63, 0.1);
    }

    .separator {
      height: 2px;
      background: linear-gradient(
        to right,
        transparent 0%,
        rgba(0, 27, 63, 0.15) 20%,
        rgba(0, 27, 63, 0.4) 50%,
        rgba(0, 27, 63, 0.15) 80%,
        transparent 100%
      );
      position: absolute;
      bottom: 0;
      left: 25px;
      right: 25px;
    }

    .menu-content {
      flex: 1;
      padding: 10px 25px;
    }

    .menu-expansion-panel {
      margin: 2px 0;
      border: none;
      box-shadow: none !important;
      background: transparent;
      border-radius: 0;
    }

    .menu-expansion-panel ::ng-deep .mat-expansion-panel-body {
      padding: 0;
    }

    /* Remove all Material Design shadows and borders */
    .menu-expansion-panel ::ng-deep .mat-expansion-panel {
      box-shadow: none !important;
      border: none !important;
      background: transparent !important;
      border-radius: 0 !important;
    }

    .menu-expansion-panel ::ng-deep .mat-expansion-panel-header {
      box-shadow: none !important;
      border: none !important;
      background: transparent !important;
      border-radius: 0 !important;
    }

    /* Override any remaining Material Design styling */
    .menu-expansion-panel ::ng-deep .mat-expansion-panel-content {
      box-shadow: none !important;
      border: none !important;
      background: transparent !important;
    }

    .menu-expansion-panel ::ng-deep .mat-expansion-panel-header.mat-expanded {
      box-shadow: none !important;
      border: none !important;
      background: transparent !important;
    }

    .menu-panel-header {
      padding: 15px 20px;
      border-bottom: none;
      background: transparent !important;
      min-height: 48px; /* Better touch target */
      cursor: pointer;
      transition: background-color 0.2s ease;
      box-shadow: none !important;
      border-radius: 0 !important;
      position: relative;
    }

    .menu-panel-header::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 20px;
      right: 20px;
      height: 1px;
      background: linear-gradient(
        to right,
        transparent 0%,
        rgba(0, 27, 63, 0.1) 20%,
        rgba(0, 27, 63, 0.25) 50%,
        rgba(0, 27, 63, 0.1) 80%,
        transparent 100%
      );
      transition: all 0.3s ease;
    }

    /* Active/expanded menu item divider - darker and glowing */
    .menu-expansion-panel.mat-expanded .menu-panel-header::after {
      height: 1.5px;
      background: linear-gradient(
        to right,
        transparent 0%,
        rgba(0, 27, 63, 0.2) 20%,
        rgba(0, 27, 63, 0.5) 50%,
        rgba(0, 27, 63, 0.2) 80%,
        transparent 100%
      );
      box-shadow: 0 0 8px rgba(0, 27, 63, 0.3);
    }

    .menu-panel-header:hover {
      background-color: rgba(0, 27, 63, 0.05);
    }

    .menu-panel-header:active {
      background-color: rgba(0, 27, 63, 0.1);
    }

    /* Active state for expanded menu items */
    .menu-expansion-panel.mat-expanded .menu-panel-header {
      background-color: rgba(0, 27, 63, 0.08);
      border-left: 4px solid var(--primary-color, #001B3F);
      border-bottom: 1px solid rgba(0, 27, 63, 0.15);
    }

    .menu-expansion-panel.mat-expanded .menu-panel-title {
      color: var(--primary-color, #001B3F);
      font-weight: 500;
    }

    .menu-expansion-panel.mat-expanded .icon {
      color: var(--primary-color, #001B3F);
      opacity: 1;
    }

    /* Smooth animations for sub-menu expansion/collapse */
    .menu-expansion-panel ::ng-deep .mat-expansion-panel-body {
      transition: height 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55), 
                  opacity 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      overflow: hidden;
      transform-origin: top;
    }

    /* Enhanced expansion animation for the panel body */
    .menu-expansion-panel ::ng-deep .mat-expansion-panel-content {
      transition: height 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    /* Smooth height transition for the expanding content */
    .menu-expansion-panel ::ng-deep .mat-expansion-panel-body {
      animation: expandContent 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    /* Override Material's default height transition for smoother animation */
    .menu-expansion-panel ::ng-deep .mat-expansion-panel-body {
      height: auto !important;
      transition: height 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) !important;
    }

    /* Ensure smooth height animation during expansion */
    .menu-expansion-panel ::ng-deep .mat-expansion-panel-body.mat-expanded {
      height: auto !important;
      transition: height 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) !important;
    }

    /* Force smooth height transitions for all states */
    .menu-expansion-panel ::ng-deep .mat-expansion-panel-body {
      will-change: height;
      backface-visibility: hidden;
      transform: translateZ(0);
    }

    /* Smooth transition for the entire expansion panel */
    .menu-expansion-panel {
      transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    /* Animation for sub-menu items appearing */
    .sub-menu-item {
      animation: slideInDown 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      transform-origin: top;
      opacity: 0;
      animation-fill-mode: forwards;
    }

    /* Keyframes for smooth slide animation */
    @keyframes slideInDown {
      from {
        opacity: 0;
        transform: translateY(-10px) scaleY(0.8);
      }
      to {
        opacity: 1;
        transform: translateY(0) scaleY(1);
      }
    }

    /* Keyframes for smooth content expansion */
    @keyframes expandContent {
      0% {
        opacity: 0;
        transform: scaleY(0);
        transform-origin: top;
      }
      50% {
        opacity: 0.5;
        transform: scaleY(0.5);
      }
      100% {
        opacity: 1;
        transform: scaleY(1);
      }
    }

    /* Staggered animation for multiple sub-menu items */
    .sub-menu-item:nth-child(1) { animation-delay: 0.1s; }
    .sub-menu-item:nth-child(2) { animation-delay: 0.2s; }
    .sub-menu-item:nth-child(3) { animation-delay: 0.3s; }

    .menu-panel-title {
      color: var(--primary-color, #001B3F);
      font-size: 16px;
      display: flex;
      align-items: center;
      gap: 16px;
      margin: 0;
      padding: 0;
    }

    .menu-expansion-panel ::ng-deep .mat-expansion-indicator {
      color: var(--primary-color, #001B3F);
      transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    /* Smooth rotation animation for the expansion arrow */
    .menu-expansion-panel.mat-expanded ::ng-deep .mat-expansion-indicator::after {
      transform: rotate(90deg);
    }

    .icon, .sub-icon {
      color: var(--primary-color, #001B3F);
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .sub-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
    }

    .sub-menu-items {
      background: rgba(0, 27, 63, 0.02);
    }

    .sub-menu-item {
      color: var(--primary-color, #001B3F);
      padding: 12px 20px 12px 40px;
      border-bottom: none;
      cursor: pointer;
      transition: background-color 0.2s ease;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
      min-height: 44px; /* Better touch target */
      position: relative;
    }

    .sub-menu-item::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 40px;
      right: 20px;
      height: 1px;
      background: linear-gradient(
        to right,
        transparent 0%,
        rgba(0, 27, 63, 0.05) 20%,
        rgba(0, 27, 63, 0.15) 50%,
        rgba(0, 27, 63, 0.05) 80%,
        transparent 100%
      );
    }

    .sub-menu-item:hover {
      background-color: rgba(0, 27, 63, 0.1);
    }

    .sub-icon {
      font-size: 16px;
    }

    .sub-label {
      flex: 1;
    }

    /* Arabic text styling - larger font for better readability */
    .menu-panel-title .label[lang="ar"],
    .menu-panel-title .label:lang(ar) {
      font-size: 18px;
      font-weight: 500;
    }

    .sub-menu-item .sub-label[lang="ar"],
    .sub-menu-item .sub-label:lang(ar) {
      font-size: 16px;
      font-weight: 500;
    }



    /* Side Panel Styles - Using existing side panel styles */
    .side-panel {
      position: fixed !important;
      top: 0 !important;
      height: 100vh !important;
      width: var(--side-panel-width, 85vw) !important; /* Responsive width */
      background: #D7E3FF !important; /* Fallback color */
      z-index: 1000 !important; /* Reduced from 9999 to avoid conflicts */
      transition: transform 0.3s ease !important; /* Re-enable smooth transitions */
      display: flex !important;
      flex-direction: column;
      border: none !important;
      box-shadow: none !important;
      visibility: visible;
      opacity: 1;
    }

    /* Left side panel */
    .left-panel {
      left: 0 !important;
      transform: translateX(-100%) !important; /* Hidden off-screen to the left */
    }

    .left-panel.open {
      transform: translateX(0) !important; /* Slide into view from left */
      background: rgba(215, 227, 255, 0.95) !important;
    }

    /* Right side panel */
    .right-panel {
      right: 0 !important;
      transform: translateX(100%) !important; /* Hidden off-screen to the right */
    }

    .right-panel.open {
      transform: translateX(0) !important; /* Slide into view from right */
      background: rgba(215, 227, 255, 0.95) !important;
    }

    .side-panel-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.3);
      z-index: 999; /* Below the side panels but above other content */
      cursor: pointer;
    }
  `]
})
export class MobileFloatingMenuComponent implements OnInit, OnDestroy, OnChanges {
  @Input() childData: any; // Will receive data from parent

  leftSidePanelOpen = false;
  rightSidePanelOpen = false;
  private languageSubscription!: Subscription;
  
  leftMenuItems: any[] = [];
  rightMenuItems: any[] = [];

  constructor(
    private floatingMenuContent: FloatingMenuContentService,
    private languageService: LanguageService,
    private router: Router
  ) {}

  ngOnInit() {
    // Load menu items in current language
    this.loadMenuItems();
    
    // Subscribe to language changes
    this.languageSubscription = this.languageService.currentLang$.subscribe(lang => {
      this.loadMenuItems();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['childData']) {
      this.resetMenuState();
    }
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  private loadMenuItems() {
    const currentLang = this.languageService.getCurrentLanguage()?.code || 'en';
    this.leftMenuItems = this.floatingMenuContent.getLeftMenuItems(currentLang as 'en' | 'ar');
    this.rightMenuItems = this.floatingMenuContent.getRightMenuItems(currentLang as 'en' | 'ar');
  }

  getCurrentLanguageCode(): string {
    return this.languageService.getCurrentLanguage()?.code || 'en';
  }

  getAccessibilityLabel(key: keyof AccessibilityLabels): string {
    const currentLang = this.getCurrentLanguageCode();
    return this.floatingMenuContent.getAccessibilityLabel(key, currentLang as 'en' | 'ar');
  }







  // Get breakpoint class for responsive styling - consistent with header strip
  getBreakpointClass(): string {
    if (!this.childData?.breakpoint) return 'mobile-large';
    
    const { breakpoint } = this.childData;
    
    switch(breakpoint) {
      case 'mobile-small':
        return 'mobile-small';
      case 'mobile-large':
        return 'mobile-large';
      default:
        return 'mobile-large';
    }
  }



  closeLeftSidePanel() {
    this.leftSidePanelOpen = false;
  }

  closeRightSidePanel() {
    this.rightSidePanelOpen = false;
  }

  closeAllSidePanels() {
    this.leftSidePanelOpen = false;
    this.rightSidePanelOpen = false;
  }

  openLeftSidePanel() {
    this.leftSidePanelOpen = true;
  }

  openRightSidePanel() {
    this.rightSidePanelOpen = true;
  }

  selectItem(itemId: string) {
    this.closeAllSidePanels(); // Close side panels when item is selected
    
    // Find the item in both left and right menu items
    let targetItem: any = null;
    
    // Search in left menu items
    for (const leftItem of this.leftMenuItems) {
      if (leftItem.subMenuItems) {
        const found = leftItem.subMenuItems.find((subItem: any) => subItem.id === itemId);
        if (found) {
          targetItem = found;
          break;
        }
      }
    }
    
    // Search in right menu items if not found in left
    if (!targetItem) {
      for (const rightItem of this.rightMenuItems) {
        if (rightItem.subMenuItems) {
          const found = rightItem.subMenuItems.find((subItem: any) => subItem.id === itemId);
          if (found) {
            targetItem = found;
            break;
          }
        }
      }
    }
    
    // Navigate if item has URL
    if (targetItem && targetItem.url) {
      this.router.navigate([targetItem.url]);
    }
  }







  private resetMenuState() {
    // Reset all menu states
    // No old menu states to reset
  }
}
