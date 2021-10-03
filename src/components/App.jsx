import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router, Switch, Route, Redirect,
} from 'react-router-dom';
import LoginPage from './LoginPage.jsx';
import NotFound from './NotFound.jsx';
import ChatPage from './ChatPage.jsx';
import Header from './Header.jsx';
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
  const { username, token } = JSON.parse(localStorage.getItem('userId')) ?? { username: '', token: '', isLoggedIn: false };
  const { lang, theme } = JSON.parse(localStorage.getItem('ui')) ?? { lang: 'en', theme: 'light' };
  const initialState = {
    user: { username, token },
    isLoggedIn: !!token,
    socket,
    ui: {
      lang,
      theme,
    },
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
    socket.on('newMessage', (messageWithId) => dispatch(actions.addMessage({ message: messageWithId })));
    socket.on('newChannel', (channelWithId) => dispatch(actions.addChannel({ channel: channelWithId })));
    socket.on('removeChannel', (data) => dispatch(actions.removeChannel(data)));
    socket.on('renameChannel', (channel) => dispatch(actions.renameChannel(channel)));
  }, []);

  return (
    <Context.Provider value={{ globalState, setState, showModal }}>
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
      {renderModal(globalState, hideModal)}
    </Context.Provider>
  );
};

export default App;
