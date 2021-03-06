import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { AuthContext } from './context.jsx';
import { channelsActions } from './store/slices/channelsSlice.js';
import routes from './routes.js';

const noAuth = { username: null, token: null, isLoggedIn: false };

const getAuthData = () => JSON.parse(localStorage.getItem('userId')) ?? noAuth;

const getErrorMessage = (error) => {
  if (error.isAxiosError && !error.response) {
    return 'errors.network';
  }
  if (error.response.status === 401) {
    return 'errors.authorization';
  }
  if (error.response.status === 409) {
    return 'errors.signup';
  }
  if (error.isAxiosError) {
    return 'errors.network';
  }
  return 'errors.unknown';
};

const AuthApi = ({ children }) => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(() => getAuthData());

  const getAuthHeader = () => {
    if (userId && userId.token) {
      return { Authorization: `Bearer ${userId.token}` };
    }
    return {};
  };

  const logIn = async ({ username, password }) => {
    try {
      const { data } = await axios.post(routes.loginPath(), { username, password });
      const userData = { ...data, isLoggedIn: true };
      localStorage.setItem('userId', JSON.stringify(userData));
      setUserId(userData);
    } catch (err) {
      throw getErrorMessage(err);
    }
  };

  const signUp = async ({ username, password }) => {
    try {
      const { data } = await axios.post(routes.signupPath(), { username, password });
      const userData = { ...data, isLoggedIn: true };
      localStorage.setItem('userId', JSON.stringify(userData));
      setUserId(userData);
    } catch (err) {
      throw getErrorMessage(err);
    }
  };

  const signOut = () => {
    localStorage.setItem('userId', JSON.stringify(noAuth));
    setUserId(noAuth);
  };
  const loadUserData = async () => {
    try {
      const { data } = await axios.get(routes.dataPath(), { headers: getAuthHeader() });
      dispatch(channelsActions.initChannels(data));
    } catch (err) {
      if (err.response.status === 401) {
        signOut();
      }
      throw getErrorMessage(err);
    }
  };

  return (
    <AuthContext.Provider value={{
      logIn, signUp, signOut, loadUserData, userId,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthApi;
