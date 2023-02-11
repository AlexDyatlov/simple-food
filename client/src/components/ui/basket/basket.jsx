import React from 'react';
import FocusLock from 'react-focus-lock';
import PropTypes from 'prop-types';
import { RemoveScroll } from 'react-remove-scroll';
import { useDispatch, useSelector } from 'react-redux';

import Title from '../../common/title/title';
import SvgIcon from '../../common/svgIcon/svgIcon';
import Button from '../../common/button/button';
import EmptyBasketUnauthorized from './emptyBasketUnauthorized';
import EmptyBasket from './emptyBasket';
import ProductCardBasket from '../../common/productCard/productCardBasket';

import {
  addProduct,
  clearBasketToUser,
  getUserData,
  getIsLoggedIn,
  minusProduct,
  removeProduct,
  sendBasketToUser
} from '../../../store/user';
import { getFoods } from '../../../store/foods';

const Basket = ({ opened, onClose }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getUserData());
  const food = useSelector(getFoods());
  const isLoggedIn = useSelector(getIsLoggedIn());

  const onClickRemove = (productId) => {
    dispatch(removeProduct(productId));
  };

  const onClickClear = (userId) => {
    dispatch(clearBasketToUser(userId));
  };

  const onClickPlus = (productId) => {
    dispatch(addProduct({ _id: productId }));
  };

  const onClickMinus = (productId) => {
    dispatch(minusProduct(productId));
  };

  const sendOrder = () => {
    dispatch(sendBasketToUser(currentUser));
    return alert('Заказ отправлен!');
  };

  return (
    <FocusLock returnFocus={true} disabled={!opened} preventScroll={true}>
      <RemoveScroll enabled={opened}>
        <div
          className={
            'fixed inset-0 bg-[#1a1b1e]/50 z-[100] invisible opacity-0 transition-[visibility,opacity] ' +
            (opened ? '!visible opacity-100' : '')
          }
        >
          <div
            className={
              'overflow-y-scroll absolute right-0 w-[420px] h-full bg-white p-[30px] shadow-[10px_4px_24px_#000000] translate-x-full transition-transform ' +
              (opened ? 'translate-x-0' : '')
            }
          >
            <div className="flex justify-between mb-[30px]">
              <Title className="text-4xl font-medium text-[#363853]">
                Корзина
              </Title>
              <button
                className="flex items-center justify-center w-10 h-10"
                onClick={onClose}
              >
                <SvgIcon name="close" size="24" className="text-black" />
              </button>
            </div>

            {isLoggedIn ? (
              currentUser ? (
                <div>
                  {food &&
                    food.map((foodItem) => {
                      return currentUser.basket.map((item) => {
                        return foodItem._id === item._id ? (
                          <ProductCardBasket
                            key={foodItem._id}
                            remove={() => onClickRemove(foodItem._id)}
                            minus={() => onClickMinus(foodItem._id)}
                            plus={() => onClickPlus(foodItem._id)}
                            itemCount={item.count}
                            {...foodItem}
                          />
                        ) : (
                          ''
                        );
                      });
                    })}

                  {currentUser.basket.length > 0 && (
                    <>
                      <p>Сумма заказа: {currentUser.totalPrice}</p>
                      <Button
                        className="w-full text-lg mt-[30px] py-3 px-8 rounded-2xl text-white bg-[#FF6838]"
                        tag="btn"
                        type="button"
                        onClick={sendOrder}
                      >
                        Оформить заказ
                      </Button>
                      <Button
                        className="w-full text-lg mt-[30px] py-3 px-8 rounded-2xl text-white bg-[#bfbbbb]"
                        tag="btn"
                        type="button"
                        onClick={() => onClickClear(currentUser._id)}
                      >
                        Очистить корзину
                      </Button>
                    </>
                  )}
                </div>
              ) : (
                ''
              )
            ) : (
              ''
            )}

            {!currentUser?.basket.length ? (
              !isLoggedIn ? (
                <EmptyBasketUnauthorized close={onClose} />
              ) : (
                <EmptyBasket close={onClose} />
              )
            ) : (
              ''
            )}
          </div>
        </div>
      </RemoveScroll>
    </FocusLock>
  );
};

Basket.propTypes = {
  onClose: PropTypes.func.isRequired,
  opened: PropTypes.bool.isRequired
};

export default Basket;
