import debounce from 'lodash/debounce';
import React from 'react';

interface Props {
  onSearch: (search: string) => void;
  paramValue: string;
}

export const DebouncedSearch = React.forwardRef<HTMLInputElement, Props>(({ onSearch, paramValue }, ref) => {
  const [searchInputValue, setSearchInputValue] = React.useState(paramValue);

  React.useEffect(() => {
    setSearchInputValue(paramValue);
  }, [paramValue]);

  const debouncedHandleSearch = React.useMemo(() => {
    return debounce(onSearch, 200);
  }, [onSearch]);

  React.useEffect(() => {
    debouncedHandleSearch(searchInputValue);
  }, [debouncedHandleSearch, searchInputValue]);

  React.useEffect(() => {
    return () => {
      debouncedHandleSearch.cancel();
    };
  }, [debouncedHandleSearch]);

  return (
    <input
      ref={ref}
      type="search"
      value={searchInputValue}
      placeholder="Search on repo name..."
      onChange={(e) => {
        setSearchInputValue(e.target.value);
      }}
    />
  );
});

DebouncedSearch.displayName = 'DebouncedSearch';
