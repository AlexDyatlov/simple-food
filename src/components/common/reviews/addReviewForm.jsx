import React from 'react';

import Title from '../title/title';
import CheckBoxField from '../form/checkBoxField/checkBoxField';
import TextAreaField from '../form/textAreaField/textAreaField';
import TextField from '../form/textField/textField';
import Button from '../button/button';
import SelectRating from '../starRating/selectRating';

const AddReviewForm = () => {
  return (
    <>
      <Title className="text-2xl font-medium text-[#363853] mb-[30px]" tag="h3">
        Оставить отзыв
      </Title>
      <form>
        <div className="flex items-center mb-5 text-[#505050] text-xl">
          Ваша оценка * <div className='ml-[15px]'><SelectRating /></div>
        </div>
        <div className="flex justify-between mb-[30px]">
          <div className="max-w-[400px] w-full mr-[30px]">
            <TextAreaField
              name="review"
              label="Ваш отзыв *"
              placeholder="Введите текст отзыва"
            />
          </div>
          <div className="w-full">
            <TextField
              name="review-name"
              label="Имя"
              placeholder="Введите ваше имя"
            />
            <TextField
              name="review-email"
              label="Email *"
              placeholder="youremail@mail.com"
            />
          </div>
        </div>
        <CheckBoxField name="save">
          Сохранить моё имя, email и адрес сайта в этом браузере для последующих
          моих комментариев.
        </CheckBoxField>
        <Button
          className="text-lg mt-[30px] py-2 px-8 rounded-[5px] flex items-center text-white bg-[#FF6838]"
          tag="btn"
          type="button"
        >
          Оставить отзыв
        </Button>
      </form>
    </>
  );
};

export default AddReviewForm;
