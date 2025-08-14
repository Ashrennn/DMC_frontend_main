export interface FooterLink {
  id: string;
  icon: string;
  label: {
    en: string;
    ar: string;
  };
  url?: string;
  action?: string;
  disabled?: boolean;
}

export interface SocialLink {
  id: string;
  platform: string;
  icon: string;
  url: string;
  label: {
    en: string;
    ar: string;
  };
}

export interface Logo {
  src: string;
  alt: {
    en: string;
    ar: string;
  };
}

export interface Location {
  title: {
    en: string;
    ar: string;
  };
  address: {
    en: string;
    ar: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface TopRowContent {
  title: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
}

export interface QuickConnect {
  stayUpdated: {
    title: {
      en: string;
      ar: string;
    };
    description: {
      en: string;
      ar: string;
    };
    emailPlaceholder: {
      en: string;
      ar: string;
    };
    subscribeButton: {
      en: string;
      ar: string;
    };
  };
  followUs: {
    title: {
      en: string;
      ar: string;
    };
    socialLinks: SocialLink[];
  };
  actionButtons: FooterLink[];
}

export interface DownloadCategory {
  title: {
    en: string;
    ar: string;
  };
  documents: DownloadDocument[];
}

export interface DownloadDocument {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  icon: string;
  url?: string;
}

export interface FooterTopContent {
  topRow: TopRowContent;
  logos: {
    company: Logo;
    ssl: Logo;
  };
  location: Location;
  quickConnect: QuickConnect;
  downloads: DownloadCategory[];
  sectionTitles: {
    siteMap: {
      en: string;
      ar: string;
    };
    downloads: {
      en: string;
      ar: string;
    };
    ourLocation: {
      en: string;
      ar: string;
    };
  };
}

export interface CompanyInfo {
  name: {
    en: string;
    ar: string;
  };
  copyright: {
    en: string;
    ar: string;
  };
  registered: string; // ® symbol
}

export interface Disclaimer {
  content: {
    en: string;
    ar: string;
  };
}

export interface FooterBottomContent {
  companyInfo: CompanyInfo;
  disclaimer: Disclaimer;
  legalLinks: FooterLink[];
  credits: Credits;
  sectionTitles: {
    legal: {
      en: string;
      ar: string;
    };
    security: {
      en: string;
      ar: string;
    };
    regulatory: {
      en: string;
      ar: string;
    };
  };
}

export interface Credits {
  title: {
    en: string;
    ar: string;
  };
  links: FooterLink[];
}
