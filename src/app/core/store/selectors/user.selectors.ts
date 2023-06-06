import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { UserState } from '../reducers/user.reducer';

const selectUserState = createFeatureSelector<UserState>('user');

export const getCurrentUser = createSelector(
  selectUserState,
  (state) => state.currentUser
);

export const isLoading = createSelector(
  selectUserState,
  (state) => state.loading
);
