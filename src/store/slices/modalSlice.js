/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

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

export const actions = { ...chatSlice.actions };
export const getModalState = (state) => state.modal.modalInfo;
export default chatSlice.reducer;
