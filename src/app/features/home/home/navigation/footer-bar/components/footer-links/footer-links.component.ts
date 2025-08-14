import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dmc-footer-links',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="footer-links">
      Footer Links Component
    </div>
  `,
  styles: [`
    .footer-links {
      padding: 1rem;
    }
  `]
})
export class FooterLinksComponent {
  @Input() links: any[];
}
