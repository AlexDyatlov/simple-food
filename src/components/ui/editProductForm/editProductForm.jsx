import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Title from '../../common/title/title';
import TextField from '../../common/form/textField/textField';
import SelectField from '../../common/form/selectField/selectField';
import SelectRating from '../../common/starRating/selectRating';
import Button from '../../common/button/button';

import { validator } from '../../../utils/validateRules';

import { getFoodById } from '../../../store/foods';
import { getCategories, getCategoriesLoadingStatus } from '../../../store/categories';

const EditProductForm = ({ currentProductId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const currentProduct = useSelector(getFoodById(currentProductId));
  const categories = useSelector(getCategories());
  const categoriesLoading = useSelector(getCategoriesLoadingStatus());
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!categoriesLoading && currentProduct && !data) {
      setData({
        ...currentProduct
      });
    }
  }, [categoriesLoading, currentProduct, data]);

  useEffect(() => {
    if (data && isLoading) setIsLoading(false);
  }, [data]);

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const validatorConfig = {
    name: {
      isRequired: {
        message: 'Введите новое название'
      }
    },
    imageUrl: {
      isRequired: {
        message: 'Укажите ссылку на изображение'
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

  const isValid = Object.keys(errors).length === 0;

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    const sendObj = {
      ...data,
      price: Number(data.price),
      rate: Number(data.rate)
    };

    console.log(sendObj);
  };

  return (
    <>
      <Title className="text-2xl font-medium text-[#363853] mb-5" tag="h3">
        Изменить информацию о продукте
      </Title>
      {!isLoading ? (
        <form onSubmit={handlerSubmit}>
          <TextField
            label="Название"
            name="name"
            value={data.name}
            onChange={handleChange}
            error={errors.name}
          />
          <TextField
            label="Ссылка на изображение"
            name="imageUrl"
            value={data.imageUrl}
            onChange={handleChange}
            error={errors.imageUrl}
          />
          <TextField
            label="Цена"
            name="price"
            value={data.price}
            type="number"
            onChange={handleChange}
            error={errors.price}
          />
          <SelectField
            label="Категория"
            name="category"
            value={data.category}
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
            Обновить
          </Button>
        </form>
      ) : (
        'Загрузка...'
      )}
    </>
  );
};

export default EditProductForm;
