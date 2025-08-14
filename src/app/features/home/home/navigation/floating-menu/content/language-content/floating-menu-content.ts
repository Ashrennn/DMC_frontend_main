export interface FloatingMenuItem {
  id: string;
  label: { en: string; ar: string };
  tooltip: { en: string; ar: string };
  icon: string;
  url?: string;
  action?: () => void;
  disabled?: boolean;
  subMenuItems?: FloatingSubMenuItem[];
}

export interface FloatingSubMenuItem {
  id: string;
  label: { en: string; ar: string };
  icon: string;
  url?: string;
  action?: () => void;
  disabled?: boolean;
}

export interface FloatingMenuContent {
  leftMenuItems: FloatingMenuItem[];
  rightMenuItems: FloatingMenuItem[];
  positioning: PositioningConfig;
  styling: StylingConfig;
  accessibility: AccessibilityLabels;
}

export interface AccessibilityLabels {
  openLeftMenu: { en: string; ar: string };
  openRightMenu: { en: string; ar: string };
  closeLeftMenu: { en: string; ar: string };
  closeRightMenu: { en: string; ar: string };
  mobileFloatingMenu: { en: string; ar: string };
}

export interface PositioningConfig {
  default: Position;
  'mobile-small': Position;
  'mobile-large': Position;
  'tablet-small': Position;
  'tablet-large': Position;
  'desktop-small': Position;
  'desktop-large': Position;
  'ultra-wide': Position;
}

export interface Position {
  bottom: string;
  right: string;
  left?: string;
}

export interface StylingConfig {
  default: Style;
  'mobile-small': Style;
  'mobile-large': Style;
  'tablet-small': Style;
  'tablet-large': Style;
  'desktop-small': Style;
  'desktop-large': Style;
  'ultra-wide': Style;
}

export interface Style {
  triggerSize: string;
  panelWidth: string;
  itemHeight: string;
  iconSize: string;
}

