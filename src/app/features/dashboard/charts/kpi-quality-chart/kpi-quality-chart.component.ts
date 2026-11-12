import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Quality } from '@core/enums/chart-data.enum';
import { ChartPoint, QualityBand } from '@core/models/chart-data.models';
import { QUALITY_COLOR_SCHEME } from '@core/utils/chart-theme.utils';
import { PieChartModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-kpi-quality-chart',
  imports: [PieChartModule],
  templateUrl: './kpi-quality-chart.component.html',
  styleUrl: './kpi-quality-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KpiQualityChartComponent {
  readonly data = input.required<ChartPoint<QualityBand>[]>();

  protected readonly scheme = QUALITY_COLOR_SCHEME;

  protected readonly customColors = ([Quality.GOOD, Quality.FAIR, Quality.POOR] as const).map(
    (name: QualityBand, i: number) => ({
      name,
      value: QUALITY_COLOR_SCHEME.domain[i],
    }),
  );
}
