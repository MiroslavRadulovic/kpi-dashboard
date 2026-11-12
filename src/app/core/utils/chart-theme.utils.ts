import { OrdinalScheme } from '@core/enums/chart-data.enum';
import { Color, ScaleType } from '@swimlane/ngx-charts';

export const ordinalScheme = (name: string, domain: string[]): Color => ({
  name,
  selectable: true,
  group: ScaleType.Ordinal,
  domain,
});

export const NETWORK_COLOR_SCHEME = ordinalScheme(OrdinalScheme.NETWORK, [
  '#f59e0b',
  '#0568ae',
  '#10a37f',
]);

export const REGION_COLOR_SCHEME = ordinalScheme(OrdinalScheme.REGION, [
  '#0568ae',
  '#3b8fd0',
  '#6aaee0',
  '#2c6e9b',
  '#8cc4ea',
]);

export const QUALITY_COLOR_SCHEME = ordinalScheme(OrdinalScheme.QUALITY, [
  '#2e9d5b',
  '#e0a100',
  '#d64545',
]);

export const KPI_CARD_COLORS = ['#0568ae', '#10a37f', '#f59e0b', '#8b5cf6'];

export function formatKpiValue(value: number, unit: string): string {
  const formatted = value.toLocaleString('en-US', { maximumFractionDigits: 2 });

  return unit === '%' ? `${formatted}%` : `${formatted} ${unit}`;
}
