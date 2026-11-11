import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from './dashboard-store.model';
import { DASHBOARD_FEATURE_KEY } from './dashboard.reducer';

export const selectDashboardState = createFeatureSelector<DashboardState>(DASHBOARD_FEATURE_KEY);

export const selectFilters = createSelector(
  selectDashboardState,
  (state: DashboardState) => state.filters,
);
