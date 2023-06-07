import { createAction, props } from '@ngrx/store';
import { User } from '@models/user.model';

// Action types
export const loadUser = createAction('[User] Load User');
export const loadUserSuccess = createAction('[User] Load User Success', props<{ currentUser: User }>());
export const loadUserFailure = createAction('[User] Load User Failure', props<{ error: any }>());

export const updateUser = createAction('[User] Update User', props<{ currentUser: User }>()); 
