import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface NeomorphicButtonConfig {
  text?: string;
  icon?: string;
  imagePath?: string;
  width?: string;
  minWidth?: string;
  height?: string;
  fontSize?: string;
  borderRadius?: string;
  primaryColor?: string;
  secondaryColor?: string;
  shadowColor?: string;
  highlightColor?: string;
}

@Component({
  selector: 'dmc-neomorphic-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      type="button"
      class="neomorphic-button"
      [class.active]="isActive"
      [class.disabled]="disabled"
      [style.--button-width]="config.width || 'auto'"
      [style.--button-min-width]="config.minWidth || '120px'"
      [style.--button-height]="config.height || '40px'"
      [style.--button-font-size]="config.fontSize || '14px'"
      [style.--button-border-radius]="config.borderRadius || '25px'"
      [style.--button-primary-color]="config.primaryColor || '#001B3F'"
      [style.--button-secondary-color]="config.secondaryColor || '#D7E3FF'"
      [style.--button-shadow-color]="config.shadowColor || '#000d1e'"
      [style.--button-highlight-color]="config.highlightColor || '#002960'"
      (click)="onClick()"
      [disabled]="disabled">
      <!-- Show image if available, otherwise show text -->
      <img *ngIf="config.imagePath" [src]="config.imagePath" [alt]="config.text || 'Button icon'" class="button-image">
      <span *ngIf="!config.imagePath && config.text" class="button-text">{{ config.text }}</span>
      <span *ngIf="!config.imagePath && config.icon" class="button-icon">{{ config.icon }}</span>
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    .neomorphic-button {
      width: var(--button-width);
      min-width: var(--button-min-width);
      height: var(--button-height);
      border: none;
      border-radius: var(--button-border-radius);
      background: var(--button-primary-color);
      color: var(--button-secondary-color);
      
      /* Neomorphism effect */
      box-shadow: 3px 3px 6px var(--button-shadow-color),
                 -2px -2px 5px var(--button-highlight-color);
      
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      padding: 0 20px;
      position: relative;
      font-family: inherit;
      font-weight: 500;
      text-align: center;
    }

    .neomorphic-button:hover:not(.disabled) {
      box-shadow: 4px 4px 8px var(--button-shadow-color),
                 -3px -3px 6px var(--button-highlight-color);
    }

    .neomorphic-button:active:not(.disabled),
    .neomorphic-button.active:not(.disabled) {
      transform: translateY(1px);
      box-shadow: inset 2px 2px 4px var(--button-shadow-color),
                 inset -1px -1px 3px var(--button-highlight-color);
    }

    .neomorphic-button.disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .button-text {
      font-size: var(--button-font-size);
      line-height: var(--button-font-size);
      color: var(--button-secondary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      will-change: transform;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      transform-origin: center;
    }

    .button-icon {
      font-size: var(--button-font-size);
      line-height: var(--button-font-size);
      color: var(--button-secondary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      will-change: transform;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      transform-origin: center;
    }

    .button-image {
      width: calc(var(--button-height) * 2.5);
      height: calc(var(--button-height) * 2.0);
      object-fit: contain;
      display: flex;
      align-items: center;
      justify-content: center;
      will-change: transform;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      transform-origin: center;
    }

    .neomorphic-button:hover:not(.disabled) .button-text,
    .neomorphic-button:hover:not(.disabled) .button-icon,
    .neomorphic-button:hover:not(.disabled) .button-image {
      /* Removed scale transform effect */
    }
  `]
})
export class NeomorphicButtonComponent {
  @Input() config: NeomorphicButtonConfig = {};
  @Input() isActive: boolean = false;
  @Input() disabled: boolean = false;
  @Output() buttonClick = new EventEmitter<void>();

  onClick() {
    if (!this.disabled) {
      this.buttonClick.emit();
    }
  }
}
