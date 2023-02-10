import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getCurrentUserData, getIsLoggedIn } from '../../../store/users';

import Modal from '../../common/modal/modal';
import Login from '../login/login';

const NavBar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const modalIsClose = isOpen !== false;
  const isLoggedIn = useSelector(getIsLoggedIn());
  const currentUser = useSelector(getCurrentUserData());

  const toggleVisibleModal = () => {
    setIsOpen(!isOpen);
  };

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
          {!isLoggedIn ? (
            <li className="mr-11 last:mr-0">
              <button
                className="text-sm py-[7px] px-4 rounded-md flex items-center text-white bg-[#FF6838]"
                onClick={toggleVisibleModal}
              >
                Войти
              </button>
            </li>
          ) : (
            currentUser && (
              <li className="mr-11 last:mr-0">
                <NavLink
                  className="text-lg text-[#31352B] underline"
                  activeClassName="text-[#FF6838]"
                  to={`/user/${currentUser._id}`}
                >
                  Профиль
                </NavLink>
              </li>
            )
          )}
        </ul>
      </nav>
      <Modal isOpen={modalIsClose} close={toggleVisibleModal}>
        {modalIsClose ? <Login /> : false}
      </Modal>
    </>
  );
};

export default NavBar;
