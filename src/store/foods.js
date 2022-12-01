import { createSlice } from '@reduxjs/toolkit';

import foodService from '../services/foodService';

import isOutdated from '../utils/isOutdated';

const foodsSlice = createSlice({
  name: 'foods',
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null
  },
  reducers: {
    foodsRequested: (state) => {
      state.isLoading = true;
    },
    foodsReceived: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    foodsRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    }
  }
});

const { reducer: foodsReducer, actions } = foodsSlice;
const { foodsRequested, foodsReceived, foodsRequestFailed } = actions;

export const loadFoodsList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().foods;

  if (isOutdated(lastFetch)) {
    dispatch(foodsRequested());
    try {
      const { content } = await foodService.get();
      dispatch(foodsReceived(content));
    } catch (error) {
      dispatch(foodsRequestFailed(error.message));
    }
  }
};

export const getFoods = () => (state) => state.foods.entities;
export const getFoodsLoadingStatus = () => (state) => state.foods.isLoading;
export const getFoodById = (productId) => (state) => {
  if (state.foods.entities) {
    return state.foods.entities.find((f) => f.id === productId);
  }
};

export default foodsReducer;
