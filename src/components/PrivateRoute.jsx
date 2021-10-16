import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Context from '../context.jsx';

const PrivateRoute = ({ children, path }) => {
  const { globalState } = useContext(Context);
  return globalState.isLoggedIn ? children : <Redirect to={path} />;
};

export default PrivateRoute;
