export interface DropdownItem {
  id: string;
  icon?: string;
  label: {
    en: string;
    ar: string;
  };
  description?: {
    en: string;
    ar: string;
  };
  action?: string;
  url?: string;
  disabled?: boolean;
}

export interface DropdownContent {
  id: string;
  title: {
    en: string;
    ar: string;
  };
  items: DropdownItem[];
}
