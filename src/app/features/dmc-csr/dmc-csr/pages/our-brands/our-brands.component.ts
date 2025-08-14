import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '../../../../../shared/services/language.service';

interface Brand {
  id: number;
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  category: { en: string; ar: string };
  logo: string;
  image: string;
  website: string;
  founded: string;
  headquarters: { en: string; ar: string };
  industry: { en: string; ar: string };
  featured: boolean;
  tags: string[];
  achievements: string[];
}

interface BrandCategory {
  id: number;
  name: { en: string; ar: string };
  icon: string;
  count: number;
  color: string;
}

@Component({
  selector: 'dmc-our-brands',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './our-brands.component.html',
  styleUrls: ['./our-brands.component.scss']
})
export class OurBrandsComponent implements OnInit {
  isRTL = false;
  selectedCategory = 'all';
  searchQuery = '';
  sortBy = 'name';

  categories: BrandCategory[] = [
    {
      id: 1,
      name: { en: 'All Brands', ar: 'جميع العلامات' },
      icon: 'branding_watermark',
      count: 12,
      color: '#059669'
    },
    {
      id: 2,
      name: { en: 'Energy & Utilities', ar: 'الطاقة والمرافق' },
      icon: 'bolt',
      count: 4,
      color: '#f59e0b'
    },
    {
      id: 3,
      name: { en: 'Maritime & Logistics', ar: 'البحرية واللوجستيات' },
      icon: 'anchor',
      count: 3,
      color: '#3b82f6'
    },
    {
      id: 4,
      name: { en: 'Technology & Innovation', ar: 'التكنولوجيا والابتكار' },
      icon: 'computer',
      count: 2,
      color: '#8b5cf6'
    },
    {
      id: 5,
      name: { en: 'Sustainability', ar: 'الاستدامة' },
      icon: 'eco',
      count: 3,
      color: '#10b981'
    }
  ];

