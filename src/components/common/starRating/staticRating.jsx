import React from 'react';
import PropTypes from 'prop-types';

import Star from './star';

const StaticRating = ({ rating }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return <Star className='cursor-default' key={i} value={ratingValue} rating={rating} />;
      })}
    </div>
  );
};

StaticRating.propTypes = {
  rating: PropTypes.number.isRequired
};

export default StaticRating;
