import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DmcCsrComponent } from './dmc-csr/dmc-csr.component';
import { OurBrandsComponent } from './dmc-csr/pages/our-brands/our-brands.component';
import { MohadeCharityComponent } from './dmc-csr/pages/mohade-charity/mohade-charity.component';
import { PhotoGalleryComponent } from './dmc-csr/pages/photo-gallery/photo-gallery.component';

const routes: Routes = [
  {
    path: '',
    component: DmcCsrComponent,
    children: [
      { path: '', redirectTo: 'our-brands', pathMatch: 'full' },
      { path: 'our-brands', component: OurBrandsComponent },
      { path: 'mohade-charity', component: MohadeCharityComponent },
      { path: 'photo-gallery', component: PhotoGalleryComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DmcCsrRoutingModule { }
