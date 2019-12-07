import React from 'react';
import qs from 'query-string';

// import Dropdown from './Dropdown';
import { useFetch } from './useFetch';
import { useAuthentication } from './useAuthentication';

const Dropdown = () => null;
const timeRanges = {
  short: { value: 'short_term', label: 'Short Term (4 weeks)' },
  medium: { value: 'medium_term', label: 'Mid Term (6 months)' },
  long: { value: 'long_term', label: 'Long Term (all time)' }
};

function TracksView() {
  const [timeRange, setTimeRange] = React.useState(timeRanges.medium.value);
  const { token } = useAuthentication();
  const fetchOpts = React.useMemo(
    () => ({
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    }),
    [token]
  );

  const { data } = useFetch(
    `https://api.spotify.com/v1/me/top/tracks?${qs.stringify({
      limit: 50,
      time_range: timeRange
    })}`,
    fetchOpts
  );

  const handleOnSelect = ({ value }) => {
    setTimeRange(value);
  };

  const tracks = React.useMemo(() => {
    if (!data || !data.items) return [];

    return data.items.map(({ name, artists }) => ({
      name,
      artist: artists[0].name
    }));
  }, [data]);

  return (
    <div className='content'>
      <Dropdown
        options={Object.values(timeRanges)}
        defaultOption={timeRanges.medium}
        onSelect={handleOnSelect}
      />
      <Tracks tracks={tracks} />
    </div>
  );
}

function Tracks({ tracks = [] }) {
  return (
    <ol type='1'>
      {tracks.map((track, idx) => (
        <li key={`${track.name}-${idx}`}>
          <Track {...track} />
        </li>
      ))}
    </ol>
  );
}

function Track({ name, artist }) {
  return `${artist}, ${name}`;
}

export default TracksView;
