import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '../../../../../shared/services/language.service';

interface Product {
  id: number;
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  category: { en: string; ar: string };
  image: string;
  features: string[];
  specifications: { [key: string]: string };
  price?: string;
  availability: 'available' | 'limited' | 'out-of-stock';
  featured: boolean;
  tags: string[];
}

interface Service {
  id: number;
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  category: { en: string; ar: string };
  icon: string;
  benefits: string[];
  process: string[];
  duration: string;
  featured: boolean;
  tags: string[];
}

interface Category {
  id: number;
  name: { en: string; ar: string };
  icon: string;
  count: number;
  color: string;
  type: 'product' | 'service';
}

@Component({
  selector: 'dmc-products-services',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './products-services.component.html',
  styleUrls: ['./products-services.component.scss']
})
export class ProductsServicesComponent implements OnInit {
  isRTL = false;
  selectedCategory = 'all';
  selectedType = 'all';
  searchQuery = '';

  categories: Category[] = [
    {
      id: 1,
      name: { en: 'All Items', ar: 'جميع العناصر' },
      icon: 'category',
      count: 32,
      color: '#001B3F',
      type: 'product'
    },
    {
      id: 2,
      name: { en: 'Energy Solutions', ar: 'حلول الطاقة' },
      icon: 'bolt',
      count: 8,
      color: '#002960',
      type: 'product'
    },
    {
      id: 3,
      name: { en: 'Maritime Equipment', ar: 'المعدات البحرية' },
      icon: 'anchor',
      count: 6,
      color: '#003d80',
      type: 'product'
    },
    {
      id: 4,
      name: { en: 'Technology Products', ar: 'المنتجات التقنية' },
      icon: 'computer',
      count: 5,
      color: '#16a34a',
      type: 'product'
    },
    {
      id: 5,
      name: { en: 'Consulting Services', ar: 'خدمات الاستشارات' },
      icon: 'business',
      count: 4,
      color: '#2563eb',
      type: 'service'
    },
    {
      id: 6,
      name: { en: 'Training Programs', ar: 'برامج التدريب' },
      icon: 'school',
      count: 3,
      color: '#dc2626',
      type: 'service'
    },
    {
      id: 7,
      name: { en: 'Maintenance Services', ar: 'خدمات الصيانة' },
      icon: 'build',
      count: 3,
      color: '#7c3aed',
      type: 'service'
    },
    {
      id: 8,
      name: { en: 'Sustainability Services', ar: 'خدمات الاستدامة' },
      icon: 'eco',
      count: 3,
      color: '#059669',
      type: 'service'
    }
  ];

