import { createReducer } from '@reduxjs/toolkit';
import { changeGenre, fillFilms, filterFilmsByCurrentGenre, setDataLoading, setAuthStatus, setError, setUser } from './action';
import { ALL_GENRE, DEFAULT_GENRE, AuthStatus } from '../const';
import FilmType from '../types/film-type';
import UserType from '../types/user-type';

const initState: {
  films: FilmType[];
  filteredFilms: FilmType[];
  currentGenre: string;
  isDataLoading: boolean;
  authStatus: AuthStatus;
  user?: UserType;
  error: string | null;

} = {
  films: [],
  filteredFilms: [],
  currentGenre: DEFAULT_GENRE,
  isDataLoading: false,
  authStatus: AuthStatus.Unknown,
  user: undefined,
  error: null,
};

const reducer = createReducer(initState, ((builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.currentGenre = action.payload.newGenre;
    })
    .addCase(fillFilms, ((state, action) => {
      state.films = action.payload;
    }))
    .addCase(filterFilmsByCurrentGenre, (state) => {
      state.filteredFilms = state.currentGenre === ALL_GENRE ? state.films :
        state.films.filter((film) => film.genre === state.currentGenre);
    })
    .addCase(setDataLoading, ((state, action) => {
      state.isDataLoading = action.payload;
    }))
    .addCase(setAuthStatus, ((state, action) => {
      state.authStatus = action.payload;
    }))
    .addCase(setUser, ((state, action) => {
      state.user = action.payload;
    }))
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
}));

export default reducer;
