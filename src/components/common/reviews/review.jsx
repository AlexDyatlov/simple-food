import React from 'react';

import StaticRating from '../starRating/staticRating';

const Review = () => {
  return (
    <div className="text-[#505050] mb-6 last:mb-0 pb-5 last:pb-0 border-b border-[#E4E4E4] last:border-none">
      <div className="mb-5 flex justify-between">
        <div className="flex">
          <img
            className="mr-6 rounded-full bg-[#e7e7e7] shrink-0"
            src={`https://avatars.dicebear.com/api/avataaars/${(
              Math.random() + 1
            )
              .toString(36)
              .substring(7)}.svg`}
            alt="Avatar"
            width="70"
            height="70"
          />
          <div>
            <h4 className="mb-2.5 text-[20px] font-medium">Андрей</h4>
            <div className="text-[18px] tracking-[0.03em]">10.06.2021</div>
          </div>
        </div>
        <StaticRating rating={4} />
      </div>
      <p className="text-xl">
        Доставили быстро. Товар свежий и очень вкусный, буду пробовать еще!))
      </p>
    </div>
  );
};

export default Review;
