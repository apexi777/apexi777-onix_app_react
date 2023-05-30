import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';

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
  (language) => {
    const { i18n } = useTranslation();
    i18n.changeLanguage(language);
  }
);

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    langInitialization: (state, action) => { 
      state.lang = action.payload; 
    },
    langChange: (state, action) => {
      if (action.payload !== state.lang) {
        state.lang = action.payload;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(langUpdate.pending, (state, action) => {
        console.log(action.payload);
      })
      .addCase(langUpdate.fulfilled, (state, action) => {
        console.log(action.payload);
        state.lang = action.payload; 
      })
      .addCase(langUpdate.rejected, (state) => {
        console.log(state.lang);
      })
      .addDefaultCase(() => {});
  }
});

const { actions, reducer } = headerSlice;

export default reducer;
export const {
  langInitialization,
  langChange,
} = actions;
