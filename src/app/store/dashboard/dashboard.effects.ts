import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { KpiApiService } from '@core/api/kpi-api.service';
import * as DashboardActions from './dashboard.actions';
import { concatLatestFrom } from '@ngrx/operators';
import { selectFilters } from './dashboard.selectors';
import { catchError, map, of, switchMap } from 'rxjs';
import { toErrorMessage } from '@store/load-status';
import { KpiMeasurement } from '@core/models/kpi.models';

@Injectable()
export class DashboardEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly kpiApi = inject(KpiApiService);

  loadMeasurements$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        DashboardActions.dashboardOpened,
        DashboardActions.filtersChanged,
        DashboardActions.dashboardRetryClicked,
      ),
      concatLatestFrom(() => this.store.select(selectFilters)),
      switchMap(([, filters]) =>
        this.kpiApi.getMeasurements(filters).pipe(
          map((measurements: KpiMeasurement[]) =>
            DashboardActions.measurementsLoadedSuccess({ measurements }),
          ),
          catchError((error: unknown) =>
            of(DashboardActions.measurementsLoadedFailure({ error: toErrorMessage(error) })),
          ),
        ),
      ),
    );
  });
}
