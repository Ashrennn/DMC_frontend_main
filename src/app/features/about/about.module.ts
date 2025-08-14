import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about/about.component';
import { OurHistoryComponent } from './about/pages/our-history/our-history.component';
import { WhatWeDoComponent } from './about/pages/what-we-do/what-we-do.component';
import { OurPeopleComponent } from './about/pages/our-people/our-people.component';
import { OurValuesComponent } from './about/pages/our-values/our-values.component';

@NgModule({
  imports: [
    CommonModule,
    AboutRoutingModule,
    AboutComponent,
    OurHistoryComponent,
    WhatWeDoComponent,
    OurPeopleComponent,
    OurValuesComponent
  ]
})
export class AboutModule { }

