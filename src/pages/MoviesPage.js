import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import SearchForm from '../components/SearchForm';
import * as MoviesAPI from '../services/movies-api';
import PaginationList from '../components/PaginationList';
import Spinner from '../components/Spinner/Spinner';

const MoviesList = lazy(() =>
  import('../components/MoviesList' /* webpackChunkName: "movies-list"*/),
);

export default function MoviesPage() {
  // const { url } = useRouteMatch();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const isFirstRender = useRef(true);
  const [totalPages, setTotalPages] = useState(0);
  const history = useHistory();
  const location = useLocation();

  const searchURL = new URLSearchParams(location.search).get('query') ?? '';
  console.log(movies);
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

  const handleChange = (event, value) => {
    setPage(value);
    location.state = { page: value };
  };

  const handleFormSubmit = input => {
    if (query === input) {
      return;
    }

    setQuery(input);

    history.push({ ...location, search: `query=${input}` });
  };

  //     history.push({ ...location, search: `query=${input}?page=${page}` });

  return (
    <div>
      <SearchForm onSubmit={handleFormSubmit} />

      <Suspense fallback={<Spinner />}>
        <MoviesList movies={movies} url="movies/" />

        <PaginationList
          movies={movies}
          totalPages={totalPages}
          page={page}
          handleChange={handleChange}
        />
      </Suspense>
    </div>
  );
}
