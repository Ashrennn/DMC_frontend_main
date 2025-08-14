import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  private progressSubject = new BehaviorSubject<number>(0);

  public isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();
  public progress$: Observable<number> = this.progressSubject.asObservable();

  constructor() {
    console.log('🔧 LoaderService: Initialized');
  }

  /**
   * Show loader with optional progress tracking
   */
  show(duration: number = 1000): void {
    console.log(`🔧 LoaderService: show() called with duration=${duration}ms`);
    this.isLoadingSubject.next(true);
    this.progressSubject.next(0);
    
    if (duration > 0) {
      console.log(`🔧 LoaderService: Starting progress simulation for ${duration}ms`);
      this.simulateProgress(duration);
    }
  }

  /**
   * Hide loader
   */
  hide(): void {
    console.log('🔧 LoaderService: hide() called');
    this.isLoadingSubject.next(false);
    this.progressSubject.next(0);
  }

  /**
   * Update progress manually
   */
  updateProgress(progress: number): void {
    console.log(`🔧 LoaderService: updateProgress(${progress}%)`);
    this.progressSubject.next(Math.min(100, Math.max(0, progress)));
  }

  /**
   * Simulate progress over time
   */
  private simulateProgress(duration: number): void {
    const interval = 30; // Update every 30ms
    const steps = duration / interval;
    let currentStep = 0;

    console.log(`🔧 LoaderService: Progress simulation - ${steps} steps, ${interval}ms intervals`);

    const timer = setInterval(() => {
      currentStep++;
      const progress = (currentStep / steps) * 100;
      this.progressSubject.next(progress);

      if (currentStep >= steps) {
        console.log(`🔧 LoaderService: Progress simulation completed (${progress.toFixed(1)}%)`);
        clearInterval(timer);
      }
    }, interval);
  }

  /**
   * Get current loading state
   */
  get isLoading(): boolean {
    const state = this.isLoadingSubject.value;
    console.log(`🔧 LoaderService: isLoading getter called, current state: ${state}`);
    return state;
  }

  /**
   * Get current progress
   */
  get progress(): number {
    const progress = this.progressSubject.value;
    console.log(`🔧 LoaderService: progress getter called, current progress: ${progress}%`);
    return progress;
  }
}
