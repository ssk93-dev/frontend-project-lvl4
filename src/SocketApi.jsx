import React from 'react';
import store from './store/index.js';
import { SocketContext } from './context.jsx';
import { actions } from './store/chatSlice.js';

const socketApi = (socket) => {
  const error = 'errors.network';
  const subscribe = () => {
    socket.on('newMessage', (messageWithId) => store.dispatch(actions.addMessage({ message: messageWithId })));
    socket.on('newChannel', (channelWithId) => store.dispatch(actions.addChannel({ channel: channelWithId })));
    socket.on('removeChannel', (data) => store.dispatch(actions.removeChannel(data)));
    socket.on('renameChannel', (channel) => store.dispatch(actions.renameChannel(channel)));
    socket.on('disconnect', () => store.dispatch(actions.handleToast({ show: true })));
    socket.on('connect', () => store.dispatch(actions.handleToast({ show: false })));
  };
  const promisifySocket = (socketFunction) => (...payload) => new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      store.dispatch(actions.handleToast({ show: true }));
      reject(error);
    }, 3000);
    socketFunction(...payload, ({ status }) => {
      clearTimeout(timer);
      if (status === 'ok') {
        store.dispatch(actions.handleToast({ show: false }));
        resolve();
      }
      reject(error);
    });
  });
  const SocketProvider = ({ children }) => (
    <SocketContext.Provider
      value={{
        newMessage: promisifySocket((...payload) => socket.volatile.emit('newMessage', ...payload)),
        newChannel: promisifySocket((...payload) => {
          socket.volatile.emit('newChannel', ...payload);
          socket.once('newChannel', ({ id }) => store.dispatch(actions.setCurrentChannel({ id })));
        }),
        removeChannel: promisifySocket((...payload) => socket.volatile.emit('removeChannel', ...payload)),
        renameChannel: promisifySocket((...payload) => socket.volatile.emit('renameChannel', ...payload)),
      }}
    >
      {children}
    </SocketContext.Provider>
  );
  return { subscribe, SocketProvider };
};

export default socketApi;
