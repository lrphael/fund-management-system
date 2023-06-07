import { createReducer, on } from '@ngrx/store';
import { User } from '@models/user.model';
import * as UserActions from '../actions/user.actions';

export interface UserState {
  currentUser: User | null;
  loading: boolean;
  error: any;
}

const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: null
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUser, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UserActions.loadUserSuccess, (state, { currentUser }) => ({
    ...state,
    currentUser,
    loading: false,
    error: null
  })),
  on(UserActions.loadUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(UserActions.updateUser, (state, { currentUser }) => ({
    ...state,
    currentUser
  }))
);
