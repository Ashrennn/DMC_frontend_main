import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '../../../../../shared/services/language.service';

interface PhotoItem {
  id: number;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  category: { en: string; ar: string };
  image: string;
  thumbnail: string;
  date: string;
  location: { en: string; ar: string };
  featured: boolean;
  tags: string[];
}

interface PhotoCategory {
  id: number;
  name: { en: string; ar: string };
  icon: string;
  count: number;
  color: string;
}

@Component({
  selector: 'dmc-photo-gallery',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.scss']
})
export class PhotoGalleryComponent implements OnInit {
  isRTL = false;
  selectedCategory = 'all';
  searchQuery = '';
  sortBy = 'newest';
  selectedPhoto: PhotoItem | null = null;

  categories: PhotoCategory[] = [
    {
      id: 1,
      name: { en: 'All Photos', ar: 'جميع الصور' },
      icon: 'photo_library',
      count: 48,
      color: '#059669'
    },
    {
      id: 2,
      name: { en: 'Charity Events', ar: 'الفعاليات الخيرية' },
      icon: 'volunteer_activism',
      count: 15,
      color: '#dc2626'
    },
    {
      id: 3,
      name: { en: 'Community Projects', ar: 'مشاريع المجتمع' },
      icon: 'people',
      count: 12,
      color: '#3b82f6'
    },
    {
      id: 4,
      name: { en: 'Environmental Initiatives', ar: 'المبادرات البيئية' },
      icon: 'eco',
      count: 8,
      color: '#10b981'
    },
    {
      id: 5,
      name: { en: 'Education Programs', ar: 'البرامج التعليمية' },
      icon: 'school',
      count: 7,
      color: '#f59e0b'
    },
    {
      id: 6,
      name: { en: 'Healthcare Services', ar: 'خدمات الرعاية الصحية' },
      icon: 'medical_services',
      count: 6,
      color: '#8b5cf6'
    }
  ];

