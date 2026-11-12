import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { KpiDefinition, KpiId } from '@core/models/kpi.models';

@Component({
  selector: 'app-kpi-switcher',
  templateUrl: './kpi-switcher.component.html',
  styleUrl: './kpi-switcher.component.scss',
  host: {
    role: 'tablist',
    'aria-label': 'KPI shown in charts',
    '[style.--seg-count]': 'kpis().length',
    '[style.--seg-index]': 'activeIndex()',
    '[class.no-selection]': 'activeIndex() < 0',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KpiSwitcherComponent {
  readonly kpis = input.required<KpiDefinition[]>();
  readonly activeId = input<KpiId | null>(null);
  readonly activeIdChange = output<KpiId>();

  protected readonly activeIndex = computed(() =>
    this.kpis().findIndex((kpi) => kpi.id === this.activeId()),
  );
}
