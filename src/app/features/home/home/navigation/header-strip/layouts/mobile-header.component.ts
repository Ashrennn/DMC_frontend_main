import { Component, Input, OnDestroy } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { LanguageSelectorComponent } from '../components/language-selector/language-selector.component';
import { HeaderDropdownComponent } from '../components/header-dropdown/header-dropdown.component';
import { DropdownContentService } from '../content/dropdown-content.service';
import { DropdownItem } from '../content/dropdown-content.types';
import { HeaderStateService } from '../services/header-state.service';
import { LanguageService } from '../../../../../../shared/services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dmc-mobile-header',
  standalone: true,
  imports: [CommonModule, AsyncPipe, MatIconModule, LanguageSelectorComponent, HeaderDropdownComponent] as const,
  template: `
    <div class="mobile-header" [ngClass]="getBreakpointClass()" role="navigation" aria-label="Mobile header quick actions">
      <div class="cell">
        <button type="button" aria-label="WhatsApp" 
          (click)="headerState.openMenu('whatsapp')"
          [class.active]="(headerState.activeMenu$ | async) === 'whatsapp'">
          <mat-icon class="icon">chat</mat-icon>
        </button>
      </div>
      <dmc-header-dropdown 
        class="cell"
        [content]="dropdownContents[0]"
        [currentLang]="currentLang"
        menuId="dropdown1"
        triggerIcon="info"
        (itemSelected)="onDropdownItemSelected($event)">
      </dmc-header-dropdown>
      <dmc-header-dropdown 
        class="cell"
        [content]="dropdownContents[1]"
        [currentLang]="currentLang"
        menuId="dropdown2"
        triggerIcon="public"
        (itemSelected)="onDropdownItemSelected($event)">
      </dmc-header-dropdown>
      <dmc-header-dropdown 
        class="cell"
        [content]="dropdownContents[2]"
        [currentLang]="currentLang"
        menuId="dropdown3"
        triggerIcon="newspaper"
        (itemSelected)="onDropdownItemSelected($event)">
      </dmc-header-dropdown>
      <dmc-language-selector class="cell"></dmc-language-selector>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .mobile-header {
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

      /* Default values for large size */
      height: 60px;
    }

    .mobile-header.mobile-large {
      --button-size: 40px;
      --icon-size: 26px;
      --glow-size: 40px;
      --header-height: 60px;
    }

    .mobile-header.mobile-small {
      --button-size: 32px;
      --icon-size: 22px;
      --glow-size: 32px;
      --header-height: 50px;
      height: 50px;
    }

    /* Style overrides for header strip components */
    ::ng-deep {
      /* WhatsApp button */
      .cell > button {
        width: var(--button-size) !important;
        height: var(--button-size) !important;

        .mat-icon {
          font-size: var(--icon-size) !important;
          width: var(--icon-size) !important;
          height: var(--icon-size) !important;
          line-height: var(--icon-size) !important;
        }

        &.active .icon::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: calc(var(--icon-size) + 8px) !important; /* Icon size + small padding */
          height: calc(var(--icon-size) + 8px) !important;
          background: radial-gradient(circle at center,
            rgba(215, 227, 255, 0.6) 0%,
            rgba(215, 227, 255, 0.3) 40%,
            rgba(215, 227, 255, 0.1) 70%,
            rgba(215, 227, 255, 0) 100%
          ) !important;
          border-radius: 50%;
          z-index: -1;
          filter: blur(1.5px);
          animation: pulseGlow 2s ease-in-out infinite;
          pointer-events: none;
        }
      }

      /* Dropdown buttons */
      dmc-header-dropdown {
        .trigger-button {
          width: var(--button-size) !important;
          height: var(--button-size) !important;

          .mat-icon {
            font-size: var(--icon-size) !important;
            width: var(--icon-size) !important;
            height: var(--icon-size) !important;
            line-height: var(--icon-size) !important;
          }

          &.active .icon::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: calc(var(--icon-size) + 8px) !important; /* Icon size + small padding */
            height: calc(var(--icon-size) + 8px) !important;
            background: radial-gradient(circle at center,
              rgba(215, 227, 255, 0.6) 0%,
              rgba(215, 227, 255, 0.3) 40%,
              rgba(215, 227, 255, 0.1) 70%,
              rgba(215, 227, 255, 0) 100%
            ) !important;
            border-radius: 50%;
            z-index: -1;
            filter: blur(1.5px);
            animation: pulseGlow 2s ease-in-out infinite;
            pointer-events: none;
          }
        }
      }

      /* Language selector - exclude from size constraints */
      dmc-language-selector {
        .cell button {
          width: initial !important;
          height: initial !important;
        }
      }
    }

    .cell {
      /* Reset button styles */
      appearance: none;
      -webkit-appearance: none;
      border: none;
      margin: 0;
      padding: 0;

      /* Full cell clickable */
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: relative;
    }

    .cell button {
      width: var(--button-size);
      height: var(--button-size);
      border: none;
      border-radius: 50%;
      background: var(--primary-color, #001B3F);
      box-shadow: 3px 3px 6px #000d1e,
                 -2px -2px 5px #002960;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      padding: 0;
    }

    .cell button.active, .cell button:active {
      box-shadow: inset 2px 2px 4px #000b19,
                 inset -1px -1px 3px #002b65;
    }

    .cell button.active .icon {
      position: relative;
    }

    .cell button.active .icon::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: calc(var(--icon-size) + 8px); /* Icon size + small padding */
      height: calc(var(--icon-size) + 8px);
      background: radial-gradient(circle at center,
        rgba(215, 227, 255, 0.6) 0%,
        rgba(215, 227, 255, 0.3) 40%,
        rgba(215, 227, 255, 0.1) 70%,
        rgba(215, 227, 255, 0) 100%
      );
      border-radius: 50%;
      z-index: -1; /* Place behind the icon */
      filter: blur(1.5px);
      animation: pulseGlow 2s ease-in-out infinite;
      pointer-events: none;
    }

    @keyframes pulseGlow {
      0% {
        transform: translate(-50%, -50%) scale(0.95);
        opacity: 0.6;
      }
      50% {
        transform: translate(-50%, -50%) scale(1.05);
        opacity: 0.8;
      }
      100% {
        transform: translate(-50%, -50%) scale(0.95);
        opacity: 0.6;
      }
    }

    .icon {
      color: var(--secondary-color, #D7E3FF) !important;
      display: flex;
      align-items: center;
      justify-content: center;
      will-change: transform;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      transform-origin: center;
    }

    .cell:hover .icon {
      transform: scale(1.1);
      opacity: 0.9;
    }

    /* No dividers between cells for cleaner mobile look */
  `]
})
export class MobileHeaderComponent implements OnDestroy {
  @Input() childData: any;
  @Input() content: any;
  @Input() config: any;
  @Input() routing: any;

  currentLang: 'en' | 'ar' = 'en';
  dropdownContents: any[] = [];
  private subscription: Subscription = new Subscription();

  constructor(
    private dropdownContentService: DropdownContentService,
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
  }

  onDropdownItemSelected(item: DropdownItem) {
    this.headerState.closeMenu();
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
  }

  getBreakpointClass(): string {
    if (!this.childData) return 'mobile-small';
    const { breakpoint } = this.childData;
    return breakpoint === 'mobile-small' ? 'mobile-small' : 'mobile-large';
  }
}
