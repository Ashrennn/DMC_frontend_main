import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '../../../../../shared/services/language.service';

interface TeamMember {
  id: number;
  name: { en: string; ar: string };
  position: { en: string; ar: string };
  department: { en: string; ar: string };
  image: string;
  bio: { en: string; ar: string };
  expertise: string[];
  linkedin?: string;
}

interface Department {
  id: number;
  name: { en: string; ar: string };
  icon: string;
  description: { en: string; ar: string };
  memberCount: number;
  color: string;
}

@Component({
  selector: 'dmc-our-people',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './our-people.component.html',
  styleUrls: ['./our-people.component.scss']
})
export class OurPeopleComponent implements OnInit {
  isRTL = false;

  departments: Department[] = [
    {
      id: 1,
      name: { en: 'Executive Leadership', ar: 'القيادة التنفيذية' },
      icon: 'leaderboard',
      description: {
        en: 'Strategic visionaries driving our global success',
        ar: 'قادة استراتيجيون يقودون نجاحنا العالمي'
      },
      memberCount: 8,
      color: '#001B3F'
    },
    {
      id: 2,
      name: { en: 'Operations & Logistics', ar: 'العمليات والخدمات اللوجستية' },
      icon: 'local_shipping',
      description: {
        en: 'Ensuring seamless maritime operations worldwide',
        ar: 'ضمان العمليات البحرية السلسة في جميع أنحاء العالم'
      },
      memberCount: 45,
      color: '#002960'
    },
    {
      id: 3,
      name: { en: 'Energy Trading', ar: 'تجارة الطاقة' },
      icon: 'trending_up',
      description: {
        en: 'Expert traders managing global energy markets',
        ar: 'متداولون خبراء يديرون أسواق الطاقة العالمية'
      },
      memberCount: 32,
      color: '#003d80'
    },
    {
      id: 4,
      name: { en: 'Technology & Innovation', ar: 'التكنولوجيا والابتكار' },
      icon: 'computer',
      description: {
        en: 'Digital transformation and cutting-edge solutions',
        ar: 'التحول الرقمي والحلول المتطورة'
      },
      memberCount: 28,
      color: '#16a34a'
    },
    {
      id: 5,
      name: { en: 'Finance & Compliance', ar: 'التمويل والامتثال' },
      icon: 'account_balance',
      description: {
        en: 'Financial excellence and regulatory compliance',
        ar: 'التميز المالي والامتثال التنظيمي'
      },
      memberCount: 25,
      color: '#2563eb'
    },
    {
      id: 6,
      name: { en: 'Human Resources', ar: 'الموارد البشرية' },
      icon: 'people',
      description: {
        en: 'Nurturing talent and fostering company culture',
        ar: 'رعاية المواهب وتعزيز ثقافة الشركة'
      },
      memberCount: 18,
      color: '#9333ea'
    }
  ];

