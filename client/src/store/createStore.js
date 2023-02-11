import { combineReducers, configureStore } from '@reduxjs/toolkit';

import categoriesReducer from './categories';
import foodsReducer from './foods';
import userReducer from './users';

const rootReducer = combineReducers({
  categories: categoriesReducer,
  foods: foodsReducer,
  user: userReducer
});

export function createStore() {
  return configureStore({
    reducer: rootReducer
  });
}
