import { Link } from 'react-router-dom';
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
              <Link to={`${url}${movie.id}`}>
                <img src={imageUrl} alt={movieName} />
                {movieName}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
