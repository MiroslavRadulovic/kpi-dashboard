import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { OrdinalScheme } from '@core/enums/chart-data.enum';
import { KpiSummary } from '@core/models/chart-data.models';
import { formatKpiValue, KPI_CARD_COLORS, ordinalScheme } from '@core/utils/chart-theme.utils';
import { NumberCardModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-kpi-number-cards',
  imports: [NumberCardModule],
  templateUrl: './kpi-number-cards.component.html',
  styleUrl: './kpi-number-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KpiNumberCardsComponent {
  readonly cards = input.required<KpiSummary[]>();

  protected readonly scheme = computed(() => ({
    ...ordinalScheme(
      OrdinalScheme.KPI_CARDS,
      KPI_CARD_COLORS.slice(0, Math.max(this.cards().length, 1)),
    ),
    selectable: false,
  }));

  protected readonly formatValue = ({ value, data }: { value: number; data: KpiSummary }) =>
    formatKpiValue(value, data.extra.unit);
}
