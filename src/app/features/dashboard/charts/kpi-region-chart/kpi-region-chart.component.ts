import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BarChartModule } from '@swimlane/ngx-charts';
import { ChartPoint } from '@core/models/chart-data.models';
import { KpiDefinition } from '@core/models/kpi.models';
import { formatKpiValue, REGION_COLOR_SCHEME } from '@core/utils/chart-theme.utils';

@Component({
  selector: 'app-kpi-region-chart',
  imports: [BarChartModule],
  templateUrl: './kpi-region-chart.component.html',
  styleUrl: './kpi-region-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KpiRegionChartComponent {
  readonly data = input.required<ChartPoint[]>();
  readonly kpi = input.required<KpiDefinition>();

  protected readonly scheme = REGION_COLOR_SCHEME;

  protected readonly formatValue = (value: number): string =>
    formatKpiValue(value, this.kpi().unit);
}
