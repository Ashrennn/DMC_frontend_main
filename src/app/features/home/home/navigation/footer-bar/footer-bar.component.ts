import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileFooterComponent } from './layouts/mobile-footer.component';
import { TabletFooterComponent } from './layouts/tablet-footer.component';
import { DesktopFooterComponent } from './layouts/desktop-footer.component';

@Component({
  selector: 'dmc-footer-bar',
  standalone: true,
  imports: [CommonModule, MobileFooterComponent, TabletFooterComponent, DesktopFooterComponent],
  template: `
    <div class="footer-container">
      <ng-container [ngSwitch]="currentLayout">
        <dmc-mobile-footer *ngSwitchCase="'mobile'" [childData]="childData"></dmc-mobile-footer>
        <dmc-tablet-footer *ngSwitchCase="'tablet'" [childData]="childData"></dmc-tablet-footer>
        <dmc-desktop-footer *ngSwitchCase="'desktop'" [childData]="childData"></dmc-desktop-footer>
      </ng-container>
    </div>
  `,
  styles: [`
    .footer-container {
      width: 100%;
      position: relative;
    }
  `]
})
export class FooterBarComponent {
  @Input() childData: any;

  // Determine which layout to show based on breakpoint
  get currentLayout(): 'mobile' | 'tablet' | 'desktop' {
    if (!this.childData?.breakpoint) return 'desktop';
    
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
}


