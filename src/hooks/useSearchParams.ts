import React from 'react';

const getInitial = () => {
  const { search } = window.location;
  const params = new URLSearchParams(search);
  const initial: Record<string, string> = {};
  params.forEach((value, key) => {
    initial[key] = value;
  });
  return initial;
};

export const useSearchParams = () => {
  const [searchParams, doSetSearchParams] = React.useState(getInitial);

  const setSearchParams = React.useCallback((params: Record<string, string>) => {
    console.log('setSearchParams', params);
    const newSearchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      newSearchParams.set(key, value);
    });
    doSetSearchParams(params);
    window.history.replaceState(null, '', `?${newSearchParams.toString()}`);
  }, []);

  return [searchParams, setSearchParams] as const;
};
