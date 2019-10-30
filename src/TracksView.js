import React from 'react';
import { useGet } from 'restful-react';
import Dropdown from './Dropdown';

const TIME_RANGES = {
  short: 'short_term',
  medium: 'medium_term',
  long: 'long_term'
};

function TracksView() {
  const [timeRange, setTimeRange] = React.useState(TIME_RANGES.medium);

  const { data, error, loading } = useGet({
    path: '/me/top/tracks',
    queryParams: {
      limit: 50,
      time_range: timeRange
    },
    resolve: ({ items = [], ...rest }) => ({
      ...rest,
      items: items.map(({ name, artists }) => ({
        name,
        artist: artists[0].name
      }))
    })
  });

  const handleOnSelect = ({ value }) => {
    setTimeRange(value);
  };

  const tracks = data ? data.items : [];

  return (
    <div className='content'>
      <Dropdown
        options={[
          { value: TIME_RANGES.short, label: 'Short Term (4 weeks)' },
          { value: TIME_RANGES.medium, label: 'Mid Term (6 months)' },
          { value: TIME_RANGES.long, label: 'Long Term (all time)' }
        ]}
        defaultOption={{
          value: TIME_RANGES.medium,
          label: 'Mid Term (6 months)'
        }}
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
