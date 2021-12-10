/* eslint-disable no-param-reassign */
import { createSelector, createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'modal',
  initialState: {
    modalInfo: { show: false, type: null, item: null },
  },
  reducers: {
    showModal(state, { payload }) {
      const { type, item } = payload;
      state.modalInfo = { show: true, type, item };
    },
    hideModal(state) {
      state.modalInfo = { show: false, type: null, item: null };
    },
  },
});

const selectSelf = (state) => state.modal;

export const modalActions = { ...chatSlice.actions };
export const getModalState = createSelector(selectSelf, (state) => state.modalInfo);
export default chatSlice.reducer;
