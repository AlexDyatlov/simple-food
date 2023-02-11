import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import NavBar from '../navBar/navBar';
import SvgIcon from '../../common/svgIcon/svgIcon';
import Basket from '../basket/basket';

import logo from '../../../assets/img/logo.svg';

import { getUserData } from '../../../store/users';

const Header = () => {
  const [cartOpened, setCartOpened] = useState(false);
  const currentUser = useSelector(getUserData());
  const totalCount = currentUser?.basket.reduce((sum, item) => sum + item.count, 0);

  return (
    <>
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
              <button className='flex relative' type='button' onClick={() => setCartOpened(true)}>
                <SvgIcon name='cart' size='24' className='stroke-[#363853] text-transparent' />
                {totalCount > 0 && (
                  <span className="absolute top-0 left-[18px] flex items-center justify-center w-3.5 h-3.5 bg-[#FF6838] rounded-full text-[10px] text-white">
                    {totalCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Basket
        opened={cartOpened}
        onClose={() => setCartOpened(false)}
      />
    </>
  );
};

export default Header;
