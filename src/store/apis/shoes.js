import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiShoes = createApi({
  reducerPath: 'shoesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_LOCAL_URL
  }),
  endpoints: (builder) => ({
    getShoes: builder.query({
      query: () => '/data',
      providesTags: ['Shoes']
    }),
    createShoe: builder.mutation({
      query: (shoe) => ({
        url: '/data',
        method: 'POST',
        body: shoe,
      }),
      invalidatesTags: ['Shoes']
    }),
    deleteShoe: builder.mutation({
      query: (id) => ({
        url: `/data/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Shoes']
    })
  })
});

export const { 
  useGetShoesQuery,
  useCreateShoeMutation,
  useDeleteShoeMutation,
} = apiShoes;
