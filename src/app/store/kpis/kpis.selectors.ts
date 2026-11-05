import { createFeatureSelector } from '@ngrx/store';
import { KpisState } from './kpis-store.model';
import { kpisKey } from './kpis.reducer';

export const selectKpisState = createFeatureSelector<KpisState>(kpisKey);
