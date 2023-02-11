import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../button/button';

import { createBasketFood, getIsLoggedIn } from '../../../store/user';

const ProductCard = ({ img, name, price, productId, onLoginBasket }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());

  const handleAddedProductToCart = () => {
    const item = {
      _id: productId,
      price
    };

    dispatch(createBasketFood(item));
  };

  return (
    <div className='py-5 px-4 h-full bg-white border text-center rounded-[5px] border-[#ECECEC] flex flex-col items-center'>
      <img className='mb-2.5 h-[140px] object-contain' src={img} width='140' height='140' alt={name} />
      <Link className='text-[15px] mb-2.5 underline' to={`catalog/${productId}`}>
        {name}
      </Link>
      <div className='text-[15px] font-medium mb-2.5 mt-auto'>
        {price} руб.
      </div>
      <Button className='text-sm py-[7px] px-4 rounded-md flex items-center text-white bg-[#FF6838]'
        tag='btn'
        type='button'
        onClick={!isLoggedIn ? onLoginBasket : handleAddedProductToCart}
      >
        В корзину
      </Button>
    </div>
  );
};

ProductCard.propTypes = {
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  productId: PropTypes.string.isRequired,
  onLoginBasket: PropTypes.func.isRequired
};

export default ProductCard;
