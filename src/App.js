import React from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { RestfulProvider } from 'restful-react';

import PrivateRoute from './PrivateRoute';
import Modal from './Modal';
import { useAuthentication } from './useAuthentication';
import TracksView from './TracksView';

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
    <RestfulProvider
      base='https://api.spotify.com/v1'
      requestOptions={{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }}
    >
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
            <PrivateRoute path='/tracks' component={TracksView} />
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
              services. Once you have logged in you will be redirected back to
              My Top Tracks.
            </p>
          </Modal>
        </section>
      </Router>
    </RestfulProvider>
  );
};

export default App;
