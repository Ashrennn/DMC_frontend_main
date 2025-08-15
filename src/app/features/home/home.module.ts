import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './home/navigation/navigation.component';
import { FooterBarComponent } from './home/navigation/footer-bar/footer-bar.component';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NavigationComponent, // Import standalone component
    FooterBarComponent   // Import footer component
  ]
})
export class HomeModule { }

// No need to import AboutComponent or its children here
// They will be lazy loaded through the AboutModule