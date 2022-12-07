import React from 'react';
import { useSelector } from 'react-redux';

import { getCurrentUserData } from '../../store/users';

import AdminPage from '../../components/page/adminPage';
import UserPage from '../../components/page/userPage';

const User = () => {
  const currentUser = useSelector(getCurrentUserData());

  if (!currentUser) return 'Загрузка...';

  return (
    <>
      {currentUser.isAdmin
        ? <AdminPage />
        : <UserPage {...currentUser} />
      }
    </>
  );
};

export default User;
