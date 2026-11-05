import { createReducer } from '@ngrx/store';
import { KpisState } from './kpis-store.model';

export const kpisKey = 'kpis';

export const initialState: KpisState = {};

export const kpisReducer = createReducer(initialState);
