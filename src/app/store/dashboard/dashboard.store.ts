import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { DASHBOARD_FEATURE_KEY, dashboardReducer } from './dashboard.reducer';
import { DashboardEffects } from './dashboard.effects';

export function provideDashboardStore(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideState(DASHBOARD_FEATURE_KEY, dashboardReducer),
    provideEffects(DashboardEffects),
  ]);
}
