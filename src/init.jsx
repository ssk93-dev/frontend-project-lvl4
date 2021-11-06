import React from 'react';

import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import store from './store/index.js';
import AuthApi from './AuthApi.jsx';
import App from './App.jsx';
import resources from './locales/index.js';
import socketApi from './SocketApi.jsx';

const init = async (socket) => {
  const { subscribe, SocketProvider } = socketApi(socket);
  const i18nInstance = i18next.createInstance();
  const lng = JSON.parse(localStorage.getItem('lng'));
  await i18nInstance
    .use(initReactI18next)
    .init({
      resources,
      lng,
      fallbackLng: 'ru',
    });
  subscribe();
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18nInstance}>
        <AuthApi>
          <SocketProvider>
            <App />
          </SocketProvider>
        </AuthApi>
      </I18nextProvider>
    </Provider>
  );
};

export default init;
