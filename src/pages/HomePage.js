import { useState, useEffect, useRef } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import * as MoviesAPI from '../services/movies-api';

export default function HomePage() {
  const { url } = useRouteMatch();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const isFirstRender = useRef(true);
  let totalPages = useRef(0);

  useEffect(() => {
    MoviesAPI.fetchTrendingMovies().then(data => {
      setMovies(data.results);
      totalPages.current = data.total_pages;
    });
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    MoviesAPI.fetchTrendingMoviesByPage(page).then(data =>
      setMovies(data.results),
    );
  }, [page]);

  const handelBtnClick = e => {
    if (e.currentTarget.name === 'prev' && page > 1) {
      setPage(state => state - 1);
    }

    if (e.currentTarget.name === 'next' && page !== totalPages) {
      setPage(state => state + 1);
    }
  };

  console.log(movies);
  return (
    <div>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
      <button type="button" name="prev" onClick={handelBtnClick}>
        Previos
      </button>
      <button type="button" name="next" onClick={handelBtnClick}>
        Next
      </button>
    </div>
  );
}
