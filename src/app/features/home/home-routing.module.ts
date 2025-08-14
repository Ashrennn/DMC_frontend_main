import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from '../about/about/about.component';
import { OurHistoryComponent } from '../about/about/pages/our-history/our-history.component';
import { WhatWeDoComponent } from '../about/about/pages/what-we-do/what-we-do.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      { path: 'main', redirectTo: '', pathMatch: 'full' },
      {
        path: 'about',
        component: AboutComponent,
        children: [
          { path: '', redirectTo: 'our-history', pathMatch: 'full' },
          { path: 'our-history', component: OurHistoryComponent },
          { path: 'what-we-do', component: WhatWeDoComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
