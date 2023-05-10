import { configureStore } from '@reduxjs/toolkit';
import shoes from './slices/shoes/slice';
import currency from './slices/currency/slice';
import visibility from './slices/visibility/slice';
import header from './slices/header/slice';

const store = configureStore({
  reducer: { 
    shoes, 
    currency, 
    visibility,
    header
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',

});

export default store;
