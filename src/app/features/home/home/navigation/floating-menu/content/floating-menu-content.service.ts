import { Injectable } from '@angular/core';
import { FloatingMenuContent, FloatingMenuContentData, PositioningConfig, StylingConfig } from './language-content/floating-menu-content.js';

@Injectable({
  providedIn: 'root'
})
export class FloatingMenuContentService {
  
  // ✅ SIMPLE: Direct content access
  getContent(): FloatingMenuContent {
    return FloatingMenuContentData;
  }

  // ✅ FOCUSED: Single responsibility methods
  getLeftMenuItems(lang: 'en' | 'ar' = 'en') {
    const content = this.getContent();
    return content.leftMenuItems.map((item: any) => ({
      ...item,
      label: item.label[lang],
      tooltip: item.tooltip[lang]
    }));
  }

  getRightMenuItems(lang: 'en' | 'ar' = 'en') {
    const content = this.getContent();
    return content.rightMenuItems.map((item: any) => ({
      ...item,
      label: item.label[lang],
      tooltip: item.tooltip[lang]
    }));
  }

  // ✅ LANGUAGE-AWARE: All methods support multilingual
  getPositioning(breakpoint: keyof PositioningConfig) {
    const content = this.getContent();
    return content.positioning[breakpoint] || content.positioning.default;
  }

  // ✅ FOCUSED: Single responsibility methods
  getStyling(breakpoint: keyof StylingConfig) {
    const content = this.getContent();
    return content.styling[breakpoint] || content.styling.default;
  }

  // ✅ ACCESSIBILITY: Get accessibility labels in specified language
  getAccessibilityLabel(key: string, lang: 'en' | 'ar' = 'en'): string {
    const content = this.getContent();
    return content.accessibility[key as keyof typeof content.accessibility]?.[lang] || '';
  }
}
