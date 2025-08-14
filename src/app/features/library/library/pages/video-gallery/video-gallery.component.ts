import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { LanguageService } from '../../../../../shared/services/language.service';

interface VideoItem {
  id: number;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  thumbnail: string;
  duration: string;
  category: { en: string; ar: string };
  uploadDate: string;
  views: number;
  featured: boolean;
  tags: string[];
  videoUrl: string;
}

interface VideoCategory {
  id: number;
  name: { en: string; ar: string };
  icon: string;
  count: number;
  color: string;
}

@Component({
  selector: 'dmc-video-gallery',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  templateUrl: './video-gallery.component.html',
  styleUrls: ['./video-gallery.component.scss']
})
export class VideoGalleryComponent implements OnInit {
  isRTL = false;
  selectedCategory = 'all';
  searchQuery = '';
  sortBy = 'newest';

  categories: VideoCategory[] = [
    {
      id: 1,
      name: { en: 'All Videos', ar: 'جميع الفيديوهات' },
      icon: 'video_collection',
      count: 24,
      color: '#001B3F'
    },
    {
      id: 2,
      name: { en: 'Company Presentations', ar: 'عروض الشركة' },
      icon: 'business',
      count: 8,
      color: '#002960'
    },
    {
      id: 3,
      name: { en: 'Training Videos', ar: 'فيديوهات التدريب' },
      icon: 'school',
      count: 6,
      color: '#003d80'
    },
    {
      id: 4,
      name: { en: 'Events & Conferences', ar: 'الفعاليات والمؤتمرات' },
      icon: 'event',
      count: 4,
      color: '#16a34a'
    },
    {
      id: 5,
      name: { en: 'Technology Demos', ar: 'عروض التكنولوجيا' },
      icon: 'computer',
      count: 3,
      color: '#2563eb'
    },
    {
      id: 6,
      name: { en: 'Sustainability', ar: 'الاستدامة' },
      icon: 'eco',
      count: 3,
      color: '#dc2626'
    }
  ];

