import React from 'react';

const defaultOpts = {};

export function useFetch(url, opts = defaultOpts) {
  const [{ data, error, fetching }, setState] = React.useState({
    data: null,
    error: null,
    fetching: false
  });
  const id = React.useRef(0);

  const refetch = React.useCallback(() => {
    const requestId = ++id.current;

    setState(state => ({ ...state, fetching: true }));

    fetch(url, opts)
      .then(res => res.json())
      .then(data => {
        if (requestId === id.current) {
          setState({ data, error: null, fetching: false });
        }
      })
      .catch(error => {
        if (requestId === id.current) {
          setState({ data: null, error: error.message, fetching: false });
        }
      });
  }, [url, opts]);

  React.useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, error, fetching, refetch };
}
