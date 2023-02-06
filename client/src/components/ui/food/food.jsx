import React from 'react';
import PropTypes from 'prop-types';

import ProductCard from '../../common/productCard/productCard';

const Food = ({ className, items, onLoginBasket }) => {
  return (
    <ul className={className}>
      {
        items.map(item => (
          <li key={item._id}>
            <ProductCard img={item.imageUrl} name={item.name} category={item.category} price={item.price} productId={item._id} onLoginBasket={onLoginBasket} />
          </li>
        ))
      }
    </ul>
  );
};

Food.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array.isRequired,
  onLoginBasket: PropTypes.func.isRequired
};

export default Food;
