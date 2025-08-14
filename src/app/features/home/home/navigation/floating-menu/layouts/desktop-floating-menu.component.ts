import { Component, Input, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FloatingMenuContentService } from '../content/floating-menu-content.service';
import { LanguageService } from '../../../../../../shared/services/language.service';
import { NewDropdownComponent } from '../components/new-dropdown';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dmc-desktop-floating-menu',
  standalone: true,
  imports: [CommonModule, NewDropdownComponent],
  template: `
    <div class="desktop-floating-menu" [class.rtl]="isRTL">
      <div class="horizontal-section">
        <!-- Left Side - 3 Buttons -->
        <div class="segment">
          <button id="left-btn-1" class="menu-btn" (click)="toggleButtonState('left-btn-1')" [class.active]="activeButtons.has('left-btn-1')">
            {{getMenuLabel('left-btn-1')}}
          </button>
          <dmc-new-dropdown 
            *ngIf="activeButtons.has('left-btn-1')"
            [menuItems]="getMenuItems('left-btn-1')"
            [isRTL]="isRTL"
            position="left"
            buttonId="left-btn-1"
            (mouseenter)="onDropdownMouseEnter()"
            (mouseleave)="onDropdownMouseLeave()"
          ></dmc-new-dropdown>
        </div>
        
        <div class="segment">
          <button id="left-btn-2" class="menu-btn" (click)="toggleButtonState('left-btn-2')" [class.active]="activeButtons.has('left-btn-2')">
            {{getMenuLabel('left-btn-2')}}
          </button>
          <dmc-new-dropdown 
            *ngIf="activeButtons.has('left-btn-2')"
            [menuItems]="getMenuItems('left-btn-2')"
            [isRTL]="isRTL"
            position="left"
            buttonId="left-btn-2"
            (mouseenter)="onDropdownMouseEnter()"
            (mouseleave)="onDropdownMouseLeave()"
          ></dmc-new-dropdown>
        </div>
        
        <div class="segment">
          <button id="left-btn-3" class="menu-btn" (click)="toggleButtonState('left-btn-3')" [class.active]="activeButtons.has('left-btn-3')">
            {{getMenuLabel('left-btn-3')}}
          </button>
          <dmc-new-dropdown 
            *ngIf="activeButtons.has('left-btn-3')"
            [menuItems]="getMenuItems('left-btn-3')"
            [isRTL]="isRTL"
            position="left"
            buttonId="left-btn-3"
            (mouseenter)="onDropdownMouseEnter()"
            (mouseleave)="onDropdownMouseLeave()"
          ></dmc-new-dropdown>
        </div>

        <!-- Center Logo -->
        <div class="segment center-segment">
          <div class="logo-circle"></div>
        </div>

        <!-- Right Side - 3 Buttons -->
        <div class="segment">
          <button id="right-btn-1" class="menu-btn" (click)="toggleButtonState('right-btn-1')" [class.active]="activeButtons.has('right-btn-1')">
            {{getMenuLabel('right-btn-1')}}
          </button>
          <dmc-new-dropdown 
            *ngIf="activeButtons.has('right-btn-1')"
            [menuItems]="getMenuItems('right-btn-1')"
            [isRTL]="isRTL"
            position="right"
            buttonId="right-btn-1"
            (mouseenter)="onDropdownMouseEnter()"
            (mouseleave)="onDropdownMouseLeave()"
          ></dmc-new-dropdown>
        </div>
        
        <div class="segment">
          <button id="right-btn-2" class="menu-btn" (click)="toggleButtonState('right-btn-2')" [class.active]="activeButtons.has('right-btn-2')">
            {{getMenuLabel('right-btn-2')}}
          </button>
          <dmc-new-dropdown 
            *ngIf="activeButtons.has('right-btn-2')"
            [menuItems]="getMenuItems('right-btn-2')"
            [isRTL]="isRTL"
            position="right"
            buttonId="right-btn-2"
            (mouseenter)="onDropdownMouseEnter()"
            (mouseleave)="onDropdownMouseLeave()"
          ></dmc-new-dropdown>
        </div>
        
        <div class="segment">
          <button id="right-btn-3" class="menu-btn" (click)="toggleButtonState('right-btn-3')" [class.active]="activeButtons.has('right-btn-3')">
            {{getMenuLabel('right-btn-3')}}
          </button>
          <dmc-new-dropdown 
            *ngIf="activeButtons.has('right-btn-3')"
            [menuItems]="getMenuItems('right-btn-3')"
            [isRTL]="isRTL"
            position="right"
            buttonId="right-btn-3"
            (mouseenter)="onDropdownMouseEnter()"
            (mouseleave)="onDropdownMouseLeave()"
          ></dmc-new-dropdown>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Global Divider Standardization for Desktop Floating Menu */
    ::ng-deep .desktop-floating-menu mat-divider {
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

    /* RTL Divider Standardization */
    ::ng-deep .desktop-floating-menu.rtl mat-divider {
      background: linear-gradient(
        to left,
        transparent 0%,
        rgba(0, 27, 63, 0.08) 20%,
        rgba(0, 27, 63, 0.25) 50%,
        rgba(0, 27, 63, 0.08) 80%,
        transparent 100%
      ) !important;
    }

    .desktop-floating-menu {
      margin-top: 100px;
      margin-left: auto;
      margin-right: auto;
      width: 95%;
      z-index: 1001;
    }

    .horizontal-section {
      display: flex;
      width: 100%;
      height: 50px;
      border-radius: 25px;
      background-color: var(--secondary-color);
      overflow: visible;
    }

    .segment {
      flex: 1;
      height: 100%;
      position: relative;
      padding: 10px 6px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .center-segment {
      flex: 0.8;
    }

    .logo-circle {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 110px;
      height: 110px;
      border-radius: 50%;
      background: var(--secondary-color, #D7E3FF) url('/images/header/logo/dmclogo-cr.svg') center/contain no-repeat;
      box-shadow: 0 8px 20px rgba(0, 27, 63, 0.2);
      z-index: 1;
      overflow: visible;
    }

    .menu-btn {
      padding: 0;
      border: none;
      background: linear-gradient(145deg, #c2cce6, #e6f3ff);
      color: #4a5568;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 13px;
      width: 90%;
      height: 100%;
      box-shadow: 5px 5px 15px #8e96a8, -5px -5px 15px #ffffff;
    }

    /* Left buttons: rounded top-left and bottom-right, sharp on other corners */
    #left-btn-1, #left-btn-2, #left-btn-3 {
      border-radius: 20px 0 25px 0;
    }

    /* Right buttons: rounded top-right and bottom-left, sharp top-left and bottom-right */
    #right-btn-1, #right-btn-2, #right-btn-3 {
      border-radius: 0 20px 0 25px;
    }

    /* Active state styles - flipped to opposite diagonal */
    .menu-btn.active#left-btn-1,
    .menu-btn.active#left-btn-2,
    .menu-btn.active#left-btn-3 {
      border-radius: 0 20px 0 25px;
    }

    .menu-btn.active#right-btn-1,
    .menu-btn.active#right-btn-2,
    .menu-btn.active#right-btn-3 {
      border-radius: 25px 0 20px 0;
    }

    /* RTL Support */
    .desktop-floating-menu:dir(rtl) {
      .menu-btn {
        font-size: 14px !important;
        font-weight: 600 !important;
      }

      /* RTL border-radius adjustments */
      #left-btn-1, #left-btn-2, #left-btn-3 {
        border-radius: 0 20px 0 25px;
      }

      #right-btn-1, #right-btn-2, #right-btn-3 {
        border-radius: 20px 0 25px 0;
      }

      /* RTL active state adjustments */
      .menu-btn.active#left-btn-1,
      .menu-btn.active#left-btn-2,
      .menu-btn.active#left-btn-3 {
        border-radius: 20px 0 25px 0;
      }

      .menu-btn.active#right-btn-1,
      .menu-btn.active#right-btn-2,
      .menu-btn.active#right-btn-3 {
        border-radius: 0 20px 0 25px;
      }
    }
  `]
})
export class DesktopFloatingMenuComponent implements OnInit, OnDestroy {
  @Input() childData: any;
  @Input() content: any;
  @Input() config: any;
   
