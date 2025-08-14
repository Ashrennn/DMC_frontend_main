import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { DropdownContent, DropdownItem } from '../../content/dropdown-content.types';
import { HeaderStateService, HeaderMenuType } from '../../services/header-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dmc-header-dropdown',
  standalone: true,
  imports: [CommonModule, MatIconModule],

  template: `
    <div class="dropdown-container">
      <button 
        class="trigger-button" 
        type="button" 
        (click)="toggleDropdown(); $event.stopPropagation()" 
        [attr.aria-label]="content.title[currentLang]"
        [class.active]="isOpen"
        [attr.aria-expanded]="isOpen">
        <mat-icon class="icon">{{ triggerIcon }}</mat-icon>
      </button>

      <div 
        class="dropdown-overlay"
        *ngIf="isOpen"
        (click)="isOpen = false">
      </div>
      <div 
        class="dropdown-menu" 
        *ngIf="isOpen" 
        (click)="$event.stopPropagation()"
        [class.rtl]="currentLang === 'ar'"
        [class.animating]="isOpen">
        <div class="glassmorphism-content">
          <div class="dropdown-header">
            <h3>{{ content.title[currentLang] }}</h3>
          </div>
          <div class="dropdown-body">
            <div 
              *ngFor="let item of content.items"
              class="menu-item"
              [class.disabled]="item.disabled"
              (click)="!item.disabled && selectItem(item)">
              <mat-icon class="item-icon" *ngIf="item.icon">{{ item.icon }}</mat-icon>
              <div class="item-content">
                <span class="item-label">{{ item.label[currentLang] }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dropdown-container {
      position: relative;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .trigger-button {
      appearance: none;
      -webkit-appearance: none;
      border: none;
      margin: 0;
      padding: 0;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border-radius: 50%;
      background: var(--primary-color, #001B3F);
      box-shadow: 3px 3px 6px #000d1e,
                 -2px -2px 5px #002960;
    }

    .trigger-button.active, .trigger-button:active {
      box-shadow: inset 2px 2px 4px #000b19,
                 inset -1px -1px 3px #002b65;
    }



    .trigger-button.active .icon {
      color: var(--secondary-color, #D7E3FF) !important;
      position: relative;
    }

    .trigger-button.active .icon::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: calc(24px + 8px); /* Icon size (24px) + small padding */
      height: calc(24px + 8px);
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
      0% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
      50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.6; }
      100% { transform: translate(-50%, -50%) scale(1); opacity: 0.8; }
    }

    .icon {
      font-size: 24px;
      line-height: 1;
      color: var(--secondary-color, #D7E3FF) !important;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      will-change: transform;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      transform-origin: center;
    }

    .dropdown-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin-top: var(--header-height, 60px);
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      z-index: 99999;
      animation: fadeIn 0.2s ease-out;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .dropdown-menu {
      position: fixed;
      top: var(--header-height, 60px);
      left: 50%;
      transform: translateX(-50%);
      width: min(80vw, 260px);
      z-index: 150000;
      animation: dropdownSlideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      /* Prevent positioning glitch */
      will-change: transform;
      transform-origin: center top;
      
      /* Enhanced Glassmorphism with subtle color overlay */
      background: linear-gradient(
        to bottom,
        rgba(215, 227, 255, 0.35),
        rgba(215, 227, 255, 0.25)
      );
      backdrop-filter: blur(12px) saturate(180%);
      -webkit-backdrop-filter: blur(12px) saturate(180%);
      border: 1px solid rgba(215, 227, 255, 0.25);
      border-radius: 16px;
      box-shadow: 
        0 8px 32px 0 rgba(0, 27, 63, 0.15),
        0 2px 8px 0 rgba(0, 27, 63, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.15);
      
      /* Ensure the dropdown stays within viewport */
      max-width: calc(100vw - 32px); /* 16px safe margin on each side */
      
      /* Prevent overflow on small screens */
      @media (max-width: 360px) {
        left: 16px;
        right: 16px;
        width: auto;
        transform: none;
      }
      
      /* Ensure immediate centering to prevent glitch */
      &:not(.animating) {
        transform: translateX(-50%) translateY(0);
      }
      
      /* Force immediate centering on appearance */
      &.animating {
        transform: translateX(-50%) translateY(0);
      }
      
      /* Ensure dropdown appears centered from the start */
      &:not(.animating) {
        transform: translateX(-50%) translateY(0);
      }
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

    @media (max-width: 360px) {
      @keyframes dropdownSlideDown {
        from {
          opacity: 0;
          transform: translateY(-8px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      /* Mobile-small specific positioning fix */
      .dropdown-menu {
        /* Preserve original mobile-small width behavior */
        left: 16px !important;
        right: 16px !important;
        width: auto !important;
        /* But ensure stable centering for the content */
        transform: none !important;
        /* Prevent any positioning glitches */
        will-change: transform;
        transform-origin: center top;
      }
    }

    .dropdown-menu.rtl {
      direction: rtl;
    }

    .glassmorphism-content {
      background: rgba(215, 227, 255, 0.15);
      overflow: hidden;
      border-radius: 16px;
    }

    .dropdown-header {
      padding: 0.75rem 1rem;
      border-bottom: 1px solid rgba(215, 227, 255, 0.25);
      background: rgba(215, 227, 255, 0.25);
    }

    .dropdown-header h3 {
      margin: 0;
      color: #001B3F;
      font-size: 0.95rem;
      font-weight: 500;
      text-align: center;
    }

    .dropdown-body {
      padding: 0.5rem;
      max-height: 60vh;
      overflow-y: auto;
    }

    .menu-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.625rem 0.75rem;
      cursor: pointer;
      border-radius: 6px;
      transition: all 0.2s ease;
      color: #001B3F;
      position: relative;
    }

    /* Divider between menu items */
    .menu-item:not(:last-child)::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 2rem); /* Thinner towards edges */
      height: 1px;
      background: linear-gradient(
        to right,
        rgba(0, 27, 63, 0),
        rgba(0, 27, 63, 0.1) 50%,
        rgba(0, 27, 63, 0)
      );
    }

    @keyframes iconLeanLTR {
      0% {
        transform: translateX(0) rotate(0deg);
      }
      100% {
        transform: translateX(2px) rotate(15deg);
      }
    }

    @keyframes iconLeanRTL {
      0% {
        transform: translateX(0) rotate(0deg);
      }
      100% {
        transform: translateX(-2px) rotate(-15deg);
      }
    }

    @keyframes textScale {
      0% {
        transform: translateX(0) scale(1);
        opacity: 1;
      }
      50% {
        transform: translateX(5px) scale(1.05);
        opacity: 0.9;
      }
      100% {
        transform: translateX(10px) scale(1.1);
        opacity: 0.8;
      }
    }

    .menu-item:hover:not(.disabled) {
      background: rgba(0, 27, 63, 0.05);
    }

    /* LTR icon animation */
    .menu-item:hover:not(.disabled) .item-icon {
      animation: iconLeanLTR 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      animation-fill-mode: forwards;
    }

    /* RTL icon animation */
    .dropdown-menu.rtl .menu-item:hover:not(.disabled) .item-icon {
      animation: iconLeanRTL 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      animation-fill-mode: forwards;
    }

    /* LTR direction animations */
    .menu-item:hover:not(.disabled) .item-label {
      animation: none;
      transform: translateX(5px) scale(1.05);
      opacity: 0.9;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* RTL direction animations */
    .dropdown-menu.rtl .menu-item:hover:not(.disabled) .item-label {
      transform: translateX(-5px) scale(1.05);
    }

    /* Reset state for both directions */
    .menu-item:not(:hover) .item-label {
      transform: translateX(0) scale(1);
      opacity: 1;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .menu-item:active:not(.disabled) {
      transform: translateY(0);
    }

    .menu-item.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .item-icon {
      font-size: 1.5rem;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      background: rgba(0, 27, 63, 0.05);
      border-radius: 4px;
      color: #001B3F;
      transform-origin: center;
      will-change: transform;
    }

    .item-content {
      flex: 1;
      min-width: 0; /* Enable text truncation */
      overflow: hidden; /* Contain transforms */
    }

    .item-label {
      display: block;
      font-size: 0.9rem;
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.2;
      width: 100%; /* Ensure full width */
    }

    @keyframes dropdownSlideDown {
      from {
        opacity: 0;
        transform: translateX(-50%) translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
      }
    }
  `]
})
export class HeaderDropdownComponent implements OnInit, OnDestroy {
  @Input() content!: DropdownContent;
  @Input() triggerIcon = '🔽';
  @Input() currentLang: 'en' | 'ar' = 'en';
  @Input() menuId!: HeaderMenuType;

  @Output() itemSelected = new EventEmitter<DropdownItem>();

  isOpen = false;
  private subscription!: Subscription;

  constructor(private headerState: HeaderStateService) {}

  toggleDropdown() {
    if (this.isOpen) {
      this.headerState.closeMenu();
    } else {
      this.headerState.openMenu(this.menuId);
    }
  }

  selectItem(item: DropdownItem) {
    this.itemSelected.emit(item);
    this.headerState.closeMenu();
  }

  ngOnInit() {
    // Add click handler to close dropdown when clicking outside
    document.addEventListener('click', this.onDocumentClick);
    
    // Subscribe to header state changes
    this.subscription = this.headerState.activeMenu$.subscribe(activeMenu => {
      this.isOpen = activeMenu === this.menuId;
    });
  }

  // No longer need manual position adjustment since we're using CSS-only positioning

  ngOnDestroy() {
    // Remove click handler
    document.removeEventListener('click', this.onDocumentClick);
    
    // Unsubscribe from header state
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private onDocumentClick = (event: MouseEvent) => {
    // Close dropdown if click is outside the dropdown container
    const container = (event.target as HTMLElement).closest('.dropdown-container');
    if (!container && this.isOpen) {
      this.headerState.closeMenu();
    }
  }
}
