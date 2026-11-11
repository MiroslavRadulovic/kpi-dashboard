import { KpiMeasurement, LoadStatus, MeasurementFilters } from '@core/models/kpi.models';

export interface DashboardState {
  filters: MeasurementFilters;
  measurements: KpiMeasurement[];
  status: LoadStatus;
  error: string | null;
}
