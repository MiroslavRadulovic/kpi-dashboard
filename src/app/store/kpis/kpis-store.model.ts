import { KpiDefinition, KpiId, LoadStatus } from '@core/models/kpi.models';

export interface KpisState {
  definitions: KpiDefinition[];
  selectedIds: KpiId[];
  dashboardName: string;
  status: LoadStatus;
  error: string | null;
}
