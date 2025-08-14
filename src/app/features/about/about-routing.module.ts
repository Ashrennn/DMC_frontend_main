import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { OurHistoryComponent } from './about/pages/our-history/our-history.component';
import { WhatWeDoComponent } from './about/pages/what-we-do/what-we-do.component';

const routes: Routes = [
  {
    path: '',
    component: AboutComponent,
    children: [
      { path: '', redirectTo: 'our-history', pathMatch: 'full' },
      { path: 'our-history', component: OurHistoryComponent },
      { path: 'what-we-do', component: WhatWeDoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }

