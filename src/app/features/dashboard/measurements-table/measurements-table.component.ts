import { DatePipe, DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  linkedSignal,
  signal,
} from '@angular/core';
import { PAGE_SIZE } from '@core/constants/table.const';
import { Direction } from '@core/enums/table.enum';
import { KpiDefinition, KpiMeasurement } from '@core/models/kpi.models';
import { Column, SortColumn, SortState } from '@core/models/table.models';
import { compare } from '@core/utils/table.utils';

@Component({
  selector: 'app-measurements-table',
  imports: [DatePipe, DecimalPipe],
  templateUrl: './measurements-table.component.html',
  styleUrl: './measurements-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeasurementsTableComponent {
  readonly measurements = input.required<KpiMeasurement[]>();
  readonly kpis = input.required<KpiDefinition[]>();

  protected readonly search = signal('');
  protected readonly sort = signal<SortState>({
    column: 'timestamp',
    direction: Direction.DESC,
  });

  protected readonly page = linkedSignal({
    source: () => ({ rows: this.measurements(), search: this.search(), sort: this.sort() }),
    computation: () => 1,
  });

  private readonly filteredRows = computed(() => {
    const term = this.search().trim().toLowerCase();
    const rows = this.measurements();

    return term ? rows.filter((row) => row.region.toLowerCase().includes(term)) : rows;
  });

  private readonly sortedRows = computed(() => {
    const { column, direction } = this.sort();
    const factor = direction === Direction.ASC ? 1 : -1;

    return [...this.filteredRows()].sort((a, b) => factor * compare(a[column], b[column]));
  });

  protected readonly totalRows = computed(() => this.sortedRows().length);

  protected readonly rangeLabel = computed(() => {
    const total = this.totalRows();

    if (total === 0) {
      return '0 rows';
    }

    const start = (this.page() - 1) * PAGE_SIZE + 1;
    const end = Math.min(start + PAGE_SIZE - 1, total);

    return `${start}–${end} of ${total}`;
  });

  protected readonly columns = computed<Column[]>(() => {
    const sort = this.sort();
    const columns: Omit<Column, 'ariaSort'>[] = [
      { key: 'timestamp', label: 'Timestamp (UTC)', numeric: false },
      { key: 'region', label: 'Region', numeric: false },
      { key: 'type', label: 'Network', numeric: false },
      ...this.kpis().map((kpi) => ({
        key: kpi.id,
        label: `${kpi.name} (${kpi.unit})`,
        numeric: true,
      })),
    ];

    return columns.map((column) => ({
      ...column,
      ariaSort:
        column.key !== sort.column
          ? Direction.NONE
          : sort.direction === Direction.ASC
            ? Direction.ASCENDING
            : Direction.DESCENDING,
    }));
  });

  protected readonly pageRows = computed(() => {
    const start = (this.page() - 1) * PAGE_SIZE;

    return this.sortedRows().slice(start, start + PAGE_SIZE);
  });
  
  protected readonly pageCount = computed(() =>
    Math.max(1, Math.ceil(this.totalRows() / PAGE_SIZE)),
  );

  protected readonly ascending = Direction.ASCENDING;
  protected readonly descending = Direction.DESCENDING;

  protected onSearch(event: Event): void {
    this.search.set((event.target as HTMLInputElement).value);
  }

  protected toggleSort(column: SortColumn): void {
    this.sort.update((current) =>
      current.column === column
        ? {
            column,
            direction: current.direction === Direction.ASC ? Direction.DESC : Direction.ASC,
          }
        : { column, direction: Direction.ASC },
    );
  }

  protected goToPage(page: number): void {
    this.page.set(Math.min(Math.max(page, 1), this.pageCount()));
  }
}
