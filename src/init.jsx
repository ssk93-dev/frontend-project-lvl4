import React from 'react';

import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import store from './store/index.js';
import { actions } from './store/chatSlice.js';
import AuthApi from './AuthApi.jsx';
import App from './App.jsx';
import resources from './locales/index.js';
import { SocketContext } from './context.jsx';

const init = async (socket) => {
  const i18nInstance = i18next.createInstance();
  const lng = JSON.parse(localStorage.getItem('lng'));
  await i18nInstance
    .use(initReactI18next)
    .init({
      resources,
      lng,
      fallbackLng: 'ru',
    });
  const timer = (action) => setTimeout(action, 3000);
  socket.on('newMessage', (messageWithId) => store.dispatch(actions.addMessage({ message: messageWithId })));
  socket.on('newChannel', (channelWithId) => store.dispatch(actions.addChannel({ channel: channelWithId })));
  socket.on('removeChannel', (data) => store.dispatch(actions.removeChannel(data)));
  socket.on('renameChannel', (channel) => store.dispatch(actions.renameChannel(channel)));
  socket.on('disconnect', () => timer(() => store.dispatch(actions.handleToast({ show: true }))));
  socket.on('connect', () => store.dispatch(actions.handleToast({ show: false })));
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18nInstance}>
        <AuthApi>
          <SocketContext.Provider value={{ socket }}>
            <App />
          </SocketContext.Provider>
        </AuthApi>
      </I18nextProvider>
    </Provider>
  );
};

export default init;
