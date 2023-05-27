import {createAction, createAsyncThunk} from '@reduxjs/toolkit';
import FilmType from '../types/film-type';
import {AxiosInstance} from 'axios';
import { AppDispatch, StateType } from '../types/state-type';
import { ApiRoute, AppRoute, AuthStatus, TIMEOUT_SHOW_ERROR } from '../const';
import { removeToken, setToken } from '../services/token';
import UserType from '../types/user-type';
import AuthData from '../types/auth-data-type';

export const changeGenre = createAction<{newGenre: string}>('changeGenre');
export const filterFilmsByCurrentGenre = createAction('getfilteredFilms');
export const fillFilms = createAction<FilmType[]>('fillFilms');
export const setDataLoading = createAction<boolean>('setDataLoading');
export const setAuthStatus = createAction<AuthStatus>('setAuthStatus');
export const setUser = createAction<UserType | undefined>('setUser');
export const redirectToRoute = createAction<AppRoute | string>('redirectToRoute');
export const setError = createAction<string | null>('setError');

export const loadFilm = createAsyncThunk<void, undefined, {
    dispatch: AppDispatch;
    state: StateType;
    extra: AxiosInstance;
}>(
  'loadFilm',
  async(_arg, {dispatch, extra: api}) => {
    dispatch(setDataLoading(true));
    const {data} = await api.get<FilmType[]>(ApiRoute.Films);
    dispatch(fillFilms(data));
    dispatch(setDataLoading(false));
  }
);

export const checkAuthStatus = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: StateType;
  extra: AxiosInstance;
}>(
  'checkAuthStatus',
  async(_arg, {dispatch, extra: api}) => {
    try {
      await api.get(ApiRoute.LogIn);
      dispatch(setAuthStatus(AuthStatus.Auth));
    } catch {
      dispatch(setAuthStatus(AuthStatus.NoAuth));
    }
  }
);

export const login = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: StateType;
  extra: AxiosInstance;
}>(
  'login',
  async (authData, {dispatch, extra: api}) => {
    const {data} = await api.post<UserType>(ApiRoute.LogIn, authData);
    setToken(data.token);
    dispatch(setAuthStatus(AuthStatus.Auth));
    dispatch(setUser(data));
    dispatch(redirectToRoute(AppRoute.MainPage));
  }
);

export const logout = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: StateType;
  extra: AxiosInstance;
}>(
  'logout',
  async(_arg, {dispatch, extra: api}) => {
    await api.delete(ApiRoute.LogOut);
    removeToken();
    dispatch(setAuthStatus(AuthStatus.NoAuth));
    dispatch(setUser(undefined));
  }
);

export const clearError = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: StateType;
  extra: AxiosInstance;
}>(
  'clearError',
  (_arg, {dispatch}) => {
    setTimeout(() => {
      dispatch(setError(null));
    }, TIMEOUT_SHOW_ERROR);
  });
