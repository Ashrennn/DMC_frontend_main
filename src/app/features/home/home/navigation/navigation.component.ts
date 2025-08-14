import { Component, Input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderStripComponent } from './header-strip/header-strip.component';
import { FooterBarComponent } from './footer-bar/footer-bar.component';
import { FloatingMenuComponent } from './floating-menu/floating-menu.component';

@Component({
  selector: 'dmc-navigation',
  standalone: true,
  imports: [RouterOutlet, HeaderStripComponent, FooterBarComponent, FloatingMenuComponent],
  template: `
    <div class="navigation-container">
      <!-- Header Strip (Always at top) -->
      <header class="header-strip">
        <dmc-header-strip [childData]="childData"></dmc-header-strip>
      </header>

      <!-- Floating Menu (Above router outlet) -->
    
     

      <!-- Router Outlet (Middle content) -->
      <main class="navigation-content">  <dmc-floating-menu [childData]="childData"></dmc-floating-menu>
         <router-outlet></router-outlet>
      </main>

      <!-- Footer Bar (Natural bottom push) -->
      <footer class="footer-bar">
        <dmc-footer-bar [childData]="childData"></dmc-footer-bar>
      </footer>
    </div>
  `,
  styles: [`
    .navigation-container {
      width: 100%;
      display: block;
      background: #f0f2f5; /* Light gray background */
      height: auto;
    }

.header-strip {
      flex-shrink: 0;
      padding: 0;
      margin: 0;
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
      height: 60px; /* Fixed height for consistency */
}

    .navigation-content {
      min-height: 900px;
      background: #ffffff;
      position: relative;
      margin-top: 50px;
    }

    .footer-bar {
      width: 100%;
      padding: 0;
      margin: 0;
    }
  `]
})
export class NavigationComponent implements OnInit {
  @Input() childData: any; // Will receive data from parent

  constructor() {}

  ngOnInit() {
    // Component initialized
  }
}

