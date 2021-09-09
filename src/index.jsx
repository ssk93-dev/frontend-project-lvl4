// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import React, { useState } from 'react';
import { render } from 'react-dom';
import { Col } from 'react-bootstrap';
import App from './components/App.jsx';
import AuthContext from './context.jsx';
import Header from './components/Header.jsx';

// @ts-ignore
if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const Main = () => {
  const { username, token } = JSON.parse(localStorage.getItem('userId')) ?? { username: '', token: '', isLoggedIn: false };
  const [authStatus, setStatus] = useState({ username, token, isLoggedIn: !!token });
  return (
    <AuthContext.Provider value={{ authStatus, setStatus }}>
      <Col className="d-flex flex-column h-100">
        <Header />
        <App />
      </Col>
    </AuthContext.Provider>
  );
};

const container = document.querySelector('#chat');
render(
  <Main />,
  container,
);
