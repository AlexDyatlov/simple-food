import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../button/button';
import StaticRating from '../starRating/staticRating';
import SvgIcon from '../svgIcon/svgIcon';
import Title from '../title/title';
import AboutOrder from '../../ui/aboutOrder/aboutOrder';

import { addProduct, getCurrentFoodData, getUserData, minusProduct } from '../../../store/user';
import { deleteFood } from '../../../store/foods';

const ProductCardDetailed = ({ productId, isLoggedIn, toggleVisibleModal, ...food }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getUserData());
  const currentFoodBasket = useSelector(getCurrentFoodData({ currentUser, productId }));

  const handleAddedProductToCart = () => {
    const item = { _id: productId, price: food.price };

    dispatch(addProduct(item));
  };

  const onClickPlus = () => {
    dispatch(addProduct({ _id: productId, price: food.price }));
  };

  return (
    <div className="flex max-w-[1170px] mx-auto px-4 pb-[60px] mt-[60px]">
      <div className="h-[550px] w-[610px] flex items-center justify-center bg-white mr-[30px] border rounded-[5px] relative">
        <img src={food.imageUrl} width="400" height="400" alt={food.name} />
        {isLoggedIn ? (
          currentUser?.isAdmin ? (
            <div className="flex absolute right-5 top-5">
              <Button
                className="mr-2.5 flex items-center justify-center w-9 h-9 border border-gray-800 rounded text-gray-500 hover:text-black hover:border-text-black transition-colors"
                tag="btn"
                type="button"
                onClick={toggleVisibleModal}
              >
                <SvgIcon name="edit" size="20" className="" />
              </Button>
              <Button
                className="flex items-center justify-center w-9 h-9 border border-gray-800 rounded text-gray-500 hover:text-red-600 hover:border-red-600 transition-colors"
                tag="btn"
                type="button"
                onClick={() => dispatch(deleteFood(productId))}
              >
                <SvgIcon name="bin" size="20" className="" />
              </Button>
            </div>
          ) : (
            ''
          )
        ) : (
          ''
        )}
      </div>
      <div className="">
        <Title
          className="text-4xl font-medium text-[#363853] mb-[30px]"
          tag="h2"
        >
          {food.name}
        </Title>
        <div className="mb-[25px]">
          <StaticRating rating={food.rate} />
        </div>
        <div className="text-[25px] font-medium text-[#363853] mb-[20px]">
          {food.price} руб.
        </div>
        <div className="flex mb-[30px]">
          {currentFoodBasket && (
            <div className="flex mr-5">
              <Button
                className={
                  'bg-[#FF6838] p-3 text-white rounded-l-[3px] flex items-center justify-center ' +
                  (currentFoodBasket?.count <= 1 ? 'cursor-not-allowed' : '')
                }
                tag="btn"
                type="button"
                onClick={() => dispatch(minusProduct(productId))}
                disabled={currentFoodBasket?.count <= 1 && true}
              >
                <SvgIcon name="minus" size="20" className="" />
              </Button>
              <div className="min-w-[70px] bg-[#FAEDED] text-[#363853] text-[20px] px-[17px] py-2.5 flex items-center justify-center">
                {currentFoodBasket?.count}
              </div>
              <Button
                className="bg-[#FF6838] p-3 text-white rounded-r-[3px] flex items-center justify-center"
                tag="btn"
                type="button"
                onClick={onClickPlus}
              >
                <SvgIcon name="plus" size="20" className="" />
              </Button>
            </div>
          )}
          <Button
            className="bg-[#FF6838] py-3.5 px-9 font-medium text-white text-sm rounded-[3px] flex items-center"
            tag="btn"
            type="button"
            onClick={
              !isLoggedIn ? toggleVisibleModal : handleAddedProductToCart
            }
          >
            <SvgIcon
              name="cart"
              size="20"
              className="mr-4 stroke-[#fff] text-transparent"
            />
            Добавить в корзину
          </Button>
        </div>
        <Title className="text-2xl text-[#363853] pb-[15px] border-b border-[#E4E4E4] mb-[20px]">
          Доставка и оплата
        </Title>
        <AboutOrder />
      </div>
    </div>
  );
};

ProductCardDetailed.propTypes = {
  productId: PropTypes.string,
  isLoggedIn: PropTypes.bool,
  toggleVisibleModal: PropTypes.func.isRequired,
  food: PropTypes.object
};

export default ProductCardDetailed;
