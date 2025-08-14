import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { LanguageService } from '../../../../../shared/services/language.service';

@Component({
  selector: 'dmc-what-we-do',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatCardModule, MatExpansionModule],
  template: `
    <div class="what-we-do-container" [class.rtl]="isRTL">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title">{{ getText('title') }}</h1>
          <p class="hero-subtitle">{{ getText('subtitle') }}</p>
        </div>
      </section>

      <!-- Core Services Section -->
      <section class="services-section">
        <div class="container">
          <h2 class="section-title">{{ getText('coreServices') }}</h2>
          <div class="services-grid">
            <div class="service-card" *ngFor="let service of coreServices">
              <div class="service-icon">
                <mat-icon>{{ service.icon }}</mat-icon>
              </div>
              <h3 class="service-title">{{ service.title }}</h3>
              <p class="service-description">{{ service.description }}</p>
              <ul class="service-features">
                <li *ngFor="let feature of service.features">{{ feature }}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Business Areas Section -->
      <section class="business-areas-section">
        <div class="container">
          <h2 class="section-title">{{ getText('businessAreas') }}</h2>
          <div class="areas-grid">
            <div class="area-card" *ngFor="let area of businessAreas">
              <div class="area-header">
                <mat-icon class="area-icon">{{ area.icon }}</mat-icon>
                <h3 class="area-title">{{ area.title }}</h3>
              </div>
              <p class="area-description">{{ area.description }}</p>
              <div class="area-stats">
                <div class="stat" *ngFor="let stat of area.stats">
                  <span class="stat-number">{{ stat.value }}</span>
                  <span class="stat-label">{{ stat.label }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Capabilities Section -->
      <section class="capabilities-section">
        <div class="container">
          <h2 class="section-title">{{ getText('capabilities') }}</h2>
          <div class="capabilities-list">
            <mat-expansion-panel *ngFor="let capability of capabilities" class="capability-panel">
              <mat-expansion-panel-header>
                <mat-panel-title>
                  <mat-icon class="capability-icon">{{ capability.icon }}</mat-icon>
                  {{ capability.title }}
                </mat-panel-title>
              </mat-expansion-panel-header>
              <div class="capability-content">
                <p>{{ capability.description }}</p>
                <div class="capability-details">
                  <div class="detail-item" *ngFor="let detail of capability.details">
                    <strong>{{ detail.label }}:</strong> {{ detail.value }}
                  </div>
                </div>
              </div>
            </mat-expansion-panel>
          </div>
        </div>
      </section>

      <!-- Global Presence Section -->
      <section class="global-presence-section">
        <div class="container">
          <h2 class="section-title">{{ getText('globalPresence') }}</h2>
          <div class="presence-stats">
            <div class="presence-stat" *ngFor="let stat of globalStats">
              <div class="stat-circle">
                <span class="stat-number">{{ stat.value }}</span>
              </div>
              <p class="stat-description">{{ stat.description }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .what-we-do-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    }

    .hero-section {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 80px 0;
      text-align: center;
    }

    .hero-content {
      max-width: 800px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .hero-title {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 20px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }

    .hero-subtitle {
      font-size: 1.2rem;
      opacity: 0.9;
      line-height: 1.6;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .section-title {
      font-size: 2.5rem;
      font-weight: 600;
      text-align: center;
      margin: 60px 0 40px;
      color: #2c3e50;
    }

    /* Services Section */
    .services-section {
      padding: 80px 0;
      background: white;
    }

    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 30px;
      margin-top: 40px;
    }

    .service-card {
      background: white;
      border-radius: 15px;
      padding: 30px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      border: 1px solid #e1e8ed;
    }

    .service-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(0,0,0,0.15);
    }

    .service-icon {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
    }

    .service-icon mat-icon {
      color: white;
      font-size: 28px;
      width: 28px;
      height: 28px;
    }

    .service-title {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 15px;
      color: #2c3e50;
    }

    .service-description {
      color: #666;
      line-height: 1.6;
      margin-bottom: 20px;
    }

    .service-features {
      list-style: none;
      padding: 0;
    }

    .service-features li {
      padding: 8px 0;
      color: #555;
      position: relative;
      padding-left: 25px;
    }

    .service-features li::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: #27ae60;
      font-weight: bold;
    }

    /* Business Areas Section */
    .business-areas-section {
      padding: 80px 0;
      background: #f8f9fa;
    }

    .areas-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 30px;
      margin-top: 40px;
    }

    .area-card {
      background: white;
      border-radius: 15px;
      padding: 30px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.08);
      transition: transform 0.3s ease;
    }

    .area-card:hover {
      transform: translateY(-3px);
    }

    .area-header {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }

    .area-icon {
      color: #667eea;
      font-size: 32px;
      width: 32px;
      height: 32px;
      margin-right: 15px;
    }

    .area-title {
      font-size: 1.3rem;
      font-weight: 600;
      color: #2c3e50;
      margin: 0;
    }

    .area-description {
      color: #666;
      line-height: 1.6;
      margin-bottom: 20px;
    }

    .area-stats {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
    }

    .stat {
      text-align: center;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 10px;
    }

    .stat-number {
      display: block;
      font-size: 1.5rem;
      font-weight: 700;
      color: #667eea;
    }

    .stat-label {
      font-size: 0.9rem;
      color: #666;
    }

    /* Capabilities Section */
    .capabilities-section {
      padding: 80px 0;
      background: white;
    }

    .capabilities-list {
      max-width: 800px;
      margin: 0 auto;
    }

    .capability-panel {
      margin-bottom: 15px;
      border-radius: 10px !important;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1) !important;
    }

    .capability-icon {
      color: #667eea;
      margin-right: 15px;
    }

    .capability-content {
      padding: 20px 0;
    }

    .capability-content p {
      color: #666;
      line-height: 1.6;
      margin-bottom: 20px;
    }

    .capability-details {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
    }

    .detail-item {
      padding: 10px;
      background: #f8f9fa;
      border-radius: 8px;
      font-size: 0.9rem;
    }

    /* Global Presence Section */
    .global-presence-section {
      padding: 80px 0;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .global-presence-section .section-title {
      color: white;
    }

    .presence-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 40px;
      margin-top: 40px;
    }

    .presence-stat {
      text-align: center;
    }

    .stat-circle {
      width: 120px;
      height: 120px;
      border: 4px solid rgba(255,255,255,0.3);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
      background: rgba(255,255,255,0.1);
    }

    .stat-circle .stat-number {
      font-size: 2rem;
      font-weight: 700;
    }

    .stat-description {
      font-size: 1rem;
      opacity: 0.9;
    }

    /* RTL Support */
    .rtl .service-features li {
      padding-left: 0;
      padding-right: 25px;
    }

    .rtl .service-features li::before {
      left: auto;
      right: 0;
    }

    .rtl .area-icon {
      margin-right: 0;
      margin-left: 15px;
    }

    .rtl .capability-icon {
      margin-right: 0;
      margin-left: 15px;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .hero-title {
        font-size: 2rem;
      }

      .section-title {
        font-size: 2rem;
      }

      .services-grid,
      .areas-grid {
        grid-template-columns: 1fr;
      }

      .presence-stats {
        grid-template-columns: repeat(2, 1fr);
      }

      .stat-circle {
        width: 100px;
        height: 100px;
      }

      .stat-circle .stat-number {
        font-size: 1.5rem;
      }
    }

    @media (max-width: 480px) {
      .presence-stats {
        grid-template-columns: 1fr;
      }

      .area-stats {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class WhatWeDoComponent implements OnInit {
  isRTL = false;

  coreServices = [
    {
      icon: 'business_center',
      title: 'Energy Solutions',
      description: 'Comprehensive energy services including oil & gas, renewable energy, and power generation.',
      features: [
        'Oil & Gas Exploration & Production',
        'Renewable Energy Projects',
        'Power Generation & Distribution',
        'Energy Infrastructure Development'
      ]
    },
    {
      icon: 'directions_boat',
      title: 'Maritime Services',
      description: 'Full-spectrum maritime solutions from vessel management to port operations.',
      features: [
        'Vessel Management & Operations',
        'Port & Terminal Services',
        'Maritime Logistics',
        'Shipbuilding & Maintenance'
      ]
    },
    {
      icon: 'engineering',
      title: 'Engineering & Construction',
      description: 'Turnkey engineering and construction services for complex industrial projects.',
      features: [
        'Industrial Plant Construction',
        'Infrastructure Development',
        'Project Management',
        'Technical Consulting'
      ]
    },
    {
      icon: 'trending_up',
      title: 'Investment & Development',
      description: 'Strategic investment and development initiatives across multiple sectors.',
      features: [
        'Strategic Investments',
        'Joint Ventures',
        'Market Development',
        'Financial Advisory'
      ]
    }
  ];

  businessAreas = [
    {
      icon: 'oil_barrel',
      title: 'Oil & Gas',
      description: 'Leading provider of integrated oil and gas services across the value chain.',
      stats: [
        { value: '25+', label: 'Years Experience' },
        { value: '50+', label: 'Active Projects' }
      ]
    },
    {
      icon: 'solar_power',
      title: 'Renewable Energy',
      description: 'Pioneering sustainable energy solutions for a greener future.',
      stats: [
        { value: '15+', label: 'Solar Projects' },
        { value: '500MW', label: 'Capacity' }
      ]
    },
    {
      icon: 'anchor',
      title: 'Maritime',
      description: 'Comprehensive maritime services with global reach and local expertise.',
      stats: [
        { value: '100+', label: 'Vessels Managed' },
        { value: '20+', label: 'Ports Served' }
      ]
    },
    {
      icon: 'factory',
      title: 'Industrial',
      description: 'Industrial solutions and manufacturing capabilities across diverse sectors.',
      stats: [
        { value: '30+', label: 'Facilities' },
        { value: '1000+', label: 'Employees' }
      ]
    }
  ];

  capabilities = [
    {
      icon: 'architecture',
      title: 'Project Management',
      description: 'End-to-end project management with proven methodologies and experienced teams.',
      details: [
        { label: 'Methodology', value: 'Agile & Waterfall' },
        { label: 'Team Size', value: '50-200 professionals' },
        { label: 'Success Rate', value: '95% on-time delivery' }
      ]
    },
    {
      icon: 'science',
      title: 'Research & Development',
      description: 'Cutting-edge R&D facilities driving innovation across all business areas.',
      details: [
        { label: 'Labs', value: '5 specialized facilities' },
        { label: 'Patents', value: '25+ active patents' },
        { label: 'Partnerships', value: '15+ research institutions' }
      ]
    },
    {
      icon: 'public',
      title: 'Global Operations',
      description: 'Worldwide presence with local expertise and international standards.',
      details: [
        { label: 'Countries', value: '25+ markets' },
        { label: 'Offices', value: '40+ locations' },
        { label: 'Languages', value: '18+ supported' }
      ]
    },
    {
      icon: 'verified',
      title: 'Quality Assurance',
      description: 'Rigorous quality standards and certifications across all operations.',
      details: [
        { label: 'ISO Standards', value: 'ISO 9001, 14001, 45001' },
        { label: 'Certifications', value: '15+ industry certifications' },
        { label: 'Audit Score', value: '98% compliance rate' }
      ]
    }
  ];

  globalStats = [
    {
      value: '25+',
      description: 'Years of Excellence'
    },
    {
      value: '40+',
      description: 'Global Offices'
    },
    {
      value: '1000+',
      description: 'Expert Professionals'
    },
    {
      value: '500+',
      description: 'Successful Projects'
    }
  ];

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    const currentLang = this.languageService.getCurrentLanguage();
    this.isRTL = currentLang?.direction === 'rtl';
  }

  getText(key: string): string {
    const currentLang = this.languageService.getCurrentLanguage();
    const langCode = currentLang?.code || 'en';
    const texts: { [key: string]: { en: string; ar: string } } = {
      title: {
        en: 'What We Do',
        ar: 'ما نقوم به'
      },
      subtitle: {
        en: 'Delivering innovative solutions across energy, maritime, and industrial sectors with global expertise and local insight.',
        ar: 'نقدم حلولاً مبتكرة في قطاعات الطاقة والبحري والصناعي مع خبرة عالمية ورؤية محلية.'
      },
      coreServices: {
        en: 'Core Services',
        ar: 'الخدمات الأساسية'
      },
      businessAreas: {
        en: 'Business Areas',
        ar: 'مجالات الأعمال'
      },
      capabilities: {
        en: 'Our Capabilities',
        ar: 'قدراتنا'
      },
      globalPresence: {
        en: 'Global Presence',
        ar: 'الوجود العالمي'
      }
    };

    return texts[key]?.[langCode as 'en' | 'ar'] || texts[key]?.en || key;
  }
}

