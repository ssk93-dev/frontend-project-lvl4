import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import { Toast, ToastContainer } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import LoginPage from './LoginPage.jsx';
import NotFound from './NotFound.jsx';
import ChatPage from './ChatPage.jsx';
import Header from './Header.jsx';
import SignupPage from './SignupPage.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import PublicRoute from './PublicRoute.jsx';
import Context from '../context.jsx';
import { actions } from '../store/chatSlice.js';
import getModal from './modals/index.js';

const renderModal = ({ modal }, hideModal) => {
  if (!modal.type) {
    return null;
  }
  const Component = getModal(modal.type);
  return <Component modalInfo={modal} onHide={hideModal} />;
};

const App = ({ socket }) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const { username, token } = JSON.parse(localStorage.getItem('userId')) ?? { username: '', token: '', isLoggedIn: false };
  const lang = JSON.parse(localStorage.getItem('lang')) ?? 'ru';
  const initialState = {
    user: { username, token },
    isLoggedIn: !!token,
    socket,
    lang,
    modal: { type: null, item: null },
    toast: { show: false },
  };
  const [globalState, setState] = useState(initialState);
  const hideModal = () => setState((prevState) => (
    {
      ...prevState,
      modal: {
        show: false,
        type: null,
        item: null,
      },
    }
  ));
  const showModal = (type, item = null) => setState((prevState) => (
    {
      ...prevState,
      modal: {
        show: true,
        type,
        item,
      },
    }
  ));
  const showToast = () => setState((prevState) => (
    {
      ...prevState,
      toast: { show: true },
    }
  ));
  const hideToast = () => setState((prevState) => (
    {
      ...prevState,
      toast: { show: false },
    }
  ));
  useEffect(() => {
    i18n.changeLanguage(globalState.lang);
    socket.on('newMessage', (messageWithId) => dispatch(actions.addMessage({ message: messageWithId })));
    socket.on('newChannel', (channelWithId) => dispatch(actions.addChannel({ channel: channelWithId })));
    socket.on('removeChannel', (data) => dispatch(actions.removeChannel(data)));
    socket.on('renameChannel', (channel) => dispatch(actions.renameChannel(channel)));
  }, []);

  return (
    <Context.Provider value={{
      globalState, setState, showModal, showToast, hideToast,
    }}
    >
      <Header />
      <ToastContainer position="top-center">
        <Toast bg="danger" show={globalState.toast.show} onClose={hideToast}>
          <Toast.Header>
            <strong className="me-auto">{t('errors.network')}</strong>
          </Toast.Header>
          <Toast.Body>{t('errors.lost')}</Toast.Body>
        </Toast>
      </ToastContainer>
      <Router>
        <Switch>
          <Route exact path="/">
            <PrivateRoute path="/login">
              <ChatPage />
            </PrivateRoute>
          </Route>
          <Route exact path="/login">
            <PublicRoute path="/">
              <LoginPage />
            </PublicRoute>
          </Route>
          <Route exact path="/signup">
            <PublicRoute path="/">
              <SignupPage />
            </PublicRoute>
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
      {renderModal(globalState, hideModal)}
    </Context.Provider>
  );
};

export default App;
