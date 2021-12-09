/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const initialState = {
  ...channelsAdapter.getInitialState(),
  currentChannelId: null,
};

const slice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    initChannels(state, { payload }) {
      const { channels, currentChannelId } = payload;
      channelsAdapter.addMany(state, channels);
      state.currentChannelId = currentChannelId;
    },
    setCurrentChannel(state, { payload }) {
      const { id } = payload;
      state.currentChannelId = id;
    },
    addChannel: channelsAdapter.addOne,
    removeChannel(state, { payload }) {
      if (state.currentChannelId === payload) {
        state.currentChannelId = 1;
      }
      channelsAdapter.removeOne(state, payload);
    },
    renameChannel(state, { payload }) {
      const { id, name } = payload;
      channelsAdapter.updateOne(state, { id, changes: { name } });
    },
  },
});

const selectSelf = (state) => state.channels;

export const channelsActions = { ...slice.actions };
export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);
export const getCurrentChannelId = createSelector(selectSelf, (state) => state.currentChannelId);
export const getChannelsNames = createSelector(
  channelsSelectors.selectAll,
  (channels) => channels.map((channel) => channel.name),
);
export default slice.reducer;
