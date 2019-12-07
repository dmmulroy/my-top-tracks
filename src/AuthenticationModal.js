import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

const noop = () => {};

function AuthenticationModal({
  open = false,
  onSubmit = noop,
  onClose = noop,
  onCancel = noop
}) {
  return (
    <Modal open={open} onClose={onClose} size='tiny'>
      <Modal.Header>Authenticate with Spotify</Modal.Header>
      <Modal.Content>
        <p>
          This will navigate you to Spotify to authenticate with their services.
          Once you have logged in you will be redirected back to My Top Tracks.
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button primary onClick={onSubmit}>
          Proceed
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default AuthenticationModal;
