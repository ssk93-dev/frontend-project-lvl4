import React from 'react';

import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import store from './store/index.js';
import AuthApi from './AuthApi.jsx';
import App from './App.jsx';
import resources from './locales/index.js';
import getApi from './Api.jsx';
import { actions } from './store/chatSlice.js';

const subscribe = (socket) => {
  socket.on('newMessage', (messageWithId) => store.dispatch(actions.addMessage({ message: messageWithId })));
  socket.on('newChannel', (channelWithId) => store.dispatch(actions.addChannel({ channel: channelWithId })));
  socket.on('removeChannel', (data) => store.dispatch(actions.removeChannel(data)));
  socket.on('renameChannel', (channel) => store.dispatch(actions.renameChannel(channel)));
  socket.on('disconnect', () => store.dispatch(actions.handleToast({ show: true })));
  socket.on('connect', () => store.dispatch(actions.handleToast({ show: false })));
};

const init = async (socket) => {
  const ApiProvider = getApi(socket);
  const i18nInstance = i18next.createInstance();
  const lng = JSON.parse(localStorage.getItem('lng'));
  await i18nInstance
    .use(initReactI18next)
    .init({
      resources,
      lng,
      fallbackLng: 'ru',
    });
  subscribe(socket);
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18nInstance}>
        <AuthApi>
          <ApiProvider>
            <App />
          </ApiProvider>
        </AuthApi>
      </I18nextProvider>
    </Provider>
  );
};

export default init;