  videos: VideoItem[] = [
    {
      id: 1,
      title: {
        en: 'DMC Energy: Our Journey to Sustainability',
        ar: 'طاقة DMC: رحلتنا نحو الاستدامة'
      },
      description: {
        en: 'An overview of our commitment to sustainable energy practices and environmental responsibility.',
        ar: 'نظرة عامة على التزامنا بممارسات الطاقة المستدامة والمسؤولية البيئية'
      },
      thumbnail: '/assets/images/videos/sustainability-journey.jpg',
      duration: '12:45',
      category: { en: 'Company Presentations', ar: 'عروض الشركة' },
      uploadDate: '2024-12-15',
      views: 15420,
      featured: true,
      tags: ['sustainability', 'energy', 'company'],
      videoUrl: 'https://example.com/video1'
    },
    {
      id: 2,
      title: {
        en: 'AI in Maritime Operations: A Deep Dive',
        ar: 'الذكاء الاصطناعي في العمليات البحرية: نظرة عميقة'
      },
      description: {
        en: 'Exploring how artificial intelligence is revolutionizing maritime operations and safety.',
        ar: 'استكشاف كيفية ثورة الذكاء الاصطناعي في العمليات البحرية والسلامة'
      },
      thumbnail: '/assets/images/videos/ai-maritime.jpg',
      duration: '18:32',
      category: { en: 'Technology Demos', ar: 'عروض التكنولوجيا' },
      uploadDate: '2024-12-10',
      views: 8920,
      featured: true,
      tags: ['AI', 'maritime', 'technology', 'safety'],
      videoUrl: 'https://example.com/video2'
    },
    {
      id: 3,
      title: {
        en: 'Annual Sustainability Summit 2024',
        ar: 'قمة الاستدامة السنوية 2024'
      },
      description: {
        en: 'Highlights from our annual sustainability summit featuring industry leaders and experts.',
        ar: 'أبرز ما جاء في قمة الاستدامة السنوية بمشاركة قادة الصناعة والخبراء'
      },
      thumbnail: '/assets/images/videos/sustainability-summit.jpg',
      duration: '45:20',
      category: { en: 'Events & Conferences', ar: 'الفعاليات والمؤتمرات' },
      uploadDate: '2024-12-05',
      views: 12340,
      featured: false,
      tags: ['sustainability', 'summit', 'events', 'conference'],
      videoUrl: 'https://example.com/video3'
    },
    {
      id: 4,
      title: {
        en: 'Safety Training: Emergency Response Procedures',
        ar: 'تدريب السلامة: إجراءات الاستجابة للطوارئ'
      },
      description: {
        en: 'Comprehensive training on emergency response procedures and safety protocols.',
        ar: 'تدريب شامل على إجراءات الاستجابة للطوارئ وبروتوكولات السلامة'
      },
      thumbnail: '/assets/images/videos/safety-training.jpg',
      duration: '25:15',
      category: { en: 'Training Videos', ar: 'فيديوهات التدريب' },
      uploadDate: '2024-11-28',
      views: 5670,
      featured: false,
      tags: ['safety', 'training', 'emergency', 'procedures'],
      videoUrl: 'https://example.com/video4'
    },
    {
      id: 5,
      title: {
        en: 'Digital Transformation in Energy Trading',
        ar: 'التحول الرقمي في تجارة الطاقة'
      },
      description: {
        en: 'How digital technologies are transforming our energy trading operations.',
        ar: 'كيف تحول التقنيات الرقمية عمليات تجارة الطاقة لدينا'
      },
      thumbnail: '/assets/images/videos/digital-transformation.jpg',
      duration: '15:40',
      category: { en: 'Technology Demos', ar: 'عروض التكنولوجيا' },
      uploadDate: '2024-11-20',
      views: 7890,
      featured: false,
      tags: ['digital', 'transformation', 'energy', 'trading'],
      videoUrl: 'https://example.com/video5'
    },
    {
      id: 6,
      title: {
        en: 'Carbon Neutrality: Our Path Forward',
        ar: 'الحياد الكربوني: مسارنا للأمام'
      },
      description: {
        en: 'Our strategic approach to achieving carbon neutrality by 2030.',
        ar: 'نهجنا الاستراتيجي لتحقيق الحياد الكربوني بحلول عام 2030'
      },
      thumbnail: '/assets/images/videos/carbon-neutrality.jpg',
      duration: '20:30',
      category: { en: 'Sustainability', ar: 'الاستدامة' },
      uploadDate: '2024-11-15',
      views: 6540,
      featured: false,
      tags: ['carbon', 'neutrality', 'sustainability', '2030'],
      videoUrl: 'https://example.com/video6'
    }
  ];

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.languageService.currentLang$.subscribe(lang => {
      this.isRTL = lang === 'ar';
    });
  }

  getCategoryName(category: VideoCategory): string {
    return category.name[this.isRTL ? 'ar' : 'en'];
  }

  getVideoTitle(video: VideoItem): string {
    return video.title[this.isRTL ? 'ar' : 'en'];
  }

  getVideoDescription(video: VideoItem): string {
    return video.description[this.isRTL ? 'ar' : 'en'];
  }

  getVideoCategory(video: VideoItem): string {
    return video.category[this.isRTL ? 'ar' : 'en'];
  }

  getFilteredVideos(): VideoItem[] {
    let filtered = this.videos;

    // Filter by category
    if (this.selectedCategory !== 'all') {
      filtered = filtered.filter(video =>
        video.category.en === this.selectedCategory ||
        video.category.ar === this.selectedCategory
      );
    }

    // Filter by search query
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(video =>
        video.title.en.toLowerCase().includes(query) ||
        video.title.ar.includes(query) ||
        video.description.en.toLowerCase().includes(query) ||
        video.description.ar.includes(query) ||
        video.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Sort videos
    filtered.sort((a, b) => {
      switch (this.sortBy) {
        case 'newest':
          return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
        case 'oldest':
          return new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime();
        case 'most-viewed':
          return b.views - a.views;
        case 'longest':
          return this.parseDuration(b.duration) - this.parseDuration(a.duration);
        case 'shortest':
          return this.parseDuration(a.duration) - this.parseDuration(b.duration);
        default:
          return 0;
      }
    });

    return filtered;
  }

  getFeaturedVideos(): VideoItem[] {
    return this.videos.filter(video => video.featured);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString(this.isRTL ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  formatViews(views: number): string {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  }

  parseDuration(duration: string): number {
    const parts = duration.split(':').map(Number);
    return parts[0] * 60 + parts[1];
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

  playVideo(video: VideoItem) {
    // Handle video playback
    console.log('Playing video:', video.title);
    // In a real app, this would open a video player or modal
  }

  getCategoryColor(category: string): string {
    const colorMap: { [key: string]: string } = {
      'Company Presentations': '#002960',
      'Training Videos': '#003d80',
      'Events & Conferences': '#16a34a',
      'Technology Demos': '#2563eb',
      'Sustainability': '#dc2626'
    };
    return colorMap[category] || '#001B3F';
  }
}


