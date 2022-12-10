import React from 'react';
import PropTypes from 'prop-types';

const Star = ({
  name,
  classFocus,
  className,
  value,
  rating,
  onMouseEnter,
  onMouseLeave,
  onClick,
  onChange
}) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <label className="mr-1.5 last:mr-0">
      <input
        className={'sr-only ' + classFocus}
        type="radio"
        name={name}
        value={value}
        onClick={onClick}
        onChange={handleChange}
        tabIndex={classFocus ? 0 : -1}
      />
      <svg
        className={
          className +
          ' ' +
          'peer-focus-visible:shadow-[0_0_0_2px_#363853] peer-focus-visible:rounded-full' +
          ' ' +
          (value <= rating ? 'text-[#FFB800]' : 'text-[#C1C1C1]/30')
        }
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <g clipPath="url(#a)">
          <path
            fill="currentColor"
            d="M.023 6.164a.469.469 0 0 1 .378-.319l4.96-.72L7.58.63a.469.469 0 0 1 .84 0l2.219 4.495 4.96.72a.469.469 0 0 1 .26.8l-3.59 3.498.848 4.94a.469.469 0 0 1-.68.495L8 13.245l-4.436 2.333a.469.469 0 0 1-.68-.495l.847-4.94-3.59-3.498a.469.469 0 0 1-.118-.48Z"
          />
        </g>
        <defs>
          <clipPath id="a">
            <path fill="#fff" d="M16 0H0v16h16z" />
          </clipPath>
        </defs>
      </svg>
    </label>
  );
};

Star.propTypes = {
  name: PropTypes.string,
  classFocus: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.number.isRequired,
  rating: PropTypes.number,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onClick: PropTypes.func,
  onChange: PropTypes.func
};

export default Star;
