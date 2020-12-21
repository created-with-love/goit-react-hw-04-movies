import { useEffect, useState } from 'react';
import { Route, useParams, useRouteMatch } from 'react-router-dom';
import Cast from './Cast';
import Reviews from './Reviews';
import * as MoviesAPI from '../services/movies-api';

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

  console.log(movie);

  return (
    <>
      {movie && (
        <div className="movie-box">
          <img
            src={'https://image.tmdb.org/t/p/w300' + movie.poster_path}
            alt={movie.title}
          />
          <ul>
            <li>
              <h2>{movie.title}</h2>
            </li>
            <li>
              <p>IMDB rating: {movie.vote_average}</p>
            </li>
            <li>
              <h3>Overview</h3>
              <p>{movie.overview}</p>
            </li>
            <li>
              <h3>Genres</h3>
              <ul>
                {movie.genres.map((genre, index) => (
                  <li key={index}>{genre.name}</li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      )}

      <Route path={`${path}/${movieId}/cast`} exact>
        <Cast />
      </Route>

      <Route path={`${path}/${movieId}/reviews`} exact>
        <Reviews />
      </Route>
    </>
  );
}
