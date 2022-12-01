import { combineReducers, configureStore } from '@reduxjs/toolkit';

import categoriesReducer from './categories';
import foodsReducer from './foods';

const rootReducer = combineReducers({
  categories: categoriesReducer,
  foods: foodsReducer
});

export function createStore() {
  return configureStore({
    reducer: rootReducer
  });
}
