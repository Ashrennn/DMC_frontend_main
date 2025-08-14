import { Component, Input, OnDestroy } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { NeomorphicButtonComponent } from '../components/neomorphic-button/neomorphic-button.component';
import { DropdownContentService } from '../content/dropdown-content.service';
import { DropdownItem } from '../content/dropdown-content.types';
import { HeaderContentService } from '../content/header-content.service';
import { HeaderStateService } from '../services/header-state.service';
import { LanguageService } from '../../../../../../shared/services/language.service';
import { LanguageSelectorComponent } from '../components/language-selector/language-selector.component';
import { Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'dmc-tablet-header',
  standalone: true,
  imports: [CommonModule, AsyncPipe, NeomorphicButtonComponent, LanguageSelectorComponent, MatIconModule] as const,
  template: `
    <div class="tablet-header" [ngClass]="getBreakpointClass()" role="navigation" aria-label="Tablet header quick actions" (click)="onHeaderStripClick($event)">
      <div class="cell">
        <dmc-neomorphic-button
          [config]="whatsappButtonConfig"
          [isActive]="(headerState.activeMenu$ | async) === 'whatsapp'"
          (buttonClick)="headerState.openMenu('whatsapp')">
        </dmc-neomorphic-button>
      </div>
      <div class="cell">
        <dmc-neomorphic-button
          [config]="dropdownButtonConfig"
          [isActive]="(headerState.activeMenu$ | async) === 'dropdown1'"
          (buttonClick)="toggleDropdown('dropdown1')">
        </dmc-neomorphic-button>
        <!-- Glossary Dropdown -->
        <div *ngIf="(headerState.activeMenu$ | async) === 'dropdown1'" class="dropdown-menu glossary-dropdown">
          <div class="glassmorphism-content">
            <div class="dropdown-header">
              <h3>{{ getDropdownTitle('menu1') }}</h3>
            </div>
            <div class="dropdown-body">
              <div *ngFor="let item of getDropdownItems('menu1')" 
                   class="menu-item" 
                   [class.disabled]="item.disabled"
                   (click)="!item.disabled && onDropdownItemSelected(item)">
                <mat-icon class="item-icon" *ngIf="item.icon">{{ item.icon }}</mat-icon>
                <div class="item-content">
                  <span class="item-label">{{ item.label[currentLang] }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cell">
        <dmc-neomorphic-button
          [config]="internationalNewsButtonConfig"
          [isActive]="(headerState.activeMenu$ | async) === 'dropdown2'"
          (buttonClick)="toggleDropdown('dropdown2')">
        </dmc-neomorphic-button>
        <!-- International News Dropdown -->
        <div *ngIf="(headerState.activeMenu$ | async) === 'dropdown2'" class="dropdown-menu international-news-dropdown">
          <div class="glassmorphism-content">
            <div class="dropdown-header">
              <h3>{{ getDropdownTitle('menu2') }}</h3>
            </div>
            <div class="dropdown-body">
              <div *ngFor="let item of getDropdownItems('menu2')" 
                   class="menu-item" 
                   [class.disabled]="item.disabled"
                   (click)="!item.disabled && onDropdownItemSelected(item)">
                <mat-icon class="item-icon" *ngIf="item.icon">{{ item.icon }}</mat-icon>
                <div class="item-content">
                  <span class="item-label">{{ item.label[currentLang] }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cell">
        <dmc-neomorphic-button
          [config]="mediaButtonConfig"
          [isActive]="(headerState.activeMenu$ | async) === 'dropdown3'"
          (buttonClick)="toggleDropdown('dropdown3')">
        </dmc-neomorphic-button>
        <!-- Media Dropdown -->
        <div *ngIf="(headerState.activeMenu$ | async) === 'dropdown3'" class="dropdown-menu media-dropdown">
          <div class="glassmorphism-content">
            <div class="dropdown-header">
              <h3>{{ getDropdownTitle('menu3') }}</h3>
            </div>
            <div class="dropdown-body">
              <div *ngFor="let item of getDropdownItems('menu3')" 
                   class="menu-item" 
                   [class.disabled]="item.disabled"
                   (click)="!item.disabled && onDropdownItemSelected(item)">
                <mat-icon class="item-icon" *ngIf="item.icon">{{ item.icon }}</mat-icon>
                <div class="item-content">
                  <span class="item-label">{{ item.label[currentLang] }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="cell">
        <dmc-neomorphic-button
          [config]="languageButtonConfig"
          [isActive]="(headerState.activeMenu$ | async) === 'language'"
          (buttonClick)="toggleLanguageMenu()">
        </dmc-neomorphic-button>
      </div>
    </div>

    <!-- Language Selector Popup -->
    <dmc-language-selector *ngIf="(headerState.activeMenu$ | async) === 'language'"></dmc-language-selector>
  `,
  styles: [`
    :host {
      display: block;
    }

    .tablet-header {
      /* Full-bleed, no padding/margins */
      width: 100vw;
      margin: 0;
      padding: 0;

      /* 5 equal parts */
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-auto-rows: 1fr;
      grid-auto-flow: row;
      gap: 0;

      /* Colors */
      background: var(--primary-color, #001B3F);
      
      /* Ensure proper stacking context */
      position: relative;
      z-index: 10;

      /* Default height for all tablet sizes */
      height: 60px;
    }

    .tablet-header.tablet-small {
      --button-size: 35px;
      --text-size: 14px;
      --glow-size: 35px;
      --header-height: 60px;
      height: 60px;
    }

    .tablet-header.tablet-large {
      --button-size: 40px;
      --text-size: 16px;
      --glow-size: 40px;
      --header-height: 60px;
      height: 60px;
    }

    /* Style overrides for header strip components */
    ::ng-deep {
      /* Neomorphic buttons */
      .cell > dmc-neomorphic-button {
        width: 100% !important;
        height: 100% !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }
    }

    .cell {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    /* Dropdown Menu Styles - EXACT same as mobile header */
    .dropdown-menu {
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      width: 220px;
      z-index: 150000;
      margin-top: 8px;
      overflow: hidden;
      border-radius: 16px;
      animation: dropdownSlideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      /* Prevent positioning glitch */
      will-change: transform;
      transform-origin: center top;
      
      /* Enhanced Glassmorphism with subtle color overlay - EXACT same as mobile */
      background: linear-gradient(
        to bottom,
        rgba(215, 227, 255, 0.45),
        rgba(215, 227, 255, 0.35)
      );
      backdrop-filter: blur(12px) saturate(180%);
      -webkit-backdrop-filter: blur(12px) saturate(180%);
      border: 1px solid rgba(215, 227, 255, 0.35);
      box-shadow: 
        0 8px 32px 0 rgba(0, 27, 63, 0.15),
        0 2px 8px 0 rgba(0, 27, 63, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.15);
    }

    @keyframes dropdownSlideDown {
      from {
        opacity: 0;
        transform: translateX(-50%) translateY(-8px);
      }
      to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    }

    .dropdown-menu::before {
      content: '';
      position: absolute;
      top: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 8px solid rgba(215, 227, 255, 0.45);
    }

    .glassmorphism-content {
      background: rgba(215, 227, 255, 0.25);
      overflow: hidden;
      border-radius: 12px;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }

    .dropdown-header {
      background: rgba(0, 27, 63, 0.15);
      padding: 0.5rem 0.75rem;
      border-bottom: 1px solid rgba(215, 227, 255, 0.45);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      border-radius: 12px 12px 0 0;
    }

    .dropdown-header h3 {
      margin: 0;
      color: #001B3F !important;
      font-size: 0.85rem;
      font-weight: 600;
      text-align: center;
      text-shadow: 0 1px 2px rgba(255, 255, 255, 0.3);
    }

    .dropdown-body {
      padding: 0.125rem;
      max-height: 35vh;
      overflow-y: auto;
    }

    .menu-item {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.25rem 0.375rem;
      cursor: pointer;
      border-radius: 3px;
      transition: all 0.2s ease;
      color: #001B3F;
      position: relative;
    }

    /* Enhanced Divider - EXACT same as side panel menu */
    .menu-item::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 0.75rem);
      height: 1px;
      background: linear-gradient(
        to right,
        rgba(0, 27, 63, 0),
        rgba(0, 27, 63, 0.08) 30%,
        rgba(0, 27, 63, 0.15) 50%,
        rgba(0, 27, 63, 0.08) 70%,
        rgba(0, 27, 63, 0)
      );
      transition: all 0.3s ease;
    }

    .menu-item:hover:not(.disabled)::after {
      background: linear-gradient(
        to right,
        rgba(0, 27, 63, 0),
        rgba(0, 27, 63, 0.15) 30%,
        rgba(0, 27, 63, 0.35) 50%,
        rgba(0, 27, 63, 0.15) 70%,
        rgba(0, 27, 63, 0)
      );
      box-shadow: 
        0 0 8px rgba(0, 27, 63, 0.2),
        0 0 16px rgba(0, 27, 63, 0.1),
        0 0 24px rgba(0, 27, 63, 0.05);
      height: 2px;
    }

    .menu-item:hover:not(.disabled) {
      background: rgba(0, 27, 63, 0.05);
    }

    .menu-item:hover:not(.disabled) .item-icon {
      transform: rotate(5deg) scale(1.1);
    }

    .menu-item.disabled {
      opacity: 0.6;
      cursor: not-allowed;
      pointer-events: none;
    }

    .item-icon {
      font-size: 1rem;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      background: rgba(0, 27, 63, 0.05);
      border-radius: 2px;
      color: #001B3F;
      transform-origin: center;
      will-change: transform;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .item-content {
      flex: 1;
      min-width: 0;
      overflow: hidden;
    }

    .item-label {
      display: block;
      font-size: 0.75rem;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1;
      width: 100%;
    }

    /* Specific dropdown positioning - all same size */
    .glossary-dropdown,
    .international-news-dropdown,
    .media-dropdown {
      left: 50%;
      width: 180px;
    }
  `]
})
export class TabletHeaderComponent implements OnDestroy {
  @Input() childData: any;
  @Input() content: any;
  @Input() config: any;
  @Input() routing: any;

