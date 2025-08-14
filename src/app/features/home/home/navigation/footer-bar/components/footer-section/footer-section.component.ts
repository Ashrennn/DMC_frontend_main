import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterSection } from '../../content/footer-content.types';

@Component({
  selector: 'dmc-footer-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="footer-section">
      <h3 class="section-title">{{ section?.title?.en }}</h3>
      <ul class="section-links">
        <li *ngFor="let link of section?.links">
          <a [href]="link.url" [class.disabled]="link.disabled">
            {{ link.label.en }}
          </a>
        </li>
      </ul>
    </div>
  `,
  styles: [`
    .footer-section {
      padding: 1rem;
    }
    .section-title {
      font-weight: bold;
      margin-bottom: 1rem;
    }
    .section-links {
      list-style: none;
      padding: 0;
    }
    .section-links li {
      margin-bottom: 0.5rem;
    }
    .section-links a {
      text-decoration: none;
      color: inherit;
    }
    .disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  `]
})
export class FooterSectionComponent {
  @Input() section: FooterSection | undefined;
  @Input() language: string = 'en';
}
