import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserActions from './user.actions';
import { AuthService } from '../../authentic/service/auth.service';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.login),
      mergeMap(action =>
        this.authService.login(action.email, action.password).pipe(
          map(response => {
            const user = response ? { id: 1,
              name: 'Default User', nome: 'Default Nome',
              email: 'default@example.com'

            } : null; // Replace with actual User mapping logic
            if (!user) {
              throw new Error('Invalid login response');
            }
            return UserActions.loginSuccess({ user });
          }),
          catchError(error => of(UserActions.loginFailure({ error })))
        )
      )
    )
  );

  // register$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(UserActions.register),
  //     mergeMap(action =>
  //       this.authService.register(action.email).pipe(
  //         map(user => UserActions.registerSuccess({ user })),
  //         catchError(error => of(UserActions.registerFailure({ error })))
  //       )
  //     )
  //   )
  // );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