  products: Product[] = [
    {
      id: 1,
      name: {
        en: 'Solar Energy System',
        ar: 'نظام الطاقة الشمسية'
      },
      description: {
        en: 'High-efficiency solar panels and energy storage solutions for commercial and industrial applications.',
        ar: 'ألواح شمسية عالية الكفاءة وحلول تخزين الطاقة للتطبيقات التجارية والصناعية'
      },
      category: { en: 'Energy Solutions', ar: 'حلول الطاقة' },
      image: '/assets/images/products/solar-system.jpg',
      features: [
        'High efficiency solar panels',
        'Energy storage system',
        'Smart monitoring',
        '25-year warranty'
      ],
      specifications: {
        'Power Output': '100kW - 1MW',
        'Efficiency': '22%',
        'Lifespan': '25+ years',
        'Warranty': '25 years'
      },
      price: 'Contact for quote',
      availability: 'available',
      featured: true,
      tags: ['solar', 'energy', 'renewable', 'sustainability']
    },
    {
      id: 2,
      name: {
        en: 'Maritime Navigation System',
        ar: 'نظام الملاحة البحرية'
      },
      description: {
        en: 'Advanced navigation and communication systems for maritime vessels.',
        ar: 'أنظمة متقدمة للملاحة والاتصالات للسفن البحرية'
      },
      category: { en: 'Maritime Equipment', ar: 'المعدات البحرية' },
      image: '/assets/images/products/navigation-system.jpg',
      features: [
        'GPS navigation',
        'Weather monitoring',
        'Collision avoidance',
        'Real-time tracking'
      ],
      specifications: {
        'Coverage': 'Global',
        'Accuracy': '±3 meters',
        'Update Rate': '1 second',
        'Battery Life': '48 hours'
      },
      price: 'Contact for quote',
      availability: 'available',
      featured: true,
      tags: ['maritime', 'navigation', 'GPS', 'safety']
    },
    {
      id: 3,
      name: {
        en: 'AI-Powered Analytics Platform',
        ar: 'منصة التحليلات بالذكاء الاصطناعي'
      },
      description: {
        en: 'Comprehensive data analytics platform powered by artificial intelligence.',
        ar: 'منصة شاملة لتحليل البيانات مدعومة بالذكاء الاصطناعي'
      },
      category: { en: 'Technology Products', ar: 'المنتجات التقنية' },
      image: '/assets/images/products/ai-analytics.jpg',
      features: [
        'Machine learning algorithms',
        'Real-time data processing',
        'Predictive analytics',
        'Custom dashboards'
      ],
      specifications: {
        'Processing Speed': 'Real-time',
        'Data Sources': 'Unlimited',
        'API Access': 'RESTful',
        'Security': 'Enterprise-grade'
      },
      price: 'Subscription-based',
      availability: 'available',
      featured: false,
      tags: ['AI', 'analytics', 'data', 'machine learning']
    }
  ];

