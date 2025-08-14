import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MobileFloatingMenuComponent } from './layouts/mobile-menu.component';
import { TabletFloatingMenuComponent } from './layouts/tablet-floating-menu.component';
import { DesktopFloatingMenuComponent } from './layouts/desktop-floating-menu.component';

@Component({
  selector: 'dmc-floating-menu',
  standalone: true,
  imports: [CommonModule, MobileFloatingMenuComponent, TabletFloatingMenuComponent, DesktopFloatingMenuComponent],
  template: `
    <div class="floating-menu-container">
      <!-- Floating menu content will be dynamically loaded based on breakpoint -->
      <ng-container [ngSwitch]="currentFloatingMenuLayout">
        <dmc-mobile-floating-menu 
          *ngSwitchCase="'mobile'"
          [childData]="childData">
        </dmc-mobile-floating-menu>
        <dmc-tablet-floating-menu 
          *ngSwitchCase="'tablet'"
          [childData]="childData">
        </dmc-tablet-floating-menu>
        <dmc-desktop-floating-menu 
          *ngSwitchCase="'desktop'"
          [childData]="childData">
        </dmc-desktop-floating-menu>
      </ng-container>
    </div>
  `,
  styles: [`
    .floating-menu-container {
      z-index: 1001;
    }
  `]
})
export class FloatingMenuComponent implements OnInit {
  @Input() childData: any; // Will receive data from parent

  ngOnInit() {
    // Component initialized
  }

  // Dynamic layout selection based on breakpoint
  get currentFloatingMenuLayout(): 'mobile' | 'tablet' | 'desktop' {
    if (!this.childData) return 'desktop';
    
    const { breakpoint } = this.childData;
    const layout = this.getLayoutFromBreakpoint(breakpoint);
    
    return layout;
  }

  private getLayoutFromBreakpoint(breakpoint: string): 'mobile' | 'tablet' | 'desktop' {
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
