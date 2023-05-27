import {Link, Navigate, useParams} from 'react-router-dom';
import { ReviewForm, Logo, SignIn, SignOut } from '../../components';
import {AppRoute, AuthStatus} from '../../const';
import { useAppSelector } from '../../hooks';


const AddReview = (): JSX.Element => {
  const id = Number(useParams().id);
  const films = useAppSelector((state) => state.films);
  const film = films.find((f) => f.id === id);
  const authStatus = useAppSelector((state) => state.authStatus);

  if (!film) {
    return <Navigate to={AppRoute.NotFound} />;
  } else {
    return (
      <section style={{'background': `${film.backgroundColor}`}} className="film-card film-card--full">
        <div className="film-card__header">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt={film.name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <Logo />

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link to={`/films/${film.id}`} className="breadcrumbs__link">{film.name}</Link>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>

            {authStatus === AuthStatus.Auth ? <SignOut /> : <SignIn/>}
          </header>

          <div className="film-card__poster film-card__poster--small">
            <img src={film.posterImage} alt={film.name} width="218" height="327" />
          </div>
        </div>
        <ReviewForm />
      </section>
    );
  }
};

export default AddReview;
