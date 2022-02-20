import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { authContext } from '../context/AuthContext';


function PrivateRoute({ isPrivate, ...rest }) {
  const { loading, authenticated } = useContext(authContext);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return authenticated === true ? <Outlet /> : <Navigate to='/login' />;
}

export default PrivateRoute;