  brands: Brand[] = [
    {
      id: 1,
      name: {
        en: 'DMC Energy Solutions',
        ar: 'حلول طاقة DMC'
      },
      description: {
        en: 'Leading provider of sustainable energy solutions and renewable energy technologies.',
        ar: 'المزود الرائد لحلول الطاقة المستدامة وتقنيات الطاقة المتجددة'
      },
      category: { en: 'Energy & Utilities', ar: 'الطاقة والمرافق' },
      logo: '/assets/images/brands/dmc-energy-logo.png',
      image: '/assets/images/brands/dmc-energy.jpg',
      website: 'https://dmc-energy.com',
      founded: '2010',
      headquarters: { en: 'Dubai, UAE', ar: 'دبي، الإمارات' },
      industry: { en: 'Renewable Energy', ar: 'الطاقة المتجددة' },
      featured: true,
      tags: ['renewable energy', 'sustainability', 'solar', 'wind'],
      achievements: [
        'Over 500MW of renewable energy projects',
        'ISO 14001 Environmental Management certified',
        'Winner of Green Energy Award 2023'
      ]
    },
    {
      id: 2,
      name: {
        en: 'Maritime Excellence',
        ar: 'التميز البحري'
      },
      description: {
        en: 'Comprehensive maritime services including vessel management, logistics, and port operations.',
        ar: 'خدمات بحرية شاملة تشمل إدارة السفن واللوجستيات وعمليات الموانئ'
      },
      category: { en: 'Maritime & Logistics', ar: 'البحرية واللوجستيات' },
      logo: '/assets/images/brands/maritime-excellence-logo.png',
      image: '/assets/images/brands/maritime-excellence.jpg',
      website: 'https://maritime-excellence.com',
      founded: '2008',
      headquarters: { en: 'Abu Dhabi, UAE', ar: 'أبو ظبي، الإمارات' },
      industry: { en: 'Maritime Services', ar: 'الخدمات البحرية' },
      featured: true,
      tags: ['maritime', 'logistics', 'vessel management', 'port operations'],
      achievements: [
        'Managing fleet of 50+ vessels',
        'ISO 9001 Quality Management certified',
        'Safety Excellence Award 2022'
      ]
    },
    {
      id: 3,
      name: {
        en: 'TechInnovate',
        ar: 'تيك إنوفيت'
      },
      description: {
        en: 'Cutting-edge technology solutions for digital transformation and smart city initiatives.',
        ar: 'حلول تكنولوجية متطورة للتحول الرقمي ومبادرات المدن الذكية'
      },
      category: { en: 'Technology & Innovation', ar: 'التكنولوجيا والابتكار' },
      logo: '/assets/images/brands/techinnovate-logo.png',
      image: '/assets/images/brands/techinnovate.jpg',
      website: 'https://techinnovate.com',
      founded: '2015',
      headquarters: { en: 'Dubai, UAE', ar: 'دبي، الإمارات' },
      industry: { en: 'Technology Services', ar: 'الخدمات التكنولوجية' },
      featured: false,
      tags: ['technology', 'innovation', 'digital transformation', 'smart cities'],
      achievements: [
        'Implemented 20+ smart city projects',
        'Microsoft Gold Partner',
        'Innovation Award 2023'
      ]
    },
    {
      id: 4,
      name: {
        en: 'Green Horizon',
        ar: 'الأفق الأخضر'
      },
      description: {
        en: 'Environmental consulting and sustainability solutions for businesses and communities.',
        ar: 'استشارات بيئية وحلول الاستدامة للشركات والمجتمعات'
      },
      category: { en: 'Sustainability', ar: 'الاستدامة' },
      logo: '/assets/images/brands/green-horizon-logo.png',
      image: '/assets/images/brands/green-horizon.jpg',
      website: 'https://green-horizon.com',
      founded: '2012',
      headquarters: { en: 'Sharjah, UAE', ar: 'الشارقة، الإمارات' },
      industry: { en: 'Environmental Services', ar: 'الخدمات البيئية' },
      featured: false,
      tags: ['sustainability', 'environmental', 'consulting', 'green solutions'],
      achievements: [
        'Certified B Corporation',
        'Carbon Neutral since 2020',
        'Environmental Excellence Award 2023'
      ]
    },
    {
      id: 5,
      name: {
        en: 'PowerGrid Solutions',
        ar: 'حلول شبكة الطاقة'
      },
      description: {
        en: 'Advanced power grid management and smart grid technologies for efficient energy distribution.',
        ar: 'إدارة متقدمة لشبكات الطاقة وتقنيات الشبكات الذكية لتوزيع الطاقة بكفاءة'
      },
      category: { en: 'Energy & Utilities', ar: 'الطاقة والمرافق' },
      logo: '/assets/images/brands/powergrid-logo.png',
      image: '/assets/images/brands/powergrid.jpg',
      website: 'https://powergrid-solutions.com',
      founded: '2013',
      headquarters: { en: 'Dubai, UAE', ar: 'دبي، الإمارات' },
      industry: { en: 'Power Distribution', ar: 'توزيع الطاقة' },
      featured: false,
      tags: ['power grid', 'smart grid', 'energy distribution', 'utilities'],
      achievements: [
        'Managing 1000+ MW grid capacity',
        'Smart Grid Innovation Award 2022',
        'Reliability Excellence 99.9% uptime'
      ]
    },
    {
      id: 6,
      name: {
        en: 'Ocean Logistics',
        ar: 'لوجستيات المحيط'
      },
      description: {
        en: 'Comprehensive ocean freight and logistics services with global reach and local expertise.',
        ar: 'خدمات شاملة للشحن البحري واللوجستيات مع وصول عالمي وخبرة محلية'
      },
      category: { en: 'Maritime & Logistics', ar: 'البحرية واللوجستيات' },
      logo: '/assets/images/brands/ocean-logistics-logo.png',
      image: '/assets/images/brands/ocean-logistics.jpg',
      website: 'https://ocean-logistics.com',
      founded: '2011',
      headquarters: { en: 'Jebel Ali, UAE', ar: 'جبل علي، الإمارات' },
      industry: { en: 'Logistics & Shipping', ar: 'اللوجستيات والشحن' },
      featured: false,
      tags: ['logistics', 'shipping', 'freight', 'supply chain'],
      achievements: [
        'Operating in 50+ countries',
        'Best Logistics Provider 2023',
        'Customer Satisfaction Award'
      ]
    }
  ];

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.languageService.currentLang$.subscribe(lang => {
      this.isRTL = lang === 'ar';
    });
  }

  getCategoryName(category: BrandCategory): string {
    return category.name[this.isRTL ? 'ar' : 'en'];
  }

  getBrandName(brand: Brand): string {
    return brand.name[this.isRTL ? 'ar' : 'en'];
  }

  getBrandDescription(brand: Brand): string {
    return brand.description[this.isRTL ? 'ar' : 'en'];
  }

  getBrandCategory(brand: Brand): string {
    return brand.category[this.isRTL ? 'ar' : 'en'];
  }

  getBrandHeadquarters(brand: Brand): string {
    return brand.headquarters[this.isRTL ? 'ar' : 'en'];
  }

  getBrandIndustry(brand: Brand): string {
    return brand.industry[this.isRTL ? 'ar' : 'en'];
  }

  getFilteredBrands(): Brand[] {
    let filtered = this.brands;

    // Filter by category
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(brand =>
        brand.category.en === this.selectedCategory ||
        brand.category.ar === this.selectedCategory
      );
    }

    // Filter by search query
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(brand =>
        brand.name.en.toLowerCase().includes(query) ||
        brand.name.ar.includes(query) ||
        brand.description.en.toLowerCase().includes(query) ||
        brand.description.ar.includes(query) ||
        brand.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Sort brands
    filtered.sort((a, b) => {
      switch (this.sortBy) {
        case 'name':
          return this.getBrandName(a).localeCompare(this.getBrandName(b));
        case 'founded':
          return parseInt(a.founded) - parseInt(b.founded);
        case 'featured':
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        default:
          return 0;
      }
    });

    return filtered;
  }

  getFeaturedBrands(): Brand[] {
    return this.brands.filter(brand => brand.featured);
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  onSearchChange(event: any) {
    this.searchQuery = event.target.value;
  }

  onSortChange(event: any) {
    this.sortBy = event.target.value;
  }

  visitWebsite(website: string) {
    window.open(website, '_blank');
  }

  getCategoryColor(category: string): string {
    const colorMap: { [key: string]: string } = {
      'Energy & Utilities': '#f59e0b',
      'Maritime & Logistics': '#3b82f6',
      'Technology & Innovation': '#8b5cf6',
      'Sustainability': '#10b981'
    };
    return colorMap[category] || '#059669';
  }
}
