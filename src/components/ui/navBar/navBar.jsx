import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className=''>
      <ul className='flex'>
        <li className='mr-11'>
          <NavLink className='text-lg text-gray-800' activeClassName='text-[#FF6838]' exact to='/'>Главная</NavLink>
        </li>
        <li className='mr-11'>
          <NavLink className='text-lg text-gray-800' activeClassName='text-[#FF6838]' to='/catalog'>Блюда</NavLink>
        </li>
        <li className='mr-11 last:mr-0'>
          <NavLink className='text-lg text-gray-800' activeClassName='text-[#FF6838]' to='/contacts'>Контакты</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
