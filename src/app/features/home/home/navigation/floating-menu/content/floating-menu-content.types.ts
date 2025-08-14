export interface FloatingMenuContent {
  leftMenuItems: FloatingMenuItem[];
  rightMenuItems: FloatingMenuItem[];
  positioning: PositioningConfig;
  styling: StylingConfig;
}

export interface FloatingMenuItem {
  id: string;
  label: { en: string; ar: string };
  tooltip: { en: string; ar: string };
  icon: string;
  url?: string;
  action?: () => void;
  disabled?: boolean;
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
