export type NetworkType = '3G' | '4G' | '5G';
export type LoadStatus = 'idle' | 'loading' | 'loaded' | 'error';

export type KpiId =
  | 'averageSignalStrength'
  | 'averageLatency'
  | 'downloadThroughput'
  | 'uploadThroughput'
  | 'dropCallRate'
  | 'packetLoss';

export interface KpiDefinition {
  id: KpiId;
  name: string;
  unit: string;
  description: string;
  higherIsBetter: boolean;
}

export interface KpiMeasurement {
  id: string;
  timestamp: string;
  region: string;
  type: NetworkType;
  averageSignalStrength: number;
  averageLatency: number;
  downloadThroughput: number;
  uploadThroughput: number;
  dropCallRate: number;
  packetLoss: number;
}

export type TimeRange = '24h' | '7d';

export interface MeasurementFilters {
  range: TimeRange;
  type: NetworkType | 'all';
  region: string | 'all';
}

export type ValueRange = readonly [min: number, max: number];
