import { FooterBottomContent } from '../footer-content.types';

export const FooterBottomContentData: FooterBottomContent = {
  companyInfo: {
    name: {
      en: 'Damico Energy',
      ar: 'داميكو إنرجي'
    },
    copyright: {
      en: '© {{year}} Damico Energy Group',
      ar: '© {{year}} داميكو إنرجي جروب'
    },
    registered: '®'
  },
  disclaimer: {
    content: {
      en: 'Damico Energy Group delivers comprehensive solutions for the global oil and gas export industry through advanced drilling technologies, offshore operations, and LNG transport systems. As a key player in international markets, we excel in upstream exploration, midstream infrastructure, and downstream distribution across global regions. We maintain strict compliance with trade regulations while advancing sustainable energy practices through digital innovation and smart infrastructure. Our expertise spans crude oil logistics, natural gas processing, and renewable integration, with detailed information available through regulatory disclosures.',
      ar: 'تقدم مجموعة داميكو للطاقة حلولاً شاملة لصناعة تصدير النفط والغاز العالمية من خلال تقنيات الحفر المتقدمة والعمليات البحرية وأنظمة نقل الغاز الطبيعي المسال. كلاعب رئيسي في الأسواق الدولية، نتفوق في الاستكشاف الأولي والبنية التحتية الوسطى والتوزيع النهائي عبر المناطق العالمية. نحافظ على الامتثال الصارم للوائح التجارية بينما نعمل على تطوير ممارسات الطاقة المستدامة من خلال الابتكار الرقمي والبنية التحتية الذكية. تشمل خبرتنا لوجستيات النفط الخام ومعالجة الغاز الطبيعي والتكامل مع الطاقة المتجددة، مع توفر معلومات مفصلة من خلال الإفصاحات التنظيمية.'
    }
  },
  legalLinks: [
    {
      id: 'privacy',
      icon: 'privacy_tip',
      label: {
        en: 'Privacy',
        ar: 'الخصوصية'
      },
      url: '/privacy'
    },
    {
      id: 'security',
      icon: 'shield',
      label: {
        en: 'Security',
        ar: 'الأمان'
      },
      url: '/security'
    },
    {
      id: 'disclosure',
      icon: 'gavel',
      label: {
        en: 'Disclosure',
        ar: 'الإفصاح'
      },
      url: '/disclosure'
    },
    {
      id: 'terms',
      icon: 'description',
      label: {
        en: 'Terms',
        ar: 'الشروط'
      },
      url: '/terms'
    },
    {
      id: 'compliance',
      icon: 'verified_user',
      label: {
        en: 'Compliance',
        ar: 'الامتثال'
      },
      url: '/compliance'
    },
    {
      id: 'regulatory',
      icon: 'insights',
      label: {
        en: 'Regulatory',
        ar: 'التنظيمي'
      },
      url: '/regulatory'
    }
  ],
  credits: {
    title: {
      en: 'Credits',
      ar: 'الاعتمادات'
    },
    links: [
      {
        id: 'jenoza',
        icon: 'code',
        label: {
          en: 'JENOZA',
          ar: 'جينوزا'
        },
        url: '/jenoza'
      },
      {
        id: 'contact',
        icon: 'contact_support',
        label: {
          en: 'Contact',
          ar: 'اتصل بنا'
        },
        url: '/contact'
      }
    ]
  },
  sectionTitles: {
    legal: {
      en: 'Legal',
      ar: 'القانوني'
    },
    security: {
      en: 'Security',
      ar: 'الأمان'
    },
    regulatory: {
      en: 'Regulatory',
      ar: 'التنظيمي'
    }
  }
};
