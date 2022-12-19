import React from 'react';
import PropTypes from 'prop-types';

import Button from '../button/button';

const TabItem = ({ id, title, activeTab, setActiveTab }) => {
  const handleClick = () => {
    setActiveTab(id);
  };

  return (
    <Button
      className={'text-2xl hover:text-[#FF6838] focus:outline-none focus-visible:shadow-[0_0_0_2px_#FF6838] transition focus-visible:drop-shadow-none hover:drop-shadow-none rounded-md' + (activeTab === id ? ' drop-shadow-[2px_2px_5px_rgba(54,56,83,0.5)]' : '')}
      tag='btn'
      type='button'
      onClick={handleClick}
    >
      {title}
    </Button>
  );
};

TabItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired
};

export default TabItem;
