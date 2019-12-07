import React from 'react';
import { Modal, Button } from 'semantic-ui-react';

const noop = () => {};

function RemoveSongModal({
  playlistName,
  playlistId,
  songId,
  songName,
  open = false,
  onRemove = noop,
  onClose = noop,
  onCancel = noop
}) {
  return (
    <Modal open={open} onClose={onClose} size='tiny'>
      <Modal.Header>Remove Song Confirmation</Modal.Header>
      <Modal.Content>
        <p>
          Are you sure you want to remove <strong>{songName}</strong> from your{' '}
          <strong>{playlistName}</strong> playlist?
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button primary onClick={() => onRemove({ playlistId, songId })}>
          Remove
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default RemoveSongModal;
