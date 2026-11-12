import { KpiId } from '@core/models/kpi.models';

export const KPI_QUALITY_THRESHOLDS: Record<KpiId, { good: number; poor: number }> = {
  averageSignalStrength: { good: -80, poor: -95 },
  averageLatency: { good: 30, poor: 80 },
  downloadThroughput: { good: 50, poor: 10 },
  uploadThroughput: { good: 20, poor: 3 },
  dropCallRate: { good: 0.5, poor: 2 },
  packetLoss: { good: 0.5, poor: 2 },
};
