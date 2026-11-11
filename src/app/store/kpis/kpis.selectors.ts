import { createFeatureSelector, createSelector } from '@ngrx/store';
import { KpisState } from './kpis-store.model';
import { KPIS_KEY } from './kpis.reducer';
import { LoadStatus } from '@core/enums/kpis.enum';
import { KpiDefinition, KpiId } from '@core/models/kpi.models';
import { MAX_SELECTED_KPIS, MIN_SELECTED_KPIS } from '@core/constants/kpis.const';

export const selectKpisState = createFeatureSelector<KpisState>(KPIS_KEY);

export const selectDefinitions = createSelector(
  selectKpisState,
  (state: KpisState) => state.definitions,
);
export const selectSelectedIds = createSelector(
  selectKpisState,
  (state: KpisState) => state.selectedIds,
);
export const selectDashboardName = createSelector(
  selectKpisState,
  (state: KpisState) => state.dashboardName,
);
export const selectKpisStatus = createSelector(selectKpisState, (state: KpisState) => state.status);
export const selectKpisError = createSelector(selectKpisState, (state: KpisState) => state.error);
export const selectKpisLoading = createSelector(
  selectKpisStatus,
  (status) => status === LoadStatus.LOADING,
);
export const selectKpisHasError = createSelector(
  selectKpisStatus,
  (status) => status === LoadStatus.ERROR,
);
export const selectHasDashboardName = createSelector(
  selectDashboardName,
  (name) => name.trim().length > 0,
);
export const selectSelectedKpis = createSelector(
  selectDefinitions,
  selectSelectedIds,
  (kpiDefinitions: KpiDefinition[], kpiIds: KpiId[]) =>
    kpiIds
      .map((id: KpiId) => kpiDefinitions.find((definition: KpiDefinition) => definition.id === id))
      .filter((definition): definition is KpiDefinition => !!definition),
);
export const selectSelectionLimitReached = createSelector(
  selectSelectedIds,
  (kpiIds: KpiId[]) => kpiIds.length >= MAX_SELECTED_KPIS,
);
export const selectCanCreateDashboard = createSelector(
  selectSelectedIds,
  (kpiIds: KpiId[]) => kpiIds.length >= MIN_SELECTED_KPIS,
);
export const selectCanOpenDashboard = createSelector(
  selectCanCreateDashboard,
  selectHasDashboardName,
  (validSelection: boolean, hasName: boolean) => validSelection && hasName,
);
