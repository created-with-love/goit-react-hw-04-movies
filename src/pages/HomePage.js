import { useState, useEffect, useRef } from 'react';
import * as MoviesAPI from '../services/movies-api';
import PaginationList from '../components/PaginationList';
import MoviesList from '../components/MoviesList';
import Preloader from '../components/Preloader';
import Status from '../services/Status';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [status, setStatus] = useState(Status.idle);
  const isFirstRender = useRef(true);

  useEffect(() => {
    MoviesAPI.fetchTrendingMovies().then(data => {
      setMovies(data.results);
      setTotalPages(data.total_pages);
    });
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    MoviesAPI.fetchTrendingMoviesByPage(page).then(data => {
      setMovies(data.results);
      setTotalPages(data.total_pages);
    });
  }, [page]);

  const handleChange = (event, value) => {
    const options = {
      top: 0,
      behavior: 'smooth',
    };

    setPage(value);
    window.scrollTo(options);
  };

  return (
    <div>
      <MoviesList movies={movies} url="" />

      <PaginationList
        movies={movies}
        totalPages={totalPages}
        page={page}
        handleChange={handleChange}
      />
    </div>
  );
}
