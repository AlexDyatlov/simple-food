import React from 'react';
import { NavLink } from 'react-router-dom';

import Modal from '../../common/modal/modal';
import Login from '../login/login';

const NavBar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const modalIsClose = isOpen !== false;

  return (
    <>
      <nav className=''>
        <ul className='flex'>
          <li className='mr-11'>
            <NavLink className='text-lg text-[#31352B]' activeClassName='text-[#FF6838]' exact to='/'>Главная</NavLink>
          </li>
          <li className='mr-11'>
            <NavLink className='text-lg text-[#31352B]' activeClassName='text-[#FF6838]' to='/catalog'>Блюда</NavLink>
          </li>
          <li className='mr-11'>
            <NavLink className='text-lg text-[#31352B]' activeClassName='text-[#FF6838]' to='/contacts'>Контакты</NavLink>
          </li>
          <li className='mr-11 last:mr-0'>
            <button className='text-lg text-[#31352B]' onClick={() => setIsOpen(true)}>
              Войти
            </button>
          </li>
        </ul>
      </nav>
      <Modal isOpen={modalIsClose} close={() => setIsOpen(false)}>
        {modalIsClose ? <Login /> : false}
      </Modal>
    </>
  );
};

export default NavBar;
