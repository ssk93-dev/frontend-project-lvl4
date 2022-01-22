import React from 'react';
import { ApiContext } from './context.jsx';
import { channelsActions } from './store/slices/channelsSlice.js';
import { msgActions } from './store/slices/messagesSlice.js';

const getApi = (socket, store) => {
  const errorMessage = 'errors.network';
  const REJECT_DELAY = 5000;

  const promisifySocket = (socketFunction) => (...payload) => new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(errorMessage);
    }, REJECT_DELAY);
    socketFunction(...payload, ({ status }) => {
      clearTimeout(timer);
      if (status === 'ok') {
        resolve();
      }
      reject(errorMessage);
    });
  });

  const startConnectListener = (cb) => socket.on('connect', cb);
  const startDisconnectListener = (cb) => socket.on('disconnect', cb);

  const ApiProvider = ({ children }) => (
    <ApiContext.Provider
      value={{
        newMessage: promisifySocket((...payload) => socket.volatile.emit('newMessage', ...payload)),
        newChannel: promisifySocket((...payload) => {
          socket.volatile.emit('newChannel', ...payload);
          socket.once('newChannel', ({ id }) => store.dispatch(channelsActions.setCurrentChannel({ id })));
        }),
        removeChannel: promisifySocket((...payload) => socket.volatile.emit('removeChannel', ...payload)),
        renameChannel: promisifySocket((...payload) => socket.volatile.emit('renameChannel', ...payload)),
        startEventListeners: () => {
          socket.on('newMessage', (messageWithId) => store.dispatch(msgActions.addMessage(messageWithId)));
          socket.on('newChannel', (channelWithId) => store.dispatch(channelsActions.addChannel(channelWithId)));
          socket.on('removeChannel', ({ id }) => store.dispatch(channelsActions.removeChannel(id)));
          socket.on('renameChannel', (channel) => store.dispatch(channelsActions.renameChannel(channel)));
        },
        stopEventListeners: () => {
          socket.removeAllListeners('newMessage');
          socket.removeAllListeners('newChannel');
          socket.removeAllListeners('removeChannel');
          socket.removeAllListeners('renameChannel');
        },
      }}
    >
      {children}
    </ApiContext.Provider>
  );
  return { ApiProvider, startConnectListener, startDisconnectListener };
};

export default getApi;
