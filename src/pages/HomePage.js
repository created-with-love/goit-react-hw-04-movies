import { useState, useEffect, lazy, Suspense } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import * as MoviesAPI from '../services/movies-api';

import Preloader from '../components/Preloader';
import STATUS from '../services/Status';
import NotFound from '../components/NotFound';

const MoviesList = lazy(() =>
  import('../components/MoviesList' /* webpackChunkName: "movies-list"*/),
);

const PaginationList = lazy(
  () =>
    import('../components/PaginationList') /* webpackChunkName: "pagination"*/,
);

export default function HomePage() {
  const history = useHistory();
  const location = useLocation();
  const page = new URLSearchParams(location.search).get('page') ?? 1;
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [status, setStatus] = useState(STATUS.idle);

  useEffect(() => {
    try {
      MoviesAPI.fetchTrendingMoviesByPage(page).then(data => {
        setStatus(STATUS.pending);
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setStatus(STATUS.fulfilled);
      });
    } catch {
      setStatus(STATUS.rejected);
    }
  }, [page]);

  const handleChange = (event, value) => {
    const options = {
      top: 0,
      behavior: 'smooth',
    };

    // setPage(value);
    window.scrollTo(options);
    history.push({ ...location, search: `page=${value}` });
  };

  if (status === STATUS.pending) {
    return (
      <>
        <Preloader />
      </>
    );
  }

  if (status === STATUS.fulfilled) {
    return (
      <div>
        <Suspense fallback={<Preloader />}>
          <MoviesList movies={movies} url="" />

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

  if (status === STATUS.rejected) {
    return (
      <>
        <NotFound text={'Nothing was found, please try again'} />
      </>
    );
  }

  return <></>;
}
