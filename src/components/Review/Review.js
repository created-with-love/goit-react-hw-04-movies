import { useState } from 'react';
import './Review.scss';

export default function Review({ review }) {
  const [showMore, setShowMore] = useState(true);

  const getContent = cont => {
    return cont.length > 600 ? cont.slice(0, 600) + '...' : cont;
  };

  const toggleShowMore = () => {
    setShowMore(state => !state);
  };

  return (
    <div key={review.id}>
      <h3 className="author">Author: {review.author}</h3>
      <p className={`content content-${review.id}`}>
        {showMore ? getContent(review.content) : review.content}
        {review.content.length > 600 && (
          <span
            className="show-more"
            data-id={review.id}
            onClick={toggleShowMore}
          >
            {' '}
            {showMore ? 'show more' : 'show less'}
          </span>
        )}
      </p>
    </div>
  );
}
