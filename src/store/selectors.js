import { createSelector } from '@reduxjs/toolkit';

const getChannels = (state) => state.channels;
export const getModalState = (state) => state.modalInfo;
export const getChannelsNames = createSelector(
  getChannels,
  (channels) => channels.map((channel) => channel.name),
);
