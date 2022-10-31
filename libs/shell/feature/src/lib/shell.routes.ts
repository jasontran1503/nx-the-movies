import { Routes } from '@angular/router';

export const layoutRoutes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadComponent: () => import('@nx-the-movies/home').then((m) => m.HomeComponent)
  }
];
