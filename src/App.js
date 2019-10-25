import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from 'react-router-dom';

import Auth from './Auth';
import PrivateRoute from './PrivateRoute';
import TopTracks from './TopTracks';

const App = () => {
  return (
    <Router>
      <header>
        <h1>My Top Tracks</h1>
        <h2>Discover and share your most played Spotify tracks</h2>
      </header>
      <Switch>
        <PrivateRoute
          exact
          path='/'
          component={() => <p>Hello Authenitcated World</p>}
        />
        <Route path='/auth' component={Auth} />
        <PrivateRoute path='/tracks' component={TopTracks} />
        <Redirect to='/auth' />
      </Switch>
    </Router>
  );
};

export default App;
