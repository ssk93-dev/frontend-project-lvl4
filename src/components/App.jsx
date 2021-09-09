import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginPage from './LoginPage.jsx';
import NotFound from './NotFound.jsx';
import ChatPage from './ChatPage.jsx';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <ChatPage />
      </Route>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  </Router>
);

export default App;
