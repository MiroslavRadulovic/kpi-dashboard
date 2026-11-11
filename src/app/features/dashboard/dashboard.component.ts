import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectDashboardName, selectSelectedKpis } from '@store/kpis/kpis.selectors';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
import { selectFilters } from '@store/dashboard/dashboard.selectors';
import { MeasurementFilters } from '@core/models/kpi.models';
import * as DashboardActions from '@store/dashboard/dashboard.actions';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [FilterBarComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private readonly store = inject(Store);

  protected readonly dashboardName = this.store.selectSignal(selectDashboardName);
  protected readonly kpis = this.store.selectSignal(selectSelectedKpis);
  protected readonly filters = this.store.selectSignal(selectFilters);

  protected readonly title = computed(() => this.dashboardName().trim());

  protected onFiltersChange(filters: MeasurementFilters): void {
    this.store.dispatch(DashboardActions.filtersChanged({ filters }));
  }
}
