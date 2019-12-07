import React from 'react';
import { action } from '@storybook/addon-actions';
import RemoveSongModal from '../RemoveSongModal';

export default {
  title: 'RemoveSongModal'
};

export const base = () => (
  <RemoveSongModal
    songName='Old Town Road'
    songId='937292'
    playlistName='Country'
    playlistId='071258'
    open={true}
    onRemove={action('removeSongModal/removeClicked')}
    onCancel={action('removeSongModal/cancelClicked')}
    onClose={action('removeSongModal/closed')}
  />
);
