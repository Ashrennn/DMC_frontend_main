import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'library',
    loadChildren: () => import('./features/library/library.module').then(m => m.LibraryModule)
  },
  {
    path: 'dmc-csr',
    loadChildren: () => import('./features/dmc-csr/dmc-csr.module').then(m => m.DmcCsrModule)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
