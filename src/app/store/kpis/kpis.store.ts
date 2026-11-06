import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { kpisKey, kpisReducer } from './kpis.reducer';
import { KpisEffects } from './kpis.effects';

export function provideKpisStore(): EnvironmentProviders {
  return makeEnvironmentProviders([
    provideState(kpisKey, kpisReducer),
    provideEffects(KpisEffects),
  ]);
}
