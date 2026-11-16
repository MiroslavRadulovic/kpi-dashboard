import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  linkedSignal,
  OnInit,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectDashboardName, selectSelectedKpis } from '@store/kpis/kpis.selectors';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
import {
  selectDashboardError,
  selectDashboardHasError,
  selectDashboardIsEmpty,
  selectDashboardLoading,
  selectFilters,
  selectKpiSummaries,
  selectMeasurements,
  selectQualityByKpi,
  selectRegionAveragesByKpi,
  selectTrendByKpi,
} from '@store/dashboard/dashboard.selectors';
import { KpiDefinition, KpiId, MeasurementFilters } from '@core/models/kpi.models';
import * as DashboardActions from '@store/dashboard/dashboard.actions';
import { LoaderComponent } from '@shared/ui/loader/loader.component';
import { AlertInfoComponent } from '@shared/ui/alert-info/alert-info.component';
import { KpiNumberCardsComponent } from './charts/kpi-number-cards/kpi-number-cards.component';
import { KpiQualityChartComponent } from './charts/kpi-quality-chart/kpi-quality-chart.component';
import { KpiRegionChartComponent } from './charts/kpi-region-chart/kpi-region-chart.component';
import { KpiTrendChartComponent } from './charts/kpi-trend-chart/kpi-trend-chart.component';
import { KpiSwitcherComponent } from './kpi-switcher/kpi-switcher.component';
import { MeasurementsTableComponent } from './measurements-table/measurements-table.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    FilterBarComponent,
    RouterLink,
    LoaderComponent,
    AlertInfoComponent,
    NgTemplateOutlet,
    KpiNumberCardsComponent,
    KpiQualityChartComponent,
    KpiRegionChartComponent,
    KpiTrendChartComponent,
    KpiSwitcherComponent,
    MeasurementsTableComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  private readonly store = inject(Store);

  protected readonly dashboardName = this.store.selectSignal(selectDashboardName);
  protected readonly kpis = this.store.selectSignal(selectSelectedKpis);
  protected readonly filters = this.store.selectSignal(selectFilters);
  protected readonly isLoading = this.store.selectSignal(selectDashboardLoading);
  protected readonly hasError = this.store.selectSignal(selectDashboardHasError);
  protected readonly isEmpty = this.store.selectSignal(selectDashboardIsEmpty);
  protected readonly error = this.store.selectSignal(selectDashboardError);
  protected readonly summaries = this.store.selectSignal(selectKpiSummaries);
  private readonly trendByKpi = this.store.selectSignal(selectTrendByKpi);
  private readonly regionByKpi = this.store.selectSignal(selectRegionAveragesByKpi);
  private readonly qualityByKpi = this.store.selectSignal(selectQualityByKpi);
  protected readonly measurements = this.store.selectSignal(selectMeasurements);

  protected readonly activeKpiId = linkedSignal<KpiId[], KpiId | null>({
    source: () => this.kpis().map((kpi: KpiDefinition) => kpi.id),
    computation: (ids, previous) =>
      previous?.value && ids.includes(previous.value) ? previous.value : (ids[0] ?? null),
  });

  protected readonly title = computed(() => this.dashboardName().trim());
  protected readonly activeKpi = computed(
    () => this.kpis().find((kpi: KpiDefinition) => kpi.id === this.activeKpiId()) ?? null,
  );
  protected readonly trendData = computed(() => this.forActiveKpi(this.trendByKpi()));
  protected readonly regionData = computed(() => this.forActiveKpi(this.regionByKpi()));
  protected readonly qualityData = computed(() => this.forActiveKpi(this.qualityByKpi()));

  ngOnInit(): void {
    this.store.dispatch(DashboardActions.dashboardOpened());
  }

  protected onFiltersChange(filters: MeasurementFilters): void {
    this.store.dispatch(DashboardActions.filtersChanged({ filters }));
  }

  protected onRetry(): void {
    this.store.dispatch(DashboardActions.dashboardRetryClicked());
  }

  private forActiveKpi<T>(byKpi: Partial<Record<KpiId, T[]>>): T[] {
    const id = this.activeKpiId();

    return (id && byKpi[id]) || [];
  }
}
