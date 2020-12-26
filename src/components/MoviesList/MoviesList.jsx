import { PropTypes } from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import './MoviesList.scss';
import image from '../../images/def-img.jpg';

export default function MoviesList({ movies, url }) {
  const location = useLocation();

  return (
    <>
      <ul className="movies">
        {movies.map(movie => {
          let movieName = movie.title ? movie.title : movie.name;
          if (movieName.length > 60) {
            movieName = movieName.slice(0, 60) + '...';
          }
          const imageUrl = movie.poster_path
            ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path
            : image;

          return (
            <li key={movie.id} className="movie-item">
              <Link
                to={{
                  pathname: `${url}${movie.id}`,
                  state: {
                    from: location,
                  },
                }}
                className="movie-link"
              >
                <div className="img-box">
                  <img
                    data-src={imageUrl}
                    alt={movieName}
                    className="lazyload movie-image"
                  />
                </div>
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
