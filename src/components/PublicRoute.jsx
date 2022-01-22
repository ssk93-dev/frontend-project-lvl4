import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../context.jsx';

const PublicRoute = ({ children, path }) => {
  const { userId } = useContext(AuthContext);
  return userId.isLoggedIn ? <Redirect to={path} /> : children;
};

export default PublicRoute;
