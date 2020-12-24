import React from 'react';
import { PropTypes } from 'prop-types';
import './Cast.scss';

export default function Cast({ cast }) {
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
                  className="cast-image"
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

Cast.propTypes = {
  cast: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      character: PropTypes.string,
      profile_path: PropTypes.string,
    }),
  ),
};
