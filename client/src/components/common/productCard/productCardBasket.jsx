import React from 'react';
import PropTypes from 'prop-types';

import Button from '../button/button';
import SvgIcon from '../svgIcon/svgIcon';
import Title from '../title/title';

const ProductCardBasket = ({ itemCount, remove, minus, plus, ...foodItem }) => {
  return (
    <div className="relative border rounded-2xl border-slate-200 mb-5 last:mb-0 p-5">
      <div className="flex items-center border-b border-slate-200 pb-2 mb-5">
        <img
          className="shrink-0 mr-4"
          src={foodItem.imageUrl}
          alt={foodItem.name}
          width="70"
          height="70"
        />
        <div className="mr-4">
          <Title className="mb-2 text-[18px] font-medium leading-none text-black">
            {foodItem.name}
          </Title>
          <div className="text-[16px] text-slate-400 leading-none">
            {foodItem.category}
          </div>
        </div>
      </div>
      <button
        className="absolute -right-2 -top-2 bg-white flex items-center justify-center w-6 h-6 border border-slate-900 rounded-full text-black hover:text-red-600 hover:bg-slate-100 transition-colors"
        aria-label="Убрать товар"
        onClick={remove}
      >
        <SvgIcon name="close" size="12" className="" />
      </button>
      <div className="flex items-center justify-between">
        <div className="flex">
          <Button
            className={
              'bg-[#FF6838] p-1 text-white rounded-l-lg flex items-center justify-center ' +
              (itemCount <= 1 ? 'cursor-not-allowed' : '')
            }
            tag="btn"
            type="button"
            onClick={minus}
            disabled={itemCount <= 1 && true}
          >
            <SvgIcon name="minus" size="12" className="" />
          </Button>
          <div className="w-[50px] bg-[#FAEDED] shrink-0 font-medium text-black p-1 flex items-center justify-center">
            {itemCount}
          </div>
          <Button
            className="bg-[#FF6838] p-1 text-white rounded-r-lg flex items-center justify-center"
            tag="btn"
            type="button"
            onClick={plus}
          >
            <SvgIcon name="plus" size="12" className="" />
          </Button>
        </div>
        <div className="shrink-0 font-medium text-black">
          {foodItem.price * itemCount} руб.
        </div>
      </div>
    </div>
  );
};

ProductCardBasket.propTypes = {
  itemCount: PropTypes.number.isRequired,
  remove: PropTypes.func.isRequired,
  minus: PropTypes.func.isRequired,
  plus: PropTypes.func.isRequired,
  foodItem: PropTypes.object
};

export default ProductCardBasket;