  currentLang: 'en' | 'ar' = 'en';
  dropdownContents: any[] = [];
  private subscription: Subscription = new Subscription();
  private autoCloseTimers: { [key in 'dropdown1' | 'dropdown2' | 'dropdown3']?: any } = {};
  private hoverPausedTimers: { [key in 'dropdown1' | 'dropdown2' | 'dropdown3']?: boolean } = {};
  private clickListener!: (event: Event) => void;

  // Button configuration for WhatsApp button
  get whatsappButtonConfig() {
    const breakpoint = this.getBreakpointClass();
    return {
      text: this.headerContentService.getButtonText('whatsapp', this.currentLang), // Fallback text
      imagePath: '/images/strip/logo/whatsapp.png',
      height: '35px', // Consistent height for all tablet sizes
      fontSize: '14px', // Consistent font size for all tablet sizes
      minWidth: '120px',
      borderRadius: '25px',
      primaryColor: '#001B3F',
      secondaryColor: '#D7E3FF',
      shadowColor: '#000d1e',
      highlightColor: '#002960'
    };
  }

  // Button configuration for the neomorphic dropdown buttons
  get dropdownButtonConfig() {
    const breakpoint = this.getBreakpointClass();
    return {
      text: this.headerContentService.getButtonText('glossary', this.currentLang),
      height: '35px', // Consistent height for all tablet sizes
      fontSize: '14px', // Consistent font size for all tablet sizes
      minWidth: '120px',
      borderRadius: '25px',
      primaryColor: '#001B3F',
      secondaryColor: '#D7E3FF',
      shadowColor: '#000d1e',
      highlightColor: '#002960'
    };
  }

