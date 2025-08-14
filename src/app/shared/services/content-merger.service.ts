import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContentMergerService {

  constructor() {}

  /**
   * Merges base content with layout-specific content
   * Layout-specific content overrides base content
   */
  mergeContent(baseContent: any, layoutContent: any): any {
    if (!baseContent) return layoutContent;
    if (!layoutContent) return baseContent;

    return this.deepMerge(baseContent, layoutContent);
  }

  /**
   * Gets the appropriate content for a specific layout
   */
  getLayoutContent(content: any, breakpoint: string): any {
    if (!content) return null;

    const baseContent = content.base || {};
    let layoutContent = {};

    // Determine which layout to use based on breakpoint
    switch(breakpoint) {
      case 'mobile-small':
      case 'mobile-large':
        layoutContent = content.layouts?.mobile?.content || {};
        break;
      case 'tablet-small':
      case 'tablet-large':
        layoutContent = content.layouts?.tablet?.content || {};
        break;
      case 'desktop-small':
      case 'desktop-large':
      case 'ultra-wide':
        layoutContent = content.layouts?.desktop?.content || {};
        break;
      default:
        layoutContent = content.layouts?.desktop?.content || {};
    }

    return this.mergeContent(baseContent, layoutContent);
  }

  /**
   * Gets the routing strategy for a specific layout
   */
  getLayoutRouting(content: any, breakpoint: string): any {
    if (!content?.layouts) return null;

    switch(breakpoint) {
      case 'mobile-small':
      case 'mobile-large':
        return content.layouts.mobile?.routing || {};
      case 'tablet-small':
      case 'tablet-large':
        return content.layouts.tablet?.routing || {};
      case 'desktop-small':
      case 'desktop-large':
      case 'ultra-wide':
        return content.layouts.desktop?.routing || {};
      default:
        return content.layouts.desktop?.routing || {};
    }
  }

  /**
   * Gets the configuration for a specific layout
   */
  getLayoutConfig(content: any, breakpoint: string): any {
    if (!content?.layouts) return null;

    switch(breakpoint) {
      case 'mobile-small':
      case 'mobile-large':
        return content.layouts.mobile?.config || {};
      case 'tablet-small':
      case 'tablet-large':
        return content.layouts.tablet?.config || {};
      case 'desktop-small':
      case 'desktop-large':
      case 'ultra-wide':
        return content.layouts.desktop?.config || {};
      default:
        return content.layouts.desktop?.config || {};
    }
  }

  /**
   * Deep merge two objects
   */
  private deepMerge(target: any, source: any): any {
    const result = { ...target };

    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        if (source[key] instanceof Object && key in target) {
          result[key] = this.deepMerge(target[key], source[key]);
        } else {
          result[key] = source[key];
        }
      }
    }

    return result;
  }
}
