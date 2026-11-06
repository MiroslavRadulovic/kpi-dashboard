import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { KpiDefinition, KpiMeasurement, MeasurementFilters } from '../models/kpi.models';

@Injectable({
  providedIn: 'root',
})
export class KpiApiService {
  private readonly http = inject(HttpClient);

  getKpis(): Observable<KpiDefinition[]> {
    return this.http.get<KpiDefinition[]>('/api/kpis');
  }

  getMeasurements(filters: MeasurementFilters): Observable<KpiMeasurement[]> {
    const params = new HttpParams({ fromObject: { ...filters } });

    return this.http.get<KpiMeasurement[]>('/api/measurements', { params });
  }
}
