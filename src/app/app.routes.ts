import { Routes } from '@angular/router';
import { hasKpiSelectionGuard } from '@core/guards/dashboard.guard';
import { LandingComponent } from '@features/layout/landing/landing.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
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
          import('@features/kpi-selection/kpi-selection.component').then(
            (m) => m.KpiSelectionComponent,
          ),
      },
      {
        path: 'dashboard',
        title: 'Dashboard',
        canActivate: [hasKpiSelectionGuard],
        loadComponent: () =>
          import('@features/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
    ],
  },
];