  teamMembers: TeamMember[] = [
    {
      id: 1,
      name: { en: 'Ahmed Al Mansouri', ar: 'أحمد المنصوري' },
      position: { en: 'Chief Executive Officer', ar: 'الرئيس التنفيذي' },
      department: { en: 'Executive Leadership', ar: 'القيادة التنفيذية' },
      image: 'images/about/our-people/comp3/cu1.jpeg',
      bio: {
        en: 'Visionary leader with 20+ years of experience in energy and maritime industries.',
        ar: 'قائد رؤيوي مع أكثر من 20 عاماً من الخبرة في صناعات الطاقة والبحرية'
      },
      expertise: ['Strategic Planning', 'Global Operations', 'Business Development'],
      linkedin: '#'
    },
    {
      id: 2,
      name: { en: 'Sarah Johnson', ar: 'سارة جونسون' },
      position: { en: 'Chief Operations Officer', ar: 'مدير العمليات' },
      department: { en: 'Operations & Logistics', ar: 'العمليات والخدمات اللوجستية' },
      image: 'images/about/our-people/comp3/cu2.jpg',
      bio: {
        en: 'Operations expert specializing in maritime logistics and supply chain optimization.',
        ar: 'خبيرة في العمليات متخصصة في الخدمات اللوجستية البحرية وتحسين سلسلة التوريد'
      },
      expertise: ['Maritime Logistics', 'Supply Chain', 'Process Optimization'],
      linkedin: '#'
    },
    {
      id: 3,
      name: { en: 'Mohammed Hassan', ar: 'محمد حسن' },
      position: { en: 'Head of Energy Trading', ar: 'رئيس تجارة الطاقة' },
      department: { en: 'Energy Trading', ar: 'تجارة الطاقة' },
      image: 'images/about/our-people/comp3/cu3.jpg',
      bio: {
        en: 'Seasoned energy trader with deep expertise in global energy markets.',
        ar: 'متداول طاقة ذو خبرة مع معرفة عميقة بأسواق الطاقة العالمية'
      },
      expertise: ['Energy Markets', 'Risk Management', 'Trading Strategy'],
      linkedin: '#'
    },
    {
      id: 4,
      name: { en: 'Elena Rodriguez', ar: 'إيلينا رودريغيز' },
      position: { en: 'Chief Technology Officer', ar: 'مدير التكنولوجيا' },
      department: { en: 'Technology & Innovation', ar: 'التكنولوجيا والابتكار' },
      image: 'images/about/our-people/comp3/cu4.jpg',
      bio: {
        en: 'Technology innovator driving digital transformation across all operations.',
        ar: 'مبتكرة في التكنولوجيا تقود التحول الرقمي في جميع العمليات'
      },
      expertise: ['Digital Transformation', 'AI/ML', 'System Architecture'],
      linkedin: '#'
    },
    {
      id: 5,
      name: { en: 'Fatima Al Zahra', ar: 'فاطمة الزهراء' },
      position: { en: 'Chief Financial Officer', ar: 'المدير المالي' },
      department: { en: 'Finance & Compliance', ar: 'التمويل والامتثال' },
      image: 'images/about/our-people/comp2/ss1.jpg',
      bio: {
        en: 'Financial strategist with expertise in international finance and regulatory compliance.',
        ar: 'استراتيجية مالية مع خبرة في التمويل الدولي والامتثال التنظيمي'
      },
      expertise: ['Financial Strategy', 'Risk Management', 'Compliance'],
      linkedin: '#'
    },
    {
      id: 6,
      name: { en: 'David Chen', ar: 'ديفيد تشين' },
      position: { en: 'Head of Human Resources', ar: 'رئيس الموارد البشرية' },
      department: { en: 'Human Resources', ar: 'الموارد البشرية' },
      image: 'images/about/our-people/comp2/ss2.jpg',
      bio: {
        en: 'HR leader focused on talent development and organizational culture.',
        ar: 'قائد الموارد البشرية يركز على تطوير المواهب وثقافة المنظمة'
      },
      expertise: ['Talent Management', 'Organizational Development', 'Employee Engagement'],
      linkedin: '#'
    }
  ];

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.languageService.currentLang$.subscribe(lang => {
      this.isRTL = lang === 'ar';
    });
  }

  getPageTitle(): string {
    return this.isRTL ? 'فريقنا' : 'Our Team';
  }

  getPageSubtitle(): string {
    return this.isRTL
      ? 'تعرف على الأشخاص الذين يقودون نجاحنا ويمثلون قيمنا'
      : 'Meet the people who drive our success and embody our values';
  }

  getDepartmentName(dept: Department): string {
    return dept.name[this.isRTL ? 'ar' : 'en'];
  }

  getDepartmentDescription(dept: Department): string {
    return dept.description[this.isRTL ? 'ar' : 'en'];
  }

  getMemberName(member: TeamMember): string {
    return member.name[this.isRTL ? 'ar' : 'en'];
  }

  getMemberPosition(member: TeamMember): string {
    return member.position[this.isRTL ? 'ar' : 'en'];
  }

  getMemberDepartment(member: TeamMember): string {
    return member.department[this.isRTL ? 'ar' : 'en'];
  }

  getMemberBio(member: TeamMember): string {
    return member.bio[this.isRTL ? 'ar' : 'en'];
  }

  getStatsTitle(): string {
    return this.isRTL ? 'أرقام فريقنا' : 'Our Team Numbers';
  }

  getStatLabel(key: string): string {
    const labels = {
      'total': this.isRTL ? 'إجمالي الموظفين' : 'Total Employees',
      'departments': this.isRTL ? 'قسم' : 'Departments',
      'countries': this.isRTL ? 'دولة' : 'Countries',
      'experience': this.isRTL ? 'متوسط الخبرة' : 'Avg. Experience'
    };
    return labels[key as keyof typeof labels] || key;
  }

  getCultureTitle(): string {
    return this.isRTL ? 'ثقافتنا' : 'Our Culture';
  }

  getCultureSubtitle(): string {
    return this.isRTL
      ? 'قيمنا وطريقة عملنا'
      : 'Our values and how we work';
  }
}
