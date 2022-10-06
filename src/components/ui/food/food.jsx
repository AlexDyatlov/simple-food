import React from 'react';
import PropTypes from 'prop-types';

import ProductCard from '../../common/productCard/productCard';

const Food = ({ className, items }) => {
  return (
    <ul className={className}>
      {
        items.map(item => (
          <li className='' key={item.id}>
            <ProductCard img={item.imageUrl} name={item.name} price={item.price} productId={item.id} />
          </li>
        ))
      }
    </ul>
  );
};

Food.propTypes = {
  className: PropTypes.string,
  items: PropTypes.array.isRequired
};

export default Food;
