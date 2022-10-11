import React from 'react';
import PropTypes from 'prop-types';

import SvgIcon from '../svgIcon/svgIcon';

import { usePagination, DOTS } from '../../../utils/usePagination';

const Pagination = ({ totalCount, pageSize, currentPage, siblingCount = 1, onPageChange }) => {
  const paginationRange = usePagination({ totalCount, pageSize, currentPage, siblingCount });

  if (currentPage === 0 || paginationRange.length < 2) return null;

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div className='flex'>
      <button
        className={
          'mr-1.5 bg-[#FAEDED] flex justify-center items-center w-11 h-11 rounded-[3px] text-[#363853] text-[18px] leading-none transition-colors hover:bg-[#FF6838] hover:text-white' +
          (currentPage === 1 ? ' pointer-events-none text-[#C2C2C2]' : '')
        }
        type='button'
        onClick={onPrevious}
        tabIndex='-1'
      >
        <SvgIcon name='arrow-left' size='15' className='' />
      </button>
      <ul className='flex'>
        {
          paginationRange.map((page, index) => {
            if (page === DOTS) {
              return <li key={`${page}_${index}`} className='mr-1.5 bg-[#FAEDED] flex justify-center items-center w-11 h-11 rounded-[3px] text-[#363853] text-[18px] leading-none'>&#8230;</li>;
            }

            return (
              <li
                className={
                  'mr-1.5 flex justify-center items-center w-11 h-11 border border-transparent rounded-[3px] transition-colors text-[18px] leading-none' +
                  (currentPage === page ? ' border-[#363853] hover:border-transparent active:border-transparent' : '')}
                key={'page_' + page}
              >
                <button
                  className='transition bg-[#FAEDED] hover:bg-[#FF6838] hover:text-white text-[#363853] w-full h-full rounded-[3px] focus:outline-none focus-visible:shadow-[0_0_0_2px_#FF6838] active:shadow-[inset_0_-1px_4px_2px_rgba(0,0,0,0.15)] active:bg-[#FAEDED] active:text-[#363853]'
                  type='button'
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </button>
              </li>
            );
          })
        }
      </ul>
      <button
        className={
          'bg-[#FAEDED] flex justify-center items-center w-11 h-11 rounded-[3px] text-[#363853] text-[18px] leading-none transition-colors hover:bg-[#FF6838] hover:text-white' +
          (currentPage === lastPage ? ' pointer-events-none text-[#C2C2C2]' : '')
        }
        type='button'
        onClick={onNext}
        tabIndex='-1'
      >
        <SvgIcon name='arrow-right' size='15' className='' />
      </button>
    </div>
  );
};

Pagination.propTypes = {
  totalCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
