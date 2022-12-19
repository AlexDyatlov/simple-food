import React from 'react';
import { NavLink } from 'react-router-dom';

const UserPage = ({ name, email, _id }) => {
  return (
    <div className="max-w-[1170px] mx-auto px-4">
      <div className="">Имя - {name}</div>
      <div className="">Почта - {email}</div>
      <div className="mb-5">id - {_id}</div>

      <NavLink className="text-lg text-[#31352B]" to="/logout">
        Выйти
      </NavLink>
    </div>
  );
};

export default UserPage;
