import React from 'react';
import { Redirect } from 'react-router-dom';
import qs from 'query-string';

import { isAuthenticated } from './utils';

const clientId = 'bee21f221b7149cca1c835f8a9e9fa5a';
const scopes = 'user-top-read playlist-modify-public playlist-modify-private';

const Auth = ({ location }) => {
  const { access_token, state, expires } = qs.parse(location.hash);
  const [authenticated, setAuthenticated] = React.useState(isAuthenticated());

  React.useEffect(() => {
    if (access_token && state === localStorage.getItem('randomState')) {
      localStorage.setItem('token', access_token);
      localStorage.setItem(
        'tokenExpiration',
        new Date().getTime() + expires * 1000
      );
      setAuthenticated(true);
    } else {
      localStorage.setItem('randomState', Math.random());
    }
  }, [access_token, expires, state]);

  const handleOnClick = () => {
    window.location.href = encodeURI(
      `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${window
        .location.origin + '/auth'}&state=${localStorage.getItem(
        'randomState'
      )}&scope=${encodeURIComponent(scopes)}`
    );
  };

  return authenticated ? (
    <Redirect to='/tracks' />
  ) : (
    <button onClick={handleOnClick}>Authenticate</button>
  );
};

export default Auth;
