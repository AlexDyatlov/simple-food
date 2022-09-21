import React from 'react';

import Button from '../button/button';

const ProductCard = ({ img, name, price }) => {
  return (
    <div className="py-5 px-4 h-full bg-white border text-center rounded-[5px] border-[#ECECEC] flex flex-col items-center">
      <img className="mb-2.5" src={require(`../../../assets/img/burgers/${img}.png`)} width="140" height="140" alt="text" />
      <div className="text-[15px] mb-2.5">
        {name}
      </div>
      <div className="text-[15px] font-medium mb-2.5 mt-auto">
        {price} руб.
      </div>
      <Button className='text-sm py-[7px] px-4 rounded-md flex items-center text-white bg-[#FF6838]' tag='btn' type='button'>
        В корзину
      </Button>
    </div>
  );
};

export default ProductCard;
