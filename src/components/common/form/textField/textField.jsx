import React from 'react';
import PropTypes from 'prop-types';

const TextField = ({ className, name, label, placeholder, value }) => {
  return (
    <div className={className}>
      <label className="block mb-3 text-[#505050] text-xl" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        className="w-full py-4 px-[18px] border border-[#C2C2C2] focus:outline-none focus-visible:shadow-[0_0_0_2px_#FF6838] rounded-[5px] focus-visible:border-transparent placeholder:text-[#C1C1C1] placeholder:text-[16px] text-leading-5"
        placeholder={placeholder}
        value={value}
        type="text"
      />
    </div>
  );
};

TextField.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string
};

export default TextField;
