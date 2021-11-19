import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { AuthContext } from './context.jsx';
import { actions } from './store/chatSlice.js';
import routes from './routes.js';

const noAuth = { username: null, token: null };
const getAuthData = () => {
  const userId = JSON.parse(localStorage.getItem('userId')) ?? noAuth;
  return userId;
};
const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};
const identifyError = (error) => {
  if (error.isAxiosError) {
    return 'errors.network';
  }
  if (error.response.status === 401) {
    return 'errors.authorization';
  }
  if (error.response.status === 409) {
    return 'errors.signup';
  }
  return 'errors.unknown';
};
const AuthApi = ({ children }) => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(getAuthData());
  const [feedback, setFeedback] = useState('');
  const logIn = async ({ username, password }) => {
    try {
      setFeedback('');
      const { data } = await axios.post(routes.loginPath(), { username, password });
      localStorage.setItem('userId', JSON.stringify(data));
      setUserId(data);
    } catch (err) {
      setFeedback(identifyError(err));
      throw err;
    }
  };
  const signUp = async ({ username, password }) => {
    try {
      setFeedback('');
      const { data } = await axios.post(routes.signupPath(), { username, password });
      localStorage.setItem('userId', JSON.stringify(data));
      setUserId(data);
    } catch (err) {
      setFeedback(identifyError(err));
      throw err;
    }
  };
  const signOut = () => {
    localStorage.setItem('userId', JSON.stringify(noAuth));
    setUserId(noAuth);
  };
  const loadData = async () => {
    try {
      setFeedback('');
      const { data } = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
      dispatch(actions.initChannels(data));
    } catch (err) {
      setFeedback(identifyError(err));
    }
  };
  return (
    <AuthContext.Provider value={{
      logIn, signUp, signOut, loadData, feedback, userId,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthApi;
