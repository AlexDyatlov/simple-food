import React from 'react';
import PropTypes from 'prop-types';

const CheckBoxField = ({ name, value, children, onChange, error }) => {
  const handleChange = () => {
    onChange({ name, value: !value });
  };

  CheckBoxField.defaultProps = {
    value: false
  };

  return (
    <>
      <div className="flex">
        <input
          className="w-6 h-6 border border-solid border-[#f60b0b] rounded-[3px] shrink-0 mr-2.5 cursor-pointer"
          type="checkbox"
          value=""
          id={name}
          onChange={handleChange}
          checked={value}
        />
        <label
          className="text-[#505050] text-[18px] leading-[23px] cursor-pointer"
          htmlFor={name}
        >
          {children}
        </label>
      </div>
      {error && <div className="mt-1 text-red-600">{error}</div>}
    </>
  );
};

CheckBoxField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  onChange: PropTypes.func,
  error: PropTypes.string
};

export default CheckBoxField;
