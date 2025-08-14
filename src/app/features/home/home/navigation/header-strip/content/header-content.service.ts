import { Injectable } from '@angular/core';
import { HeaderContent, HeaderContentData } from './language-content/header-content';

@Injectable({
  providedIn: 'root'
})
export class HeaderContentService {

  constructor() {}

  /**
   * Get header content
   */
  getContent(): HeaderContent {
    return HeaderContentData;
  }

  /**
   * Get brand information
   */
  getBrand(lang: 'en' | 'ar' = 'en') {
    const content = this.getContent();
    return {
      title: content.brand.title[lang],
      logo: content.brand.logo,
      tagline: content.brand.tagline[lang]
    };
  }

  /**
   * Get media assets
   */
  getMedia() {
    const content = this.getContent();
    return content.media;
  }

  /**
   * Get text content
   */
  getText(lang: 'en' | 'ar' = 'en') {
    const content = this.getContent();
    return {
      actions: {
        login: content.text.actions.login[lang],
        signup: content.text.actions.signup[lang],
        logout: content.text.actions.logout[lang],
        search: content.text.actions.search[lang],
        menu: content.text.actions.menu[lang]
      },
      labels: {
        brand: content.text.labels.brand[lang],
        tagline: content.text.labels.tagline[lang]
      },
      buttons: {
        whatsapp: content.text.buttons.whatsapp[lang],
        glossary: content.text.buttons.glossary[lang],
        internationalNews: content.text.buttons.internationalNews[lang],
        media: content.text.buttons.media[lang],
        language: content.text.buttons.language[lang]
      }
    };
  }

  /**
   * Get navigation links
   */
  getNavigation(lang: 'en' | 'ar' = 'en') {
    const content = this.getContent();
    return {
      primary: content.navigation.primary.map(link => ({
        ...link,
        text: link.text[lang]
      })),
      secondary: content.navigation.secondary.map(link => ({
        ...link,
        text: link.text[lang]
      }))
    };
  }

  /**
   * Get button text by key and language
   */
  getButtonText(key: string, lang: 'en' | 'ar' = 'en'): string {
    const content = this.getContent();
    const buttonTexts = {
      whatsapp: content.text.buttons.whatsapp[lang],
      glossary: content.text.buttons.glossary[lang],
      internationalNews: content.text.buttons.internationalNews[lang],
      media: content.text.buttons.media[lang],
      language: content.text.buttons.language[lang]
    };
    return buttonTexts[key as keyof typeof buttonTexts] || key;
  }
}
