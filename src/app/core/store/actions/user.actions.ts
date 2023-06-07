import { createAction, props } from '@ngrx/store';
import { User } from '@models/user.model';

// Ação para carregar o usuário
export const loadUser = createAction('[User] Load User');

// Ação para carregar o usuário com sucesso
export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ currentUser: User }>()
);

// Ação para carregar o usuário com erro
export const loadUserFailure = createAction(
  '[User] Load User Failure',
  props<{ error: string }>()
);
