import React from 'react';
import PropTypes from 'prop-types';

import SvgIcon from '../../common/svgIcon/svgIcon';
import Title from '../../common/title/title';
import Button from '../../common/button/button';

const EmptyBasketUnauthorized = ({ close }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-130px)] text-center">
      <SvgIcon name="empty-box" size="120" className="text-[#FF6838] mb-5" />
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
        onClick={close}
      >
        Вернуться назад
      </Button>
    </div>
  );
};

EmptyBasketUnauthorized.propTypes = {
  close: PropTypes.func.isRequired
};

export default EmptyBasketUnauthorized;
