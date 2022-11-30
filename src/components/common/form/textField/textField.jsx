import React, { useState } from 'react';
import PropTypes from 'prop-types';

import SvgIcon from '../../svgIcon/svgIcon';

const TextField = ({
  name,
  label,
  placeholder,
  value,
  type,
  onChange,
  error
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="mb-3 last:mb-0">
      <label className="block mb-3 text-[#505050] text-xl" htmlFor={name}>
        {label}
      </label>
      <div className="flex flex-wrap items-stretch w-full">
        <input
          id={name}
          type={showPassword ? 'text' : type}
          name={name}
          className={
            'flex-auto w-px min-w-0  py-4 px-[18px] border border-[#C2C2C2] focus:outline-none focus-visible:shadow-[0_0_0_2px_#FF6838] rounded-[5px] focus-visible:border-transparent placeholder:text-[#C1C1C1] placeholder:text-[16px] text-leading-5 ' +
            (error ? 'shadow-[0_0_0_2px_#f10c0c]' : '')
          }
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          autoComplete="on"
        />
        {type === 'password' && (
          <button
            className="w-10 flex justify-center items-center"
            type="button"
            onClick={toggleShowPassword}
          >
            <SvgIcon
              name={'eye-' + (showPassword ? 'hide' : 'show')}
              size="24"
              className="stroke-[#363853] text-transparent"
            />
          </button>
        )}
        {error && <div className="w-full mt-1 text-red-600">{error}</div>}
      </div>
    </div>
  );
};

TextField.defaultProps = {
  type: 'text'
};

TextField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
};

export default TextField;
