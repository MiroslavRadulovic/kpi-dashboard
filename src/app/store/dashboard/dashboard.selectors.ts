import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from './dashboard-store.model';
import { DASHBOARD_FEATURE_KEY } from './dashboard.reducer';
import { KpiDefinition, KpiMeasurement, LoadStatus as Status } from '@core/models/kpi.models';
import { LoadStatus } from '@core/enums/kpis.enum';
import { selectSelectedKpis } from '@store/kpis/kpis.selectors';
import {
  buildKpiSummaries,
  buildQualityByKpi,
  buildRegionAveragesByKpi,
  buildTrendByKpi,
} from '@core/utils/chart-data.utils';

export const selectDashboardState = createFeatureSelector<DashboardState>(DASHBOARD_FEATURE_KEY);

export const selectFilters = createSelector(
  selectDashboardState,
  (state: DashboardState) => state.filters,
);

export const selectDashboardError = createSelector(
  selectDashboardState,
  (state: DashboardState) => state.error,
);

const selectStatus = createSelector(selectDashboardState, (state: DashboardState) => state.status);

export const selectDashboardLoading = createSelector(
  selectStatus,
  (status: Status) => status === LoadStatus.LOADING,
);

export const selectMeasurements = createSelector(
  selectDashboardState,
  (state: DashboardState) => state.measurements,
);

export const selectDashboardHasError = createSelector(
  selectStatus,
  (status: Status) => status === LoadStatus.ERROR,
);

export const selectDashboardIsEmpty = createSelector(
  selectStatus,
  selectMeasurements,
  (status: Status, measurements: KpiMeasurement[]) =>
    status === LoadStatus.LOADED && measurements.length === 0,
);

const selectFromSelection = <T>(build: (kpis: KpiDefinition[], rows: KpiMeasurement[]) => T) =>
  createSelector(selectSelectedKpis, selectMeasurements, build);

export const selectKpiSummaries = selectFromSelection(buildKpiSummaries);
export const selectTrendByKpi = selectFromSelection(buildTrendByKpi);
export const selectRegionAveragesByKpi = selectFromSelection(buildRegionAveragesByKpi);
export const selectQualityByKpi = selectFromSelection(buildQualityByKpi);
