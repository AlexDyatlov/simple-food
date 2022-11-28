import React from 'react';
import { Link } from 'react-router-dom';

import NavBar from '../navBar/navBar';
import SvgIcon from '../../common/svgIcon/svgIcon';

import logo from '../../../assets/img/logo.svg';

const Header = () => {
  return (
    <div>
      <div className='max-w-[1170px] mx-auto px-4'>
        <div className='flex justify-between py-14'>
          <Link className='' to='/'>
            <img src={logo} alt='Логотип SimpleFood' />
          </Link>
          <div className="flex">
            <NavBar />
            <div className='flex ml-16'>
              <a className='inline-block mr-8' href='/'>
                <SvgIcon name='search' size='24' className='text-transparent' />
              </a>
              <a className='inline-block' href='/'>
                <SvgIcon name='cart' size='24' className='stroke-[#363853] text-transparent' />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
