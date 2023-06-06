import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  headerMenu: [
    { name: 'Men', action: true, id: 101 },
    { name: 'Women', action: false, id: 102 },
    { name: 'Kids', action: false, id: 103 },
    { name: 'Customise', action: false, id: 104 }
  ],
  lang: ''
};

export const langUpdate = createAsyncThunk(
  'header/langUpdate',
  ({ localLng, target }) => {
    if (!target) {
      return localLng.language;
    }
    localLng.changeLanguage(target);
    return target;
  }
);

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(langUpdate.pending, () => {
      })
      .addCase(langUpdate.fulfilled, (state, action) => {
        state.lang = action.payload;
      })
      .addCase(langUpdate.rejected, () => {
      })
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = headerSlice;

export default reducer;
export const {
  langInitialization,
  langChange,
} = actions;
