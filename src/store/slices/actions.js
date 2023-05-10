import { createAsyncThunk } from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/httpHook';

const { request } = useHttp();

export const fetchData = createAsyncThunk(
  'data/fetchData',
  async () => {
    dispatch(shoesFetching());
    await request('http://localhost:3001/data', true)
      .then((data) => dispatch(shoesFetched(data)))
      .catch(() => dispatch(shoesFetchingError()));
  }
);
