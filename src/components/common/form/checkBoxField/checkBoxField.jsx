import React from 'react';
import PropTypes from 'prop-types';

const CheckBoxField = ({ name, value, children }) => {
  return (
    <div className="flex">
      <input className="w-6 h-6 border border-solid border-[#f60b0b] rounded-[3px] shrink-0 mr-2.5 cursor-pointer" type="checkbox" value="" id={name} checked={value} />
      <label
        className="text-[#505050] text-[18px] leading-[23px] cursor-pointer"
        htmlFor={name}
      >
        {children}
      </label>
    </div>
  );
};

CheckBoxField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.bool,
  children: PropTypes.string
};

export default CheckBoxField;
