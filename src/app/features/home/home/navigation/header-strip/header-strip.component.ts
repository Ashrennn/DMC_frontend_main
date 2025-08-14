import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileHeaderComponent } from './layouts/mobile-header.component';
import { TabletHeaderComponent } from './layouts/tablet-header.component';
import { DesktopHeaderComponent } from './layouts/desktop-header.component';
import { HeaderContentService } from './content/header-content.service';

@Component({
  selector: 'dmc-header-strip',
  standalone: true,
  imports: [CommonModule, MobileHeaderComponent, TabletHeaderComponent, DesktopHeaderComponent],
  template: `
    <div class="header-strip-container">
      <!-- Header content will be dynamically loaded based on breakpoint -->
      <ng-container *ngIf="currentHeaderLayout === 'mobile'">
        <dmc-mobile-header [childData]="childData" [content]="componentInputs.content" [config]="componentInputs.config" [routing]="componentInputs.routing"></dmc-mobile-header>
      </ng-container>
      <ng-container *ngIf="currentHeaderLayout === 'tablet'">
        <dmc-tablet-header [childData]="childData" [content]="componentInputs.content" [config]="componentInputs.config" [routing]="componentInputs.routing"></dmc-tablet-header>
      </ng-container>
      <ng-container *ngIf="currentHeaderLayout === 'desktop'">
        <dmc-desktop-header [childData]="childData" [content]="componentInputs.content" [config]="componentInputs.config" [routing]="componentInputs.routing"></dmc-desktop-header>
      </ng-container>
    </div>
  `,
             styles: [`
             .header-strip-container {
               width: 100vw;
               height: 60px;
               margin: 0;
               padding: 0;
               position: relative;
               left: 0;
               top: 0;
             }
           `]
})
export class HeaderStripComponent {
  @Input() childData: any; // Will receive data from parent

  constructor(private headerContent: HeaderContentService) {}

  // Dynamic layout selection based on breakpoint
  get currentHeaderLayout(): 'mobile' | 'tablet' | 'desktop' {
    if (!this.childData) return 'desktop';
    
    const { breakpoint } = this.childData;
    
    switch(breakpoint) {
      case 'mobile-small':
      case 'mobile-large':
        return 'mobile';
      case 'tablet-small':
      case 'tablet-large':
        return 'tablet';
      case 'desktop-small':
      case 'desktop-large':
        case 'ultra-wide':
        return 'desktop';
      default:
        return 'desktop';
    }
  }

  // Pass content and configuration to dynamic component
  get componentInputs() {
    if (!this.childData) {
      return {
        childData: this.childData,
        content: {},
        config: {},
        routing: {}
      };
    }

    const { breakpoint, language = 'en' } = this.childData;
    
    // Get header content based on language
    const content = this.headerContent.getContent();
    const brand = this.headerContent.getBrand(language);
    const text = this.headerContent.getText(language);
    const navigation = this.headerContent.getNavigation(language);
    const media = this.headerContent.getMedia();

    // Create merged content object
    const mergedContent = {
      brand,
      text,
      navigation,
      media
    };

    // Default configuration for all layouts
    const config = {
      showMenuButton: true,
      showSearchButton: true,
      maxVisibleLinks: 6,
      brandSize: 'medium',
      useHamburgerMenu: false
    };

    // Default routing strategy
    const routing = {
      strategy: 'horizontal',
      basePath: '/',
      animations: 'none'
    };

    return {
      childData: this.childData,
      content: mergedContent,
      config: config,
      routing: routing
    };
  }
}
