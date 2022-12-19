import React from 'react';
import PropTypes from 'prop-types';

import Title from '../title/title';
import Button from '../button/button';

const SideBar = ({ title, items, onItemSelect, selectedItem }) => {
  return (
    <div className="bg-white w-full border border-[#ECECEC] rounded-[5px]">
      <Title className='text-2xl text-[#363853] mb-6 tracking-[.003em] p-[15px] border-b border-b-[#ECECEC]' tag='h3'>{title}</Title>
      <ul className='p-[15px] pt-0 grid gap-3'>
        {
          items.map(item => (
            <li key={item._id}>
              <Button
                className={
                  'text-[#31352B] hover:text-[#FF6838] transition-colors' +
                  (selectedItem === item ? ' text-[#FF6838]' : '')
                }
                tag='btn'
                onClick={() => onItemSelect(item)}
              >
                {item.name}
              </Button>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

SideBar.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  onItemSelect: PropTypes.func,
  selectedItem: PropTypes.object
};

export default SideBar;
