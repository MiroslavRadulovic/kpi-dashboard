import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { KpiDefinition } from '@core/models/kpi.models';

@Component({
  selector: 'app-kpi-option',
  imports: [],
  templateUrl: './kpi-option.html',
  styleUrl: './kpi-option.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KpiOption {
  readonly kpi = input.required<KpiDefinition>();
  readonly selected = input(false);
  readonly disabled = input(false);
  readonly disabledReason = input('');

  readonly toggled = output<KpiDefinition['id']>();
}
