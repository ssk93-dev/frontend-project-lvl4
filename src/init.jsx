import React from 'react';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import store from './store/index.js';
import AuthApi from './AuthApi.jsx';
import App from './App.jsx';
import resources from './locales/index.js';
import getApi from './Api.jsx';

const init = async (socket) => {
  const { ApiProvider, startConnectListener, startDisconnectListener } = getApi(socket);
  const i18nInstance = i18next.createInstance();
  const lng = JSON.parse(localStorage.getItem('lng'));
  await i18nInstance
    .use(initReactI18next)
    .init({
      resources,
      lng,
      fallbackLng: 'ru',
    });
  startDisconnectListener(() => toast.error(i18nInstance.t('errors.lost'), {
    toastId: 'connection', autoClose: false, theme: 'colored', icon: <Spinner animation="border" size="sm" />,
  }));
  startConnectListener(() => toast.dismiss('connection'));

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
