import { KpiDefinition } from '@core/models/kpi.models';

export const MOCK_KPI_DEFINITIONS: KpiDefinition[] = [
  {
    id: 'averageSignalStrength',
    name: 'Average signal strength',
    unit: 'dBm',
    description: 'Mean received signal power (RSRP/RSCP) reported by devices.',
    higherIsBetter: true,
  },
  {
    id: 'averageLatency',
    name: 'Average latency',
    unit: 'ms',
    description: 'Round-trip time from device to the packet core and back.',
    higherIsBetter: false,
  },
  {
    id: 'downloadThroughput',
    name: 'Download throughput',
    unit: 'Mbps',
    description: 'Average downlink data rate per active session.',
    higherIsBetter: true,
  },
  {
    id: 'uploadThroughput',
    name: 'Upload throughput',
    unit: 'Mbps',
    description: 'Average uplink data rate per active session.',
    higherIsBetter: true,
  },
  {
    id: 'dropCallRate',
    name: 'Drop call rate',
    unit: '%',
    description: 'Share of established calls that ended abnormally.',
    higherIsBetter: false,
  },
  {
    id: 'packetLoss',
    name: 'Packet loss',
    unit: '%',
    description: 'Share of packets lost between device and network.',
    higherIsBetter: false,
  },
];
