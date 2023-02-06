import { createAction, createSlice } from '@reduxjs/toolkit';

import authService from '../services/authService';
import userService from '../services/userService';
import localStorageService from '../services/localStorageService';

import { generateAuthError } from '../utils/generateAuthError';
import history from '../utils/history';
import { calcTotalPrice } from '../utils/calcTotalPrice';

const initialState = localStorageService.getAccessToken()
  ? {
    entities: null,
    isLoading: true,
    error: null,
    auth: { userId: localStorageService.getUserId() },
    isLoggedIn: true,
    dataLoaded: false
  }
  : {
    entities: null,
    isLoading: false,
    error: null,
    auth: null,
    isLoggedIn: false,
    dataLoaded: false
  };

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceived: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    usersRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
      state.error = null;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userCreated: (state, action) => {
      if (!Array.isArray(state.entities)) {
        state.entities = [];
      }
      state.entities.push(action.payload);
    },
    userLoggedOut: (state) => {
      state.entities = null;
      state.isLoggedIn = false;
      state.auth = null;
      state.dataLoaded = false;
    },
    sendBasketSuccessed: (state, action) => {
      console.log('action', action);
    },
    addProduct: (state, action) => {
      const currentUser = state.entities.find((u) => u._id === state.auth.userId);
      const findItem = currentUser.basket.find((obj) => obj._id === action.payload._id);

      if (findItem) {
        findItem.count++;
      } else {
        currentUser.basket = [...currentUser.basket, { ...action.payload, count: 1 }];
      }

      currentUser.totalPrice = calcTotalPrice(currentUser.basket);
    },
    removeProduct: (state, action) => {
      const currentUser = state.entities.find((u) => u._id === state.auth.userId);
      currentUser.basket = currentUser.basket.filter((obj) => {
        return obj._id !== action.payload;
      });

      currentUser.totalPrice = calcTotalPrice(currentUser.basket);
    },
    minusProduct(state, action) {
      const currentUser = state.entities.find((u) => u._id === state.auth.userId);
      const findItem = currentUser.basket.find((obj) => obj._id === action.payload);

      if (findItem) findItem.count--;

      currentUser.totalPrice = calcTotalPrice(currentUser.basket);
    },
    clearBasket(state) {
      const currentUser = state.entities.find((u) => u._id === state.auth.userId);
      currentUser.basket = [];
      currentUser.totalPrice = 0;
    }
  }
});

const { reducer: usersReducer, actions } = usersSlice;
export const {
  usersRequested,
  usersReceived,
  usersRequestFailed,
  authRequestSuccess,
  authRequestFailed,
  userLoggedOut,
  addProduct,
  removeProduct,
  minusProduct,
  sendBasketSuccessed,
  clearBasket
} = actions;

const authRequested = createAction('users/authRequested');
const sendBasketRequested = createAction('basket/sendBasketRequested');
const sendBasketFailed = createAction('basket/sendBasketFailed');
const basketClearRequested = createAction('foods/basketClearRequested');
const basketClearFailed = createAction('foods/basketClearFailed');

export const signIn =
  ({ payload, redirect }) =>
    async (dispatch) => {
      const { email, password } = payload;
      dispatch(authRequested());
      try {
        const data = await authService.login({ email, password });
        localStorageService.setTokens(data);
        dispatch(authRequestSuccess({ userId: data.userId }));
        history.push(redirect);
      } catch (error) {
        const { code, message } = error.response.data.error;
        if (code === 400) {
          const errorMessage = generateAuthError(message);
          dispatch(authRequestFailed(errorMessage));
        } else {
          dispatch(authRequestFailed(error.message));
        }
      }
    };

export const signUp = (payload) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await authService.register(payload);
    localStorageService.setTokens(data);
    dispatch(authRequestSuccess({ userId: data.userId }));
    history.push('/');
  } catch (error) {
    dispatch(authRequestFailed(error.message));
  }
};

export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData();
  dispatch(userLoggedOut());
  history.push('/');
};

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested());
  try {
    const { content } = await userService.get();
    dispatch(usersReceived(content));
  } catch (error) {
    dispatch(usersRequestFailed(error.message));
  }
};

export const getUsersList = () => (state) => state.users.entities;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getAuthErrors = () => (state) => state.users.error;
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getCurrentUserData = () => (state) => {
  return state.users.entities
    ? state.users.entities.find((u) => u._id === state.users.auth.userId)
    : null;
};
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getCurrentFoodData = (payload) => (state) => {
  const { currentUser, productId } = payload;
  return currentUser?.basket
    ? currentUser.basket.find((f) => f._id === productId)
    : null;
};

export const createBasketFood = (payload) => (dispatch) => {
  dispatch(addProduct(payload));
};

export const sendBasketToUser = (payload) => async (dispatch) => {
  dispatch(sendBasketRequested());
  try {
    const { content } = await userService.createBasket(payload);
    dispatch(sendBasketSuccessed(content));
  } catch (error) {
    dispatch(sendBasketFailed(error.message));
  }
};

export const clearBasketToUser = (userId) => async (dispatch) => {
  dispatch(basketClearRequested());
  try {
    const { content } = await userService.removeBasket(userId);
    if (!content) {
      dispatch(clearBasket(userId));
    }
    dispatch(clearBasket(content));
  } catch (error) {
    dispatch(basketClearFailed(error.message));
  }
};

export default usersReducer;
