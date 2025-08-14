import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../../../../../shared/services/language.service';

@Component({
  selector: 'dmc-language-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="cell" type="button" (click)="openLanguagePopup()" aria-label="Select Language">
      <span class="icon">🌍</span>
    </button>

    <div class="language-popup" *ngIf="isPopupOpen">
      <div class="popup-content">
        <div class="popup-header">
          <h2>Select Language</h2>
          <button class="close-btn" (click)="closePopup()">✕</button>
        </div>
        <div class="language-grid">
          <button *ngFor="let lang of languages" 
                  class="lang-option"
                  [class.active]="currentLang === lang.code"
                  (click)="selectLanguage(lang.code)">
            <span class="lang-flag">{{ lang.flag }}</span>
            <span class="lang-name">{{ lang.name }}</span>
          </button>
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
      background: transparent;
      border: none;
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .icon {
      font-size: 20px;
      line-height: 1;
    }

    .language-popup {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .popup-content {
      background: white;
      width: 100%;
      height: 100%;
      max-width: 100%;
      overflow-y: auto;
    }

    .popup-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      border-bottom: 1px solid #eee;
      position: sticky;
      top: 0;
      background: white;
    }

    .popup-header h2 {
      margin: 0;
      font-size: 1.2rem;
    }

    .close-btn {
      border: none;
      background: none;
      font-size: 1.5rem;
      padding: 0.5rem;
      cursor: pointer;
    }

    .language-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1px;
      background: #eee;
      padding: 1px;
    }

    .lang-option {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      padding: 1rem;
      border: none;
      background: white;
      cursor: pointer;
    }

    .lang-option.active {
      background: #f0f7ff;
    }

    .lang-flag {
      font-size: 2rem;
    }

    .lang-name {
      font-size: 0.9rem;
    }
  `]
})
export class LanguageSelectorComponent {
  isPopupOpen = false;
  currentLang = 'en';

  languages = [
    { code: 'en', flag: '🇺🇸', name: 'English' },
    { code: 'es', flag: '🇪🇸', name: 'Spanish' },
    { code: 'fr', flag: '🇫🇷', name: 'French' },
    { code: 'de', flag: '🇩🇪', name: 'German' },
    { code: 'it', flag: '🇮🇹', name: 'Italian' },
    { code: 'pt', flag: '🇵🇹', name: 'Portuguese' },
    { code: 'ru', flag: '🇷🇺', name: 'Russian' },
    { code: 'zh', flag: '🇨🇳', name: 'Chinese' },
    { code: 'ja', flag: '🇯🇵', name: 'Japanese' },
    { code: 'ko', flag: '🇰🇷', name: 'Korean' },
    { code: 'ar', flag: '🇸🇦', name: 'Arabic' },
    { code: 'hi', flag: '🇮🇳', name: 'Hindi' }
  ];

  constructor(private langService: LanguageService) {
    this.langService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  openLanguagePopup() {
    this.isPopupOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closePopup() {
    this.isPopupOpen = false;
    document.body.style.overflow = '';
  }

  selectLanguage(code: string) {
    this.langService.setLanguage(code);
    this.closePopup();
  }
}
