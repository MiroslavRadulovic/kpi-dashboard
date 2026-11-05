import { createFeatureSelector } from '@ngrx/store';
import { DashboardState } from './dashboard-store.model';
import { dashboardFeatureKey } from './dashboard.reducer';

export const selectDashboardState = createFeatureSelector<DashboardState>(dashboardFeatureKey);
