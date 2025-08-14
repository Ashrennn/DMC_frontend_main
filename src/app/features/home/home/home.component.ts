import { Component } from '@angular/core';
import { ResponsiveService } from '../../../shared/services/responsiveness';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'dmc-home',
  standalone: false,
  template: `
    <div class="home-container">
      <!-- Navigation Component (Full Viewport) -->
      <dmc-navigation [childData]="childData"></dmc-navigation>
      
      <!-- Router Outlet for About Pages -->
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .home-container {
      width: 100%;
      min-height: 100vh;
      display: block;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      overflow: visible;
      position: relative;
    }
  `]
})
export class HomeComponent {
  constructor(public responsiveService: ResponsiveService) {}

  // Single source of truth for child components
  get childData() {
    return {
      breakpoint: this.responsiveService.getCurrentBreakpoint(),
      screenSize: this.responsiveService.getScreenSize(),
      isMobile: this.responsiveService.isMobile(),
      isTablet: this.responsiveService.isTablet(),
      isDesktop: this.responsiveService.isDesktop()
    };
  }
}
