import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '../../../../../../../shared/services/language.service';
import { Language } from '../../../../../../../shared/services/language.types';
import { HeaderStateService } from '../../services/header-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dmc-language-selector',
  standalone: true,
  imports: [CommonModule, MatIconModule] as const,
  template: `
    <div class="cell">
      <button type="button" 
        (click)="openLanguagePopup(); $event.stopPropagation()" 
        aria-label="Select Language"
        [class.active]="isPopupOpen">
        <mat-icon class="icon">translate</mat-icon>
      </button>
    </div>

    <div class="language-popup" *ngIf="isPopupOpen" (click)="$event.stopPropagation()">
      <div class="popup-content" [class.has-tooltip]="showTooltip !== null">
        <div class="popup-header">
          <h2>Select Language</h2>
          <button class="close-btn" (click)="closePopup()">✕</button>
        </div>
        <div class="language-grid">
          <button *ngFor="let lang of languages" 
                  class="lang-option"
                  [class.active]="currentLang === lang.code"
                  [class.disabled]="lang.disabled"
                  (click)="lang.disabled ? showDisabledMessage(lang) : selectLanguage(lang.code)">
            <span class="lang-flag">{{ lang.flag }}</span>
            <span class="lang-name">{{ lang.name }}</span>
          </button>
        </div>
      </div>
      <!-- Separate tooltip container -->
      <div class="tooltip-container" *ngIf="showTooltip">
        <div class="tooltip" [class.show]="true">
          Our hearts are with Palestine 🕊️ Damico and staff stand in solidarity with the humanitarian crisis in Gaza. We hope for peace and a future where all languages and cultures can thrive together in harmony. Your understanding means the world to us 🤍
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: contents;
    }

    .cell {
      appearance: none;
      -webkit-appearance: none;
      border: none;
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: relative;
    }

    .cell button {
      width: 32px;
      height: 32px;
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
      color: var(--secondary-color, #D7E3FF) !important;
      font-size: 24px;
      line-height: 1;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.3s ease;
    }



    .language-popup {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      z-index: 9999;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      animation: fadeIn 0.3s ease-out;
      overflow: hidden;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .popup-content {
      background: linear-gradient(145deg, #ffffff, #f8f9fa);
      width: 100%;
      height: 100%;
      max-width: 100%;
      position: relative;
      animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      color: white;
      display: flex;
      flex-direction: column;
      container-type: inline-size;
    }

    @keyframes slideUp {
      from {
        transform: translateY(30%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    .popup-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      border-bottom: 1px solid rgba(0, 27, 63, 0.1);
      position: sticky;
      top: 0;
      background: inherit;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }

    .popup-header h2 {
      margin: 0;
      font-size: 1.4rem;
      font-weight: 600;
      letter-spacing: 0.5px;
      color: #001B3F;
      flex-grow: 1;
      text-align: left;
      padding-right: 1rem;
    }

    /* RTL specific styles */
    :host-context([dir="rtl"]) {
      .popup-header h2 {
        text-align: right;
        padding-right: 0;
        padding-left: 1rem;
      }
    }

    .close-btn {
      border: none;
      background: rgba(0, 27, 63, 0.1);
      color: #001B3F;
      font-size: 1.2rem;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .close-btn:hover {
      background: rgba(0, 27, 63, 0.2);
      transform: rotate(90deg);
    }

    .language-grid {
      display: grid;
      grid-template-columns: repeat(2, 90px);
      gap: 1rem 2rem; /* horizontal gap bigger than vertical */
      padding: 1.5rem;
      flex: 1;
      overflow-y: auto;
      align-content: start;
      scrollbar-width: thin;
      scrollbar-color: rgba(0, 27, 63, 0.2) transparent;
      margin-right: 2px;
      width: 100%;
      justify-content: center;
    }

    /* Container query for adaptive columns */
    @container (min-width: 400px) {
      .language-grid {
        grid-template-columns: repeat(3, 90px);
      }
    }

    /* Fallback for browsers that don't support container queries */
    @media (min-width: 600px) {
      .popup-content {
        container-type: inline-size;
      }
    }

    .language-grid::-webkit-scrollbar {
      width: 6px;
    }

    .language-grid::-webkit-scrollbar-track {
      background: transparent;
    }

    .language-grid::-webkit-scrollbar-thumb {
      background-color: rgba(0, 27, 63, 0.2);
      border-radius: 3px;
    }

    .lang-option {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.25rem;
      padding: 0.5rem;
      width: 90px;
      height: 90px;
      border: 1px solid transparent;
      background: rgba(0, 27, 63, 0.03);
      cursor: pointer;
      transition: all 0.3s ease;
      border-radius: 50%;
      position: relative;
      overflow: hidden;
      box-sizing: border-box;
    }

    .lang-option:hover {
      background: rgba(0, 27, 63, 0.07);
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    @keyframes breathe {
      0% {
        box-shadow: 
          0 0 0 4px rgba(0, 27, 63, 0.05),
          0 4px 16px rgba(0, 27, 63, 0.2),
          inset 0 0 8px rgba(0, 27, 63, 0.1),
          0 0 20px rgba(0, 27, 63, 0.1);
      }
      50% {
        box-shadow: 
          0 0 0 6px rgba(0, 27, 63, 0.08),
          0 6px 20px rgba(0, 27, 63, 0.25),
          inset 0 0 12px rgba(0, 27, 63, 0.15),
          0 0 30px rgba(0, 27, 63, 0.2);
      }
      100% {
        box-shadow: 
          0 0 0 4px rgba(0, 27, 63, 0.05),
          0 4px 16px rgba(0, 27, 63, 0.2),
          inset 0 0 8px rgba(0, 27, 63, 0.1),
          0 0 20px rgba(0, 27, 63, 0.1);
      }
    }

    @keyframes borderBreathe {
      0% { border-color: rgba(0, 27, 63, 0.3); }
      50% { border-color: rgba(0, 27, 63, 0.5); }
      100% { border-color: rgba(0, 27, 63, 0.3); }
    }

    @keyframes textGlow {
      0% { text-shadow: 0 0 0 rgba(0, 27, 63, 0); }
      50% { text-shadow: 0 0 10px rgba(0, 27, 63, 0.2); }
      100% { text-shadow: 0 0 0 rgba(0, 27, 63, 0); }
    }

    .lang-option.active {
      background: rgba(0, 27, 63, 0.08);
      border: 2px solid rgba(0, 27, 63, 0.3);
      transform: scale(1.05);
      animation: 
        breathe 3s ease-in-out infinite,
        borderBreathe 3s ease-in-out infinite;
    }

    .lang-option.active:hover {
      transform: scale(1.05) translateY(-1px);
      animation: 
        breathe 2s ease-in-out infinite,
        borderBreathe 2s ease-in-out infinite;
    }

    .lang-option.active .lang-flag {
      filter: drop-shadow(0 2px 4px rgba(0, 27, 63, 0.2));
      animation: textGlow 3s ease-in-out infinite;
    }

    .lang-option.active .lang-name {
      font-weight: 600;
      color: #001B3F;
      animation: textGlow 3s ease-in-out infinite;
    }

    .lang-flag {
      font-size: 2rem;
      filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
      transition: transform 0.3s ease;
      margin-bottom: -0.25rem;
    }

    .lang-option:hover .lang-flag {
      transform: scale(1.1);
    }

    .lang-name {
      font-size: 0.8rem;
      font-weight: 500;
      color: #001B3F;
      text-align: center;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 0 0.25rem;
    }

    .lang-option.disabled {
      opacity: 0.7;
      position: relative;
      background: rgba(220, 53, 69, 0.1) !important;
      border: 2px solid rgba(220, 53, 69, 0.3) !important;
      cursor: not-allowed;
    }

    .lang-option.disabled:hover {
      transform: none !important;
      box-shadow: none !important;
    }

    .lang-option.disabled::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: repeating-linear-gradient(
        45deg,
        rgba(220, 53, 69, 0.1),
        rgba(220, 53, 69, 0.1) 10px,
        rgba(220, 53, 69, 0.2) 10px,
        rgba(220, 53, 69, 0.2) 20px
      );
      border-radius: 50%;
      z-index: 1;
    }

    .lang-option {
      position: relative;
    }

    .tooltip-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 200000;
    }

    .tooltip {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(255, 255, 255, 0.95);
      color: #2c5282;
      padding: 1.5rem 2.5rem;
      border-radius: 15px;
      font-size: 1rem;
      font-weight: 500;
      white-space: normal;
      max-width: min(80vw, 300px);
      width: max-content;
      line-height: 1.6;
      opacity: 0;
      display: none;
      box-shadow: 
        0 8px 32px rgba(44, 82, 130, 0.15),
        0 0 0 1px rgba(44, 82, 130, 0.1);
      border: 2px solid rgba(44, 82, 130, 0.2);
      pointer-events: none;
      text-align: center;
      z-index: 10;
    }

    .tooltip.show {
      opacity: 1;
      display: block;
      animation: fadeInScale 0.4s ease-out forwards;
    }

    .language-grid {
      position: relative;
      transition: filter 0.3s ease;
    }

    .has-tooltip .language-grid {
      filter: blur(8px);
    }

    /* Ensure tooltip is rendered separately from blurred content */
    .tooltip-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      z-index: 9999;
    }

    @keyframes fadeInScale {
      from {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.9);
      }
      to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
    }
  `]
})
export class LanguageSelectorComponent implements OnInit, OnDestroy {
  isPopupOpen = false;
  currentLang = 'en';
  showTooltip: string | null = null;
  tooltipTimeout: any;
  private subscription!: Subscription;

