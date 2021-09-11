import React, { useState } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import LoginPage from './LoginPage.jsx';
import NotFound from './NotFound.jsx';
import ChatPage from './ChatPage.jsx';
import Header from './Header.jsx';
import Context from '../context.jsx';

const App = () => {
  const { username, token } = JSON.parse(localStorage.getItem('userId')) ?? { username: '', token: '', isLoggedIn: false };
  const initialState = {
    user: { username, token },
    isLoggedIn: !!token,
    lang: 'en',
    theme: 'light',
  };
  const [globalState, setState] = useState(initialState);

  return (
    <Context.Provider value={{ globalState, setState }}>
      <Header />
      <Router>
        <Switch>
          <Route exact path="/">
            {globalState.isLoggedIn ? <ChatPage /> : <Redirect to="/login" />}
          </Route>
          <Route path="/login">
            {globalState.isLoggedIn ? <Redirect to="/" /> : <LoginPage />}
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </Context.Provider>
  );
};

export default App;
