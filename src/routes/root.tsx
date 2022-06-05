import { useSearchParams, Outlet } from 'react-router-dom';
import React from 'react';
import { DebouncedSearch } from '../components/DebouncedInput';

export default function Root() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  }, []);

  const handleSearch = React.useCallback(
    (search: string) => {
      setSearchParams({ query: search });
    },
    [setSearchParams]
  );

  return (
    <main className="container">
      <h1>Repo Search</h1>
      <header />

      <div className="search-bar">
        <DebouncedSearch ref={inputRef} onSearch={handleSearch} paramValue={query} />
      </div>

      <Outlet />
    </main>
  );
}