  photos: PhotoItem[] = [
    {
      id: 1,
      title: {
        en: 'School Opening Ceremony',
        ar: 'حفل افتتاح المدرسة'
      },
      description: {
        en: 'Celebrating the opening of our new school in rural areas, providing education to 500+ children.',
        ar: 'احتفال بافتتاح مدرستنا الجديدة في المناطق الريفية، وتوفير التعليم لأكثر من 500 طفل'
      },
      category: { en: 'Education Programs', ar: 'البرامج التعليمية' },
      image: '/assets/images/gallery/school-opening.jpg',
      thumbnail: '/assets/images/gallery/school-opening-thumb.jpg',
      date: '2024-01-15',
      location: { en: 'Rural Areas, UAE', ar: 'المناطق الريفية، الإمارات' },
      featured: true,
      tags: ['education', 'school', 'children', 'rural']
    },
    {
      id: 2,
      title: {
        en: 'Tree Planting Campaign',
        ar: 'حملة زراعة الأشجار'
      },
      description: {
        en: 'Volunteers planting trees as part of our environmental conservation initiative.',
        ar: 'متطوعون يزرعون الأشجار كجزء من مبادرة الحفاظ على البيئة'
      },
      category: { en: 'Environmental Initiatives', ar: 'المبادرات البيئية' },
      image: '/assets/images/gallery/tree-planting.jpg',
      thumbnail: '/assets/images/gallery/tree-planting-thumb.jpg',
      date: '2024-02-20',
      location: { en: 'Dubai Desert', ar: 'صحراء دبي' },
      featured: true,
      tags: ['environment', 'trees', 'volunteers', 'conservation']
    },
    {
      id: 3,
      title: {
        en: 'Medical Camp',
        ar: 'المعسكر الطبي'
      },
      description: {
        en: 'Free medical checkup camp providing healthcare services to vulnerable communities.',
        ar: 'معسكر فحص طبي مجاني يوفر خدمات الرعاية الصحية للمجتمعات الضعيفة'
      },
      category: { en: 'Healthcare Services', ar: 'خدمات الرعاية الصحية' },
      image: '/assets/images/gallery/medical-camp.jpg',
      thumbnail: '/assets/images/gallery/medical-camp-thumb.jpg',
      date: '2024-03-10',
      location: { en: 'Dubai, UAE', ar: 'دبي، الإمارات' },
      featured: false,
      tags: ['healthcare', 'medical', 'community', 'volunteers']
    },
    {
      id: 4,
      title: {
        en: 'Community Cleanup',
        ar: 'تنظيف المجتمع'
      },
      description: {
        en: 'Community members participating in beach cleanup and environmental awareness program.',
        ar: 'أعضاء المجتمع يشاركون في تنظيف الشاطئ وبرنامج التوعية البيئية'
      },
      category: { en: 'Community Projects', ar: 'مشاريع المجتمع' },
      image: '/assets/images/gallery/community-cleanup.jpg',
      thumbnail: '/assets/images/gallery/community-cleanup-thumb.jpg',
      date: '2024-03-25',
      location: { en: 'Jumeirah Beach', ar: 'شاطئ جميرا' },
      featured: false,
      tags: ['community', 'cleanup', 'beach', 'environment']
    },
    {
      id: 5,
      title: {
        en: 'Charity Fundraiser',
        ar: 'جمع التبرعات الخيرية'
      },
      description: {
        en: 'Annual charity fundraiser event raising funds for various humanitarian projects.',
        ar: 'فعالية جمع التبرعات الخيرية السنوية لجمع الأموال لمشاريع إنسانية مختلفة'
      },
      category: { en: 'Charity Events', ar: 'الفعاليات الخيرية' },
      image: '/assets/images/gallery/charity-fundraiser.jpg',
      thumbnail: '/assets/images/gallery/charity-fundraiser-thumb.jpg',
      date: '2024-04-05',
      location: { en: 'Dubai, UAE', ar: 'دبي، الإمارات' },
      featured: true,
      tags: ['charity', 'fundraiser', 'event', 'humanitarian']
    },
    {
      id: 6,
      title: {
        en: 'Skills Training Workshop',
        ar: 'ورشة تدريب المهارات'
      },
      description: {
        en: 'Vocational training workshop providing skills development for unemployed youth.',
        ar: 'ورشة تدريب مهني توفر تطوير المهارات للشباب العاطلين عن العمل'
      },
      category: { en: 'Community Projects', ar: 'مشاريع المجتمع' },
      image: '/assets/images/gallery/skills-training.jpg',
      thumbnail: '/assets/images/gallery/skills-training-thumb.jpg',
      date: '2024-04-15',
      location: { en: 'Sharjah, UAE', ar: 'الشارقة، الإمارات' },
      featured: false,
      tags: ['training', 'skills', 'youth', 'employment']
    }
  ];

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.languageService.currentLang$.subscribe(lang => {
      this.isRTL = lang === 'ar';
    });
  }

  getCategoryName(category: PhotoCategory): string {
    return category.name[this.isRTL ? 'ar' : 'en'];
  }

  getPhotoTitle(photo: PhotoItem): string {
    return photo.title[this.isRTL ? 'ar' : 'en'];
  }

  getPhotoDescription(photo: PhotoItem): string {
    return photo.description[this.isRTL ? 'ar' : 'en'];
  }

  getPhotoCategory(photo: PhotoItem): string {
    return photo.category[this.isRTL ? 'ar' : 'en'];
  }

  getPhotoLocation(photo: PhotoItem): string {
    return photo.location[this.isRTL ? 'ar' : 'en'];
  }

  getFilteredPhotos(): PhotoItem[] {
    let filtered = this.photos;

    // Filter by category
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(photo =>
        photo.category.en === this.selectedCategory ||
        photo.category.ar === this.selectedCategory
      );
    }

    // Filter by search query
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(photo =>
        photo.title.en.toLowerCase().includes(query) ||
        photo.title.ar.includes(query) ||
        photo.description.en.toLowerCase().includes(query) ||
        photo.description.ar.includes(query) ||
        photo.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Sort photos
    filtered.sort((a, b) => {
      switch (this.sortBy) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'featured':
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        default:
          return 0;
      }
    });

    return filtered;
  }

  getFeaturedPhotos(): PhotoItem[] {
    return this.photos.filter(photo => photo.featured);
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

  openPhotoModal(photo: PhotoItem) {
    this.selectedPhoto = photo;
  }

  closePhotoModal() {
    this.selectedPhoto = null;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString(this.isRTL ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getCategoryColor(category: string): string {
    const colorMap: { [key: string]: string } = {
      'Charity Events': '#dc2626',
      'Community Projects': '#3b82f6',
      'Environmental Initiatives': '#10b981',
      'Education Programs': '#f59e0b',
      'Healthcare Services': '#8b5cf6'
    };
    return colorMap[category] || '#059669';
  }
}
