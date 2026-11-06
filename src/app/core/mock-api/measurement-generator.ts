import { KpiId, KpiMeasurement, MeasurementFilters, NetworkType } from '@core/models/kpi.models';
import { MOCK_KPI_DEFINITIONS } from './mock-kpis';
import { hashString, mulberry32 } from './seeded-random';
import {
  HOUR_MS,
  HOURS_PER_RANGE,
  NETWORK_TYPES,
  PEAK_END_HOUR_UTC,
  PEAK_PENALTY,
  PEAK_START_HOUR_UTC,
  REGIONS,
  VALUE_RANGES,
} from '@core/constants/kpis.const';

export function generateMeasurements(
  filters: MeasurementFilters,
  now: Date = new Date(),
): KpiMeasurement[] {
  const hours = HOURS_PER_RANGE[filters.range];
  const lastHour = Math.floor(now.getTime() / HOUR_MS) * HOUR_MS;
  const regions =
    filters.region === 'all' ? REGIONS : REGIONS.filter((region) => region === filters.region);
  const types = filters.type === 'all' ? NETWORK_TYPES : [filters.type];
  const rows: KpiMeasurement[] = [];

  for (let i = hours - 1; i >= 0; i--) {
    const timestamp = new Date(lastHour - i * HOUR_MS).toISOString();

    for (const region of regions) {
      for (const type of types) {
        rows.push(generateMeasurement(timestamp, region, type));
      }
    }
  }

  return rows;
}

function generateMeasurement(timestamp: string, region: string, type: NetworkType): KpiMeasurement {
  const random = mulberry32(hashString(`${timestamp}|${region}|${type}`));
  const hour = new Date(timestamp).getUTCHours();
  const isPeak = hour >= PEAK_START_HOUR_UTC && hour < PEAK_END_HOUR_UTC;

  const values = Object.fromEntries(
    MOCK_KPI_DEFINITIONS.map(({ id, higherIsBetter }) => {
      const [min, max] = VALUE_RANGES[type][id];
      const shift = isPeak ? (higherIsBetter ? -PEAK_PENALTY : PEAK_PENALTY) : 0;
      const position = 0.25 + random() * 0.5 + shift;

      return [id, Math.round((min + position * (max - min)) * 100) / 100];
    }),
  ) as Record<KpiId, number>;

  return { id: `${timestamp}|${region}|${type}`, timestamp, region, type, ...values };
}
