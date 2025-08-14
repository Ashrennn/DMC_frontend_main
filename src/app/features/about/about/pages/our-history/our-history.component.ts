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
}

@Component({
  selector: 'dmc-our-history',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="history-container" [class.rtl]="isRTL">
      <!-- Page Header -->
      <header class="page-header">
        <div class="header-content">
          <div class="header-icon">
            <mat-icon>timeline</mat-icon>
          </div>
          <h1 class="page-title">{{ getPageTitle() }}</h1>
          <p class="page-subtitle">{{ getPageSubtitle() }}</p>
        </div>
      </header>

      <!-- Timeline Section -->
      <section class="timeline-section">
        <div class="timeline-container">
          <div class="timeline-line"></div>
          
          <div class="timeline-events">
            <div *ngFor="let event of timelineEvents; let i = index" 
                 class="timeline-event"
                 [class]="'event-' + event.category"
                 [class.left]="i % 2 === 0"
                 [class.right]="i % 2 === 1">
              
              <!-- Timeline Dot -->
              <div class="timeline-dot">
                <mat-icon>{{ event.icon }}</mat-icon>
              </div>
              
              <!-- Event Content -->
              <div class="event-content">
                <div class="event-header">
                  <span class="event-year">{{ event.year }}</span>
                  <h3 class="event-title">{{ getEventTitle(event) }}</h3>
                </div>
                <p class="event-description">{{ getEventDescription(event) }}</p>
                
                <!-- Category Badge -->
                <div class="event-category">
                  <span class="category-badge" [class]="'badge-' + event.category">
                    {{ getCategoryLabel(event.category) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Company Stats Section -->
      <section class="stats-section">
        <div class="stats-container">
          <h2 class="stats-title">{{ getStatsTitle() }}</h2>
          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-icon">
                <mat-icon>business</mat-icon>
              </div>
              <div class="stat-content">
                <span class="stat-number">25+</span>
                <span class="stat-label">{{ getStatLabel('years') }}</span>
              </div>
            </div>
            
            <div class="stat-item">
              <div class="stat-icon">
                <mat-icon>people</mat-icon>
              </div>
              <div class="stat-content">
                <span class="stat-number">500+</span>
                <span class="stat-label">{{ getStatLabel('employees') }}</span>
              </div>
            </div>
            
            <div class="stat-item">
              <div class="stat-icon">
                <mat-icon>public</mat-icon>
              </div>
              <div class="stat-content">
                <span class="stat-number">15+</span>
                <span class="stat-label">{{ getStatLabel('countries') }}</span>
              </div>
            </div>
            
            <div class="stat-item">
              <div class="stat-icon">
                <mat-icon>local_shipping</mat-icon>
              </div>
              <div class="stat-content">
                <span class="stat-number">1000+</span>
                <span class="stat-label">{{ getStatLabel('vessels') }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .history-container {
      max-width: 100%;
    }

    /* Page Header */
    .page-header {
      text-align: center;
      margin-bottom: 4rem;
      padding: 2rem 0;
    }

    .header-content {
      max-width: 800px;
      margin: 0 auto;
    }

    .header-icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      height: 80px;
      background: linear-gradient(135deg, #001B3F, #002960);
      border-radius: 50%;
      margin-bottom: 1.5rem;
      box-shadow: 0 8px 32px rgba(0, 27, 63, 0.3);
    }

    .header-icon mat-icon {
      font-size: 2.5rem;
      width: 2.5rem;
      height: 2.5rem;
      color: white;
    }

    .page-title {
      font-size: clamp(2rem, 4vw, 3rem);
      font-weight: 700;
      color: #001B3F;
      margin: 0 0 1rem 0;
      line-height: 1.2;
    }

    .page-subtitle {
      font-size: clamp(1.1rem, 2vw, 1.3rem);
      color: #64748b;
      line-height: 1.6;
      margin: 0;
      max-width: 600px;
      margin: 0 auto;
    }

    /* Timeline Section */
    .timeline-section {
      margin: 4rem 0;
      position: relative;
    }

    .timeline-container {
      position: relative;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
    }

    .timeline-line {
      position: absolute;
      left: 50%;
      top: 0;
      bottom: 0;
      width: 4px;
      background: linear-gradient(to bottom, #001B3F, #002960, #003d80);
      border-radius: 2px;
      transform: translateX(-50%);
      z-index: 1;
    }

    .timeline-events {
      position: relative;
      z-index: 2;
    }

    .timeline-event {
      position: relative;
      margin: 3rem 0;
      display: flex;
      align-items: center;
      
      &.left {
        flex-direction: row;
        justify-content: flex-start;
        
        .event-content {
          margin-left: 2rem;
          text-align: left;
        }
      }
      
      &.right {
        flex-direction: row-reverse;
        justify-content: flex-end;
        
        .event-content {
          margin-right: 2rem;
          text-align: right;
        }
      }
    }

    .timeline-dot {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 60px;
      height: 60px;
      background: white;
      border: 4px solid #001B3F;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 16px rgba(0, 27, 63, 0.3);
      z-index: 3;
      transition: all 0.3s ease;
      
      mat-icon {
        font-size: 1.5rem;
        width: 1.5rem;
        height: 1.5rem;
        color: #001B3F;
      }
      
      &:hover {
        transform: translate(-50%, -50%) scale(1.1);
        box-shadow: 0 8px 24px rgba(0, 27, 63, 0.4);
      }
    }

    .event-content {
      flex: 1;
      max-width: 400px;
      background: white;
      padding: 2rem;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0, 27, 63, 0.1);
      border: 1px solid rgba(0, 27, 63, 0.1);
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 16px 48px rgba(0, 27, 63, 0.15);
      }
    }

    .event-header {
      margin-bottom: 1rem;
    }

    .event-year {
      display: inline-block;
      background: linear-gradient(135deg, #001B3F, #002960);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 25px;
      font-size: 0.9rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .event-title {
      font-size: 1.3rem;
      font-weight: 600;
      color: #001B3F;
      margin: 0;
      line-height: 1.3;
    }

    .event-description {
      color: #64748b;
      line-height: 1.6;
      margin: 0 0 1rem 0;
    }

    .event-category {
      margin-top: 1rem;
    }

    .category-badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      
      &.badge-milestone {
        background: rgba(34, 197, 94, 0.1);
        color: #16a34a;
        border: 1px solid rgba(34, 197, 94, 0.2);
      }
      
      &.badge-achievement {
        background: rgba(59, 130, 246, 0.1);
        color: #2563eb;
        border: 1px solid rgba(59, 130, 246, 0.2);
      }
      
      &.badge-expansion {
        background: rgba(168, 85, 247, 0.1);
        color: #9333ea;
        border: 1px solid rgba(168, 85, 247, 0.2);
      }
      
      &.badge-innovation {
        background: rgba(245, 158, 11, 0.1);
        color: #d97706;
        border: 1px solid rgba(245, 158, 11, 0.2);
      }
    }

    /* Stats Section */
    .stats-section {
      background: linear-gradient(135deg, #001B3F, #002960);
      color: white;
      padding: 4rem 0;
      margin: 4rem 0;
      border-radius: 20px;
    }

    .stats-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      text-align: center;
    }

    .stats-title {
      font-size: clamp(1.8rem, 3vw, 2.5rem);
      font-weight: 600;
      margin: 0 0 3rem 0;
      color: white;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    .stat-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1.5rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 16px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.3s ease;
      
      &:hover {
        transform: translateY(-4px);
        background: rgba(255, 255, 255, 0.15);
      }
    }

    .stat-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 60px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      
      mat-icon {
        font-size: 1.8rem;
        width: 1.8rem;
        height: 1.8rem;
        color: white;
      }
    }

    .stat-content {
      text-align: left;
    }

    .stat-number {
      display: block;
      font-size: 2rem;
      font-weight: 700;
      line-height: 1;
      margin-bottom: 0.25rem;
    }

    .stat-label {
      font-size: 0.9rem;
      opacity: 0.9;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .timeline-line {
        left: 2rem;
        transform: none;
      }
      
      .timeline-event {
        flex-direction: column !important;
        align-items: flex-start;
        margin-left: 2rem;
        
        .event-content {
          margin: 1rem 0 0 0 !important;
          text-align: left !important;
          max-width: 100%;
        }
      }
      
      .timeline-dot {
        left: 2rem;
        transform: translate(-50%, -50%);
      }
      
      .stats-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }
    }

    @media (max-width: 480px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }
      
      .event-content {
        padding: 1.5rem;
      }
      
      .page-header {
        margin-bottom: 2rem;
      }
    }
  `]
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
      category: 'milestone'
    },
    {
      year: '2005',
      title: { en: 'Maritime Expansion', ar: 'التوسع البحري' },
      description: { 
        en: 'Expanded into maritime services, establishing our first bunkering operations in the Persian Gulf.',
        ar: 'توسعنا في الخدمات البحرية، وإنشاء أول عمليات التزود بالوقود في الخليج الفارسي'
      },
      icon: 'local_shipping',
      category: 'expansion'
    },
    {
      year: '2010',
      title: { en: 'Regional Leadership', ar: 'القيادة الإقليمية' },
      description: { 
        en: 'Became the leading energy and maritime services provider in the Middle East region.',
        ar: 'أصبحنا المزود الرائد للطاقة والخدمات البحرية في منطقة الشرق الأوسط'
      },
      icon: 'emoji_events',
      category: 'achievement'
    },
    {
      year: '2015',
      title: { en: 'Global Operations', ar: 'العمليات العالمية' },
      description: { 
        en: 'Extended operations to 15+ countries across Asia, Africa, and Europe.',
        ar: 'وسعنا العمليات إلى أكثر من 15 دولة في آسيا وأفريقيا وأوروبا'
      },
      icon: 'public',
      category: 'expansion'
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
