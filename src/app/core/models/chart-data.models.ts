import { KpiId } from './kpi.models';

export interface KpiSummary {
  name: string;
  value: number;
  extra: { unit: string; higherIsBetter: boolean };
}

export type ByKpi<T> = Partial<Record<KpiId, T>>;

export type QualityBand = 'Good' | 'Fair' | 'Poor';

export interface ChartPoint<TName = string> {
  name: TName;
  value: number;
}

export interface ChartSeries {
  name: string;
  series: ChartPoint<Date>[];
}
