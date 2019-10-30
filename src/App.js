import React from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import TopTracks from './TopTracks';
import Modal from './Modal';
import { useAuthentication } from './useAuthentication';

const clientId = 'bee21f221b7149cca1c835f8a9e9fa5a';
const scopes = 'user-top-read playlist-modify-public playlist-modify-private';

const App = () => {
  const [modalOpen, setModalOpen] = React.useState(false);

  const { authenticated, randomState } = useAuthentication();

  const handleOnClick = () => setModalOpen(true);

  const handleOnClose = () => setModalOpen(false);

  const handleOnSubmit = () => {
    window.location.href = encodeURI(
      `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${
        window.location.origin
      }&state=${randomState}&scope=${encodeURIComponent(scopes)}`
    );
  };

  return (
    <Router>
      <section className='container'>
        <h1 className='title'>My Top Tracks</h1>
        <h2 className='subtitle'>
          Discover and share your most played Spotify tracks
        </h2>
        {!authenticated && (
          <button className='button is-primary' onClick={handleOnClick}>
            Get Started
          </button>
        )}
        <Switch>
          <PrivateRoute path='/tracks' component={TopTracks} />
          <Redirect to={authenticated ? '/tracks' : '/'} />
        </Switch>
        <Modal
          title={'Authenticate with Spotify'}
          open={modalOpen}
          onSubmit={handleOnSubmit}
          onClose={handleOnClose}
          onCancel={handleOnClose}
        >
          <p>
            This will navigate you to Spotify to authenticate with their
            services. Once you have logged in you will be redirected back to My
            Top Tracks.
          </p>
        </Modal>
      </section>
    </Router>
  );
};

export default App;
