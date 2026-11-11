import { createReducer, on } from '@ngrx/store';
import { DashboardState } from './dashboard-store.model';
import { LoadStatus } from '@core/enums/kpis.enum';
import * as DashboardActions from './dashboard.actions';
import { SidebarItems } from '@core/enums/sidebar-items.enum';
import { defaultFiltersState } from '@core/constants/dashboard.const';

export const DASHBOARD_FEATURE_KEY = SidebarItems.DASHBOARD;

export const initialState: DashboardState = {
  filters: defaultFiltersState,
  measurements: [],
  status: LoadStatus.IDLE,
  error: null,
};

export const dashboardReducer = createReducer(
  initialState,
  on(
    DashboardActions.dashboardOpened,
    DashboardActions.dashboardRetryClicked,
    (state): DashboardState => ({
      ...state,
      status: LoadStatus.LOADING,
      error: null,
    }),
  ),
  on(DashboardActions.filtersChanged, (state, { filters }): DashboardState => ({
    ...state,
    filters,
    status: LoadStatus.LOADING,
    error: null,
  })),
  on(DashboardActions.measurementsLoadedSuccess, (state, { measurements }): DashboardState => ({
    ...state,
    measurements,
    status: LoadStatus.LOADED,
  })),
  on(DashboardActions.measurementsLoadedFailure, (state, { error }): DashboardState => ({
    ...state,
    measurements: [],
    status: LoadStatus.ERROR,
    error,
  })),
);
