import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './slices/modalSlice.js';
import channelsReducer from './slices/channelsSlice.js';
import messagesReducer from './slices/messagesSlice.js';

export default configureStore({
  reducer: {
    modal: modalReducer,
    channels: channelsReducer,
    messages: messagesReducer,
  },
});
