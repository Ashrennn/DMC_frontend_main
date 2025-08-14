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
  selector: 'dmc-library',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
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

    if (route.includes('newsletter')) {
      return {
        badgeIcon: 'article',
        badgeText: this.isRTL ? 'النشرة الإخبارية' : 'Newsletter',
        title: this.isRTL ? 'النشرة الإخبارية' : 'Newsletter',
        subtitle: this.isRTL
          ? 'ابق على اطلاع بأحدث الأخبار والتحديثات من شركتنا'
          : 'Stay updated with the latest news and updates from our company'
      };
    }

    if (route.includes('video-gallery')) {
      return {
        badgeIcon: 'video_collection',
        badgeText: this.isRTL ? 'معرض الفيديو' : 'Video Gallery',
        title: this.isRTL ? 'معرض الفيديو' : 'Video Gallery',
        subtitle: this.isRTL
          ? 'شاهد مقاطع الفيديو والعروض التقديمية'
          : 'Watch videos and presentations'
      };
    }

    if (route.includes('products-services')) {
      return {
        badgeIcon: 'category',
        badgeText: this.isRTL ? 'المنتجات والخدمات' : 'Products & Services',
        title: this.isRTL ? 'المنتجات والخدمات' : 'Products & Services',
        subtitle: this.isRTL
          ? 'تعرف على منتجاتنا وخدماتنا'
          : 'Learn about our products and services'
      };
    }

    // Default content
    return {
      badgeIcon: 'library_books',
      badgeText: this.isRTL ? 'المكتبة' : 'Library',
      title: this.isRTL ? 'مكتبتنا' : 'Our Library',
      subtitle: this.isRTL
        ? 'مجموعة شاملة من الموارد والمعلومات'
        : 'A comprehensive collection of resources and information'
    };
  }

  getNavText(key: string): string {
    const navTexts = {
      'newsletter': this.isRTL ? 'النشرة الإخبارية' : 'Newsletter',
      'video-gallery': this.isRTL ? 'معرض الفيديو' : 'Video Gallery',
      'products-services': this.isRTL ? 'المنتجات والخدمات' : 'Products & Services'
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
