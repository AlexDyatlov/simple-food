import { createAction, createSlice } from '@reduxjs/toolkit';

import authService from '../services/authService';
import userService from '../services/userService';
import localStorageService from '../services/localStorageService';

import { generateAuthError } from '../utils/generateAuthError';
import history from '../utils/history';
import { calcTotalPrice } from '../utils/calcTotalPrice';

const initialState = localStorageService.getAccessToken()
  ? {
    data: null,
    isLoading: true,
    error: null,
    auth: { userId: localStorageService.getUserId() },
    isLoggedIn: true,
    dataLoaded: false
  }
  : {
    data: null,
    isLoading: false,
    error: null,
    auth: null,
    isLoggedIn: false,
    dataLoaded: false
  };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userRequested: (state) => {
      state.isLoading = true;
    },
    userReceived: (state, action) => {
      state.data = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    userRequestFailed: (state, action) => {
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
      if (!Array.isArray(state.data)) {
        state.data = [];
      }
      state.data.push(action.payload);
    },
    userLoggedOut: (state) => {
      state.data = null;
      state.isLoggedIn = false;
      state.auth = null;
      state.dataLoaded = false;
    },
    addProduct: (state, action) => {
      const findItem = state.data.basket.find((obj) => obj._id === action.payload._id);

      if (findItem) {
        findItem.count++;
      } else {
        state.data.basket = [...state.data.basket, { ...action.payload, count: 1 }];
      }

      state.data.totalPrice = calcTotalPrice(state.data.basket);
    },
    removeProduct: (state, action) => {
      state.data.basket = state.data.basket.filter((obj) => {
        return obj._id !== action.payload;
      });

      state.data.totalPrice = calcTotalPrice(state.data.basket);
    },
    minusProduct(state, action) {
      const findItem = state.data.basket.find((obj) => obj._id === action.payload);

      if (findItem) findItem.count--;

      state.data.totalPrice = calcTotalPrice(state.data.basket);
    },
    clearBasket(state) {
      state.data.basket = [];
      state.data.totalPrice = 0;
    }
  }
});

const { reducer: userReducer, actions } = userSlice;
export const {
  userRequested,
  userReceived,
  userRequestFailed,
  authRequestSuccess,
  authRequestFailed,
  userLoggedOut,
  addProduct,
  removeProduct,
  minusProduct,
  clearBasket
} = actions;

const authRequested = createAction('user/authRequested');
const sendBasketRequested = createAction('basket/sendBasketRequested');
const sendBasketSuccess = createAction('basket/sendBasketSuccess');
const sendBasketFailed = createAction('basket/sendBasketFailed');
const basketClearRequested = createAction('basket/basketClearRequested');
const basketClearFailed = createAction('basket/basketClearFailed');

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

export const loadCurrentUser = () => async (dispatch) => {
  dispatch(userRequested());
  try {
    const { content } = await userService.getCurrentUser();
    dispatch(userReceived(content));
  } catch (error) {
    dispatch(userRequestFailed(error.message));
  }
};

export const getUserData = () => (state) => state.user.data;
export const getIsLoadingStatus = () => (state) => state.user.isLoading;
export const getAuthErrors = () => (state) => state.user.error;
export const getIsLoggedIn = () => (state) => state.user.isLoggedIn;
export const getDataStatus = () => (state) => state.user.dataLoaded;
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
    dispatch(sendBasketSuccess(content));
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

export default userReducer;
