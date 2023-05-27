import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import { PrivateRoute } from '../private-route/private-route';
import { AddReview, Film, MainPage, MyList, NotFound, Player, SignIn } from '../../pages';
import ReviewType from '../../types/review-type';
import { Spinner } from '../spinner/spinner';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { filterFilmsByCurrentGenre } from '../../store/action';
import { useEffect } from 'react';
import browserHistory from '../../services/browesr-history';
import { HistoryRoute } from '../history-route/history-route';

type AppProps = {
  reviews: ReviewType[];
};

export const App = (props: AppProps): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(filterFilmsByCurrentGenre());
  }, [dispatch]);

  const isDataLoading = useAppSelector((state) => state.isDataLoading);

  if (isDataLoading) {
    return (<Spinner/>);
  } else {
    return (
      <HistoryRoute history={browserHistory}>
        <Routes>
          <Route path={AppRoute.AddReview} element={<AddReview />} />
          <Route path={AppRoute.Film} element={<Film reviews={props.reviews} />} />
          <Route path={AppRoute.MainPage} element={<MainPage />} />
          <Route path={AppRoute.MyList} element={
            <PrivateRoute>
              <MyList />
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.NotFound} element={<NotFound/>} />
          <Route path={AppRoute.Player} element={<Player />} />
          <Route path={AppRoute.SignIn} element={<SignIn/>} />
        </Routes>
      </HistoryRoute>
    );
  }
};
