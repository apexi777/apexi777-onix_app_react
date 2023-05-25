import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiCurrency = createApi({
  reducerPath: 'currencyApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BANK_URL
  }),
  endpoints: (builder) => ({
    getCurrency: builder.query({
      query: () => '/exchange?json'
    })
  })
});

export const { 
  useGetCurrencyQuery
} = apiCurrency;
