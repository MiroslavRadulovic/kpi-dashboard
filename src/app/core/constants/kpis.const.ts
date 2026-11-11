import { KpiId, MeasurementFilters, NetworkType, ValueRange } from '@core/models/kpi.models';

export const NETWORK_TYPES: NetworkType[] = ['3G', '4G', '5G'];

export const REGIONS: string[] = ['North', 'South', 'East', 'West', 'Central'];

export const MIN_SELECTED_KPIS = 2;
export const MAX_SELECTED_KPIS = 4;

export const VALUE_RANGES: Record<NetworkType, Record<KpiId, ValueRange>> = {
  '3G': {
    averageSignalStrength: [-105, -85],
    averageLatency: [80, 160],
    downloadThroughput: [1, 8],
    uploadThroughput: [0.3, 2],
    dropCallRate: [1.5, 3.5],
    packetLoss: [1, 3],
  },
  '4G': {
    averageSignalStrength: [-100, -75],
    averageLatency: [30, 60],
    downloadThroughput: [15, 60],
    uploadThroughput: [5, 20],
    dropCallRate: [0.5, 1.5],
    packetLoss: [0.3, 1.2],
  },
  '5G': {
    averageSignalStrength: [-95, -65],
    averageLatency: [8, 25],
    downloadThroughput: [150, 600],
    uploadThroughput: [30, 120],
    dropCallRate: [0.1, 0.6],
    packetLoss: [0.05, 0.5],
  },
};

export const HOUR_MS = 60 * 60 * 1000;
export const HOURS_PER_RANGE: Record<MeasurementFilters['range'], number> = {
  '24h': 24,
  '7d': 168,
};
export const PEAK_START_HOUR_UTC = 18;
export const PEAK_END_HOUR_UTC = 22;
export const PEAK_PENALTY = 0.3;

export const KPI_SELECTION_MESSAGES = {
  LIMIT_REACHED: (max: number) =>
    `You can compare up to ${max} KPIs. Deselect one to choose another.`,
  MIN_REQUIRED: (min: number) => `Select at least ${min} KPIs to create a dashboard.`,
  READY: 'Ready to create your dashboard.',
  LIMIT_REASON: (max: number) => `Limit of ${max} KPIs reached`,
} as const;
