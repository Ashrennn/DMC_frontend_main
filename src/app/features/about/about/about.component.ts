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
  selector: 'dmc-about',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
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

    // Listen to route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute = event.url;
    });

    // Set initial route
    this.currentRoute = this.router.url;
  }

  getCurrentPageContent(): PageContent {
    const route = this.currentRoute;

    if (route.includes('our-history')) {
      return {
        badgeIcon: 'history',
        badgeText: this.isRTL ? 'تاريخنا' : 'Our Story',
        title: this.isRTL ? 'تعرف على تاريخنا' : 'Discover Our History',
        subtitle: this.isRTL
          ? 'من البدايات المتواضعة إلى الريادة في مجال الطاقة والخدمات البحرية'
          : 'From humble beginnings to leadership in energy and maritime services'
      };
    } else if (route.includes('what-we-do')) {
      return {
        badgeIcon: 'business_center',
        badgeText: this.isRTL ? 'خدماتنا' : 'Our Services',
        title: this.isRTL ? 'ما نقوم به' : 'What We Do',
        subtitle: this.isRTL
          ? 'خدمات شاملة في مجال الطاقة والخدمات البحرية على مستوى العالم'
          : 'Comprehensive energy and maritime services worldwide'
      };
    } else if (route.includes('our-people')) {
      return {
        badgeIcon: 'people',
        badgeText: this.isRTL ? 'فريقنا' : 'Our Team',
        title: this.isRTL ? 'أشخاصنا' : 'Our People',
        subtitle: this.isRTL
          ? 'فريق من الخبراء المتفانين يقودون الابتكار والتميز'
          : 'A team of dedicated experts driving innovation and excellence'
      };
    } else if (route.includes('our-values')) {
      return {
        badgeIcon: 'favorite',
        badgeText: this.isRTL ? 'قيمنا' : 'Our Values',
        title: this.isRTL ? 'قيمنا الأساسية' : 'Our Core Values',
        subtitle: this.isRTL
          ? 'المبادئ التي تقود رحلتنا نحو النجاح والاستدامة'
          : 'The principles that guide our journey to success and sustainability'
      };
    }

    // Default content
    return {
      badgeIcon: 'info',
      badgeText: this.isRTL ? 'من نحن' : 'About Us',
      title: this.isRTL ? 'تعرف علينا' : 'About Us',
      subtitle: this.isRTL
        ? 'اكتشف قصة نجاحنا ورحلتنا في عالم الطاقة والخدمات البحرية'
        : 'Discover our success story and journey in energy and maritime services'
    };
  }

  getNavText(key: string): string {
    const navTexts = {
      'history': this.isRTL ? 'تاريخنا' : 'Our History',
      'what-we-do': this.isRTL ? 'ما نقوم به' : 'What We Do',
      'our-people': this.isRTL ? 'أشخاصنا' : 'Our People',
      'our-values': this.isRTL ? 'قيمنا' : 'Our Values'
    };
    return navTexts[key as keyof typeof navTexts] || key;
  }
}

