import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from './library/library.component';
import { NewsletterComponent } from './library/pages/newsletter/newsletter.component';
import { VideoGalleryComponent } from './library/pages/video-gallery/video-gallery.component';
import { ProductsServicesComponent } from './library/pages/products-services/products-services.component';

const routes: Routes = [
  {
    path: '',
    component: LibraryComponent,
    children: [
      { path: '', redirectTo: 'newsletter', pathMatch: 'full' },
      { path: 'newsletter', component: NewsletterComponent },
      { path: 'video-gallery', component: VideoGalleryComponent },
      { path: 'products-services', component: ProductsServicesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
