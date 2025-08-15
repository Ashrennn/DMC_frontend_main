import { Component } from '@angular/core';
import { ResponsiveService } from '../../../shared/services/responsiveness';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterBarComponent } from './navigation/footer-bar/footer-bar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'dmc-home',
  standalone: false,
  template: `
    <div class="home-container">
      <!-- Navigation Component (Header + Floating Menu only) -->
      <dmc-navigation [childData]="childData"></dmc-navigation>
      
      <!-- Main content area -->
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
      
      <!-- Footer at the bottom -->
      <footer class="footer">
        <dmc-footer-bar [childData]="childData"></dmc-footer-bar>
      </footer>
    </div>
  `,
  styles: [`
    .home-container {
      width: 100%;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      overflow: visible;
      position: relative;
    }
    
    .main-content {
      flex: 1; /* Takes up remaining space */
      margin-top: 0; /* Navigation component handles the top spacing */
      min-height: calc(100vh - 60px); /* Account for header height */
      background: white;
      position: relative;
    }
    
    .footer {
      margin-top: auto; /* Push footer to bottom */
      width: 100%;
    }
  `]
})
export class HomeComponent {
  constructor(public responsiveService: ResponsiveService) {}

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