import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { MIN_SELECTED_KPIS } from '@core/constants/kpis.const';
import { navItems } from '@core/constants/sidebar.const';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
  private readonly store = inject(Store);

  protected readonly dashboardDisabledHint = `Name your dashboard and select at least ${MIN_SELECTED_KPIS} KPIs first`;
  protected readonly navItems = navItems;
}
