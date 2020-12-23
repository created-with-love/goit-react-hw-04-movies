import { useEffect, useState, lazy, Suspense } from 'react';
import { Route, useParams, useRouteMatch, NavLink } from 'react-router-dom';

import * as MoviesAPI from '../services/movies-api';
import MovieItem from '../components/MovieItem';
import Spinner from '../components/Spinner/Spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './styles/MovieDetailsPage.scss';

const Cast = lazy(() => import('./Cast' /* webpackChunkName: "cast-subview"*/));
const Reviews = lazy(() =>
  import('./Reviews' /* webpackChunkName: "reviews-subview"*/),
);

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();

  useEffect(() => {
    MoviesAPI.fetchMovieDetais(movieId).then(setMovie);

    return () => {
      setMovie(null);
    };
  }, [movieId]);

  function goBack() {
    window.history.back();
  }

  return (
    <>
      {movie && (
        <>
          <button type="button" onClick={goBack}>
            Back
          </button>

          <MovieItem movie={movie} />
        </>
      )}

      <NavLink
        to={`${url}/cast`}
        className="movie-link"
        activeClassName="active-link"
      >
        Cast
      </NavLink>
      <NavLink
        to={`${url}/reviews`}
        className="movie-link"
        activeClassName="active-link"
      >
        Reviews
      </NavLink>

      <Suspense fallback={<Spinner />}>
        <Route path={`${path}/cast`} exact>
          <Cast />
        </Route>
      </Suspense>

      <Suspense fallback={<Spinner />}>
        <Route path={`${path}/reviews`} exact>
          <Reviews />
        </Route>
      </Suspense>
    </>
  );
}
