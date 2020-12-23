import { useState, useEffect, useRef } from 'react';
import { Link, useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import SearchForm from '../components/SearchForm';
import * as MoviesAPI from '../services/movies-api';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles(theme => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function MoviesPage() {
  const { url } = useRouteMatch();
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const isFirstRender = useRef(true);
  const [totalPages, setTotalPages] = useState(0);
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();

  const searchURL = new URLSearchParams(location.search).get('query') ?? '';

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
    console.log(searchURL);
  }, [searchURL]);

  const handleChange = (event, value) => {
    setPage(value);
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
        <div className={classes.root}>
          <Pagination count={totalPages} page={page} onChange={handleChange} />
        </div>
      )}
    </div>
  );
}
