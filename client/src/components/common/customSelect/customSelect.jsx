import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

import SvgIcon from '../svgIcon/svgIcon';

const CustomSelect = ({
  className,
  defaultLabel,
  selectedSort,
  options,
  onSort
}) => {
  const [visibleSelect, setVisibleSelect] = useState(false);
  const sortRef = useRef();
  const activeLabel = options.find(obj => obj.value === selectedSort.value).label;
  const activeNum = options.find(num => num === selectedSort);

  const toggleVisibleSelect = () => {
    setVisibleSelect(!visibleSelect);
  };

  const handleOutsideClick = e => {
    const path = e.path || (e.composedPath && e.composedPath());
    if (!path.includes(sortRef.current)) {
      setVisibleSelect(false);
    }
  };

  const handleSort = (item) => {
    if (selectedSort.value === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === 'asc' ? 'desc' : 'asc'
      });
    } else {
      onSort({
        value: item,
        order: 'asc'
      });
    }
  };

  const handlePageSize = (item) => {
    onSort(item);
  };

  useEffect(() => {
    document.body.addEventListener('click', handleOutsideClick);
    return () => setVisibleSelect(false);
  }, []);

  return (
    <div className={className + ' ' + 'relative text-[#31352B] text-sm'} ref={sortRef}>
      <button
        onClick={toggleVisibleSelect}
        className='w-full text-left hover:text-[#FF6838] transition-colors p-[15px] border border-[#C2C2C2] rounded-[3px] bg-white hover:border-[#FF6838] focus-visible:border-[#FF6838] focus:outline-none'
        type='button'
      >
        {defaultLabel} {activeLabel} {activeNum}
        <SvgIcon name='arrow-down' size='15' className={'absolute right-[15px] top-[19px] text-current pointer-events-none transition-transform' +
          (visibleSelect ? ' rotate-180' : '')
        } />
      </button>
      {
        visibleSelect &&
        <ul className='absolute left-0 right-0 top-[55px] bg-white border border-[#C2C2C2] rounded-[3px] p-[15px]'>
          {
            options.map((option, index) => {
              if (typeof option === 'number') {
                return (
                  <li key={`${option}_${index}`}>
                    <button
                      className='py-2 w-full text-left hover:text-[#FF6838] transition-colors'
                      onClick={() => handlePageSize(option)}
                      type='button'
                    >
                      По {option}
                    </button>
                  </li>
                );
              }

              return (
                <li key={`${option.value}_${index}`}>
                  <button
                    className='py-2 w-full text-left hover:text-[#FF6838] transition-colors'
                    onClick={
                      option.value
                        ? () => handleSort(option.value)
                        : undefined
                    }
                    type='button'
                  >
                    По {option.label}
                  </button>
                </li>
              );
            })
          }
        </ul>
      }
    </div>
  );
};

CustomSelect.propTypes = {
  className: PropTypes.string,
  defaultLabel: PropTypes.string,
  selectedSort: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.object.isRequired]),
  options: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired
};

export default CustomSelect;
