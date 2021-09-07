import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginForm from './LoginForm.jsx';
import NotFound from './NotFound.jsx';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <LoginForm />
      </Route>
      <Route path="/login">
        <LoginForm />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  </Router>
);

export default App;
