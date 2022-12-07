import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminPage = () => {
  return (
    <div className="max-w-[1170px] mx-auto px-4">
      <h1>Страница - Админа</h1>

      <NavLink className="text-lg text-[#31352B]" to="logout">
        Выйти
      </NavLink>
    </div>
  );
};

export default AdminPage;
