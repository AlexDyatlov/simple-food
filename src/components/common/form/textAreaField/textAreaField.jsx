import React from 'react';
import PropTypes from 'prop-types';

const TextAreaField = ({ label, name, value, placeholder }) => {
  return (
    <div>
      <label className="block mb-3 text-[#505050] text-xl" htmlFor={name}>
        {label}
      </label>
      <textarea
        className="w-full min-h-[165px] py-4 px-[18px] border border-[#C2C2C2] focus:outline-none focus-visible:shadow-[0_0_0_2px_#FF6838] rounded-[5px] focus-visible:border-transparent placeholder:text-[#C1C1C1] placeholder:text-[16px] text-leading-5 resize-y"
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};

TextAreaField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string
};

export default TextAreaField;
