import { createReducer, on } from '@ngrx/store';
import { KpisState } from './kpis-store.model';
import { LoadStatus } from '@core/enums/kpis.enum';
import * as KpisActions from './kpis.actions';
import { MAX_SELECTED_KPIS } from '@core/constants/kpis.const';
import { SidebarItems } from '@core/enums/sidebar-items.enum';

export const KPIS_KEY = SidebarItems.KPIS;

export const initialState: KpisState = {
  definitions: [],
  selectedIds: [],
  dashboardName: '',
  status: LoadStatus.IDLE,
  error: null,
};

export const kpisReducer = createReducer(
  initialState,
  on(KpisActions.kpiSelectionOpened, KpisActions.kpiSelectionRetryClicked, (state): KpisState =>
    state.status === LoadStatus.LOADED
      ? state
      : { ...state, status: LoadStatus.LOADING, error: null },
  ),
  on(KpisActions.kpisLoadedSuccess, (state, { kpis }): KpisState => ({
    ...state,
    definitions: kpis,
    status: LoadStatus.LOADED,
  })),
  on(KpisActions.kpisLoadedFailure, (state, { error }): KpisState => ({
    ...state,
    status: LoadStatus.ERROR,
    error,
  })),
  on(KpisActions.kpiToggled, (state, { kpiId }): KpisState => {
    if (state.selectedIds.includes(kpiId)) {
      return { ...state, selectedIds: state.selectedIds.filter((id) => id !== kpiId) };
    }

    return state.selectedIds.length < MAX_SELECTED_KPIS
      ? { ...state, selectedIds: [...state.selectedIds, kpiId] }
      : state;
  }),
  on(KpisActions.dashboardNameChanged, (state, { dashboardName }): KpisState => ({
    ...state,
    dashboardName,
  })),
);
