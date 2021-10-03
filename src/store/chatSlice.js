/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

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
    removeChannel(state, { payload }) {
      const { id } = payload;
      if (state.currentChannelId === id) {
        state.currentChannelId = 1;
      }
      _.remove(state.channels, (channel) => channel.id === id);
      _.remove(state.messages, (message) => message.channelId === id);
    },
    renameChannel(state, { payload }) {
      const channel = state.channels.find(({ id }) => id === payload.id);
      channel.name = payload.name;
    },
  },
});

export const actions = { ...chatSlice.actions };
export default chatSlice.reducer;
