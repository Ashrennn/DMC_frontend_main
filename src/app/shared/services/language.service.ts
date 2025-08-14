import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Language } from './language.types';

@Injectable({
  providedIn: 'root'
})

export class LanguageService {
  private currentLang = new BehaviorSubject<string>('en');
  currentLang$ = this.currentLang.asObservable();

  readonly languages: Language[] = [
    // First row - RTL languages
    { code: 'ar', flag: '🇸🇦', name: 'Arabic', nativeName: 'العربية', direction: 'rtl' },
    { code: 'he', flag: '🇮🇱', name: 'Hebrew', nativeName: 'עברית', direction: 'rtl', disabled: true, disabledMessage: 'We hope for peace and unity in the region. Coming soon when peace prevails 🕊️' },
    { code: 'fa', flag: '🇮🇷', name: 'Persian', nativeName: 'فارسی', direction: 'rtl' },
    // Remaining languages
    { code: 'en', flag: '🇺🇸', name: 'English', nativeName: 'English', direction: 'ltr' },
    { code: 'es', flag: '🇪🇸', name: 'Spanish', nativeName: 'Español', direction: 'ltr' },
    { code: 'fr', flag: '🇫🇷', name: 'French', nativeName: 'Français', direction: 'ltr' },
    { code: 'de', flag: '🇩🇪', name: 'German', nativeName: 'Deutsch', direction: 'ltr' },
    { code: 'it', flag: '🇮🇹', name: 'Italian', nativeName: 'Italiano', direction: 'ltr' },
    { code: 'pt', flag: '🇵🇹', name: 'Portuguese', nativeName: 'Português', direction: 'ltr' },
    { code: 'ru', flag: '🇷🇺', name: 'Russian', nativeName: 'Русский', direction: 'ltr' },
    { code: 'zh', flag: '🇨🇳', name: 'Chinese', nativeName: '中文', direction: 'ltr' },
    { code: 'ja', flag: '🇯🇵', name: 'Japanese', nativeName: '日本語', direction: 'ltr' },
    { code: 'ko', flag: '🇰🇷', name: 'Korean', nativeName: '한국어', direction: 'ltr' },
    { code: 'hi', flag: '🇮🇳', name: 'Hindi', nativeName: 'हिन्दी', direction: 'ltr' },
    { code: 'th', flag: '🇹🇭', name: 'Thai', nativeName: 'ไทย', direction: 'ltr' },
    { code: 'tr', flag: '🇹🇷', name: 'Turkish', nativeName: 'Türkçe', direction: 'ltr' },
    { code: 'uz', flag: '🇺🇿', name: 'Uzbek', nativeName: 'O\'zbek tili', direction: 'ltr' },
    { code: 'kk', flag: '🇰🇿', name: 'Kazakh', nativeName: 'Kazak tili', direction: 'ltr' }
  ];

  constructor() {
    this.initializeLanguage();
  }