  // Button configuration for International News button
  get internationalNewsButtonConfig() {
    const breakpoint = this.getBreakpointClass();
    return {
      text: this.headerContentService.getButtonText('internationalNews', this.currentLang),
      height: '35px', // Consistent height for all tablet sizes
      fontSize: '14px', // Consistent font size for all tablet sizes
      minWidth: '120px',
      borderRadius: '25px',
      primaryColor: '#001B3F',
      secondaryColor: '#D7E3FF',
      shadowColor: '#000d1e',
      highlightColor: '#002960'
    };
  }

  // Button configuration for Media button
  get mediaButtonConfig() {
    const breakpoint = this.getBreakpointClass();
    return {
      text: this.headerContentService.getButtonText('media', this.currentLang),
      height: '35px', // Consistent height for all tablet sizes
      fontSize: '14px', // Consistent font size for all tablet sizes
      minWidth: '120px',
      borderRadius: '25px',
      primaryColor: '#001B3F',
      secondaryColor: '#D7E3FF',
      shadowColor: '#000d1e',
      highlightColor: '#002960'
    };
  }

  // Button configuration for language button
  get languageButtonConfig() {
    const breakpoint = this.getBreakpointClass();
    return {
      imagePath: '/images/strip/logo/arlogo.png',
      height: '35px', // Consistent height for all tablet sizes
      fontSize: '14px', // Consistent font size for all tablet sizes
      minWidth: '120px',
      borderRadius: '25px',
      primaryColor: '#001B3F',
      secondaryColor: '#D7E3FF',
      shadowColor: '#000d1e',
      highlightColor: '#002960'
    };
  }