  services: Service[] = [
    {
      id: 1,
      name: {
        en: 'Energy Consulting',
        ar: 'استشارات الطاقة'
      },
      description: {
        en: 'Comprehensive energy consulting services to optimize your energy consumption and costs.',
        ar: 'خدمات استشارات شاملة للطاقة لتحسين استهلاك الطاقة والتكاليف'
      },
      category: { en: 'Consulting Services', ar: 'خدمات الاستشارات' },
      icon: 'energy_savings_leaf',
      benefits: [
        'Reduce energy costs by 20-30%',
        'Improve operational efficiency',
        'Compliance with regulations',
        'Sustainable practices'
      ],
      process: [
        'Energy audit and assessment',
        'Strategy development',
        'Implementation planning',
        'Ongoing monitoring'
      ],
      duration: '3-6 months',
      featured: true,
      tags: ['energy', 'consulting', 'optimization', 'sustainability']
    },
    {
      id: 2,
      name: {
        en: 'Safety Training Programs',
        ar: 'برامج تدريب السلامة'
      },
      description: {
        en: 'Comprehensive safety training programs for maritime and industrial operations.',
        ar: 'برامج تدريب شاملة للسلامة للعمليات البحرية والصناعية'
      },
      category: { en: 'Training Programs', ar: 'برامج التدريب' },
      icon: 'safety_divider',
      benefits: [
        'Certified training programs',
        'Compliance with regulations',
        'Reduced accident rates',
        'Improved safety culture'
      ],
      process: [
        'Needs assessment',
        'Customized training plan',
        'Interactive sessions',
        'Certification and follow-up'
      ],
      duration: '1-4 weeks',
      featured: true,
      tags: ['safety', 'training', 'maritime', 'compliance']
    },
    {
      id: 3,
      name: {
        en: 'Equipment Maintenance',
        ar: 'صيانة المعدات'
      },
      description: {
        en: 'Preventive and corrective maintenance services for industrial equipment.',
        ar: 'خدمات الصيانة الوقائية والتصحيحية للمعدات الصناعية'
      },
      category: { en: 'Maintenance Services', ar: 'خدمات الصيانة' },
      icon: 'build_circle',
      benefits: [
        'Preventive maintenance',
        '24/7 emergency support',
        'Extended equipment life',
        'Reduced downtime'
      ],
      process: [
        'Equipment inspection',
        'Maintenance scheduling',
        'Service execution',
        'Performance monitoring'
      ],
      duration: 'Ongoing',
      featured: false,
      tags: ['maintenance', 'equipment', 'preventive', 'support']
    },
    {
      id: 4,
      name: {
        en: 'Sustainability Assessment',
        ar: 'تقييم الاستدامة'
      },
      description: {
        en: 'Comprehensive sustainability assessment and certification services.',
        ar: 'خدمات تقييم شاملة للاستدامة والشهادات'
      },
      category: { en: 'Sustainability Services', ar: 'خدمات الاستدامة' },
      icon: 'eco',
      benefits: [
        'Environmental compliance',
        'Carbon footprint reduction',
        'Green certification',
        'Cost savings'
      ],
      process: [
        'Initial assessment',
        'Gap analysis',
        'Action plan development',
        'Implementation support'
      ],
      duration: '2-4 months',
      featured: false,
      tags: ['sustainability', 'environmental', 'certification', 'compliance']
    }
  ];

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.languageService.currentLang$.subscribe(lang => {
      this.isRTL = lang === 'ar';
    });
  }

  getCategoryName(category: Category): string {
    return category.name[this.isRTL ? 'ar' : 'en'];
  }

  getProductName(product: Product): string {
    return product.name[this.isRTL ? 'ar' : 'en'];
  }

  getProductDescription(product: Product): string {
    return product.description[this.isRTL ? 'ar' : 'en'];
  }

  getProductCategory(product: Product): string {
    return product.category[this.isRTL ? 'ar' : 'en'];
  }

  getServiceName(service: Service): string {
    return service.name[this.isRTL ? 'ar' : 'en'];
  }

  getServiceDescription(service: Service): string {
    return service.description[this.isRTL ? 'ar' : 'en'];
  }

  getServiceCategory(service: Service): string {
    return service.category[this.isRTL ? 'ar' : 'en'];
  }

  getFilteredProducts(): Product[] {
    let filtered = this.products;

    // Filter by category
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(product =>
        product.category.en === this.selectedCategory ||
        product.category.ar === this.selectedCategory
      );
    }

    // Filter by search query
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.en.toLowerCase().includes(query) ||
        product.name.ar.includes(query) ||
        product.description.en.toLowerCase().includes(query) ||
        product.description.ar.includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }

  getFilteredServices(): Service[] {
    let filtered = this.services;

    // Filter by category
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(service =>
        service.category.en === this.selectedCategory ||
        service.category.ar === this.selectedCategory
      );
    }

    // Filter by search query
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(service =>
        service.name.en.toLowerCase().includes(query) ||
        service.name.ar.includes(query) ||
        service.description.en.toLowerCase().includes(query) ||
        service.description.ar.includes(query) ||
        service.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }

  getFeaturedProducts(): Product[] {
    return this.products.filter(product => product.featured);
  }

  getFeaturedServices(): Service[] {
    return this.services.filter(service => service.featured);
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  selectType(type: string) {
    this.selectedType = type;
  }

  onSearchChange(event: any) {
    this.searchQuery = event.target.value;
  }

  getCategoryColor(category: string): string {
    const colorMap: { [key: string]: string } = {
      'Energy Solutions': '#002960',
      'Maritime Equipment': '#003d80',
      'Technology Products': '#16a34a',
      'Consulting Services': '#2563eb',
      'Training Programs': '#dc2626',
      'Maintenance Services': '#7c3aed',
      'Sustainability Services': '#059669'
    };
    return colorMap[category] || '#001B3F';
  }

  getAvailabilityText(availability: string): string {
    const availabilityMap = {
      'available': this.isRTL ? 'متاح' : 'Available',
      'limited': this.isRTL ? 'محدود' : 'Limited',
      'out-of-stock': this.isRTL ? 'غير متوفر' : 'Out of Stock'
    };
    return availabilityMap[availability as keyof typeof availabilityMap] || availability;
  }

  getAvailabilityClass(availability: string): string {
    return `availability-${availability}`;
  }

  contactSales() {
    // Handle contact sales action
    console.log('Contact sales clicked');
  }

  learnMore() {
    // Handle learn more action
    console.log('Learn more clicked');
  }
}


