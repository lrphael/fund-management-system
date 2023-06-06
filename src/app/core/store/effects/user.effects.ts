import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { User } from 'src/app/data/models/user.model';

import * as UserActions from '../actions/user.actions';
import { UserService } from 'src/app/data/services/user.service';

@Injectable()
export class UserEffects {

  loadUser$: Observable<any> = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUser.type),
      mergeMap(() =>
        this.userService.getUser().pipe(
          map((currentUser: User) => UserActions.loadUserSuccess({ currentUser })),
          catchError((error) => of(UserActions.loadUserFailure({ error })))
        )
      )
    )
  );

  logLoadUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUserSuccess),
      map((action) => {
        console.log('loadUserSuccess action:', action);
      })
    ),
    { dispatch: false } // Indica que não é necessário despachar uma nova ação após o efeito
  );


  constructor(private actions$: Actions, private userService: UserService) { }
}
