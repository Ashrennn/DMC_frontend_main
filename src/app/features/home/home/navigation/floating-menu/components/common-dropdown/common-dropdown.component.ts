import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { FloatingSubMenuItem } from '../../content/language-content/floating-menu-content';

@Component({
  selector: 'dmc-common-dropdown',
  standalone: true,
  imports: [CommonModule, MatDividerModule, MatIconModule],
  templateUrl: './common-dropdown.component.html',
  styleUrls: ['./common-dropdown.component.scss']
})
export class CommonDropdownComponent implements OnInit, OnDestroy {
   @Input() menuItems: FloatingSubMenuItem[] = [];
   @Input() isRTL: boolean = false;
   @Input() position: 'left' | 'right' | 'center' = 'center';
   @Input() buttonId: string = '';

  ngOnInit() {
    // Component initialization
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  onItemClick(item: FloatingSubMenuItem) {
    if (item.disabled) return;
    
    if (item.action) {
      item.action();
    } else if (item.url) {
      // Handle navigation
      console.log('Navigate to:', item.url);
    }
  }
}
