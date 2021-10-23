import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getModalState } from './store/selectors.js';
import {
  Header, LoginPage, ChatPage, SignupPage, NotFound, PrivateRoute, PublicRoute, MyModal, MyToast,
} from './components';
import Context from './context.jsx';

const App = ({ socket }) => {
  const { i18n } = useTranslation();
  const { username, token } = JSON.parse(localStorage.getItem('userId')) ?? { username: '', token: '', isLoggedIn: false };
  const lang = JSON.parse(localStorage.getItem('lang')) ?? 'ru';
  const modalInfo = useSelector(getModalState);
  const initialState = {
    user: { username, token },
    isLoggedIn: !!token,
    lang,
  };
  const [globalState, setState] = useState(initialState);

  useEffect(() => {
    i18n.changeLanguage(globalState.lang);
  }, []);

  return (
    <Context.Provider value={{
      globalState, socket, setState,
    }}
    >
      <div className="h-100" aria-hidden={modalInfo.show}>
        <Router>
          <Header />
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
      </div>
      <MyModal />
      <MyToast />
    </Context.Provider>
  );
};

export default App;
