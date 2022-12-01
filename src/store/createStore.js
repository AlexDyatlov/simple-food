import { combineReducers, configureStore } from '@reduxjs/toolkit';

import categoriesReducer from './categories';
import foodsReducer from './foods';
import usersReducer from './users';

const rootReducer = combineReducers({
  categories: categoriesReducer,
  foods: foodsReducer,
  users: usersReducer
});

export function createStore() {
  return configureStore({
    reducer: rootReducer
  });
}
