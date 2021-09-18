import { configureStore } from '@reduxjs/toolkit';
import reducer from './chatSlice.js';

export default configureStore({
  reducer,
});
