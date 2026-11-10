import { HttpInterceptorFn } from '@angular/common/http';
import { delay, mergeMap, throwError, timer } from 'rxjs';

import { MOCK_API_CONFIG } from './mock-api.config';
import { httpError, randomDelay, respond } from '@core/utils/interceptor.utils';
import { ErrorMessages } from '@core/enums/interceptor.enum';

export const mockApiInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith('/api/')) {
    return next(req);
  }

  const latency = randomDelay();

  if (Math.random() < MOCK_API_CONFIG.errorRate) {
    return timer(latency).pipe(
      mergeMap(() => throwError(() => httpError(req, 500, ErrorMessages.INTERNAL_SERVER_ERROR))),
    );
  }

  return respond(req).pipe(delay(latency));
};
