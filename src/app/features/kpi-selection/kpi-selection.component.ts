import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import {
  KPI_SELECTION_MESSAGES,
  MAX_SELECTED_KPIS,
  MIN_SELECTED_KPIS,
} from '@core/constants/kpis.const';
import { Store } from '@ngrx/store';
import * as KpisActions from '@store/kpis/kpis.actions';
import {
  selectCanCreateDashboard,
  selectDashboardName,
  selectDefinitions,
  selectHasDashboardName,
  selectKpisError,
  selectKpisHasError,
  selectKpisLoading,
  selectSelectedIds,
  selectSelectionLimitReached,
} from '@store/kpis/kpis.selectors';
import { LoaderComponent } from '@shared/ui/loader/loader.component';
import { AlertInfoComponent } from '@shared/ui/alert-info/alert-info.component';
import { KpiOptionComponent } from './kpi-option/kpi-option.component';
import { KpiId } from '@core/models/kpi.models';

@Component({
  selector: 'app-kpi-selection',
  imports: [LoaderComponent, AlertInfoComponent, KpiOptionComponent],
  templateUrl: './kpi-selection.component.html',
  styleUrl: './kpi-selection.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KpiSelectionComponent implements OnInit {
  private readonly store = inject(Store);

  private readonly nameInput = viewChild.required<ElementRef<HTMLInputElement>>('nameInput');

  protected readonly kpis = this.store.selectSignal(selectDefinitions);
  protected readonly selectedIds = this.store.selectSignal(selectSelectedIds);
  protected readonly dashboardName = this.store.selectSignal(selectDashboardName);
  protected readonly isLoading = this.store.selectSignal(selectKpisLoading);
  protected readonly hasError = this.store.selectSignal(selectKpisHasError);
  protected readonly error = this.store.selectSignal(selectKpisError);
  protected readonly limitReached = this.store.selectSignal(selectSelectionLimitReached);
  protected readonly canCreate = this.store.selectSignal(selectCanCreateDashboard);
  private readonly hasName = this.store.selectSignal(selectHasDashboardName);

  protected readonly showNameError = computed(() => this.submitAttempted() && !this.hasName());
  protected readonly selectionHint = computed(() => {
    const count = this.selectedIds().length;

    if (this.limitReached()) {
      return KPI_SELECTION_MESSAGES.LIMIT_REACHED(this.maxKpis);
    }

    if (count < this.minKpis) {
      return KPI_SELECTION_MESSAGES.MIN_REQUIRED(this.minKpis);
    }

    return KPI_SELECTION_MESSAGES.READY;
  });
  protected readonly options = computed(() => {
    const selectedIds = this.selectedIds();
    const limitReached = this.limitReached();

    return this.kpis().map((kpi) => {
      const selected = selectedIds.includes(kpi.id);

      return { kpi, selected, disabled: limitReached && !selected };
    });
  });

  protected readonly submitAttempted = signal(false);

  protected readonly limitReason = KPI_SELECTION_MESSAGES.LIMIT_REASON(MAX_SELECTED_KPIS);
  protected readonly minKpis = MIN_SELECTED_KPIS;
  protected readonly maxKpis = MAX_SELECTED_KPIS;

  ngOnInit(): void {
    this.store.dispatch(KpisActions.kpiSelectionOpened());
  }

  protected onNameInput(event: Event): void {
    const dashboardName = (event.target as HTMLInputElement).value;

    this.store.dispatch(KpisActions.dashboardNameChanged({ dashboardName }));
  }

  protected onRetry(): void {
    this.store.dispatch(KpisActions.kpiSelectionRetryClicked());
  }

  protected onToggle(kpiId: KpiId): void {
    this.store.dispatch(KpisActions.kpiToggled({ kpiId }));
  }

  protected onCreate(): void {
    this.submitAttempted.set(true);

    if (!this.hasName()) {
      this.nameInput().nativeElement.focus();

      return;
    }

    this.store.dispatch(KpisActions.createDashboardClicked());
  }
}
