import { KpiMeasurement, MeasurementFilters } from '@core/models/kpi.models';
import { createAction, props } from '@ngrx/store';

export const dashboardOpened = createAction('[Dashboard Page] Opened');
export const dashboardRetryClicked = createAction('[Dashboard Page] Retry Clicked');
export const filtersChanged = createAction(
  '[Dashboard Page] Filters Changed',
  props<{ filters: MeasurementFilters }>(),
);
export const measurementsLoadedSuccess = createAction(
  '[Measurements API] Measurements Loaded Success',
  props<{ measurements: KpiMeasurement[] }>(),
);
export const measurementsLoadedFailure = createAction(
  '[Measurements API] Measurements Loaded Failure',
  props<{ error: string }>(),
);
