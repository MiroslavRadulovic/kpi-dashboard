import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ChartSeries } from '@core/models/chart-data.models';
import { KpiDefinition, TimeRange } from '@core/models/kpi.models';
import { NETWORK_COLOR_SCHEME } from '@core/utils/chart-theme.utils';
import { LineChartModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-kpi-trend-chart',
  imports: [LineChartModule],
  templateUrl: './kpi-trend-chart.component.html',
  styleUrl: './kpi-trend-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KpiTrendChartComponent {
  readonly data = input.required<ChartSeries[]>();
  readonly kpi = input.required<KpiDefinition>();
  readonly range = input.required<TimeRange>();

  protected readonly scheme = NETWORK_COLOR_SCHEME;

  protected readonly formatHour = (date: Date): string =>
    date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });

  protected readonly formatDay = (date: Date): string =>
    date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', timeZone: 'UTC' });
}
