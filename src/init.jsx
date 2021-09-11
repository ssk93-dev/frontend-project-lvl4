import React from 'react';
import { Col } from 'react-bootstrap';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import App from './components/App.jsx';
import resources from './locales/index.js';

const init = async () => {
  const i18nInstance = i18next.createInstance();
  await i18nInstance
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
    });

  return (
    <I18nextProvider i18n={i18nInstance}>
      <Col className="d-flex flex-column h-100">
        <App />
      </Col>
    </I18nextProvider>
  );
};

export default init;
