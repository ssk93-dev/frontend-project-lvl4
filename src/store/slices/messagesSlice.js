/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { channelsActions } from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const slice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => builder
    .addCase(channelsActions.removeChannel, (state, action) => {
      const channelId = action.payload;
      const filteredMessages = messagesAdapter
        .getSelectors()
        .selectAll(state)
        .filter((msg) => msg.channelId !== channelId);
      messagesAdapter.setAll(state, filteredMessages);
    })
    .addCase(channelsActions.initChannels, (state, action) => {
      const { messages } = action.payload;
      messagesAdapter.addMany(state, messages);
    }),
});

export const msgActions = { ...slice.actions };
export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages);
export default slice.reducer;
