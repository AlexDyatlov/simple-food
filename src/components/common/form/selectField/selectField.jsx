import React from 'react';
import PropTypes from 'prop-types';

import SvgIcon from '../../svgIcon/svgIcon';

const SelectField = ({ name, label, value, onChange, options, error }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <div className="mb-3 last:mb-0 relative">
      <label className="block mb-3 text-[#505050] text-xl" htmlFor={name}>
        {label}
      </label>
      <select
        className={
          'flex-auto w-full py-4 px-[18px] border border-[#C2C2C2] focus:outline-none focus-visible:shadow-[0_0_0_2px_#FF6838] rounded-[5px] focus-visible:border-transparent placeholder:text-[#C1C1C1] placeholder:text-[16px] text-leading-5 appearance-none ' +
          (error ? 'shadow-[0_0_0_2px_#f10c0c]' : '')
        }
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
      >
        {options.length > 0 &&
          options.map((option) => (
            <option value={option.value} key={option._id}>
              {option.name}
            </option>
          ))}
      </select>
      <SvgIcon
        name="arrow-down"
        size="15"
        className="absolute right-6 top-[61px] text-current pointer-events-none"
      />
      {error && <div className="w-full mt-1 text-red-600">{error}</div>}
    </div>
  );
};

SelectField.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChange: PropTypes.func,
  error: PropTypes.string
};

export default SelectField;
