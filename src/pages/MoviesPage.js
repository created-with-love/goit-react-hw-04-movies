import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import SearchForm from '../components/SearchForm';
import * as MoviesAPI from '../services/movies-api';
import PaginationList from '../components/PaginationList';
import Preloader from '../components/Preloader';

const MoviesList = lazy(() =>
  import('../components/MoviesList' /* webpackChunkName: "movies-list"*/),
);

export default function MoviesPage() {
  // const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const searchURL = new URLSearchParams(location.search).get('query') ?? '';
  const currentPage = new URLSearchParams(location.search).get('page') ?? 1;

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(currentPage);
  const [query, setQuery] = useState('');
  const isFirstRender = useRef(true);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    MoviesAPI.fetchMoviesBySearch(page, query).then(data => {
      setMovies(data.results);
      setTotalPages(data.total_pages);
    });
  }, [page, query]);

  useEffect(() => {
    if (searchURL === '') {
      return;
    }

    setQuery(searchURL);
  }, [searchURL]);

  const setHistory = (query, value = 1) => {
    history.push({ ...location, search: `query=${query}&page=${value}` });
  };

  const handleChange = (event, value) => {
    setPage(value);
    setHistory(query, value);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleFormSubmit = input => {
    if (query === input) {
      return;
    }

    setQuery(input);
    setHistory(input);
  };

  return (
    <div>
      <SearchForm onSubmit={handleFormSubmit} />

      <Suspense fallback={<Preloader />}>
        <MoviesList movies={movies} url="movies/" />

        <PaginationList
          movies={movies}
          totalPages={totalPages}
          page={Number(page)}
          handleChange={handleChange}
        />
      </Suspense>
    </div>
  );
}