export const FloatingMenuContentData: FloatingMenuContent = {
  leftMenuItems: [
    {
      id: 'about-us',
      label: { en: 'About Us', ar: 'معلومات عنا' },
      tooltip: { en: 'Learn about our company', ar: 'تعرف على شركتنا' },
      icon: 'info',
      url: '/home/about',
      subMenuItems: [
        { id: 'our-history', label: { en: 'Our History', ar: 'تاريخنا' }, icon: 'timeline', url: '/home/about/our-history' },
        { id: 'what-we-do', label: { en: 'What We Do', ar: 'ما نقوم به' }, icon: 'business_center', url: '/home/about/what-we-do' },
        { id: 'our-people', label: { en: 'Our People', ar: 'أشخاصنا' }, icon: 'people', url: '/home/about/our-people' },
        { id: 'our-values', label: { en: 'Our Values', ar: 'قيمنا' }, icon: 'favorite', url: '/home/about/our-values' }
      ]
    },
    {
      id: 'library',
      label: { en: 'Library', ar: 'المكتبة' },
      tooltip: { en: 'Access our library', ar: 'الوصول إلى مكتبتنا' },
      icon: 'library_books',
      url: '/library',
      subMenuItems: [
        { id: 'newsletter', label: { en: 'Newsletter', ar: 'النشرة الإخبارية' }, icon: 'article', url: '/library/newsletter' },
        { id: 'video-gallery', label: { en: 'Video Gallery', ar: 'معرض الفيديو' }, icon: 'video_collection', url: '/library/video-gallery' },
        { id: 'products-services', label: { en: 'Products & Services', ar: 'المنتجات والخدمات' }, icon: 'category', url: '/library/products-services' }
      ]
    },
    {
      id: 'dmc-csr',
      label: { en: 'DMC-CSR', ar: 'DMC-CSR' },
      tooltip: { en: 'DMC Corporate Social Responsibility', ar: 'المسؤولية الاجتماعية للشركات DMC' },
      icon: 'corporate_fare',
      url: '/dmc-csr',
      subMenuItems: [
        { id: 'photo-gallery', label: { en: 'Photo Gallery', ar: 'معرض الصور' }, icon: 'collections', url: '/dmc-csr/photo-gallery' },
        { id: 'mohade-charity', label: { en: 'Mohade Charity', ar: 'مؤسسة محاد الخيرية' }, icon: 'volunteer_activism', url: '/dmc-csr/mohade-charity' },
        { id: 'our-brands', label: { en: 'Our Brands', ar: 'علاماتنا التجارية' }, icon: 'storefront', url: '/dmc-csr/our-brands' }
      ]
    }
  ],
  rightMenuItems: [
    {
      id: 'operations',
      label: { en: 'Operations', ar: 'العمليات' },
      tooltip: { en: 'View operations', ar: 'عرض العمليات' },
      icon: 'build',
      url: '/operations',
      subMenuItems: [
        { id: 'trade-desk', label: { en: 'Trade Desk', ar: 'مكتب التداول' }, icon: 'desktop_windows', url: '/operations/trade-desk' },
        { id: 'damilube', label: { en: 'DAMILUBE', ar: 'داميلوب' }, icon: 'oil_barrel', url: '/operations/damilube' },
        { id: 'fleets', label: { en: 'Fleets', ar: 'الأساطيل البحرية' }, icon: 'sailing', url: '/operations/fleets' },
        { id: 'vessel-chandlery', label: { en: 'Vessel Chandlery', ar: 'خدمات تموين السفن البحرية' }, icon: 'local_shipping', url: '/operations/vessel-chandlery' }
      ]
    },
    {
      id: 'bunkering',
      label: { en: 'Bunkering', ar: 'التزود بالوقود' },
      tooltip: { en: 'Bunkering services', ar: 'خدمات التزود بالوقود' },
      icon: 'local_gas_station',
      url: '/bunkering',
      subMenuItems: [
        { id: 'bunker-inquiry', label: { en: 'Bunker Inquiry', ar: 'استفسار التزود بالوقود' }, icon: 'local_shipping', url: '/bunkering/bunker-inquiry' },
        { id: 'vessel-registration', label: { en: 'Vessel Registration', ar: 'تسجيل السفن' }, icon: 'directions_boat', url: '/bunkering/vessel-registration' },
        { id: 'order-processing', label: { en: 'Order Processing', ar: 'معالجة الطلبات' }, icon: 'assignment', url: '/bunkering/order-processing' }
      ]
    },
    {
      id: 'contact',
      label: { en: 'Contact', ar: 'اتصل بنا' },
      tooltip: { en: 'Contact us', ar: 'اتصل بنا' },
      icon: 'contact_page',
      url: '/contact',
      subMenuItems: [
        { id: 'general-inquiry', label: { en: 'General Inquiry', ar: 'استفسار عام' }, icon: 'contact_support', url: '/contact/general' },
        { id: 'support', label: { en: 'Support', ar: 'الدعم' }, icon: 'headset_mic', url: '/contact/support' },
        { id: 'feedback', label: { en: 'Feedback', ar: 'التعليقات' }, icon: 'rate_review', url: '/contact/feedback' }
      ]
    }
  ],
  positioning: {
    default: { bottom: '20px', right: '20px' },
    'mobile-small': { bottom: '16px', right: '16px' },
    'mobile-large': { bottom: '20px', right: '20px' },
    'tablet-small': { bottom: '24px', right: '24px' },
    'tablet-large': { bottom: '28px', right: '28px' },
    'desktop-small': { bottom: '32px', right: '32px' },
    'desktop-large': { bottom: '36px', right: '36px' },
    'ultra-wide': { bottom: '40px', right: '40px' }
  },
  styling: {
    default: { triggerSize: '56px', panelWidth: '280px', itemHeight: '48px', iconSize: '24px' },
    'mobile-small': { triggerSize: '48px', panelWidth: '240px', itemHeight: '40px', iconSize: '20px' },
    'mobile-large': { triggerSize: '56px', panelWidth: '280px', itemHeight: '48px', iconSize: '24px' },
    'tablet-small': { triggerSize: '64px', panelWidth: '320px', itemHeight: '52px', iconSize: '28px' },
    'tablet-large': { triggerSize: '72px', panelWidth: '360px', itemHeight: '56px', iconSize: '32px' },
    'desktop-small': { triggerSize: '80px', panelWidth: '400px', itemHeight: '60px', iconSize: '36px' },
    'desktop-large': { triggerSize: '88px', panelWidth: '440px', itemHeight: '64px', iconSize: '40px' },
    'ultra-wide': { triggerSize: '96px', panelWidth: '480px', itemHeight: '68px', iconSize: '44px' }
  },
  accessibility: {
    openLeftMenu: { en: 'Open left menu', ar: 'افتح القائمة اليسرى' },
    openRightMenu: { en: 'Open right menu', ar: 'افتح القائمة اليمنى' },
    closeLeftMenu: { en: 'Close left menu', ar: 'أغلق القائمة اليسرى' },
    closeRightMenu: { en: 'Close right menu', ar: 'أغلق القائمة اليمنى' },
    mobileFloatingMenu: { en: 'Mobile floating menu', ar: 'القائمة العائمة للموبايل' }
  }
};
