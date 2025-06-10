import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from './user.reducer';

export const selectUserState = createFeatureSelector<State>('user');

export const selectCurrentUser = createSelector(
  selectUserState,
  state => state.user
);
export const selectAuthLoading = createSelector(
  selectUserState,
  state => state.loading
);
export const selectAuthError = createSelector(
  selectUserState,
  state => state.error
);
