import { HttpErrorResponse, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { NETWORK_TYPES, REGIONS } from '@core/constants/kpis.const';
import { generateMeasurements } from '@core/mock-api/measurement-generator';
import { MOCK_API_CONFIG } from '@core/mock-api/mock-api.config';
import { MOCK_KPI_DEFINITIONS } from '@core/mock-api/mock-kpis';
import { MeasurementFilters } from '@core/models/kpi.models';
import { ErrorMessages } from '@core/enums/interceptor.enum';

export function respond(req: HttpRequest<unknown>): Observable<HttpEvent<unknown>> {
  if (req.method === 'GET' && req.url === '/api/kpis') {
    return ok(MOCK_KPI_DEFINITIONS);
  }

  if (req.method === 'GET' && req.url === '/api/measurements') {
    const filters = parseFilters(req);

    return filters
      ? ok(generateMeasurements(filters))
      : throwError(() => httpError(req, 400, ErrorMessages.INVALID_FILTER));
  }

  return throwError(() => httpError(req, 404, ErrorMessages.NOT_FOUND));
}

export function httpError(req: HttpRequest<unknown>, status: number, statusText: string) {
  return new HttpErrorResponse({ status, statusText, url: req.urlWithParams });
}

export function randomDelay(): number {
  const { minDelayMs, maxDelayMs } = MOCK_API_CONFIG;

  return minDelayMs + Math.round(Math.random() * (maxDelayMs - minDelayMs));
}

function parseFilters(req: HttpRequest<unknown>): MeasurementFilters | null {
  const range = req.params.get('range') ?? '24h';
  const type = req.params.get('type') ?? 'all';
  const region = req.params.get('region') ?? 'all';

  const validRange = range === '24h' || range === '7d';
  const validType = type === 'all' || (NETWORK_TYPES as string[]).includes(type);
  const validRegion = region === 'all' || REGIONS.includes(region);

  return validRange && validType && validRegion
    ? ({ range, type, region } as MeasurementFilters)
    : null;
}

function ok<T>(body: T): Observable<HttpResponse<T>> {
  return of(new HttpResponse({ status: 200, body }));
}
