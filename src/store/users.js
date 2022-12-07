import { createAction, createSlice } from '@reduxjs/toolkit';

import authService from '../services/authService';
import userService from '../services/userService';
import localStorageService from '../services/localStorageService';

import { generateAuthError } from '../utils/generateAuthError';
import history from '../utils/history';

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
    }
  }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
  usersRequested,
  usersReceived,
  usersRequestFailed,
  authRequestSuccess,
  authRequestFailed,
  userCreated
} = actions;

const authRequested = createAction('users/authRequested');
const userCreateRequested = createAction('users/userCreateRequested');
const createUserFailed = createAction('users/createUserFailed');

export const signIn =
  ({ payload, redirect }) =>
    async (dispatch) => {
      const { email, password } = payload;
      dispatch(authRequested());
      try {
        const data = await authService.login({ email, password });
        dispatch(authRequestSuccess({ userId: data.localId }));
        localStorageService.setTokens(data);
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

export const signUp =
  ({ email, password, ...rest }) =>
    async (dispatch) => {
      dispatch(authRequested());
      try {
        const data = await authService.register({ email, password });
        localStorageService.setTokens(data);
        dispatch(authRequestSuccess({ userId: data.localId }));
        dispatch(
          createUser({
            _id: data.localId,
            email,
            ...rest
          })
        );
      } catch (error) {
        dispatch(authRequestFailed(error.message));
      }
    };

function createUser(payload) {
  return async function (dispatch) {
    dispatch(userCreateRequested());
    try {
      const { content } = await userService.create(payload);
      dispatch(userCreated(content));
      history.push('/');
    } catch (error) {
      dispatch(createUserFailed(error.message));
    }
  };
}

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

export default usersReducer;
