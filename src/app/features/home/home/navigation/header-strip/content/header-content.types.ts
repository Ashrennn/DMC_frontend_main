export interface HeaderLink {
  text: {
    en: string;
    ar: string;
  };
  url: string;
  icon: string;
}

export interface HeaderBrand {
  title: {
    en: string;
    ar: string;
  };
  logo: string;
  tagline: {
    en: string;
    ar: string;
  };
}

export interface HeaderNavigation {
  primary: HeaderLink[];
  secondary: HeaderLink[];
}

export interface HeaderText {
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
}

export interface HeaderMedia {
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
}

export interface HeaderContent {
  brand: HeaderBrand;
  media: HeaderMedia;
  text: HeaderText;
  navigation: HeaderNavigation;
}
