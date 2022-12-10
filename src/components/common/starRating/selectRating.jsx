import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Star from './star';

const SelectRating = ({ name, onChange }) => {
  const [rating, setRating] = useState(null);
  const [hoverRating, setHoverRating] = useState(null);

  return (
    <div className="flex">
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <Star
            key={i}
            classFocus='peer'
            className='cursor-pointer transition-colors'
            name={name}
            value={ratingValue}
            rating={hoverRating || rating}
            onMouseEnter={() => setHoverRating(ratingValue)}
            onMouseLeave={() => setHoverRating(null)}
            onClick={() => setRating(ratingValue)}
            onChange={onChange}
          />
        );
      })}
    </div>
  );
};

SelectRating.propTypes = {
  name: PropTypes.string,
  onChange: PropTypes.func
};

export default SelectRating;
