/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    channels: [],
    currentChannelId: null,
    messages: [],
  },
  reducers: {
    initChannels(state, { payload }) {
      const { channels, currentChannelId, messages } = payload;
      state.channels = channels;
      state.currentChannelId = currentChannelId;
      state.messages = messages;
    },
    setCurrentChannel(state, { payload }) {
      const { id } = payload;
      state.currentChannelId = id;
    },
    addChannel(state, { payload }) {
      const { channel } = payload;
      state.channels.push(channel);
    },
    addMessage(state, { payload }) {
      const { message } = payload;
      state.messages.push(message);
    },
  },
});

export const actions = { ...chatSlice.actions };
export default chatSlice.reducer;
