import { Component, Input, OnInit } from '@angular/core';
import { HeaderStripComponent } from './header-strip/header-strip.component';
import { FooterBarComponent } from './footer-bar/footer-bar.component';
import { FloatingMenuComponent } from './floating-menu/floating-menu.component';

@Component({
  selector: 'dmc-navigation',
  standalone: true,
  imports: [HeaderStripComponent, FloatingMenuComponent], // Removed FooterBarComponent - will be in HomeComponent
  template: `
    <!-- Header Strip (Always at top) -->
    <header class="header-strip">
      <dmc-header-strip [childData]="childData"></dmc-header-strip>
    </header>

    <!-- Floating Menu -->
    <div class="floating-menu">
      <dmc-floating-menu [childData]="childData"></dmc-floating-menu>
    </div>
  `,
  styles: [`
    .header-strip {
      flex-shrink: 0;
      padding: 0;
      margin: 0;
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
      height: 60px;
    }

    .floating-menu {
      position: relative;
      margin-top: 60px; /* Account for fixed header */
      z-index: 999;
    }
  `]
})
export class NavigationComponent implements OnInit {
  @Input() childData: any;

  constructor() {}

  ngOnInit() {
    // Component initialized
  }
}