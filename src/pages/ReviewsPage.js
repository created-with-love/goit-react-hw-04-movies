import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as MoviesAPI from '../services/movies-api';
import Reviews from '../components/Reviews';

export default function ReviewsPage() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    MoviesAPI.fetchMovieReviews(movieId).then(data => setReviews(data.results));
    return () => {
      setReviews([]);
    };
  }, [movieId]);

  return <Reviews reviews={reviews} />;
}
