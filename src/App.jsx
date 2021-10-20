import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import { Toast, ToastContainer, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getToastState } from './store/selectors.js';
import { actions } from './store/chatSlice.js';
import {
  Header, LoginPage, ChatPage, SignupPage, NotFound, PrivateRoute, PublicRoute,
} from './components';
import Context from './context.jsx';
import getModal from './components/modals';

const renderModal = ({ modal }, hideModal) => {
  if (!modal.type) {
    return null;
  }
  const Component = getModal(modal.type);
  return <Component modalInfo={modal} onHide={hideModal} />;
};

const App = ({ socket }) => {
  const { t, i18n } = useTranslation();
  const { username, token } = JSON.parse(localStorage.getItem('userId')) ?? { username: '', token: '', isLoggedIn: false };
  const lang = JSON.parse(localStorage.getItem('lang')) ?? 'ru';
  const dispatch = useDispatch();
  const toastState = useSelector(getToastState);
  const handleToast = (payload) => () => dispatch(actions.handleToast(payload));
  const initialState = {
    user: { username, token },
    isLoggedIn: !!token,
    lang,
    modal: { type: null, item: null },
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

  useEffect(() => {
    i18n.changeLanguage(globalState.lang);
  }, []);

  return (
    <Context.Provider value={{
      globalState, socket, setState, showModal,
    }}
    >
      <Header />
      <ToastContainer position="top-center">
        <Toast bg="danger" show={toastState.show} onClose={handleToast({ toastState: { show: false } })}>
          <Toast.Header>
            <strong className="me-auto">{t('errors.network')}</strong>
          </Toast.Header>
          <Toast.Body className="text-center">
            {t('errors.lost')}
            <Spinner animation="border" size="sm" />
          </Toast.Body>
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
