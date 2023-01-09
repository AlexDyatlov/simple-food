import React from 'react';
import FocusLock from 'react-focus-lock';
import { useSelector } from 'react-redux';

import Title from '../../common/title/title';
import SvgIcon from '../../common/svgIcon/svgIcon';
import Button from '../../common/button/button';

import { getIsLoggedIn } from '../../../store/users';

const Basket = ({ opened, onClose }) => {
  const isLoggedIn = useSelector(getIsLoggedIn());

  return (
    <FocusLock returnFocus={true} disabled={!opened}>
      <div
        className={
          'fixed inset-0 bg-[#1a1b1e]/50 z-[100] invisible opacity-0 transition-[visibility,opacity] ' +
          (opened ? '!visible opacity-100' : '')
        }
      >
        <div
          className={
            'absolute right-0 w-[420px] h-full bg-white p-[30px] shadow-[10px_4px_24px_#000000] translate-x-full transition-transform ' +
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

          {/* <div className="">
            <div className="flex items-center border rounded-2xl border-slate-200 mb-5 last:mb-0 p-5">
              <img
                className="shrink-0 mr-4"
                src={require('../../../assets/img/food/pizza-1.png')}
                alt="Маргарита"
                width="70"
                height="70"
              />
              <div className="mr-4">
                <Title className="mb-2 text-[18px] font-medium leading-none text-black">
                  Маргарита
                </Title>
                <div className="text-[16px] text-slate-400 leading-none">
                  Пицца
                </div>
              </div>
              <div className="shrink-0 ml-auto font-medium text-black">
                360 руб.
              </div>
            </div>
          </div> */}

          {!isLoggedIn ? (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-130px)] text-center">
              <Title className="text-2xl font-medium text-black mb-2">
                Войдите на сайт
              </Title>
              <p className="text-gray-500">
                Прежде чем оформить заказ, <br /> выполните вход на сайт
              </p>
              <Button
                className="text-lg mt-[30px] py-3 px-8 rounded-2xl text-white bg-[#FF6838]"
                tag="btn"
                type="button"
                onClick={onClose}
              >
                Вернуться назад
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-130px)] text-center">
              <SvgIcon
                name="empty-box"
                size="120"
                className="text-[#FF6838] mb-5"
              />
              <Title className="text-2xl font-medium text-black mb-2">
                Ваша корзина пуста
              </Title>
              <p className="text-gray-500">
                Необходимо добавить товары в корзину, прежде чем перейти к
                оформлению заказа
              </p>
              <Button
                className="text-lg mt-[30px] py-3 px-8 rounded-2xl text-white bg-[#FF6838]"
                tag="btn"
                type="button"
                onClick={onClose}
              >
                Вернуться назад
              </Button>
            </div>
          )}

        </div>
      </div>
    </FocusLock>
  );
};

export default Basket;
