import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Title from '../../common/title/title';
import TextField from '../../common/form/textField/textField';
import SelectField from '../../common/form/selectField/selectField';
import SelectRating from '../../common/starRating/selectRating';
import Button from '../../common/button/button';

import { validator } from '../../../utils/validateRules';

import {
  getCategories,
  getCategoriesLoadingStatus
} from '../../../store/categories';
import { createNewFood } from '../../../store/foods';

const AddProductForm = () => {
  const [data, setData] = useState({
    name: '',
    imageUrl: '',
    price: '',
    category: 'burger',
    rate: 1
  });
  const dispatch = useDispatch();
  const categories = useSelector(getCategories());
  const categoriesLoading = useSelector(getCategoriesLoadingStatus());
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const validatorConfig = {
    name: {
      isRequired: {
        message: 'Укажите название'
      },
      min: {
        message: 'Название должно состоять минимум из 3 символов',
        value: 3
      }
    },
    imageUrl: {
      isRequired: {
        message: 'Укажите ссылку на изображение'
      },
      isUrl: {
        message: 'Ссылка должна начинаться с https и соответствовать спецификации URL'
      }
    },
    price: {
      min: {
        message: 'Укажите цену',
        value: 1
      }
    }
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const clearForm = () => {
    setData({});
    setErrors({});
  };

  const isValid = Object.keys(errors).length === 0;

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    dispatch(
      createNewFood({
        ...data,
        price: Number(data.price),
        rate: Number(data.rate)
      })
    );

    clearForm();
  };

  if (categoriesLoading) return 'Загрузка...';

  return (
    <>
      <Title className="text-2xl font-medium text-[#363853] mb-5" tag="h3">
        Добавить новый продукт
      </Title>
      <form onSubmit={handlerSubmit}>
        <TextField
          label="Название"
          name="name"
          value={data.name || ''}
          onChange={handleChange}
          error={errors.name}
        />
        <TextField
          label="Ссылка на изображение"
          name="imageUrl"
          value={data.imageUrl || ''}
          onChange={handleChange}
          error={errors.imageUrl}
        />
        <TextField
          label="Цена"
          name="price"
          value={data.price || ''}
          type="number"
          onChange={handleChange}
          error={errors.price}
        />
        <SelectField
          label="Категория"
          name="category"
          value={data.category || ''}
          options={categories}
          onChange={handleChange}
          error={errors.category}
        />
        <div>
          <span className="block mb-3 text-[#505050] text-xl">Рейтинг</span>
          <SelectRating name="rate" onChange={handleChange} />
        </div>
        <Button
          className={
            'w-full text-lg mt-[30px] py-2 px-8 rounded-[5px] text-white bg-[#FF6838] ' +
            (!isValid ? 'bg-[#FF6838]/40 cursor-not-allowed' : '')
          }
          tag="btn"
          type="submit"
          disabled={!isValid}
        >
          Опубликовать
        </Button>
      </form>
    </>
  );
};

export default AddProductForm;
