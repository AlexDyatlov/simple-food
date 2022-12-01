import { combineReducers, configureStore } from '@reduxjs/toolkit';

import categoriesReducer from './categories';

const rootReducer = combineReducers({
  categories: categoriesReducer
});

export function createStore() {
  return configureStore({
    reducer: rootReducer
  });
}
