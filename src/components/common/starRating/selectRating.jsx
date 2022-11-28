import React, { useState } from 'react';

import Star from './star';

const SelectRating = () => {
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
            value={ratingValue}
            rating={hoverRating || rating}
            onMouseEnter={() => setHoverRating(ratingValue)}
            onMouseLeave={() => setHoverRating(null)}
            onClick={() => setRating(ratingValue)}
          />
        );
      })}
    </div>
  );
};

export default SelectRating;
