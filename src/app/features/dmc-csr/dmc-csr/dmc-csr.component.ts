import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '../../../shared/services/language.service';
import { filter } from 'rxjs/operators';

interface PageContent {
  badgeIcon: string;
  badgeText: string;
  title: string;
  subtitle: string;
}

@Component({
  selector: 'dmc-csr',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './dmc-csr.component.html',
  styleUrls: ['./dmc-csr.component.scss']
})
export class DmcCsrComponent implements OnInit {
  isRTL = false;
  currentRoute = '';

  constructor(
    private languageService: LanguageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.languageService.currentLang$.subscribe(lang => {
      this.isRTL = lang === 'ar';
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.url;
    });

    this.currentRoute = this.router.url;
  }

  getCurrentPageContent(): PageContent {
    const route = this.currentRoute;

    if (route.includes('our-brands')) {
      return {
        badgeIcon: 'branding_watermark',
        badgeText: this.isRTL ? 'علاماتنا التجارية' : 'Our Brands',
        title: this.isRTL ? 'علاماتنا التجارية' : 'Our Brands',
        subtitle: this.isRTL
          ? 'اكتشف مجموعة علاماتنا التجارية المتنوعة والموثوقة'
          : 'Discover our diverse and trusted portfolio of brands'
      };
    }

    if (route.includes('mohade-charity')) {
      return {
        badgeIcon: 'volunteer_activism',
        badgeText: this.isRTL ? 'مؤسسة محاد الخيرية' : 'Mohade Charity',
        title: this.isRTL ? 'مؤسسة محاد الخيرية' : 'Mohade Charity',
        subtitle: this.isRTL
          ? 'التزامنا بالمسؤولية الاجتماعية والتنمية المستدامة'
          : 'Our commitment to social responsibility and sustainable development'
      };
    }

    if (route.includes('photo-gallery')) {
      return {
        badgeIcon: 'photo_library',
        badgeText: this.isRTL ? 'معرض الصور' : 'Photo Gallery',
        title: this.isRTL ? 'معرض الصور' : 'Photo Gallery',
        subtitle: this.isRTL
          ? 'شاهد لحظاتنا المميزة ومشاريعنا الإنسانية'
          : 'View our memorable moments and humanitarian projects'
      };
    }

    // Default content
    return {
      badgeIcon: 'corporate_fare',
      badgeText: this.isRTL ? 'المسؤولية الاجتماعية' : 'Corporate Social Responsibility',
      title: this.isRTL ? 'المسؤولية الاجتماعية للشركات' : 'Corporate Social Responsibility',
      subtitle: this.isRTL
        ? 'التزامنا تجاه المجتمع والبيئة والتنمية المستدامة'
        : 'Our commitment to society, environment, and sustainable development'
    };
  }

  getNavText(key: string): string {
    const navTexts = {
      'our-brands': this.isRTL ? 'علاماتنا التجارية' : 'Our Brands',
      'mohade-charity': this.isRTL ? 'مؤسسة محاد الخيرية' : 'Mohade Charity',
      'photo-gallery': this.isRTL ? 'معرض الصور' : 'Photo Gallery'
    };
    return navTexts[key as keyof typeof navTexts] || key;
  }

  getPageTitle(): string {
    return this.getCurrentPageContent().title;
  }

  getPageSubtitle(): string {
    return this.getCurrentPageContent().subtitle;
  }
}
