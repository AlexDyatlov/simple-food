import React from 'react';
import PropTypes from 'prop-types';

const getTagName = (tag) => {
  let value;

  switch (tag) {
  case 'btn':
    value = 'button';
    break;
  case 'link':
    value = 'a';
    break;
  default:
    value = 'div';
    break;
  };

  return value;
};

const resetInitialStyles = 'p-0 border border-transparent cursor-pointer transition-colors duration-300 ease-in-out';

const Button = ({ className, children, tag, onClick, ...rest }) => {
  const TagName = getTagName(tag);

  return (
    <TagName
      className={resetInitialStyles + ' ' + className}
      onClick={onClick}
      {...rest}
    >
      {children}
    </TagName>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  tag: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

export default Button;
