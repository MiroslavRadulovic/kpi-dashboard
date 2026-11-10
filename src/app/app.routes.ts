import { Routes } from '@angular/router';
import { Landing } from '@features/layout/landing/landing';

export const routes: Routes = [
  {
    path: '',
    component: Landing,
    children: [
      {
        path: '',
        redirectTo: 'kpi-selection',
        pathMatch: 'full',
      },
      {
        path: 'kpi-selection',
        title: 'Select KPIs',
        loadComponent: () =>
          import('@features/kpi-selection/kpi-selection').then((m) => m.KpiSelection),
      },
    ],
  },
];
