import React from 'react';

const TopTracks = () => {
  const [tracks, setTracks] = React.useState([]);

  React.useEffect(() => {
    const fetchTopTracks = async () => {
      const { items } = await fetch(
        'https://api.spotify.com/v1/me/top/tracks?limit=50',
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            Accept: 'application/json'
          }
        }
      ).then(res => res.json());

      const tracks = items.map(({ name, artists }) => ({
        name,
        artist: artists[0].name
      }));

      setTracks(tracks);
    };

    fetchTopTracks();
  }, []);

  return (
    <div class='content'>
      <ol type='1'>
        {tracks.map(({ name, artist }) => (
          <li>{`${artist}, ${name}`}</li>
        ))}
      </ol>
    </div>
  );
};

export default TopTracks;
