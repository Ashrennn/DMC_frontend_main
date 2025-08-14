import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DmcCsrRoutingModule } from './dmc-csr-routing.module';
import { DmcCsrComponent } from './dmc-csr/dmc-csr.component';
import { OurBrandsComponent } from './dmc-csr/pages/our-brands/our-brands.component';
import { MohadeCharityComponent } from './dmc-csr/pages/mohade-charity/mohade-charity.component';
import { PhotoGalleryComponent } from './dmc-csr/pages/photo-gallery/photo-gallery.component';

@NgModule({
  imports: [
    CommonModule,
    DmcCsrRoutingModule,
    DmcCsrComponent,
    OurBrandsComponent,
    MohadeCharityComponent,
    PhotoGalleryComponent
  ]
})
export class DmcCsrModule { }
