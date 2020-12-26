import React from 'react';
import { PropTypes } from 'prop-types';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import './MovieItem.scss';
import image from '../../images/def-img.jpg';

export default function MovieItem({ movie }) {
  const { poster_path, title, vote_average, overview, genres } = movie;
  const date = getMovieDate(movie);

  function getMovieDate(movie) {
    let data;
    if (movie.release_date) {
      data = movie.release_date.slice(0, 4);
    }

    if (movie.first_air_date) {
      data = movie.first_air_date.slice(0, 4);
    }

    return data;
  }

  return (
    <div className="movie-box">
      <div className="image-box">
        <img
          data-src={
            poster_path
              ? 'https://image.tmdb.org/t/p/w300' + poster_path
              : image
          }
          alt={title}
          className="lazyload box-image"
        />
      </div>

      <ul className="description">
        <li>
          <h2>
            {title} ({date})
          </h2>
        </li>
        <li>
          <p>IMDB rating : {vote_average}/10</p>
        </li>
        <li>
          <h3>Overview :</h3>
          <p className="overview">{overview}</p>
        </li>
        <li>
          <h3>Genres :</h3>
          <ul>
            {genres.map((genre, index) => (
              <li key={index}>{genre.name}</li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}

MovieItem.propTypes = {
  movie: PropTypes.shape({
    poster_path: PropTypes.string,
    title: PropTypes.string,
    vote_average: PropTypes.number,
    overview: PropTypes.string,
    genres: PropTypes.array,
  }),
};