  private static initialized = false;

  ngOnInit() {
    if (!LanguageSelectorComponent.initialized) {
      LanguageSelectorComponent.initialized = true;
    }

    // Subscribe to header state changes
    this.subscription = this.headerState.activeMenu$.subscribe(activeMenu => {
      this.isPopupOpen = activeMenu === 'language';
      if (!this.isPopupOpen) {
        document.body.style.overflow = '';
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.tooltipTimeout) {
      clearTimeout(this.tooltipTimeout);
    }
  }

  get languages(): Language[] {
    return this.langService.languages;
  }

  constructor(
    private langService: LanguageService,
    private headerState: HeaderStateService
  ) {
    this.langService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  openLanguagePopup() {
    this.headerState.openMenu('language');
    document.body.style.overflow = 'hidden';
  }

  closePopup() {
    this.headerState.closeMenu();
    document.body.style.overflow = '';
  }

  selectLanguage(code: string) {
    this.langService.setLanguage(code);
    this.headerState.closeMenu();
  }

  showDisabledMessage(lang: Language) {
    // Clear any existing timeout
    if (this.tooltipTimeout) {
      clearTimeout(this.tooltipTimeout);
      this.tooltipTimeout = null;
    }

    // Show tooltip immediately
    this.showTooltip = lang.code;

    // Hide after delay
    this.tooltipTimeout = setTimeout(() => {
      this.showTooltip = null;
    }, 6000);
  }
}
