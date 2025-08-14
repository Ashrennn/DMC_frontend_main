export interface HeaderContent {
  brand: {
    title: {
      en: string;
      ar: string;
    };
    logo: string;
    tagline: {
      en: string;
      ar: string;
    };
  };
  media: {
    icons: {
      menu: string;
      close: string;
      search: string;
      user: string;
      notification: string;
      settings: string;
    };
    images: {
      logo: string;
      avatar: string;
      background: string;
    };
  };
  text: {
    actions: {
      login: {
        en: string;
        ar: string;
      };
      signup: {
        en: string;
        ar: string;
      };
      logout: {
        en: string;
        ar: string;
      };
      search: {
        en: string;
        ar: string;
      };
      menu: {
        en: string;
        ar: string;
      };
    };
    labels: {
      brand: {
        en: string;
        ar: string;
      };
      tagline: {
        en: string;
        ar: string;
      };
    };
    buttons: {
      whatsapp: {
        en: string;
        ar: string;
      };
      glossary: {
        en: string;
        ar: string;
      };
      internationalNews: {
        en: string;
        ar: string;
      };
      media: {
        en: string;
        ar: string;
      };
      language: {
        en: string;
        ar: string;
      };
    };
  };
  navigation: {
    primary: Array<{
      text: {
        en: string;
        ar: string;
      };
      url: string;
      icon: string;
    }>;
    secondary: Array<{
      text: {
        en: string;
        ar: string;
      };
      url: string;
      icon: string;
    }>;
  };
}

export const HeaderContentData: HeaderContent = {
  brand: {
    title: {
      en: 'DMCNRG',
      ar: 'DMCNRG'
    },
    logo: '/assets/images/logo.png',
    tagline: {
      en: 'Digital Media & Content Network',
      ar: 'شبكة الوسائط الرقمية والمحتوى'
    }
  },
  media: {
    icons: {
      menu: '☰',
      close: '✕',
      search: '🔍',
      user: '👤',
      notification: '🔔',
      settings: '⚙️'
    },
    images: {
      logo: '/assets/images/logo.png',
      avatar: '/assets/images/avatar.png',
      background: '/assets/images/header-bg.jpg'
    }
  },
  text: {
    actions: {
      login: {
        en: 'Login',
        ar: 'تسجيل الدخول'
      },
      signup: {
        en: 'Sign Up',
        ar: 'إنشاء حساب'
      },
      logout: {
        en: 'Logout',
        ar: 'تسجيل الخروج'
      },
      search: {
        en: 'Search',
        ar: 'بحث'
      },
      menu: {
        en: 'Menu',
        ar: 'القائمة'
      }
    },
    labels: {
      brand: {
        en: 'DMCNRG',
        ar: 'DMCNRG'
      },
      tagline: {
        en: 'Digital Media & Content Network',
        ar: 'شبكة الوسائط الرقمية والمحتوى'
      }
    },
    buttons: {
      whatsapp: {
        en: 'WhatsApp',
        ar: 'واتساب'
      },
      glossary: {
        en: 'Glossary',
        ar: 'قاموس'
      },
      internationalNews: {
        en: 'International',
        ar: 'الدولية'
      },
      media: {
        en: 'Media',
        ar: 'الوسائط'
      },
      language: {
        en: 'Language',
        ar: 'اللغة'
      }
    }
  },
  navigation: {
    primary: [
      { 
        text: { en: 'Home', ar: 'الرئيسية' }, 
        url: '/home', 
        icon: '🏠' 
      },
      { 
        text: { en: 'About', ar: 'حول' }, 
        url: '/about', 
        icon: 'ℹ️' 
      },
      { 
        text: { en: 'Services', ar: 'الخدمات' }, 
        url: '/services', 
        icon: '🔧' 
      },
      { 
        text: { en: 'Portfolio', ar: 'الأعمال' }, 
        url: '/portfolio', 
        icon: '🎨' 
      },
      { 
        text: { en: 'Blog', ar: 'المدونة' }, 
        url: '/blog', 
        icon: '📝' 
      },
      { 
        text: { en: 'Contact', ar: 'اتصل بنا' }, 
        url: '/contact', 
        icon: '📞' 
      }
    ],
    secondary: [
      { 
        text: { en: 'Help', ar: 'مساعدة' }, 
        url: '/help', 
        icon: '❓' 
      },
      { 
        text: { en: 'Settings', ar: 'الإعدادات' }, 
        url: '/settings', 
        icon: '⚙️' 
      },
      { 
        text: { en: 'Profile', ar: 'الملف الشخصي' }, 
        url: '/profile', 
        icon: '👤' 
      }
    ]
  }
};
