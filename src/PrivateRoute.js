import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { useAuthentication } from './useAuthentication';

const PrivateRoute = ({ children, component, ...rest }) => {
  const { authenticated } = useAuthentication();
  const useComponentProp = authenticated && component;
  const render = () => (authenticated ? children : <Redirect to='/' />);
  return (
    <Route
      {...rest}
      component={useComponentProp ? component : undefined}
      render={useComponentProp ? undefined : render}
    />
  );
};

export default PrivateRoute;
