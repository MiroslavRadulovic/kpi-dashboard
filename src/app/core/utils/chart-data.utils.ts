import { KPI_QUALITY_THRESHOLDS } from '@core/constants/charts-data.const';
import { NETWORK_TYPES } from '@core/constants/kpis.const';
import {
  ByKpi,
  ChartPoint,
  ChartSeries,
  KpiSummary,
  QualityBand,
} from '@core/models/chart-data.models';
import { Quality } from '@core/enums/chart-data.enum';
import { KpiDefinition, KpiId, KpiMeasurement, NetworkType } from '@core/models/kpi.models';

export function buildKpiSummaries(
  kpis: KpiDefinition[],
  measurements: KpiMeasurement[],
): KpiSummary[] {
  return kpis.map((kpi: KpiDefinition) => ({
    name: kpi.name,
    value: average(measurements, kpi.id),
    extra: { unit: kpi.unit, higherIsBetter: kpi.higherIsBetter },
  }));
}

export function buildTrendByKpi(
  kpis: KpiDefinition[],
  measurements: KpiMeasurement[],
): ByKpi<ChartSeries[]> {
  return byKpi(kpis, (kpi: KpiDefinition) =>
    NETWORK_TYPES.map((type: NetworkType) => ({
      name: type,
      series: [
        ...groupBy(
          measurements.filter((measurement: KpiMeasurement) => measurement.type === type),
          (measurement: KpiMeasurement) => measurement.timestamp,
        ),
      ].map(([timestamp, rows]) => ({ name: new Date(timestamp), value: average(rows, kpi.id) })),
    })).filter((s) => s.series.length > 0),
  );
}

export function buildRegionAveragesByKpi(
  kpis: KpiDefinition[],
  measurements: KpiMeasurement[],
): ByKpi<ChartPoint[]> {
  const byRegion = groupBy(measurements, (measurement: KpiMeasurement) => measurement.region);

  return byKpi(kpis, (kpi: KpiDefinition) =>
    [...byRegion]
      .map(([region, rows]) => ({ name: region, value: average(rows, kpi.id) }))
      .sort((a, b) => a.name.localeCompare(b.name)),
  );
}

export function buildQualityByKpi(
  kpis: KpiDefinition[],
  measurements: KpiMeasurement[],
): ByKpi<ChartPoint<QualityBand>[]> {
  return byKpi(kpis, (kpi: KpiDefinition) => {
    const counts: Record<QualityBand, number> = {
      [Quality.GOOD]: 0,
      [Quality.FAIR]: 0,
      [Quality.POOR]: 0,
    };

    for (const m of measurements) {
      counts[qualityBand(kpi, m[kpi.id])]++;
    }

    return (Object.keys(counts) as QualityBand[])
      .map((band: QualityBand) => ({ name: band, value: counts[band] }))
      .filter((p) => p.value > 0);
  });
}

export function qualityBand(kpi: KpiDefinition, value: number): QualityBand {
  const { good, poor } = KPI_QUALITY_THRESHOLDS[kpi.id];
  const isBetter = (a: number, b: number) => (kpi.higherIsBetter ? a >= b : a <= b);

  if (isBetter(value, good)) {
    return Quality.GOOD;
  }

  return isBetter(value, poor) ? Quality.FAIR : Quality.POOR;
}

function average(rows: KpiMeasurement[], kpi: KpiId): number {
  const mean = rows.length ? rows.reduce((sum, r) => sum + r[kpi], 0) / rows.length : 0;

  return Math.round(mean * 100) / 100;
}

function byKpi<T>(kpis: KpiDefinition[], build: (kpi: KpiDefinition) => T): ByKpi<T> {
  return Object.fromEntries(kpis.map((kpi: KpiDefinition) => [kpi.id, build(kpi)])) as ByKpi<T>;
}

function groupBy<T>(items: T[], key: (item: T) => string): Map<string, T[]> {
  const groups = new Map<string, T[]>();

  for (const item of items) {
    const k = key(item);

    if (!groups.get(k)?.push(item)) {
      groups.set(k, [item]);
    }
  }

  return groups;
}
