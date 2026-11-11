import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { MIN_SELECTED_KPIS } from '@core/constants/kpis.const';
import { DASHBOARD_DISABLED_HINT, navItems } from '@core/constants/sidebar.const';
import { selectCanOpenDashboard } from '@store/kpis/kpis.selectors';
import { NavItem } from '@core/models/sidebar.models';
import { SidebarItems } from '@core/enums/sidebar-items.enum';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  private readonly store = inject(Store);

  protected readonly canOpenDashboard = this.store.selectSignal(selectCanOpenDashboard);

  protected readonly navItems = computed(() =>
    navItems.map((item: NavItem) => ({
      ...item,
      disabled: item.id === SidebarItems.DASHBOARD && !this.canOpenDashboard(),
    })),
  );

  protected readonly dashboardDisabledHint = DASHBOARD_DISABLED_HINT(MIN_SELECTED_KPIS);
}
