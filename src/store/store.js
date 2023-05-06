import { configureStore } from '@reduxjs/toolkit';
import shoes from './slice/data';
import currency from './slice/currency';
import visibility from './slice/visibility';
import header from './slice/header';

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