  activeButtons = new Set<string>();
  private clickListener!: (event: MouseEvent) => void;
  private languageSubscription!: Subscription;
  private autoResetTimers = new Map<string, any>();
  private isHoveringDropdown = false;
  
  // Menu mapping for desktop layout - 3 buttons on each side
  private menuMapping = {
    'left-btn-1': 'about-us',
    'left-btn-2': 'library',
    'left-btn-3': 'dmc-csr',
    'right-btn-1': 'bunkering',
    'right-btn-2': 'operations',
    'right-btn-3': 'trade-desk'
  };

  constructor(
    private floatingMenuContent: FloatingMenuContentService,
    private languageService: LanguageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  get isRTL(): boolean {
    return this.languageService.getCurrentLanguage()?.code === 'ar';
  }

  ngOnInit() {
    // Subscribe to language changes
    this.languageSubscription = this.languageService.currentLang$.subscribe(() => {
      // Language changed, component will re-render
    });

    // Add click listener to document for clickaway functionality (only in browser)
    if (isPlatformBrowser(this.platformId)) {
      this.clickListener = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest('.desktop-floating-menu')) {
          this.resetAllButtons();
        }
      };
      if (isPlatformBrowser(this.platformId)) {
        document.addEventListener('click', this.clickListener);
      }
    }
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
          if (this.clickListener && isPlatformBrowser(this.platformId)) {
        if (isPlatformBrowser(this.platformId)) {
          document.removeEventListener('click', this.clickListener);
        }
      }
  }

  getMenuLabel(buttonId: string): string {
    const menuKey = this.menuMapping[buttonId as keyof typeof this.menuMapping];
    if (!menuKey) return 'Menu';
    
    const currentLang = this.languageService.getCurrentLanguage()?.code || 'en';
    const menuItems = [...this.floatingMenuContent.getLeftMenuItems(currentLang as 'en' | 'ar'), 
                       ...this.floatingMenuContent.getRightMenuItems(currentLang as 'en' | 'ar')];
    
    const menuItem = menuItems.find(item => item.id === menuKey);
    return menuItem?.label || 'Menu';
  }

  getMenuItems(buttonId: string): any[] {
    const menuKey = this.menuMapping[buttonId as keyof typeof this.menuMapping];
    if (!menuKey) return [];
    
    const currentLang = this.languageService.getCurrentLanguage()?.code || 'en';
    
    // Get the raw content data to access subMenuItems
    const content = this.floatingMenuContent.getContent();
    const allMenuItems = [...content.leftMenuItems, ...content.rightMenuItems];
    const menuItem = allMenuItems.find(item => item.id === menuKey);
    
    // Process sub-menu items to get labels in current language
    if (menuItem?.subMenuItems) {
      const processedItems = menuItem.subMenuItems.map((subItem: any) => ({
        ...subItem,
        label: subItem.label[currentLang as 'en' | 'ar']
      }));

      return processedItems;
    }

    return [];
  }

  toggleButtonState(buttonId: string) {
    // Reset all other buttons first
    this.resetAllButtons();
    
    // Add the clicked button to active state
    this.activeButtons.add(buttonId);
    
    // Start auto-reset timer
    this.startAutoResetTimer(buttonId);
  }

  private startAutoResetTimer(buttonId: string) {
    // Clear any existing timer for this button
    if (this.autoResetTimers.has(buttonId)) {
      clearTimeout(this.autoResetTimers.get(buttonId));
    }
    
    // Set new timer - 5 seconds (5000ms)
    const timer = setTimeout(() => {
      if (!this.isHoveringDropdown) {
        this.activeButtons.delete(buttonId);
        this.autoResetTimers.delete(buttonId);
      }
    }, 5000);
    
    this.autoResetTimers.set(buttonId, timer);
  }

  onDropdownMouseEnter() {
    this.isHoveringDropdown = true;
  }

  onDropdownMouseLeave() {
    this.isHoveringDropdown = false;
    // Restart timer when leaving dropdown
    this.activeButtons.forEach(buttonId => {
      this.startAutoResetTimer(buttonId);
    });
  }

  private resetAllButtons() {
    this.activeButtons.clear();
    // Clear all timers
    this.autoResetTimers.forEach(timer => clearTimeout(timer));
    this.autoResetTimers.clear();
  }
}
