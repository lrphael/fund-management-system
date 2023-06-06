import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/data/models/user.model';
import * as UserActions from '../actions/user.actions';

export interface UserState {
  currentUser: User | null;
  loading: boolean;
  error: string | null;
}

export const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: null
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUser, (state) => ({ ...state, loading: true })),
  on(UserActions.loadUserSuccess, (state, { currentUser }) => ({
    ...state,
    currentUser,
    loading: false
  })),
  on(UserActions.loadUserFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);
