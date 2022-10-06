import React from 'react';

import SvgIcon from '../svgIcon/svgIcon';

const Pagination = () => {
  return (
    <div className="flex">
      <button className='mr-1.5 bg-[#FAEDED] flex justify-center items-center w-11 h-11 rounded-[3px] text-[#363853] text-[18px] leading-none' type='button'>
        <SvgIcon name='arrow-left' size='15' className='' />
      </button>
      <ul className='flex'>
        <li className='mr-1.5 bg-[#FAEDED] flex justify-center items-center w-11 h-11 rounded-[3px] text-[#363853] text-[18px] leading-none'>
          <button className='w-full h-full' type='button'>1</button>
        </li>
        <li className='mr-1.5 bg-[#FAEDED] flex justify-center items-center w-11 h-11 rounded-[3px] text-[#363853] text-[18px] leading-none'>
          <button className='w-full h-full' type='button'>2</button>
        </li>
      </ul>
      <button className='bg-[#FAEDED] flex justify-center items-center w-11 h-11 rounded-[3px] text-[#363853] text-[18px] leading-none' type='button'>
        <SvgIcon name='arrow-right' size='15' className='' />
      </button>
    </div>
  );
};

export default Pagination;
