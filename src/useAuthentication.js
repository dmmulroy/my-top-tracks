import React from 'react';
import qs from 'query-string';

import { isAuthenticated } from './utils';

export function useAuthentication() {
  const { access_token, state, expires_in } = qs.parse(window.location.hash);

  const [authenticated, setAuthenticated] = React.useState(isAuthenticated());

  React.useEffect(() => {
    if (authenticated) return;

    if (access_token && state === localStorage.getItem('randomState')) {
      localStorage.setItem('token', access_token);
      localStorage.setItem(
        'tokenExpiration',
        new Date().getTime() + Number(expires_in) * 1000
      );
      setAuthenticated(true);
    } else {
      localStorage.setItem('randomState', Math.random());
    }
  }, [authenticated, access_token, expires_in, state]);

  return {
    authenticated,
    token: localStorage.getItem('token'),
    tokenExpiration: localStorage.getItem('tokenExpiration'),
    randomState: localStorage.getItem('randomState')
  };
}
