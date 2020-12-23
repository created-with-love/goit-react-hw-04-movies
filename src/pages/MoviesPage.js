import { useState, useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import SearchForm from '../components/SearchForm';
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

export default function MoviesPage() {
  // const { url } = useRouteMatch();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const isFirstRender = useRef(true);
  const [totalPages, setTotalPages] = useState(0);
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();

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

  return (
    <div>
      <SearchForm onSubmit={handleFormSubmit} />
      <MoviesList movies={movies} url="movies/" />

      {movies.length > 1 && (
        <div className={classes.root}>
          <Pagination count={totalPages} page={page} onChange={handleChange} />
        </div>
      )}
    </div>
  );
}
