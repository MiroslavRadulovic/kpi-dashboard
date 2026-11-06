import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, delay, mergeMap, of, throwError, timer } from 'rxjs';
import { MeasurementFilters } from '@core/models/kpi.models';
import { generateMeasurements } from './measurement-generator';
import { MOCK_KPI_DEFINITIONS } from './mock-kpis';
import { NETWORK_TYPES, REGIONS } from '@core/constants/kpis.const';
import { MOCK_API_CONFIG } from './mock-api.config';

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith('/api/')) {
    return next(req);
  }

  const latency = randomDelay();

  if (Math.random() < MOCK_API_CONFIG.errorRate) {
    return timer(latency).pipe(
      mergeMap(() => throwError(() => httpError(req, 500, 'Internal Server Error'))),
    );
  }

  return respond(req).pipe(delay(latency));
};

function respond(req: HttpRequest<unknown>): Observable<HttpEvent<unknown>> {
  if (req.method === 'GET' && req.url === '/api/kpis') {
    return ok(MOCK_KPI_DEFINITIONS);
  }

  if (req.method === 'GET' && req.url === '/api/measurements') {
    const filters = parseFilters(req);

    return filters
      ? ok(generateMeasurements(filters))
      : throwError(() => httpError(req, 400, 'Invalid filters'));
  }

  return throwError(() => httpError(req, 404, 'Not Found'));
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

function httpError(req: HttpRequest<unknown>, status: number, statusText: string) {
  return new HttpErrorResponse({ status, statusText, url: req.urlWithParams });
}

function randomDelay(): number {
  const { minDelayMs, maxDelayMs } = MOCK_API_CONFIG;

  return minDelayMs + Math.round(Math.random() * (maxDelayMs - minDelayMs));
}
