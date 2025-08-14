import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '../../../../../shared/services/language.service';

interface CharityProject {
  id: number;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  category: { en: string; ar: string };
  image: string;
  location: { en: string; ar: string };
  startDate: string;
  endDate?: string;
  status: 'active' | 'completed' | 'planned';
  impact: string;
  beneficiaries: number;
  budget: string;
  featured: boolean;
}

interface CSRInitiative {
  id: number;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  category: { en: string; ar: string };
  icon: string;
  impact: string;
  beneficiaries: number;
  duration: string;
  status: 'active' | 'completed' | 'planned';
  featured: boolean;
}

@Component({
  selector: 'dmc-mohade-charity',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './mohade-charity.component.html',
  styleUrls: ['./mohade-charity.component.scss']
})
export class MohadeCharityComponent implements OnInit {
  isRTL = false;

  charityProjects: CharityProject[] = [
    {
      id: 1,
      title: {
        en: 'Education for All',
        ar: 'التعليم للجميع'
      },
      description: {
        en: 'Providing quality education to underprivileged children in rural areas through school construction and educational programs.',
        ar: 'توفير التعليم الجيد للأطفال المحرومين في المناطق الريفية من خلال بناء المدارس والبرامج التعليمية'
      },
      category: { en: 'Education', ar: 'التعليم' },
      image: '/assets/images/charity/education-project.jpg',
      location: { en: 'Rural Areas, UAE', ar: 'المناطق الريفية، الإمارات' },
      startDate: '2023-01-15',
      status: 'active',
      impact: '500+ children enrolled',
      beneficiaries: 500,
      budget: 'AED 2.5M',
      featured: true
    },
    {
      id: 2,
      title: {
        en: 'Clean Water Initiative',
        ar: 'مبادرة المياه النظيفة'
      },
      description: {
        en: 'Installing clean water systems in communities that lack access to safe drinking water.',
        ar: 'تركيب أنظمة المياه النظيفة في المجتمعات التي تفتقر إلى المياه الصالحة للشرب'
      },
      category: { en: 'Health & Sanitation', ar: 'الصحة والصرف الصحي' },
      image: '/assets/images/charity/clean-water.jpg',
      location: { en: 'Various Communities', ar: 'مجتمعات مختلفة' },
      startDate: '2023-03-20',
      status: 'active',
      impact: '10,000+ people served',
      beneficiaries: 10000,
      budget: 'AED 1.8M',
      featured: true
    },
    {
      id: 3,
      title: {
        en: 'Healthcare Access Program',
        ar: 'برنامج الوصول للرعاية الصحية'
      },
      description: {
        en: 'Providing free medical checkups and healthcare services to vulnerable populations.',
        ar: 'توفير فحوصات طبية مجانية وخدمات الرعاية الصحية للسكان الضعفاء'
      },
      category: { en: 'Healthcare', ar: 'الرعاية الصحية' },
      image: '/assets/images/charity/healthcare.jpg',
      location: { en: 'Dubai, UAE', ar: 'دبي، الإمارات' },
      startDate: '2023-06-10',
      status: 'active',
      impact: '2,000+ patients treated',
      beneficiaries: 2000,
      budget: 'AED 3.2M',
      featured: false
    }
  ];

  csrInitiatives: CSRInitiative[] = [
    {
      id: 1,
      title: {
        en: 'Environmental Conservation',
        ar: 'الحفاظ على البيئة'
      },
      description: {
        en: 'Tree planting and environmental awareness programs to combat climate change.',
        ar: 'برامج زراعة الأشجار والتوعية البيئية لمكافحة تغير المناخ'
      },
      category: { en: 'Environment', ar: 'البيئة' },
      icon: 'eco',
      impact: '5,000+ trees planted',
      beneficiaries: 5000,
      duration: 'Ongoing',
      status: 'active',
      featured: true
    },
    {
      id: 2,
      title: {
        en: 'Skills Development',
        ar: 'تطوير المهارات'
      },
      description: {
        en: 'Vocational training and skill development programs for youth and unemployed individuals.',
        ar: 'برامج التدريب المهني وتطوير المهارات للشباب والعاطلين عن العمل'
      },
      category: { en: 'Employment', ar: 'التوظيف' },
      icon: 'school',
      impact: '1,000+ people trained',
      beneficiaries: 1000,
      duration: '2 years',
      status: 'active',
      featured: true
    },
    {
      id: 3,
      title: {
        en: 'Community Support',
        ar: 'دعم المجتمع'
      },
      description: {
        en: 'Supporting local communities through various social welfare programs.',
        ar: 'دعم المجتمعات المحلية من خلال برامج الرعاية الاجتماعية المختلفة'
      },
      category: { en: 'Community', ar: 'المجتمع' },
      icon: 'people',
      impact: '15,000+ people helped',
      beneficiaries: 15000,
      duration: 'Ongoing',
      status: 'active',
      featured: false
    }
  ];

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.languageService.currentLang$.subscribe(lang => {
      this.isRTL = lang === 'ar';
    });
  }

  getProjectTitle(project: CharityProject): string {
    return project.title[this.isRTL ? 'ar' : 'en'];
  }

  getProjectDescription(project: CharityProject): string {
    return project.description[this.isRTL ? 'ar' : 'en'];
  }

  getProjectCategory(project: CharityProject): string {
    return project.category[this.isRTL ? 'ar' : 'en'];
  }

  getProjectLocation(project: CharityProject): string {
    return project.location[this.isRTL ? 'ar' : 'en'];
  }

  getInitiativeTitle(initiative: CSRInitiative): string {
    return initiative.title[this.isRTL ? 'ar' : 'en'];
  }

  getInitiativeDescription(initiative: CSRInitiative): string {
    return initiative.description[this.isRTL ? 'ar' : 'en'];
  }

  getInitiativeCategory(initiative: CSRInitiative): string {
    return initiative.category[this.isRTL ? 'ar' : 'en'];
  }

  getFeaturedProjects(): CharityProject[] {
    return this.charityProjects.filter(project => project.featured);
  }

  getFeaturedInitiatives(): CSRInitiative[] {
    return this.csrInitiatives.filter(initiative => initiative.featured);
  }

  getStatusText(status: string): string {
    const statusMap = {
      'active': this.isRTL ? 'نشط' : 'Active',
      'completed': this.isRTL ? 'مكتمل' : 'Completed',
      'planned': this.isRTL ? 'مخطط' : 'Planned'
    };
    return statusMap[status as keyof typeof statusMap] || status;
  }

  getStatusClass(status: string): string {
    return `status-${status}`;
  }

  getCategoryColor(category: string): string {
    const colorMap: { [key: string]: string } = {
      'Education': '#f59e0b',
      'Health & Sanitation': '#10b981',
      'Healthcare': '#3b82f6',
      'Environment': '#10b981',
      'Employment': '#8b5cf6',
      'Community': '#dc2626'
    };
    return colorMap[category] || '#dc2626';
  }

  donate() {
    console.log('Donate clicked');
  }

  volunteer() {
    console.log('Volunteer clicked');
  }
}
