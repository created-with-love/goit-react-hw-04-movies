import { useState, useEffect, useRef } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import * as MoviesAPI from '../services/movies-api';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import MoviesList from '../components/MoviesList';
import './styles/Pagination.scss';

const useStyles = makeStyles(theme => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function HomePage() {
  const { url } = useRouteMatch();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const isFirstRender = useRef(true);
  // const totalPages = useRef(0);
  const classes = useStyles();

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
    setPage(value);
  };

  return (
    <div>
      <MoviesList movies={movies} url="" />

      <div className={classes.root}>
        <Pagination count={totalPages} page={page} onChange={handleChange} />
      </div>
    </div>
  );
}
