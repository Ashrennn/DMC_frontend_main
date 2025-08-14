import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dmc-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loader-container">
      <div class="loader-content">
        <div class="loader-spinner"></div>
        <h2 class="loader-text">DMCNRG Loading...</h2>
        <p class="loader-subtext">Please wait while we prepare your experience</p>
        <div class="loader-progress">
          <div class="progress-bar" [style.width.%]="progress"></div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .loader-container {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }

    .loader-content {
      text-align: center;
      color: white;
      max-width: 400px;
      padding: 2rem;
    }

    .loader-spinner {
      width: 60px;
      height: 60px;
      border: 4px solid rgba(255, 255, 255, 0.3);
      border-top: 4px solid white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 2rem;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .loader-text {
      font-size: 2rem;
      font-weight: 300;
      margin-bottom: 1rem;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }

    .loader-subtext {
      font-size: 1rem;
      opacity: 0.8;
      margin-bottom: 2rem;
    }

    .loader-progress {
      width: 100%;
      height: 4px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 2px;
      overflow: hidden;
    }

    .progress-bar {
      height: 100%;
      background: white;
      border-radius: 2px;
      transition: width 0.3s ease;
    }
  `]
})
export class LoaderComponent implements OnInit, OnDestroy {
  progress = 0;
  private isNavigating = false;
  private timer: any;
  private loaderSubscription?: Subscription;

  constructor(
    private router: Router,
    private loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    // Show loader service
    this.loaderService.show(3000);
    
    // Subscribe to loader service progress
    this.loaderSubscription = this.loaderService.progress$.subscribe(
      progress => {
        this.progress = progress;
      }
    );

    // Ensure loader shows on every reload
    this.resetProgress();
    this.startLoader();
  }

  ngOnDestroy(): void {
    // Hide loader service
    this.loaderService.hide();
    
    // Clean up subscriptions
    if (this.loaderSubscription) {
      this.loaderSubscription.unsubscribe();
    }
    
    // Clean up timer if component is destroyed
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  private resetProgress(): void {
    this.progress = 0;
    this.isNavigating = false;
  }

  private startLoader(): void {
    const duration = 3000; // 3 seconds
    const interval = 30; // Update every 30ms
    const steps = duration / interval;
    let currentStep = 0;

    this.timer = setInterval(() => {
      currentStep++;
      this.progress = (currentStep / steps) * 100;
      
      // Update loader service progress
      this.loaderService.updateProgress(this.progress);

      if (currentStep >= steps && !this.isNavigating) {
        clearInterval(this.timer);
        this.isNavigating = true;
        this.navigateToHome();
      }
    }, interval);
  }

  private navigateToHome(): void {
    // Force navigation to home with replace to prevent back button issues
    this.router.navigate(['/home'], { replaceUrl: true }).then(() => {
      console.log('Navigation to home completed');
    }).catch(error => {
      console.error('Navigation error:', error);
      // Fallback: try again after a short delay
      setTimeout(() => {
        this.router.navigate(['/home'], { replaceUrl: true });
      }, 100);
    });
  }
}
