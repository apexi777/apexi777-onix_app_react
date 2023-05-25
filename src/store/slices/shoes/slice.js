import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useHttp } from '../../../hooks/httpHook';

const initialState = {
  shoes: [],
  visibleShoes: [],
  loadingShoes: false,
  activePromo: {},
  searchValue: '',
  filter: null,
  headerMenu: [
    { name: 'Men', action: true, id: 101 },
    { name: 'Women', action: false, id: 102 },
    { name: 'Kids', action: false, id: 103 },
    { name: 'Customise', action: false, id: 104 }
  ]
};

export const fetchData = createAsyncThunk(
  'shoes/fetchShoes',
  () => {
    const { request } = useHttp();
    return request('http://localhost:3001/data', true);
  }
);

const dataSlice = createSlice({
  name: 'shoes',
  initialState,
  reducers: {
    fetchingData: (state, action) => {
      state.shoes = action.payload;
      state.loadingShoes = false;
      state.visibleShoes = action.payload;
    },
    shoesCreated: (state, action) => {
      state.shoes.push(action.payload);
    },
    shoesDeleted: (state, action) => {
      state.shoes = state.shoes.filter((item) => item.id !== action.payload);
    },
    shoesToggleFavorite: (state, action) => {
      state.shoes = state.shoes.map((elem) => {
        if (elem.id === action.payload) {
          if (!elem.select.favorite) {
            return { ...elem, ...{ select: { favorite: true } } };
          } 
          return { ...elem, ...{ select: {} } };
        } 
        return elem;
      });
    },
    shoesUpdateAfterDrag: (state, action) => {
      state.shoes = action.payload;
    },
    shoesUpdateAfterSelectCatalog: (state, action) => {
      state.shoes = state.shoes.map((elem) => ({
        ...elem, 
        visibleOnPromo: elem.id === action.payload
      }));
    },
    setActivePromoCard: (state) => {
      state.activePromo = state.shoes.find((item) => item.visibleOnPromo);
    },
    activePromoUpdate: (state) => {
      const count = state.shoes.reduce((result, value) => result + value.visibleOnPromo, 0);
      if (count === 0 || count > 1) {
        state.shoes = state.shoes.map((element, index) => {
          return index === 0 ? { ...element, visibleOnPromo: true } : { ...element, visibleOnPromo: false };
        });
      }
    },
    searchUpdate: (state, action) => {
      state.searchValue = action.payload;
    },
    searchRequest: (state) => {
      state.shoes = state.visibleShoes.filter((item) => {
        return item.name.toLowerCase().includes(state.searchValue.toLowerCase());
      });
    },
    shoesApplyFilter: (state, action) => {
      state.filter = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loadingShoes = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.shoes = action.payload;
        state.loadingShoes = false;
        state.visibleShoes = action.payload;
      })
      .addCase(fetchData.rejected, (state) => {
        state.loadingShoes = false;
      })
      .addDefaultCase(() => {});
  }
});

const { actions, reducer } = dataSlice;

export default reducer;
export const {
  fetchingData,
  shoesCreated,
  shoesDeleted,
  shoesToggleFavorite,
  shoesUpdateAfterDrag,
  shoesUpdateAfterSelectCatalog,
  setActivePromoCard,
  activePromoUpdate,
  searchUpdate,
  searchRequest,
  shoesApplyFilter
} = actions;
