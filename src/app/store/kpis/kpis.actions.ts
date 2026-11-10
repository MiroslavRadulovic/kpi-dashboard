import { KpiDefinition, KpiId } from '@core/models/kpi.models';
import { createAction, props } from '@ngrx/store';

export const kpiSelectionOpened = createAction('[KPI Selection Page] Opened');
export const kpiSelectionRetryClicked = createAction('[KPI Selection Page] Retry Clicked');
export const kpiToggled = createAction(
  '[KPI Selection Page] Kpi Toggled',
  props<{ kpiId: KpiId }>(),
);
export const dashboardNameChanged = createAction(
  '[KPI Selection Page] Dashboard Name Changed',
  props<{ dashboardName: string }>(),
);
export const kpisLoadedSuccess = createAction(
  '[KPIs API] Kpis Loaded Success',
  props<{ kpis: KpiDefinition[] }>(),
);
export const kpisLoadedFailure = createAction(
  '[KPIs API] Kpis Loaded Failure',
  props<{ error: string }>(),
);
