import { ChangeDetectionStrategy, Component, inject, linkedSignal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { injectMediaQuery } from '@core/utils/media-query.utils';
import { MOBILE_QUERY } from '@core/constants/breakpoints.const';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

@Component({
  selector: 'app-landing',
  imports: [HeaderComponent, SidebarComponent, RouterOutlet],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  host: {
    '(document:keydown.escape)': 'closeMenu()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingComponent {
  private readonly navigationEnd = toSignal(
    inject(Router).events.pipe(filter((event) => event instanceof NavigationEnd)),
  );

  protected readonly menuOpen = linkedSignal({
    source: () => [this.navigationEnd(), this.isMobile()],
    computation: () => false,
  });

  protected readonly isMobile = injectMediaQuery(MOBILE_QUERY);

  protected readonly menuId = 'main-nav';

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
