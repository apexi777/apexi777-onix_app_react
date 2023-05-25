import { configureStore } from '@reduxjs/toolkit';
import shoes from './slices/shoes/slice';
import currency from './slices/currency/slice';
import visibility from './slices/visibility/slice';
import header from './slices/header/slice';
import { apiShoes } from './apis/shoes';
import { apiCurrency } from './apis/currency';

const store = configureStore({
  reducer: { 
    [apiShoes.reducerPath]: apiShoes.reducer,
    [apiCurrency.reducerPath]: apiCurrency.reducer,
    shoes, 
    currency, 
    visibility,
    header,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat([
      apiShoes.middleware,
      apiCurrency.middleware,
    ]),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
