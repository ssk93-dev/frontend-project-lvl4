import { createSelector } from '@reduxjs/toolkit';

const getChannels = (state) => state.channels;
export default createSelector(
  getChannels,
  (channels) => channels.map((channel) => channel.name),
);
