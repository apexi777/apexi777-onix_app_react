import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeModal: false,
  promoLoading: false,
  filterMenuView: false,
  thanksInModal: false
};

const visibilitySlice = createSlice({
  name: 'visibility',
  initialState,
  reducers: {
    visibilityModalWindow: (state) => { 
      state.activeModal = !state.activeModal; 
    },
    promoLoadingStatus: (state) => {
      state.promoLoading = true;
    },
    filterMenuToggle: (state) => {
      state.filterMenuView = !state.filterMenuView;
    },
    thanksActivated: (state) => {
      state.thanksInModal = !state.thanksInModal;
    }
  }
});

const { actions, reducer } = visibilitySlice;

export default reducer;
export const {
  visibilityModalWindow,
  promoLoadingStatus,
  filterMenuToggle,
  thanksActivated
} = actions;
