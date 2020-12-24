import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import './MoviesList.scss';
import image from '../../def-img.jpg';

export default function MoviesList({ movies, url }) {
  return (
    <>
      <ul className="movies">
        {movies.map(movie => {
          const movieName = movie.title ? movie.title : movie.name;
          const imageUrl = movie.poster_path
            ? 'https://image.tmdb.org/t/p/w300' + movie.poster_path
            : image;

          return (
            <li key={movie.id} className="movie-item">
              <Link to={`${url}${movie.id}`} className="movie-link">
                <img data-src={imageUrl} alt={movieName} className="lazyload" />
                <p className="movie-name">{movieName}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

MoviesList.propTypes = {
  url: PropTypes.string,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      name: PropTypes.string,
      poster_path: PropTypes.string,
    }),
  ),
};
