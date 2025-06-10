import { createReducer, on } from '@ngrx/store';
import { User } from '../../models/user.model';
import * as UserActions from './user.actions';


export interface State {
  user: User | null;
  error: string | null;
  loading: boolean;
}

export const initialState: State = {
  user: null,
  error: null,
  loading: false
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.login, UserActions.register, state => ({ ...state, loading: true, error: null })),
  on(UserActions.loginSuccess, UserActions.registerSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false
  })),
  on(UserActions.loginFailure, UserActions.registerFailure, (state, { error }) => ({
    ...state,
    error: error.message || 'Erro',
    loading: false
  }))
);