  setLanguage(lang: string) {
    console.log('Language service setting language to:', lang);
    if (this.languages.some(l => l.code === lang)) {
      this.currentLang.next(lang);
      
      // Only save to localStorage if in browser environment
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('preferred_language', lang);
        console.log('Language saved in localStorage:', localStorage.getItem('preferred_language'));
      }
      
      // Update document direction based on language (only in browser)
      const selectedLang = this.languages.find(l => l.code === lang);
      if (selectedLang && typeof document !== 'undefined') {
        document.dir = selectedLang.direction;
        document.documentElement.lang = lang;
      }
    }
  }

  getCurrentLanguage(): Language | undefined {
    return this.languages.find(lang => lang.code === this.currentLang.value);
  }

  private initializeLanguage() {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedLang = localStorage.getItem('preferred_language');
      
      if (savedLang && this.languages.some(l => l.code === savedLang)) {
        // Use saved language preference if available
        this.setLanguage(savedLang);
      } else {
        // Try to detect browser language
        const browserLang = this.detectBrowserLanguage();
        if (browserLang) {
          this.setLanguage(browserLang);
        } else {
          this.setLanguage('en'); // Default to English if no detection
        }
      }
    } else {
      // Server environment - use default language
      this.setLanguage('en');
    }
  }

  private detectBrowserLanguage(): string | null {
    try {
      // Get all browser languages in order of preference
      const browserLanguages = navigator.languages || [navigator.language];
      
      // Language families that are close enough to understand each other
      const languageFamilies: { [key: string]: string } = {
        // Turkic language family mappings
        'tr-tr': 'tr', // Turkish (Turkey)
        'tr-cy': 'tr', // Turkish (Cyprus)
        
        // Uzbek variants and related
        'uz-uz': 'uz', // Uzbek (Uzbekistan)
        'uz-af': 'uz', // Uzbek (Afghanistan)
        'uz-latn': 'uz', // Latin script
        'uz-cyrl': 'uz', // Cyrillic script
        
        // Kazakh variants and related
        'kk-kz': 'kk', // Kazakh (Kazakhstan)
        'kk-cn': 'kk', // Kazakh (China)
        'kk-mn': 'kk', // Kazakh (Mongolia)
        
        // Cross-family fallbacks (for unsupported Turkic languages)
        'ky': 'uz',    // Kyrgyz → Uzbek
        'tk': 'uz',    // Turkmen → Uzbek
        'az': 'tr',    // Azerbaijani → Turkish
        'ug': 'uz',     // Uyghur → Uzbek
        
        // Arabic variants
        'ar-sa': 'ar',
        'ar-ae': 'ar',
        'ar-eg': 'ar',
        'ar-ma': 'ar',
        
        // English variants
        'en-us': 'en',
        'en-gb': 'en',
        'en-au': 'en',
        'en-ca': 'en',
        
        // Chinese variants
        'zh-cn': 'zh',
        'zh-tw': 'zh',
        'zh-hk': 'zh',
        'zh-sg': 'zh',
        
        // Other similar languages
        'hi-in': 'hi',
        'ur': 'hi',    // Urdu → Hindi (similar script)
        'bn': 'hi',    // Bengali → Hindi
        
        // European languages
        'pt-br': 'pt',
        'pt-pt': 'pt'
      };

      // Try each browser language in order
      for (const lang of browserLanguages) {
        const langLower = lang.toLowerCase();
        const primaryLang = langLower.split('-')[0];

        // 1. Check exact match
        if (this.languages.some(l => l.code === langLower)) {
          console.log('Found exact language match:', langLower);
          return langLower;
        }

        // 2. Check primary language
        if (this.languages.some(l => l.code === primaryLang)) {
          console.log('Found primary language match:', primaryLang);
          return primaryLang;
        }

        // 3. Check language families
        if (languageFamilies[primaryLang]) {
          const familyLang = languageFamilies[primaryLang];
          if (this.languages.some(l => l.code === familyLang)) {
            console.log('Found language family match:', primaryLang, '→', familyLang);
            return familyLang;
          }
        }

        // 4. Check full language code in mapping
        if (languageFamilies[langLower]) {
          const mappedLang = languageFamilies[langLower];
          if (this.languages.some(l => l.code === mappedLang)) {
            console.log('Found language mapping match:', langLower, '→', mappedLang);
            return mappedLang;
          }
        }
      }

      // If no matches found, check if any browser language is RTL
      // and default to Arabic for better accessibility
      for (const lang of browserLanguages) {
        const rtlLanguages = ['ar', 'fa', 'he', 'ur', 'uz', 'ug'];
        if (rtlLanguages.includes(lang.split('-')[0].toLowerCase())) {
          console.log('Found RTL language, defaulting to Arabic');
          return 'ar';
        }
      }

      // Default to English if no matches
      console.log('No language matches found, defaulting to English');
      return 'en';
    } catch (error) {
      console.error('Error detecting browser language:', error);
      return 'en';
    }
  }
}
