import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  headerMenu: [
    { name: 'Men', action: true, id: 101 },
    { name: 'Women', action: false, id: 102 },
    { name: 'Kids', action: false, id: 103 },
    { name: 'Customise', action: false, id: 104 }
  ],
  lang: ''
};

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
        // i18n.changeLanguage(action.payload);
      }
    }
  }
});

const { actions, reducer } = headerSlice;

export default reducer;
export const {
  langInitialization,
  langChange
} = actions;
