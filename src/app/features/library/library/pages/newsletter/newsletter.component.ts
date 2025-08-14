import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '../../../../../shared/services/language.service';

interface NewsletterIssue {
  id: number;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  date: string;
  image: string;
  category: { en: string; ar: string };
  readTime: string;
  featured: boolean;
  tags: string[];
}

interface NewsletterCategory {
  id: number;
  name: { en: string; ar: string };
  icon: string;
  count: number;
  color: string;
}

@Component({
  selector: 'dmc-newsletter',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {
  isRTL = false;
  selectedCategory = 'all';

  categories: NewsletterCategory[] = [
    {
      id: 1,
      name: { en: 'All Newsletters', ar: 'جميع النشرات' },
      icon: 'article',
      count: 24,
      color: '#001B3F'
    },
    {
      id: 2,
      name: { en: 'Company Updates', ar: 'تحديثات الشركة' },
      icon: 'business',
      count: 8,
      color: '#002960'
    },
    {
      id: 3,
      name: { en: 'Industry Insights', ar: 'رؤى الصناعة' },
      icon: 'trending_up',
      count: 6,
      color: '#003d80'
    },
    {
      id: 4,
      name: { en: 'Sustainability', ar: 'الاستدامة' },
      icon: 'eco',
      count: 4,
      color: '#16a34a'
    },
    {
      id: 5,
      name: { en: 'Technology', ar: 'التكنولوجيا' },
      icon: 'computer',
      count: 3,
      color: '#2563eb'
    },
    {
      id: 6,
      name: { en: 'Events', ar: 'الفعاليات' },
      icon: 'event',
      count: 3,
      color: '#dc2626'
    }
  ];

  newsletters: NewsletterIssue[] = [
    {
      id: 1,
      title: {
        en: 'Q4 2024: Record Growth in Renewable Energy Sector',
        ar: 'الربع الرابع 2024: نمو قياسي في قطاع الطاقة المتجددة'
      },
      description: {
        en: 'Discover our latest achievements in renewable energy investments and sustainable business practices.',
        ar: 'اكتشف أحدث إنجازاتنا في استثمارات الطاقة المتجددة والممارسات التجارية المستدامة'
      },
      date: '2024-12-15',
      image: '/assets/images/newsletter/q4-2024.jpg',
      category: { en: 'Company Updates', ar: 'تحديثات الشركة' },
      readTime: '5 min read',
      featured: true,
      tags: ['renewable energy', 'sustainability', 'growth']
    },
    {
      id: 2,
      title: {
        en: 'The Future of Maritime Technology: AI and Automation',
        ar: 'مستقبل التكنولوجيا البحرية: الذكاء الاصطناعي والأتمتة'
      },
      description: {
        en: 'Exploring how artificial intelligence and automation are transforming the maritime industry.',
        ar: 'استكشاف كيفية تحويل الذكاء الاصطناعي والأتمتة للصناعة البحرية'
      },
      date: '2024-12-10',
      image: '/assets/images/newsletter/ai-maritime.jpg',
      category: { en: 'Technology', ar: 'التكنولوجيا' },
      readTime: '8 min read',
      featured: true,
      tags: ['AI', 'automation', 'maritime', 'technology']
    },
    {
      id: 3,
      title: {
        en: 'Global Energy Market Trends: 2024 Analysis',
        ar: 'اتجاهات السوق العالمية للطاقة: تحليل 2024'
      },
      description: {
        en: 'Comprehensive analysis of global energy market trends and their impact on our operations.',
        ar: 'تحليل شامل لاتجاهات السوق العالمية للطاقة وتأثيرها على عملياتنا'
      },
      date: '2024-12-05',
      image: '/assets/images/newsletter/energy-trends.jpg',
      category: { en: 'Industry Insights', ar: 'رؤى الصناعة' },
      readTime: '6 min read',
      featured: false,
      tags: ['energy markets', 'trends', 'analysis']
    },
    {
      id: 4,
      title: {
        en: 'Carbon Neutrality Progress Report',
        ar: 'تقرير تقدم الحياد الكربوني'
      },
      description: {
        en: 'Our latest progress towards achieving carbon neutrality by 2030.',
        ar: 'أحدث تقدمنا نحو تحقيق الحياد الكربوني بحلول عام 2030'
      },
      date: '2024-11-28',
      image: '/assets/images/newsletter/carbon-neutrality.jpg',
      category: { en: 'Sustainability', ar: 'الاستدامة' },
      readTime: '4 min read',
      featured: false,
      tags: ['carbon neutrality', 'sustainability', '2030']
    },
    {
      id: 5,
      title: {
        en: 'Annual Sustainability Summit 2024',
        ar: 'قمة الاستدامة السنوية 2024'
      },
      description: {
        en: 'Highlights from our annual sustainability summit and key announcements.',
        ar: 'أبرز ما جاء في قمة الاستدامة السنوية والإعلانات الرئيسية'
      },
      date: '2024-11-20',
      image: '/assets/images/newsletter/sustainability-summit.jpg',
      category: { en: 'Events', ar: 'الفعاليات' },
      readTime: '7 min read',
      featured: false,
      tags: ['sustainability', 'summit', 'events']
    },
    {
      id: 6,
      title: {
        en: 'Digital Transformation in Energy Trading',
        ar: 'التحول الرقمي في تجارة الطاقة'
      },
      description: {
        en: 'How digital transformation is revolutionizing our energy trading operations.',
        ar: 'كيف يحدث التحول الرقمي ثورة في عمليات تجارة الطاقة لدينا'
      },
      date: '2024-11-15',
      image: '/assets/images/newsletter/digital-transformation.jpg',
      category: { en: 'Technology', ar: 'التكنولوجيا' },
      readTime: '5 min read',
      featured: false,
      tags: ['digital transformation', 'energy trading', 'technology']
    }
  ];

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.languageService.currentLang$.subscribe(lang => {
      this.isRTL = lang === 'ar';
    });
  }

  getPageTitle(): string {
    return this.isRTL ? 'النشرة الإخبارية' : 'Newsletter';
  }

  getPageSubtitle(): string {
    return this.isRTL
      ? 'ابق على اطلاع بأحدث الأخبار والتحديثات من شركتنا'
      : 'Stay updated with the latest news and updates from our company';
  }

  getCategoryName(category: NewsletterCategory): string {
    return category.name[this.isRTL ? 'ar' : 'en'];
  }

  getNewsletterTitle(newsletter: NewsletterIssue): string {
    return newsletter.title[this.isRTL ? 'ar' : 'en'];
  }

  getNewsletterDescription(newsletter: NewsletterIssue): string {
    return newsletter.description[this.isRTL ? 'ar' : 'en'];
  }

  getNewsletterCategory(newsletter: NewsletterIssue): string {
    return newsletter.category[this.isRTL ? 'ar' : 'en'];
  }

  getFilteredNewsletters(): NewsletterIssue[] {
    if (this.selectedCategory === 'all') {
      return this.newsletters;
    }
    return this.newsletters.filter(newsletter =>
      newsletter.category.en === this.selectedCategory ||
      newsletter.category.ar === this.selectedCategory
    );
  }

  getFeaturedNewsletters(): NewsletterIssue[] {
    return this.newsletters.filter(newsletter => newsletter.featured);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString(this.isRTL ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  getCategoryColor(category: string): string {
    const colorMap: { [key: string]: string } = {
      'Company Updates': '#002960',
      'Industry Insights': '#003d80',
      'Sustainability': '#16a34a',
      'Technology': '#2563eb',
      'Events': '#dc2626'
    };
    return colorMap[category] || '#001B3F';
  }
}
