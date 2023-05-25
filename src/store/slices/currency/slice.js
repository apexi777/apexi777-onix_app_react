import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  BUTTON_REMOVE_COUNT,
  BUTTON_ADD_COUNT
} from '../../../constans/translates';
import { useHttp } from '../../../hooks/httpHook';

const initialState = {
  currency: [],
  usdRate: 0,
  selectCurrency: {},
  currencyLoadedStatus: 'idle',
  price: 1,
  count: 1,
  activeCharacter: {},
  currencyMenu: [
    {
      id: 900, name: 'USD', character: '$', select: true 
    },
    {
      id: 901, name: 'UAH', character: '₴', select: false 
    },
    {
      id: 902, name: 'EUR', character: '€', select: false 
    }
  ]
};

export const fetchCurrency = createAsyncThunk(
  'currency/fetchCurrency',
  () => {
    const { request } = useHttp();
    return request(`${process.env.REACT_APP_API_BANK_URL}/exchange?json`);
  }
);

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    fetchingCurrency: (state, action) => {
      state.currency = action.payload;
      state.usdRate = action.payload.find((item) => item.cc === 'USD').rate;
    },
    countChange: (state, action) => {
      if (action.payload === BUTTON_REMOVE_COUNT) {
        if (state.count > 1) { 
          state.count -= 1;
        }
      } else if (action.payload === BUTTON_ADD_COUNT) {
        state.count += 1;
      }
    },
    onCurrencyMenuUpdate: (state, action) => { // on change currency menu by click
      const [prevActiveCharacter] = state.currencyMenu.filter((item) => item.select);
      if (prevActiveCharacter.id !== action.payload) {
        state.currencyMenu = state.currencyMenu.map((item) => {
          return { ...item, select: (item.id === action.payload) };
        });
      }
    },
    priceUpdate: (state, action) => {
      const selectName = state.currencyMenu.find((item) => item.select).name;
      const currencyData = state.currency.find((item) => item.cc === selectName);
      if (currencyData.cc === 'USD') {
        state.price = action.payload * state.count;
      } else {
        state.price = Math.round((action.payload / currencyData.rate) * state.usdRate) * state.count;
      }
    },
    activeCharacterUpdate: (state) => {
      [state.activeCharacter] = state.currencyMenu.filter((item) => item.select);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrency.pending, (state) => {
        state.currencyLoadedStatus = 'loading'; 
      })
      .addCase(fetchCurrency.fulfilled, (state, action) => {
        state.currencyLoadedStatus = 'idle';
        state.currency = action.payload;
        state.usdRate = action.payload.find((item) => item.cc === 'USD').rate;
      })
      .addCase(fetchCurrency.rejected, (state) => {
        state.currencyLoadedStatus = 'error';
      })
      .addDefaultCase(() => {});
  }
});

const { actions, reducer } = currencySlice;

export default reducer;
export const {
  fetchingCurrency,
  countChange,
  onCurrencyMenuUpdate,
  priceUpdate,
  activeCharacterUpdate
} = actions;
