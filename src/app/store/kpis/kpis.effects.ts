import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Router } from '@angular/router';
import { catchError, exhaustMap, filter, map, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { KpiApiService } from '@core/api/kpi-api.service';
import * as KpisActions from './kpis.actions';
import { selectKpisStatus } from './kpis.selectors';
import { LoadStatus } from '@core/enums/kpis.enum';
import { KpiDefinition } from '@core/models/kpi.models';
import { toErrorMessage } from '@store/load-status';

@Injectable()
export class KpisEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly kpiApi = inject(KpiApiService);
  private readonly router = inject(Router);

  loadKpis$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(KpisActions.kpiSelectionOpened, KpisActions.kpiSelectionRetryClicked),
      concatLatestFrom(() => this.store.select(selectKpisStatus)),
      filter(([, status]) => status === LoadStatus.LOADING),
      exhaustMap(() =>
        this.kpiApi.getKpis().pipe(
          map((kpis: KpiDefinition[]) => KpisActions.kpisLoadedSuccess({ kpis })),
          catchError((error: unknown) =>
            of(KpisActions.kpisLoadedFailure({ error: toErrorMessage(error) })),
          ),
        ),
      ),
    );
  });

  navigateToDashboard$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(KpisActions.createDashboardClicked),
        tap(() => void this.router.navigateByUrl('/dashboard')),
      );
    },
    { dispatch: false },
  );
}
