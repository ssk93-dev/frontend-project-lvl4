import React, { useContext } from 'react';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import LoginPage from './LoginPage.jsx';
import NotFound from './NotFound.jsx';
import ChatPage from './ChatPage.jsx';
import AuthContext from '../context.jsx';

const App = () => {
  const auth = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {auth.authStatus.isLoggedIn ? <ChatPage /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          {auth.authStatus.isLoggedIn ? <Redirect to="/" /> : <LoginPage />}
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
