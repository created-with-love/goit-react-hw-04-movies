import { lazy, Suspense } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import * as MoviesAPI from '../services/movies-api';

import Preloader from '../components/Preloader';
// import STATUS from '../services/Status';
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
  // const [movies, setMovies] = useState([]);
  // const [totalPages, setTotalPages] = useState(0);
  // const [status, setStatus] = useState(STATUS.idle);

  const { data, isLoading, isError, isFetching } = useQuery(
    ['movies', page],
    () => MoviesAPI.fetchTrendingMoviesByPage(page),
    { keepPreviousData: true },
  );

  // useEffect(() => {
  //   try {
  //     MoviesAPI.fetchTrendingMoviesByPage(page).then((data) => {
  //       setStatus(STATUS.pending);
  //       setMovies(data.results);
  //       setTotalPages(data.total_pages);
  //       setStatus(STATUS.fulfilled);
  //     });
  //   } catch {
  //     setStatus(STATUS.rejected);
  //   }
  // }, [page]);

  const handleChange = (event, value) => {
    const options = {
      top: 0,
      behavior: 'smooth',
    };

    // setPage(value);
    window.scrollTo(options);
    history.push({ ...location, search: `page=${value}` });
  };

  if (isLoading || isFetching) {
    return (
      <>
        <Preloader />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <NotFound text={'Nothing was found, please try again'} />
      </>
    );
  }

  return (
    <div>
      <Suspense fallback={<Preloader />}>
        <MoviesList movies={data.results} url="" />

        <PaginationList
          movies={data.results}
          totalPages={data.total_pages}
          page={Number(page)}
          handleChange={handleChange}
        />
      </Suspense>
    </div>
  );
}
