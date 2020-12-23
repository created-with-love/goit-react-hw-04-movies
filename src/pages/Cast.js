import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as MoviesAPI from '../services/movies-api';
import './styles/Cast.scss';

export default function Cast() {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    MoviesAPI.fetchMovieCredits(movieId).then(data => {
      const filtredData = data.cast.filter(actor => actor.popularity > 4);
      setCast(filtredData);
    });
    return () => {
      setCast([]);
    };
  }, [movieId]);

  return (
    <>
      {cast.length > 1 ? (
        <div className="cast">
          {cast.map(actor => (
            <div key={actor.id} className="actor">
              <div className="image-container">
                <img
                  src={'https://image.tmdb.org/t/p/w300' + actor.profile_path}
                  alt={actor.name}
                />
              </div>
              <p>{actor.name}</p>
              <span>Character: {actor.character}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-info">There are no info about cast</p>
      )}
    </>
  );
}
