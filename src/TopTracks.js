import React from 'react';

const TopTracks = () => {
  const [tracks, setTracks] = React.useState([]);

  React.useEffect(() => {
    const fetchTopTracks = async () => {
      const { items } = await fetch(
        'https://api.spotify.com/v1/me/top/tracks',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        }
      ).then(res => res.json());

      const tracks = items.map(({ name }) => name);

      setTracks(tracks);
    };

    fetchTopTracks();
  }, []);

  return (
    <div class='content'>
      <ol type='1'>
        {tracks.map(track => (
          <li>{track}</li>
        ))}
      </ol>
    </div>
  );
};

export default TopTracks;
