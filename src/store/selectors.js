import { createSelector } from '@reduxjs/toolkit';

const getChannels = (state) => state.channels;
export const getToastState = (state) => state.toast;
export const getModalState = (state) => state.modalInfo;
export const getChannelsNames = createSelector(
  getChannels,
  (channels) => channels.map((channel) => channel.name),
);
