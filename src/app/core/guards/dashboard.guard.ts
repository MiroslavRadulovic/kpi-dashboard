import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { selectCanOpenDashboard } from '@store/kpis/kpis.selectors';

export const hasKpiSelectionGuard: CanActivateFn = () => {
  const router = inject(Router);

  return inject(Store)
    .select(selectCanOpenDashboard)
    .pipe(
      take(1),
      map((canCreate) => canCreate || router.createUrlTree(['/'])),
    );
};
