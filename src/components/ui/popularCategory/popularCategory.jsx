import React from 'react';
import PropTypes from 'prop-types';

import Title from '../../common/title/title';
import Button from '../../common/button/button';
import SvgIcon from '../../common/svgIcon/svgIcon';

const PopularCategory = ({ items, onItemSelect, selectedItem }) => {
  return (
    <>
      <Title className='text-4xl font-medium text-[#363853] text-center mb-14' tag='h2'>Популярные категории</Title>
      <ul className='flex mb-11 overflow-x-auto snap-x'>
        {
          items.map((item, index) => (
            <li className='mr-5 last:mr-0 snap-start snap-always shrink-0' key={index}>
              <Button
                className={
                  'text-xl text-[#363853] py-3 px-8 bg-white rounded-[5px] !border-[#ECECEC] flex items-center hover:bg-[#FF6838] hover:text-white' +
                  (selectedItem === item ? ' bg-[#FF6838] text-[#ffffff]' : '')
                }
                tag='btn'
                type='button'
                onClick={() => onItemSelect(item)}
              >
                <SvgIcon name={item.value} size='44' className='mr-2.5' />
                {item.name}
              </Button>
            </li>
          ))
        }
      </ul>
    </>
  );
};

PopularCategory.propTypes = {
  items: PropTypes.array.isRequired,
  onItemSelect: PropTypes.func,
  selectedItem: PropTypes.object
};

export default PopularCategory;
