import React from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import { Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getModalState } from './store/selectors.js';
import {
  Header, LoginPage, ChatPage, SignupPage, NotFound, PrivateRoute, PublicRoute, MyModal, MyToast,
} from './components';

const App = () => {
  const modalInfo = useSelector(getModalState);

  return (
    <>
      <Col className="d-flex flex-column h-100 bg-light" aria-hidden={modalInfo.show}>
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
      </Col>
      <MyModal />
      <MyToast />
    </>
  );
};

export default App;
