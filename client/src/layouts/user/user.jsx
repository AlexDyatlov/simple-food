import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUserData, getDataStatus, loadCurrentUser } from '../../store/user';

import AdminPage from '../../components/page/adminPage';
import UserPage from '../../components/page/userPage';

const User = () => {
  const currentUser = useSelector(getUserData());
  const dataStatus = useSelector(getDataStatus());
  const dispatch = useDispatch();

  useEffect(() => {
    if (!dataStatus) dispatch(loadCurrentUser());
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
