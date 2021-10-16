import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Context from '../context.jsx';

const PublicRoute = ({ children, path }) => {
  const { globalState } = useContext(Context);
  return globalState.isLoggedIn ? <Redirect to={path} /> : children;
};

export default PublicRoute;
