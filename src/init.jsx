import React from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import initStore from './store/index.js';
import App from './App.jsx';
import resources from './locales/index.js';
import getApi from './Api.jsx';

const rollbarConfig = {
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  environment: 'production',
  enabled: process.env.NODE_ENV === 'production',
};

const init = async (socket) => {
  const store = initStore();
  const { ApiProvider, startConnectListener, startDisconnectListener } = getApi(socket, store);
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
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18nInstance}>
            <ApiProvider>
              <App />
            </ApiProvider>
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
