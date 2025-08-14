import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LibraryRoutingModule } from './library-routing.module';
import { LibraryComponent } from './library/library.component';
import { NewsletterComponent } from './library/pages/newsletter/newsletter.component';
import { VideoGalleryComponent } from './library/pages/video-gallery/video-gallery.component';
import { ProductsServicesComponent } from './library/pages/products-services/products-services.component';

@NgModule({
  imports: [
    CommonModule,
    LibraryRoutingModule,
    LibraryComponent,
    NewsletterComponent,
    VideoGalleryComponent,
    ProductsServicesComponent
  ]
})
export class LibraryModule { }
