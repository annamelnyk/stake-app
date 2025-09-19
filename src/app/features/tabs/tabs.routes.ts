import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'invest',
        loadComponent: () =>
          import('../invest/tab1.page').then((m) => m.Tab1Page),
      },
      {
        path: 'discover',
        loadComponent: () =>
          import('../discover/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: '',
        redirectTo: '/tabs/invest',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/invest',
    pathMatch: 'full',
  },
];
