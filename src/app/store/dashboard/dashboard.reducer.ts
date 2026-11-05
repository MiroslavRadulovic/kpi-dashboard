import { createReducer } from '@ngrx/store';
import { DashboardState } from './dashboard-store.model';

export const dashboardFeatureKey = 'dashboard';

export const initialState: DashboardState = {};

export const dashboardReducer = createReducer(initialState);
