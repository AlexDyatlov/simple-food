import React from 'react';

import SvgIcon from '../../common/svgIcon/svgIcon';

import logo from '../../../assets/img/logo.svg';

const Header = () => {
  return (
    <div>
      <div className='max-w-[1170px] mx-auto px-4'>
        <div className='flex justify-between py-14'>
          <a className='' href='/'>
            <img src={logo} alt='Логотип SimpleFood' />
          </a>
          <nav className='flex'>
            <ul className='flex mr-16'>
              <li className='mr-11'>
                <a className='text-lg text-gray-800 text-[#FF6838]' href='/'>
                  Главная
                </a>
              </li>
              <li className='mr-11'>
                <a className='text-lg text-gray-800' href='/'>
                  Блюда
                </a>
              </li>
              <li className='mr-11 last:mr-0'>
                <a className='text-lg text-gray-800' href='/'>
                  Контакты
                </a>
              </li>
            </ul>
            <div className=''>
              <a className='inline-block mr-8' href='/'>
                <SvgIcon name='search' size='24' className='text-transparent' />
              </a>
              <a className='inline-block' href='/'>
                <SvgIcon name='cart' size='24' className='text-transparent' />
              </a>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
