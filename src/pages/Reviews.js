import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as MoviesAPI from '../services/movies-api';
import './styles/Reviews.scss';

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    MoviesAPI.fetchMovieReviews(movieId).then(data => setReviews(data.results));
    return () => {
      setReviews([]);
    };
  }, [movieId]);

  return (
    <div className="reviews">
      {reviews.length > 1 ? (
        reviews.map(review => (
          <div key={review.id}>
            <h3>Author: {review.author}</h3>
            <p>{review.content}</p>
          </div>
        ))
      ) : (
        <p>There are no reviews about this movie.</p>
      )}
    </div>
  );
}
