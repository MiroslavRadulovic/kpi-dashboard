import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { filterRanges } from '@core/constants/filter-bar.const';
import { NETWORK_TYPES, REGIONS } from '@core/constants/kpis.const';
import { FilterRange } from '@core/models/filter-bar.models';
import { MeasurementFilters } from '@core/models/kpi.models';

@Component({
  selector: 'app-filter-bar',
  imports: [],
  templateUrl: './filter-bar.component.html',
  styleUrl: './filter-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterBarComponent {
  readonly filters = input.required<MeasurementFilters>();
  readonly disabled = input(false);
  readonly filtersChange = output<MeasurementFilters>();

  protected readonly ranges: FilterRange[] = filterRanges;
  protected readonly networkTypes = NETWORK_TYPES;
  protected readonly regions = REGIONS;

  protected set<K extends keyof MeasurementFilters>(key: K, value: string): void {
    if (this.filters()[key] !== value) {
      this.filtersChange.emit({ ...this.filters(), [key]: value });
    }
  }

  protected selectValue(event: Event): string {
    return (event.target as HTMLSelectElement).value;
  }
}
