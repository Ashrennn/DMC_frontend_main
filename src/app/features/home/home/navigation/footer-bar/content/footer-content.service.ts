import { Injectable } from '@angular/core';
import { FooterTopContent, FooterBottomContent } from './footer-content.types';
import { FooterTopContentData } from './language-content/footer-top-content';
import { FooterBottomContentData } from './language-content/footer-bottom-content';

@Injectable({
  providedIn: 'root'
})
export class FooterContentService {

  constructor() {}

  /**
   * Get footer top container content
   */
  getTopContainerContent(): FooterTopContent {
    return FooterTopContentData;
  }

  /**
   * Get footer bottom container content
   */
  getBottomContainerContent(): FooterBottomContent {
    return FooterBottomContentData;
  }

  // Helper methods for bottom container
  getCompanyInfo(lang: 'en' | 'ar' = 'en') {
    const content = this.getBottomContainerContent();
    const currentYear = new Date().getFullYear();
    const yearText = lang === 'ar' ? this.convertToArabicNumerals(currentYear.toString()) : currentYear.toString();
    
    return {
      name: content.companyInfo.name[lang],
      copyright: content.companyInfo.copyright[lang].replace('{{year}}', yearText),
      registered: content.companyInfo.registered
    };
  }

  getDisclaimer(lang: 'en' | 'ar' = 'en') {
    const content = this.getBottomContainerContent();
    return content.disclaimer.content[lang];
  }

  getLegalLinks(lang: 'en' | 'ar' = 'en') {
    const content = this.getBottomContainerContent();
    return content.legalLinks.map(link => ({
      ...link,
      label: link.label[lang]
    }));
  }

  /**
   * Get credits section content
   */
  getCredits(lang: 'en' | 'ar' = 'en') {
    const content = this.getBottomContainerContent();
    return {
      title: content.credits.title[lang],
      links: content.credits.links.map(link => ({
        ...link,
        label: link.label[lang]
      }))
    };
  }

  /**
   * Get section titles
   */
  getSectionTitles(lang: 'en' | 'ar' = 'en') {
    const content = this.getBottomContainerContent();
    return {
      legal: content.sectionTitles.legal[lang],
      security: content.sectionTitles.security[lang],
      regulatory: content.sectionTitles.regulatory[lang]
    };
  }

  // Helper methods for top container
  getTopRowContent(lang: 'en' | 'ar' = 'en') {
    const content = this.getTopContainerContent();
    return {
      title: content.topRow.title[lang],
      description: content.topRow.description[lang]
    };
  }

  getLocationData(lang: 'en' | 'ar' = 'en') {
    const content = this.getTopContainerContent();
    const rawAddress = content.location.address[lang];
    const address = lang === 'ar' ? this.convertToArabicNumerals(rawAddress) : rawAddress;
    return {
      title: content.location.title[lang],
      address,
      coordinates: content.location.coordinates
    };
  }

  getQuickConnectData(lang: 'en' | 'ar' = 'en') {
    const content = this.getTopContainerContent();
    return {
      stayUpdated: {
        title: content.quickConnect.stayUpdated.title[lang],
        description: content.quickConnect.stayUpdated.description[lang],
        emailPlaceholder: content.quickConnect.stayUpdated.emailPlaceholder[lang],
        subscribeButton: content.quickConnect.stayUpdated.subscribeButton[lang]
      },
      followUs: {
        title: content.quickConnect.followUs.title[lang],
        socialLinks: content.quickConnect.followUs.socialLinks.map(link => ({
          ...link,
          label: link.label[lang]
        }))
      },
      actionButtons: content.quickConnect.actionButtons.map(button => ({
        ...button,
        label: button.label[lang]
      }))
    };
  }

  getLogos(lang: 'en' | 'ar' = 'en') {
    const content = this.getTopContainerContent();
    return {
      company: {
        ...content.logos.company,
        alt: content.logos.company.alt[lang]
      },
      ssl: {
        ...content.logos.ssl,
        alt: content.logos.ssl.alt[lang]
      }
    };
  }

  getDownloadsData(lang: 'en' | 'ar' = 'en') {
    const content = this.getTopContainerContent();
    return content.downloads.map(category => ({
      title: category.title[lang],
      documents: category.documents.map(document => ({
        id: document.id,
        name: document.name[lang],
        icon: document.icon,
        url: document.url
      }))
    }));
  }

  getTopSectionTitles(lang: 'en' | 'ar' = 'en') {
    const content = this.getTopContainerContent();
    return {
      siteMap: content.sectionTitles.siteMap[lang],
      downloads: content.sectionTitles.downloads[lang],
      ourLocation: content.sectionTitles.ourLocation[lang]
    };
  }

  private convertToArabicNumerals(englishNumber: string): string {
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return englishNumber.replace(/[0-9]/g, (digit) => arabicNumerals[parseInt(digit)]);
  }
}
