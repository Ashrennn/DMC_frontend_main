import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './navigation.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NavigationComponent // Import standalone component
  ],
  exports: [
    NavigationComponent
  ]
})
export class NavigationModule { }
