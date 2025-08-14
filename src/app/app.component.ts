import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dmc-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  template: `
    <!-- Main App Content -->
    <router-outlet></router-outlet>
  `,
  styles: [`
    /* Allow scrolling after initial load */
    :host {
      display: block;
      height: auto;
      overflow: auto;
    }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'DMCNRG';

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
    // Navigate to home after initial load
    setTimeout(() => {
      this.router.navigate(['/home'], { replaceUrl: true });
    }, 3000); // Match the 3-second duration from HTML
  }

  ngOnDestroy(): void {
    // Clean up if needed in future
  }
}