  constructor(
    private dropdownContentService: DropdownContentService,
    private headerContentService: HeaderContentService,
    public headerState: HeaderStateService,
    private languageService: LanguageService
  ) {
    this.dropdownContents = this.dropdownContentService.getAllDropdowns();
    
    // Subscribe to language changes
    this.subscription.add(
      this.languageService.currentLang$.subscribe(lang => {
        if (lang === 'en' || lang === 'ar') {
          this.currentLang = lang;
        }
      })
    );

    // Setup click-away listener
    this.setupClickAwayListener();
  }

  toggleLanguageMenu() {
    // Toggle language menu
    if (this.headerState.isMenuOpen('language')) {
      this.headerState.closeMenu();
    } else {
      this.headerState.openMenu('language');
    }
  }

  toggleDropdown(menuType: 'dropdown1' | 'dropdown2' | 'dropdown3') {
    // Toggle dropdown menu
    const isCurrentlyOpen = this.headerState.isMenuOpen(menuType);
    
    if (isCurrentlyOpen) {
      // Close the dropdown
      this.headerState.closeMenu();
      this.clearAutoCloseTimer(menuType);
    } else {
      // Close any other open dropdown first
      this.headerState.closeMenu();
      // Clear any existing timers
      (['dropdown1', 'dropdown2', 'dropdown3'] as const).forEach(key => {
        this.clearAutoCloseTimer(key);
      });
      // Open the new dropdown
      this.headerState.openMenu(menuType);
      // Start auto-close timer immediately
      this.startAutoCloseTimer(menuType);
    }
  }

  private startAutoCloseTimer(menuType: 'dropdown1' | 'dropdown2' | 'dropdown3') {
    // Clear existing timer first
    this.clearAutoCloseTimer(menuType);
    
    // Reset hover pause state
    this.hoverPausedTimers[menuType] = false;
    
    // Start new timer - close after 5 seconds
    this.autoCloseTimers[menuType] = setTimeout(() => {
      // Only close if the menu is still open and not paused by hover
      if (this.headerState.isMenuOpen(menuType) && !this.hoverPausedTimers[menuType]) {
        this.headerState.closeMenu();
        this.clearAutoCloseTimer(menuType);
      }
    }, 5000);
  }

  // Pause auto-close timer when hovering over dropdown
  onDropdownMouseEnter(menuType: 'dropdown1' | 'dropdown2' | 'dropdown3') {
    this.hoverPausedTimers[menuType] = true;
  }

  // Resume auto-close timer when leaving dropdown
  onDropdownMouseLeave(menuType: 'dropdown1' | 'dropdown2' | 'dropdown3') {
    this.hoverPausedTimers[menuType] = false;
    // Restart the timer with remaining time
    if (this.autoCloseTimers[menuType]) {
      this.restartAutoCloseTimer(menuType);
    }
  }

