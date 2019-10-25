import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { isAuthenticated } from './utils';

const PrivateRoute = ({ children, component, ...rest }) => {
  const authenticated = isAuthenticated();
  return (
    <Route
      {...rest}
      component={authenticated && component}
      render={({ location }) =>
        authenticated ? (
          children
        ) : (
          <Redirect to={{ pathname: '/auth', state: { from: location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
