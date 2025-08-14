export interface Language {
  code: string;
  flag: string;
  name: string;
  nativeName: string;
  direction: 'ltr' | 'rtl';
  disabled?: boolean;
  disabledMessage?: string;
}
