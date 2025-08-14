import { FooterTopContent } from '../footer-content.types';

export const FooterTopContentData: FooterTopContent = {
  topRow: {
    title: {
      en: 'Damico is a family',
      ar: 'داميكو عائلة'
    },
    description: {
      en: 'Fueling tomorrow',
      ar: 'نحفز الغد'
    }
  },
  logos: {
    company: {
      src: '/images/footer/icons/dmc.svg',
      alt: {
        en: 'Damico Energy Group',
        ar: 'مجموعة داميكو للطاقة'
      }
    },
    ssl: {
      src: '/images/footer/icons/ssl.png',
      alt: {
        en: 'SSL Certificate',
        ar: 'شهادة SSL'
      }
    }
  },
  location: {
    title: {
      en: 'Our Location',
      ar: 'موقعنا'
    },
    address: {
      en: 'DAMICO Energy FZE\nHamriyah Free Zone, Sharjah, UAE\nPO Box 42162',
      ar: 'داميكو إنرجي إف زد إي\nالمنطقة الحرة بالحمرية، الشارقة، الإمارات العربية المتحدة\nص.ب 42162'
    },
    coordinates: {
      lat: 25.471945,
      lng: 55.491711
    }
  },
  quickConnect: {
    stayUpdated: {
      title: {
        en: 'Stay Updated',
        ar: 'ابق على اطلاع'
      },
      description: {
        en: 'Subscribe to our newsletter for the latest updates',
        ar: 'اشترك في نشرتنا الإخبارية للحصول على آخر التحديثات'
      },
      emailPlaceholder: {
        en: 'Your Email',
        ar: 'بريدك الإلكتروني'
      },
      subscribeButton: {
        en: 'Subscribe',
        ar: 'اشتراك'
      }
    },
    followUs: {
      title: {
        en: 'Follow Us',
        ar: 'تابعنا'
      },
      socialLinks: [
        {
          id: 'youtube',
          platform: 'YouTube',
          icon: 'play_circle',
          url: 'https://youtube.com/@damicoenergygroup',
          label: {
            en: 'YouTube',
            ar: 'يوتيوب'
          }
        },
        {
          id: 'whatsapp',
          platform: 'WhatsApp',
          icon: 'chat',
          url: 'https://wa.me/+971501234567',
          label: {
            en: 'WhatsApp',
            ar: 'واتساب'
          }
        },
        {
          id: 'x',
          platform: 'X (Twitter)',
          icon: 'close',
          url: 'https://x.com/damicoenergygrp',
          label: {
            en: 'X (Twitter)',
            ar: 'إكس (تويتر)'
          }
        },
        {
          id: 'blog',
          platform: 'Blog',
          icon: 'article',
          url: 'https://blog.damicoenergygroup.com',
          label: {
            en: 'Blog',
            ar: 'المدونة'
          }
        },
        {
          id: 'email',
          platform: 'Email',
          icon: 'alternate_email',
          url: 'mailto:info@damicoenergygroup.com',
          label: {
            en: 'Email',
            ar: 'البريد الإلكتروني'
          }
        }
      ]
    },
    actionButtons: [
      {
        id: 'customer-login',
        icon: 'person',
        label: {
          en: 'Customer Login',
          ar: 'تسجيل دخول العميل'
        },
        url: '/customer-login'
      },
      {
        id: 'staff-login',
        icon: 'work',
        label: {
          en: 'Staff Login',
          ar: 'تسجيل دخول الموظفين'
        },
        url: '/staff-login'
      },
      {
        id: 'sitemap',
        icon: 'map',
        label: {
          en: 'Site Map',
          ar: 'خريطة الموقع'
        },
        url: '/sitemap'
      },
      {
        id: 'downloads',
        icon: 'download',
        label: {
          en: 'Downloads',
          ar: 'التحميلات'
        },
        url: '/downloads'
      }
    ]
  },
  sectionTitles: {
    siteMap: {
      en: 'Site Map',
      ar: 'خريطة الموقع'
    },
    downloads: {
      en: 'Downloads',
      ar: 'التحميلات'
    },
    ourLocation: {
      en: 'Our Location',
      ar: 'موقعنا'
    }
  },
  downloads: [
    {
      title: {
        en: 'Vendor Registration',
        ar: 'تسجيل الموردين'
      },
      documents: [
        {
          id: 'vendor-registration-form',
          name: {
            en: 'Vendor Registration Form',
            ar: 'نموذج تسجيل الموردين'
          },
          icon: 'description',
          url: '/downloads/vendor-registration-form.pdf'
        },
        {
          id: 'terms-conditions',
          name: {
            en: 'Terms & Conditions',
            ar: 'الشروط والأحكام'
          },
          icon: 'description',
          url: '/downloads/terms-conditions.pdf'
        },
        {
          id: 'required-documents',
          name: {
            en: 'Required Documents List',
            ar: 'قائمة المستندات المطلوبة'
          },
          icon: 'description',
          url: '/downloads/required-documents.pdf'
        }
      ]
    },
    {
      title: {
        en: 'Company Documents',
        ar: 'مستندات الشركة'
      },
      documents: [
        {
          id: 'company-profile',
          name: {
            en: 'Company Profile',
            ar: 'الملف التعريفي للشركة'
          },
          icon: 'description',
          url: '/downloads/company-profile.pdf'
        },
        {
          id: 'financial-statements',
          name: {
            en: 'Financial Statements',
            ar: 'البيانات المالية'
          },
          icon: 'description',
          url: '/downloads/financial-statements.pdf'
        }
      ]
    },
    {
      title: {
        en: 'Compliance',
        ar: 'الامتثال'
      },
      documents: [
        {
          id: 'regulatory-guidelines',
          name: {
            en: 'Regulatory Guidelines',
            ar: 'المبادئ التوجيهية التنظيمية'
          },
          icon: 'description',
          url: '/downloads/regulatory-guidelines.pdf'
        },
        {
          id: 'safety-standards',
          name: {
            en: 'Safety Standards',
            ar: 'معايير السلامة'
          },
          icon: 'description',
          url: '/downloads/safety-standards.pdf'
        }
      ]
    }
  ]
};
