import { useEffect, useState } from 'react';
import { Route, useParams, useRouteMatch, NavLink } from 'react-router-dom';

import Cast from './Cast';
import Reviews from './Reviews';
import * as MoviesAPI from '../services/movies-api';
import MovieItem from '../components/MovieItem';
import './styles/MovieDetailsPage.scss';

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

      <Route path={`${path}/cast`} exact>
        <Cast />
      </Route>

      <Route path={`${path}/reviews`} exact>
        <Reviews />
      </Route>
    </>
  );
}
