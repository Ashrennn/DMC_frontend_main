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
  templateUrl: './what-we-do.component.html',
  styleUrls: ['./what-we-do.component.scss']
})
export class WhatWeDoComponent implements OnInit {
  isRTL = false;

  coreServices = [
    {
      icon: 'business_center',
      title: 'Energy Solutions',
      description: 'Comprehensive energy services including oil & gas, renewable energy, and power generation.',
      image: 'images/about/what-we-do/comp1/card1.jpg',
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
      image: 'images/about/what-we-do/comp1/card2.jpg',
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
      image: 'images/about/what-we-do/comp1/card3.jpg',
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
      image: 'images/about/what-we-do/comp2/h9.jpg',
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
      image: 'images/about/our-values/gas-oil.jpg',
      stats: [
        { value: '25+', label: 'Years Experience' },
        { value: '50+', label: 'Active Projects' }
      ]
    },
    {
      icon: 'solar_power',
      title: 'Renewable Energy',
      description: 'Pioneering sustainable energy solutions for a greener future.',
      image: 'images/about/our-values/lng.png',
      stats: [
        { value: '15+', label: 'Solar Projects' },
        { value: '500MW', label: 'Capacity' }
      ]
    },
    {
      icon: 'anchor',
      title: 'Maritime',
      description: 'Comprehensive maritime services with global reach and local expertise.',
      image: 'images/about/our-values/ship.png',
      stats: [
        { value: '100+', label: 'Vessels Managed' },
        { value: '20+', label: 'Ports Served' }
      ]
    },
    {
      icon: 'factory',
      title: 'Industrial',
      description: 'Industrial solutions and manufacturing capabilities across diverse sectors.',
      image: 'images/about/our-values/Truck.jpg',
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