  private restartAutoCloseTimer(menuType: 'dropdown1' | 'dropdown2' | 'dropdown3') {
    // Clear existing timer
    this.clearAutoCloseTimer(menuType);
    
    // Start new timer - close after 5 seconds
    this.autoCloseTimers[menuType] = setTimeout(() => {
      // Only close if the menu is still open and not paused by hover
      if (this.headerState.isMenuOpen(menuType) && !this.hoverPausedTimers[menuType]) {
        this.headerState.closeMenu();
        this.clearAutoCloseTimer(menuType);
      }
    }, 5000);
  }

  private clearAutoCloseTimer(menuType: 'dropdown1' | 'dropdown2' | 'dropdown3') {
    if (this.autoCloseTimers[menuType]) {
      clearTimeout(this.autoCloseTimers[menuType]);
      delete this.autoCloseTimers[menuType];
    }
  }

  onHeaderStripClick(event: Event) {
    const target = event.target as HTMLElement;
    
    // If clicking on the header strip but not on a button or dropdown, close any open dropdowns
    if (!target.closest('dmc-neomorphic-button') && !target.closest('.dropdown-menu')) {
      if (this.headerState.isMenuOpen('dropdown1') || 
          this.headerState.isMenuOpen('dropdown2') || 
          this.headerState.isMenuOpen('dropdown3') ||
          this.headerState.isMenuOpen('language')) {
        this.headerState.closeMenu();
        // Clear all auto-close timers
        (['dropdown1', 'dropdown2', 'dropdown3'] as const).forEach(menuType => {
          this.clearAutoCloseTimer(menuType);
        });
      }
    }
  }

  private setupClickAwayListener() {
    this.clickListener = (event: Event) => {
      const target = event.target as HTMLElement;
      
      // Check if click is outside any dropdown and not on a button
      if (!target.closest('.dropdown-menu') && !target.closest('button') && !target.closest('dmc-neomorphic-button')) {
        // Only close if a menu is actually open
        if (this.headerState.isMenuOpen('dropdown1') || 
            this.headerState.isMenuOpen('dropdown2') || 
            this.headerState.isMenuOpen('dropdown3') ||
            this.headerState.isMenuOpen('language')) {
          this.headerState.closeMenu();
          // Clear all auto-close timers
          (['dropdown1', 'dropdown2', 'dropdown3'] as const).forEach(menuType => {
            this.clearAutoCloseTimer(menuType);
          });
        }
      }
    };
    
    document.addEventListener('click', this.clickListener);
  }

  onDropdownItemSelected(item: DropdownItem) {
    // Close the dropdown immediately when an item is selected
    this.headerState.closeMenu();
    // Clear all auto-close timers
    (['dropdown1', 'dropdown2', 'dropdown3'] as const).forEach(menuType => {
      this.clearAutoCloseTimer(menuType);
    });
    
    if (item.url) {
      // Handle navigation
    }
    if (item.action) {
      // Handle action
    }
  }

  ngOnDestroy() {
    // Clean up subscriptions
    this.subscription.unsubscribe();
    
    // Clean up click listener
    if (this.clickListener) {
      document.removeEventListener('click', this.clickListener);
    }
    
    // Clean up all auto-close timers
    (['dropdown1', 'dropdown2', 'dropdown3'] as const).forEach(menuType => {
      this.clearAutoCloseTimer(menuType);
    });
  }

  getBreakpointClass(): string {
    if (!this.childData) return 'tablet-small';
    const { breakpoint } = this.childData;
    return breakpoint === 'tablet-small' ? 'tablet-small' : 'tablet-large';
  }

  getButtonText(key: string): string {
    return this.headerContentService.getButtonText(key, this.currentLang);
  }

  getDropdownTitle(menuId: string): string {
    const menu = this.dropdownContents.find(m => m.id === menuId);
    return menu ? menu.title[this.currentLang] : '';
  }

  getDropdownItems(menuId: string): DropdownItem[] {
    const menu = this.dropdownContents.find(m => m.id === menuId);
    return menu ? menu.items : [];
  }
}
