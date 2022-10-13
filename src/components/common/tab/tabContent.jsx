import React from 'react';
import PropTypes from 'prop-types';

const TabContent = ({ id, activeTab, children }) => {
  return (
    activeTab === id
      ? <div>
        {children}
      </div>
      : null
  );
};

TabContent.propTypes = {
  id: PropTypes.string.isRequired,
  activeTab: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default TabContent;
