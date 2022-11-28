import React from 'react';

import Title from '../../common/title/title';
import ReviewsList from '../../common/reviews/reviewsList';
import AddReviewForm from '../../common/reviews/addReviewForm';

const Reviews = () => {
  return (
    <>
      <Title className="text-2xl font-medium text-[#363853] mb-[30px]" tag="h3">
        Мнения наших клиентов
      </Title>
      <div className="mb-[60px]">
        <ReviewsList />
        <AddReviewForm />
      </div>
    </>
  );
};

export default Reviews;
