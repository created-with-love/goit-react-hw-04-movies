import React from 'react';
import { PropTypes } from 'prop-types';
import './Reviews.scss';

export default function Reviews({ reviews }) {
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

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      author: PropTypes.string,
      content: PropTypes.string,
    }),
  ),
};
