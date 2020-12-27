import React from 'react';
import { PropTypes } from 'prop-types';
import './Reviews.scss';
import Review from '../Review';

export default function Reviews({ reviews }) {
  return (
    <div className="reviews">
      {reviews.length > 1 ? (
        reviews.map(review => <Review review={review} key={review.id} />)
      ) : (
        <p className="no-info2">There are no reviews about this movie.</p>
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
