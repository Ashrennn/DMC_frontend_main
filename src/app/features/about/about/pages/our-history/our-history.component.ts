import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '../../../../../shared/services/language.service';

interface TimelineEvent {
  year: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  icon: string;
  category: 'milestone' | 'achievement' | 'expansion' | 'innovation';
  image?: string;
}

@Component({
  selector: 'dmc-our-history',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './our-history.component.html',
  styleUrls: ['./our-history.component.scss']
})
export class OurHistoryComponent implements OnInit {
  isRTL = false;

  timelineEvents: TimelineEvent[] = [
    {
      year: '1998',
      title: { en: 'Company Founded', ar: 'تأسيس الشركة' },
      description: {
        en: 'DMCNRG was established as a small energy trading company in the UAE, focusing on regional energy markets.',
        ar: 'تم تأسيس DMCNRG كشركة تجارة طاقة صغيرة في الإمارات، مع التركيز على أسواق الطاقة الإقليمية'
      },
      icon: 'business',
      category: 'milestone',
      image: 'images/about/our-history/comp2/bg1.jpg'
    },
    {
      year: '2005',
      title: { en: 'Maritime Expansion', ar: 'التوسع البحري' },
      description: {
        en: 'Expanded into maritime services, establishing our first bunkering operations in the Persian Gulf.',
        ar: 'توسعنا في الخدمات البحرية، وإنشاء أول عمليات التزود بالوقود في الخليج الفارسي'
      },
      icon: 'local_shipping',
      category: 'expansion',
      image: 'images/about/our-history/comp2/bg2.jpg'
    },
    {
      year: '2010',
      title: { en: 'Regional Leadership', ar: 'القيادة الإقليمية' },
      description: {
        en: 'Became the leading energy and maritime services provider in the Middle East region.',
        ar: 'أصبحنا المزود الرائد للطاقة والخدمات البحرية في منطقة الشرق الأوسط'
      },
      icon: 'emoji_events',
      category: 'achievement',
      image: 'images/about/our-history/comp2/bg3.jpg'
    },
    {
      year: '2015',
      title: { en: 'Global Operations', ar: 'العمليات العالمية' },
      description: {
        en: 'Extended operations to 15+ countries across Asia, Africa, and Europe.',
        ar: 'وسعنا العمليات إلى أكثر من 15 دولة في آسيا وأفريقيا وأوروبا'
      },
      icon: 'public',
      category: 'expansion',
      image: 'images/about/our-history/comp2/bg4.jpg'
    },
    {
      year: '2020',
      title: { en: 'Digital Transformation', ar: 'التحول الرقمي' },
      description: {
        en: 'Launched comprehensive digital platforms for energy trading and maritime services.',
        ar: 'أطلقنا منصات رقمية شاملة لتجارة الطاقة والخدمات البحرية'
      },
      icon: 'computer',
      category: 'innovation'
    },
    {
      year: '2023',
      title: { en: 'Sustainability Focus', ar: 'التركيز على الاستدامة' },
      description: {
        en: 'Committed to carbon-neutral operations and renewable energy investments.',
        ar: 'التزمنا بعمليات محايدة للكربون واستثمارات الطاقة المتجددة'
      },
      icon: 'eco',
      category: 'innovation'
    }
  ];

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.languageService.currentLang$.subscribe(lang => {
      this.isRTL = lang === 'ar';
    });
  }

  getPageTitle(): string {
    return this.isRTL ? 'تاريخنا' : 'Our History';
  }

  getPageSubtitle(): string {
    return this.isRTL
      ? 'رحلة من 25 عاماً من النمو والابتكار في مجال الطاقة والخدمات البحرية'
      : 'A 25-year journey of growth and innovation in energy and maritime services';
  }

  getEventTitle(event: TimelineEvent): string {
    return event.title[this.isRTL ? 'ar' : 'en'];
  }

  getEventDescription(event: TimelineEvent): string {
    return event.description[this.isRTL ? 'ar' : 'en'];
  }

  getCategoryLabel(category: string): string {
    const labels = {
      'milestone': this.isRTL ? 'معلم' : 'Milestone',
      'achievement': this.isRTL ? 'إنجاز' : 'Achievement',
      'expansion': this.isRTL ? 'توسع' : 'Expansion',
      'innovation': this.isRTL ? 'ابتكار' : 'Innovation'
    };
    return labels[category as keyof typeof labels] || category;
  }

  getStatsTitle(): string {
    return this.isRTL ? 'أرقام تتحدث عن نفسها' : 'Numbers That Speak';
  }

  getStatLabel(key: string): string {
    const labels = {
      'years': this.isRTL ? 'سنوات من الخبرة' : 'Years of Experience',
      'employees': this.isRTL ? 'موظف' : 'Employees',
      'countries': this.isRTL ? 'دولة' : 'Countries',
      'vessels': this.isRTL ? 'سفينة' : 'Vessels Served'
    };
    return labels[key as keyof typeof labels] || key;
  }
}
