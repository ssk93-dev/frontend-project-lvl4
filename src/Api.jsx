import React from 'react';
import store from './store/index.js';
import { ApiContext } from './context.jsx';
import { actions } from './store/chatSlice.js';

const getApi = (socket) => {
  const error = 'errors.network';
  const promisifySocket = (socketFunction) => (...payload) => new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(error);
    }, 3000);
    socketFunction(...payload, ({ status }) => {
      clearTimeout(timer);
      if (status === 'ok') {
        resolve();
      }
      reject(error);
    });
  });
  const ApiProvider = ({ children }) => (
    <ApiContext.Provider
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
    </ApiContext.Provider>
  );
  return ApiProvider;
};

export default getApi;
