import { useState, useEffect, useRef } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import SearchForm from '../components/SearchForm';
import * as MoviesAPI from '../services/movies-api';

export default function MoviesPage() {
  const { url } = useRouteMatch();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const isFirstRender = useRef(true);
  let totalPages = useRef(0);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    MoviesAPI.fetchMoviesBySearch(page, query).then(data => {
      setMovies(data.results);
      totalPages.current = data.total_pages;
    });
  }, [page, query]);

  const handelBtnClick = e => {
    if (e.currentTarget.name === 'prev' && page > 1) {
      setPage(state => state - 1);
    }

    if (e.currentTarget.name === 'next' && page !== totalPages) {
      setPage(state => state + 1);
    }
  };

  const handleFormSubmit = input => {
    if (query === input) {
      return;
    }

    setQuery(input);
  };

  return (
    <div>
      <SearchForm onSubmit={handleFormSubmit} />
      <ul>
        {movies.map(movie => {
          const movieName = movie.title ? movie.title : movie.name;
          return (
            <li key={movie.id}>
              <Link to={`movies/${movie.id}`}>{movieName}</Link>
            </li>
          );
        })}
      </ul>
      {movies.length > 1 && (
        <>
          <button type="button" name="prev" onClick={handelBtnClick}>
            Previos
          </button>
          <button type="button" name="next" onClick={handelBtnClick}>
            Next
          </button>
        </>
      )}
    </div>
  );
}
