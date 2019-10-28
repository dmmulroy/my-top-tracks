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
import Modal from './Modal';

const App = () => {
  return (
    <Router>
      <section className='is-fullheight'>
        <div className='columns is-desktop is-vcentered has-text-centered'>
          <div className='column is-half is-offset-3'>
            <h1 className='title'>My Top Tracks</h1>
            <h2 className='subtitle'>
              Discover and share your most played Spotify tracks
            </h2>
            <button class='button is-primary'>Get Started</button>
          </div>
        </div>
        {/* <Switch>
          <Route path='/auth' component={Auth} />
          <PrivateRoute path='/tracks' component={TopTracks} />
          <Redirect to='/auth' />
        </Switch> */}
      </section>
      <Modal open />
    </Router>
  );
};

export default App;
