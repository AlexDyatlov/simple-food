import React from 'react';

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

const resetInitialStyles = 'p-0 border border-transparent text-center cursor-pointer transition-colors duration-300 ease-in-out';

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

export default Button;
