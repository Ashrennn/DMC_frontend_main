# Footer Desktop Component - Implementation Step by Step

## Table of Contents
1. [Initial Setup](#initial-setup)
2. [Component Creation](#component-creation)
3. [Content Management Setup](#content-management-setup)
4. [Template Implementation](#template-implementation)
5. [Styling Implementation](#styling-implementation)
6. [Interactive Features](#interactive-features)
7. [Language Support](#language-support)
8. [Testing & Validation](#testing--validation)

---

## 1. Initial Setup

### 1.1 Prerequisites
- Angular 19 project with Material Design installed
- Footer Bar module structure created
- Language service configured
- Responsive service available

### 1.2 File Structure Creation
```bash
# Create the component file
touch src/app/features/home/home/navigation/footer-bar/layouts/desktop-footer.component.ts

# Ensure content folder exists
mkdir -p src/app/features/home/home/navigation/footer-bar/content/language-content
```

---

## 2. Component Creation

### 2.1 Basic Component Structure
```typescript
import { Component, OnInit, OnDestroy, Input, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Subscription } from 'rxjs';
import { FooterContentService } from '../content/footer-content.service';
import { LanguageService } from '../../../../shared/services/language.service';

@Component({
  selector: 'dmc-desktop-footer',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDividerModule],
  templateUrl: './desktop-footer.component.html',
  styleUrls: ['./desktop-footer.component.scss']
})
export class DesktopFooterComponent implements OnInit, OnDestroy {
  @Input() childData: any;
  
  // Component properties
  currentLang: 'en' | 'ar' = 'en';
  
  constructor(
    private footerContentService: FooterContentService,
    private languageService: LanguageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  
  ngOnInit(): void {
    // Implementation
  }
  
  ngOnDestroy(): void {
    // Implementation
  }
}
```

### 2.2 Add Required Properties
```typescript
export class DesktopFooterComponent implements OnInit, OnDestroy {
  // Content properties
  companyInfo: any;
  disclaimer: string = '';
  legalLinks: any[] = [];
  credits: any;
  sectionTitles: any;
  topRowData: any;
  locationData: any;
  quickConnectData: any;
  downloadsData: any[] = [];
  topSectionTitles: any;
  
  // Map properties
  private leafletLib: any | null = null;
  private leafletMap: any | null = null;
  private leafletMarker: any | null = null;
  
  // Lifecycle
  private subscription: Subscription = new Subscription();
}
```

---

## 3. Content Management Setup

### 3.1 Create Type Definitions
```typescript
// footer-content.types.ts
export interface DownloadCategory {
  title: { en: string; ar: string; };
  documents: DownloadDocument[];
}

export interface DownloadDocument {
  id: string;
  name: { en: string; ar: string; };
  icon: string;
  url?: string;
}

export interface FooterTopContent {
  downloads: DownloadCategory[];
  sectionTitles: {
    siteMap: { en: string; ar: string; };
    downloads: { en: string; ar: string; };
    ourLocation: { en: string; ar: string; };
  };
}
```

### 3.2 Create Language Content
```typescript
// footer-top-content.ts
export const FooterTopContentData: FooterTopContent = {
  downloads: [
    {
      title: { en: 'Vendor Registration', ar: 'تسجيل الموردين' },
      documents: [
        {
          id: 'vendor-form',
          name: { en: 'Vendor Registration Form', ar: 'نموذج تسجيل الموردين' },
          icon: 'description'
        }
      ]
    }
  ],
  sectionTitles: {
    siteMap: { en: 'Site Map', ar: 'خريطة الموقع' },
    downloads: { en: 'Downloads', ar: 'التحميلات' },
    ourLocation: { en: 'Our Location', ar: 'موقعنا' }
  }
};
```

### 3.3 Create Content Service
```typescript
// footer-content.service.ts
@Injectable({
  providedIn: 'root'
})
export class FooterContentService {
  
  getDownloadsData(lang: 'en' | 'ar' = 'en'): DownloadCategory[] {
    const content = this.getFooterTopContent();
    return content.downloads.map(category => ({
      title: category.title[lang],
      documents: category.documents.map(doc => ({
        ...doc,
        name: doc.name[lang]
      }))
    }));
  }
  
  getTopSectionTitles(lang: 'en' | 'ar' = 'en'): any {
    const content = this.getFooterTopContent();
    return {
      siteMap: content.sectionTitles.siteMap[lang],
      downloads: content.sectionTitles.downloads[lang],
      ourLocation: content.sectionTitles.ourLocation[lang]
    };
  }
  
  getFooterTopContent(): FooterTopContent {
    return FooterTopContentData;
  }
}
```

---

## 4. Template Implementation

### 4.1 Top Container Structure
```html
<div class="top-container">
  <div class="top-division">
    <div class="first-row">
      <!-- Left Chamber Image -->
      <div class="top-column-1">
        <div class="chamber-image-container sharjah-container">
          <!-- Sharjah image background -->
        </div>
      </div>
      
      <!-- Center Content -->
      <div class="top-column-2">
        <div class="top-row-content">
          <h2 class="top-row-title">{{topRowData?.title}}</h2>
          <p class="top-row-description">{{topRowData?.description}}</p>
        </div>
      </div>
      
      <!-- Right Chamber Image -->
      <div class="top-column-3">
        <div class="chamber-image-container icc-container">
          <!-- ICC image background -->
        </div>
      </div>
    </div>
  </div>
</div>
```

### 4.2 Second Row Structure
```html
<div class="second-row">
  <!-- Logo Container -->
  <div class="column-1">
    <div class="logo-container">
      <div class="logo-section top-logo">
        <img [src]="'/images/footer/icons/dmc.png'" alt="DMC Company Logo" class="company-logo">
      </div>
      <div class="logo-section bottom-logo">
        <img [src]="'/images/footer/icons/ssl.png'" alt="SSL Certificate" class="ssl-logo">
      </div>
    </div>
  </div>
  
  <!-- Quick Connect -->
  <div class="column-2">
    <div class="quick-connect-container">
      <!-- Stay Updated Section -->
      <div class="stay-updated">
        <h4 class="section-title">
          <mat-icon class="section-icon">link</mat-icon>
          {{quickConnectData?.stayUpdated?.title}}
        </h4>
        <div class="stay-updated-divider"></div>
        <p class="section-description">{{quickConnectData?.stayUpdated?.description}}</p>
        <div class="email-subscription">
          <input type="email" [placeholder]="quickConnectData?.stayUpdated?.emailPlaceholder" class="email-input">
          <button class="subscribe-btn">
            <mat-icon>send</mat-icon>
          </button>
        </div>
      </div>
      
      <!-- Follow Us Section -->
      <div class="follow-us">
        <h4 class="section-title">
          <mat-icon class="section-icon">share</mat-icon>
          {{quickConnectData?.followUs?.title}}
        </h4>
        <div class="follow-us-divider"></div>
        <div class="social-icons">
          <button *ngFor="let social of quickConnectData?.followUs?.socialLinks" 
                  class="social-icon" 
                  (click)="onSocialClick(social)"
                  [title]="social.label">
            <mat-icon>{{social.icon}}</mat-icon>
          </button>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Sitemap -->
  <div class="column-3">
    <div class="sitemap-container">
      <h4 class="sitemap-title">
        <mat-icon class="section-icon">map</mat-icon>
        {{topSectionTitles?.siteMap}}
      </h4>
      <div class="sitemap-divider"></div>
      
      <!-- Sitemap Content -->
      <div class="sitemap-content">
        <!-- Home Section -->
        <div class="sitemap-section">
          <h5 class="section-title">{{currentLang === 'ar' ? 'الرئيسية' : 'Home'}}</h5>
          <div class="section-divider"></div>
          <div class="section-links">
            <div class="sitemap-link">
              <mat-icon class="link-icon">home</mat-icon>
              <span class="link-text">{{currentLang === 'ar' ? 'الرئيسية' : 'Home'}}</span>
            </div>
          </div>
        </div>
        
        <!-- About Us Section -->
        <div class="sitemap-section">
          <h5 class="section-title">{{currentLang === 'ar' ? 'من نحن' : 'About Us'}}</h5>
          <div class="section-divider"></div>
          <div class="section-links">
            <div class="sitemap-link">
              <mat-icon class="link-icon">refresh</mat-icon>
              <span class="link-text">{{currentLang === 'ar' ? 'تاريخنا' : 'Our History'}}</span>
            </div>
            <div class="sitemap-link">
              <mat-icon class="link-icon">info</mat-icon>
              <span class="link-text">{{currentLang === 'ar' ? 'ماذا نفعل' : 'What We Do'}}</span>
            </div>
            <div class="sitemap-link">
              <mat-icon class="link-icon">people</mat-icon>
              <span class="link-text">{{currentLang === 'ar' ? 'أشخاصنا' : 'Our People'}}</span>
            </div>
            <div class="sitemap-link">
              <mat-icon class="link-icon">favorite</mat-icon>
              <span class="link-text">{{currentLang === 'ar' ? 'قيمنا' : 'Our Values'}}</span>
            </div>
          </div>
        </div>
        
        <!-- Services Section -->
        <div class="sitemap-section">
          <h5 class="section-title">{{currentLang === 'ar' ? 'خدماتنا' : 'Our Services'}}</h5>
          <div class="section-divider"></div>
          <div class="section-links">
            <div class="sitemap-link">
              <mat-icon class="link-icon">local_shipping</mat-icon>
              <span class="link-text">{{currentLang === 'ar' ? 'الشحن البحري' : 'Marine Shipping'}}</span>
            </div>
            <div class="sitemap-link">
              <mat-icon class="link-icon">oil_barrel</mat-icon>
              <span class="link-text">{{currentLang === 'ar' ? 'تزويد الوقود' : 'Bunkering'}}</span>
            </div>
            <div class="sitemap-link">
              <mat-icon class="link-icon">engineering</mat-icon>
              <span class="link-text">{{currentLang === 'ar' ? 'الهندسة البحرية' : 'Marine Engineering'}}</span>
            </div>
          </div>
        </div>
        
        <!-- Contact Section -->
        <div class="sitemap-section">
          <h5 class="section-title">{{currentLang === 'ar' ? 'اتصل بنا' : 'Contact Us'}}</h5>
          <div class="section-divider"></div>
          <div class="section-links">
            <div class="sitemap-link">
              <mat-icon class="link-icon">phone</mat-icon>
              <span class="link-text">{{currentLang === 'ar' ? 'الهاتف' : 'Phone'}}</span>
            </div>
            <div class="sitemap-link">
              <mat-icon class="link-icon">email</mat-icon>
              <span class="link-text">{{currentLang === 'ar' ? 'البريد الإلكتروني' : 'Email'}}</span>
            </div>
            <div class="sitemap-link">
              <mat-icon class="link-icon">location_on</mat-icon>
              <span class="link-text">{{currentLang === 'ar' ? 'العنوان' : 'Address'}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Downloads -->
  <div class="column-4">
    <div class="downloads-container">
      <h4 class="downloads-title">
        <mat-icon class="section-icon">download</mat-icon>
        {{topSectionTitles?.downloads}}
      </h4>
      <div class="downloads-divider"></div>
      
      <!-- Downloads Content -->
      <div class="downloads-content">
        <div class="download-category" *ngFor="let category of downloadsData">
          <h5 class="category-title">{{category.title}}</h5>
          <div class="documents-list">
            <div class="document-item" *ngFor="let document of category.documents" (click)="onDocumentClick(document)">
              <mat-icon class="pdf-icon">{{document.icon}}</mat-icon>
              <span class="document-name">{{document.name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Our Location -->
  <div class="column-5">
    <div class="location-container">
      <h4 class="location-title">
        <mat-icon class="section-icon">location_on</mat-icon>
        {{topSectionTitles?.ourLocation}}
      </h4>
      <div class="location-divider"></div>
      <div id="desktop-footer-leaflet-map" class="leaflet-map" [ngClass]="{'rtl-mode': currentLang === 'ar'}"></div>
    </div>
  </div>
</div>
```

---

## 5. Styling Implementation

### 5.1 Base Container Styling
```scss
.desktop-footer {
  background: url('/images/footer/backgrounds/ft1.jpg') center/cover no-repeat;
  height: 100vh;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.top-container {
  width: 100%;
  min-width: 600px;
  max-width: 1200px;
  min-height: 300px;
  max-height: 450px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  margin-bottom: 0;
  padding: 1rem 0 1rem 0; // Left padding removed
  
  .first-row {
    height: 80px;
    min-height: 80px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    gap: 0;
    padding: 0;
  }
}
```

### 5.2 Chamber Image Styling
```scss
.chamber-image-container {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 15px;
  opacity: 0.8;
  transition: opacity 0.3s ease;
  
  &:hover {
    opacity: 1;
  }
  
  &.sharjah-container {
    background-image: url('/images/footer/chamber/sharjah.png');
  }
  
  &.icc-container {
    background-image: url('/images/footer/chamber/icc.png');
  }
}
```

### 5.3 Section Title Styling
```scss
.section-title {
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--primary-color);
  margin: 0 0 0.8rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  .section-icon {
    font-size: 1rem;
    width: 1rem;
    height: 1rem;
    color: var(--primary-color);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 1px;
    background: var(--primary-color);
    border-radius: 0.5px;
  }
}
```

---

## 6. Interactive Features

### 6.1 Map Integration
```typescript
private initializeMap(): void {
  if (typeof window !== 'undefined' && !this.leafletLib) {
    this.leafletLib = (window as any).L;
  }
  
  if (!this.leafletLib) return;
  
  const mapContainer = document.getElementById('desktop-footer-leaflet-map');
  if (!mapContainer) return;
  
  // Initialize map with coordinates
  const map = this.leafletLib.map('desktop-footer-leaflet-map', {
    center: [25.2048, 55.2708], // Dubai coordinates
    zoom: 13,
    zoomControl: false,
    attributionControl: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    keyboard: false,
    dragging: false,
    touchZoom: false
  });
  
  // Add custom marker
  const marker = this.leafletLib.marker([25.2048, 55.2708], {
    icon: this.leafletLib.divIcon({
      className: 'custom-marker',
      html: '<div style="background-color: var(--primary-color); width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    })
  }).addTo(map);
  
  this.leafletMap = map;
  this.leafletMarker = marker;
}
```

### 6.2 Event Handlers
```typescript
onLinkClick(link: any): void {
  if (link?.url) {
    window.open(link.url, '_blank', 'noopener,noreferrer');
  }
}

onDocumentClick(document: any): void {
  if (document?.url) {
    window.open(document.url, '_blank', 'noopener,noreferrer');
  } else {
    console.log('Processing document:', document.name);
  }
}

onSocialClick(social: any): void {
  if (social?.url) {
    window.open(social.url, '_blank', 'noopener,noreferrer');
  } else if (social?.action === 'copy') {
    navigator.clipboard.writeText(social.value || '');
  }
}
```

---

## 7. Language Support

### 7.1 Language Detection
```typescript
ngOnInit(): void {
  // Subscribe to language changes
  this.subscription.add(
    this.languageService.currentLanguage$.subscribe(lang => {
      this.currentLang = lang?.code || 'en';
      this.loadContent();
      this.refreshLeafletMap();
    })
  );
  
  // Load initial content
  this.loadContent();
}
```

### 7.2 Content Loading
```typescript
private loadContent(): void {
  // Load downloads data
  this.downloadsData = this.footerContentService.getDownloadsData(this.currentLang);
  
  // Load section titles
  this.topSectionTitles = this.footerContentService.getTopSectionTitles(this.currentLang);
  
  // Load other content
  this.companyInfo = this.footerContentService.getCompanyInfo();
  this.disclaimer = this.footerContentService.getDisclaimer(this.currentLang);
  this.legalLinks = this.footerContentService.getLegalLinks(this.currentLang);
  this.credits = this.footerContentService.getCredits(this.currentLang);
  this.sectionTitles = this.footerContentService.getSectionTitles(this.currentLang);
  this.topRowData = this.footerContentService.getTopRowData(this.currentLang);
  this.locationData = this.footerContentService.getLocationData(this.currentLang);
  this.quickConnectData = this.footerContentService.getQuickConnectData(this.currentLang);
}
```

---

## 8. Testing & Validation

### 8.1 Component Testing
```typescript
// Test content loading
it('should load downloads data', () => {
  component.ngOnInit();
  expect(component.downloadsData).toBeDefined();
  expect(component.downloadsData.length).toBeGreaterThan(0);
});

// Test language switching
it('should switch language correctly', () => {
  component.currentLang = 'ar';
  component.loadContent();
  expect(component.topSectionTitles.siteMap).toBe('خريطة الموقع');
});
```

### 8.2 Visual Testing
- Test in different browsers
- Verify responsive behavior
- Check RTL layout support
- Validate accessibility features

### 8.3 Performance Testing
- Monitor component initialization time
- Check memory usage
- Verify cleanup on destroy
- Test with large content datasets

---

## 📋 Implementation Checklist

### Phase 1: Basic Structure ✅
- [x] Create component file
- [x] Setup basic template structure
- [x] Add component properties
- [x] Implement basic styling

### Phase 2: Content Management ✅
- [x] Create type definitions
- [x] Setup language content
- [x] Implement content service
- [x] Connect component to service

### Phase 3: Interactive Features ✅
- [x] Implement map integration
- [x] Add event handlers
- [x] Setup social media integration
- [x] Create downloads functionality

### Phase 4: Language Support ✅
- [x] Implement language detection
- [x] Add RTL support
- [x] Setup content switching
- [x] Test multilingual functionality

### Phase 5: Testing & Polish ✅
- [x] Component testing
- [x] Visual validation
- [x] Performance optimization
- [x] Accessibility compliance

---

**📝 Document Information:**
- **Last Updated**: March 24, 2025
- **Current Version**: v1.0.0
- **Document Status**: ✅ **ACTIVE & COMPLETE**
- **Implementation Status**: **All Phases Complete**

*Step-by-step implementation guide completed successfully!*
