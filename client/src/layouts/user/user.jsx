import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getCurrentUserData, getDataStatus, loadUsersList } from '../../store/users';

import AdminPage from '../../components/page/adminPage';
import UserPage from '../../components/page/userPage';

const User = () => {
  const currentUser = useSelector(getCurrentUserData());
  const dataStatus = useSelector(getDataStatus());
  const dispatch = useDispatch();

  useEffect(() => {
    if (!dataStatus) dispatch(loadUsersList());
  }, []);

  if (!dataStatus) return 'Загрузка...';

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
