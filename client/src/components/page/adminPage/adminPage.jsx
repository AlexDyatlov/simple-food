import React from 'react';
import { NavLink } from 'react-router-dom';

import AddProductForm from '../../ui/addProductForm/addProductForm';

const AdminPage = () => {
  return (
    <div className="max-w-[1170px] mx-auto px-4">
      <h1>Страница - Админа</h1>
      <NavLink className="text-lg text-[#31352B]" to="/logout">
        Выйти
      </NavLink>
      <div className="mt-10 max-w-sm">
        <AddProductForm />
      </div>
    </div>
  );
};

export default AdminPage;
