import React from 'react';
import { Col } from 'react-bootstrap';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import store from './store/index.js';
import App from './components/App.jsx';
import resources from './locales/index.js';

const init = (socketClient) => {
  const i18nInstance = i18next.createInstance();
  i18nInstance
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });
  const socket = socketClient();
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18nInstance}>
        <Col className="d-flex flex-column h-100">
          <App socket={socket} />
        </Col>
      </I18nextProvider>
    </Provider>
  );
};

export default init;
