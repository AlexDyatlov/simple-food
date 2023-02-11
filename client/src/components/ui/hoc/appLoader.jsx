import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { loadCategoriesList } from '../../../store/categories';
import { loadFoodsList } from '../../../store/foods';
import { getIsLoggedIn, getIsLoadingStatus, loadCurrentUser } from '../../../store/user';

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());
  const isLoadingStatus = useSelector(getIsLoadingStatus());

  useEffect(() => {
    dispatch(loadCategoriesList());
    dispatch(loadFoodsList());

    if (isLoggedIn) {
      dispatch(loadCurrentUser());
    }
  }, [isLoggedIn]);

  if (isLoadingStatus) return 'Загрузка...';

  return children;
};

AppLoader.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default AppLoader;
