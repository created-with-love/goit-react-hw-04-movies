import { PropTypes } from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import './MoviesList.scss';
import image from '../../def-img.jpg';

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
            ? 'https://image.tmdb.org/t/p/w300' + movie.poster_path
            : image;

          return (
            <li key={movie.id} className="movie-item">
              <div className="img-box">
                <Link
                  to={{
                    pathname: `${url}${movie.id}`,
                    state: {
                      from: location,
                    },
                  }}
                  className="movie-link"
                >
                  <img
                    data-src={imageUrl}
                    alt={movieName}
                    className="lazyload movie-image"
                  />

                  <p className="movie-name">{movieName}</p>
                </Link>
              </div>
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
