import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import { mockApiInterceptor } from '@core/mock-api/mock-api.interceptor';
import { provideKpisStore } from '@store/kpis/kpis.store';
import { provideDashboardStore } from '@store/dashboard/dashboard.store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([mockApiInterceptor])),
    provideAnimationsAsync(), // required by ngx-charts
    provideStoreDevtools({ maxAge: 30, logOnly: true }),
    provideStore({ router: routerReducer }),
    provideEffects(),
    provideRouterStore(),
    provideKpisStore(),
    provideDashboardStore(),
  ],
};
