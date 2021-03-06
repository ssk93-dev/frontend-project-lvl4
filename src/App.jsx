import React from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import { Col } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import AuthApi from './AuthApi.jsx';
import { getModalState } from './store/slices/modalSlice.js';
import Header from './components/Header.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import PublicRoute from './components/PublicRoute.jsx';
import ChatPage from './components/ChatPage.jsx';
import LoginPage from './components/LoginPage.jsx';
import SignupPage from './components/SignupPage.jsx';
import NotFound from './components/NotFound.jsx';
import ChannelModal from './components/ChannelModal.jsx';

const App = () => {
  const modalInfo = useSelector(getModalState);

  return (
    <AuthApi>
      <Col className="d-flex flex-column h-100 bg-light" aria-hidden={modalInfo.showed}>
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
      <ChannelModal />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </AuthApi>
  );
};

export default App;
