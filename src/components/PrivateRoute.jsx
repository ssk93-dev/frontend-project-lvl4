import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../context.jsx';

const PrivateRoute = ({ children, path }) => {
  const { userId } = useContext(AuthContext);
  return userId.isLoggedIn ? children : <Redirect to={path} />;
};

export default PrivateRoute;
