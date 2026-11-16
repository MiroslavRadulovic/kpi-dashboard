import { Direction } from '@core/enums/table.enum';
import { KpiId } from './kpi.models';

export type SortColumn = 'timestamp' | 'region' | 'type' | KpiId;
export type SortDirection = Direction.ASC | Direction.DESC;

export interface SortState {
  column: SortColumn;
  direction: SortDirection;
}

export interface Column {
  key: SortColumn;
  label: string;
  numeric: boolean;
  ariaSort: Direction.ASCENDING | Direction.DESCENDING | Direction.NONE;
}
