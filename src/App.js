import React from 'react';
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { Header, Button } from 'semantic-ui-react';

import PrivateRoute from './PrivateRoute';
import AuthenticationModal from './AuthenticationModal';
import { useAuthentication } from './useAuthentication';
import TracksView from './TracksView';

import styles from './App.module.css';

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
      <section className={styles.container}>
        <header>
          <Header as='h1'>
            My Top Tracks
            <Header.Subheader>
              Discover and share your most played Spotify tracks
            </Header.Subheader>
          </Header>
        </header>
        {!authenticated && (
          <Button primary onClick={handleOnClick}>
            Get Started
          </Button>
        )}
        <Switch>
          <PrivateRoute path='/tracks' component={TracksView} />
          <Redirect to={authenticated ? '/tracks' : '/'} />
        </Switch>
      </section>
      <AuthenticationModal
        open={modalOpen}
        onSubmit={handleOnSubmit}
        onCancel={handleOnClose}
        onClose={handleOnClose}
      />
    </Router>
  );
};

export default App;
