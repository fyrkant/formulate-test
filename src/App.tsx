import React from 'react';
import { DebouncedSearch } from './components/DebouncedInput';
import { RepoList } from './components/RepoList';
import { useGithubRepoData } from './hooks/useGithubRepoData';
import { useSearchParams } from './hooks/useSearchParams';

export const App = () => {
  const { search, data, reset, error, status } = useGithubRepoData();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.query || '';

  const [activeRepo, setActiveRepo] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    if (query) {
      search(query);
    }
  }, [query, search]);

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.select();
    }
  }, []);

  const handleSearch = React.useCallback(
    (s: string) => {
      if (s === '') {
        reset();
        setSearchParams({});
      } else {
        setSearchParams({ query: s });
      }
    },
    [reset, setSearchParams]
  );

  const handleReset = () => {
    setSearchParams({});
    reset();
  };

  return (
    <main className="container">
      <header>
        <h1>Repo Search</h1>
        <button type="button" className="reset" onClick={handleReset}>
          reset
        </button>
      </header>

      <div className="search-bar">
        <DebouncedSearch
          placeholder="Search for github repository..."
          ref={inputRef}
          onSearch={handleSearch}
          paramValue={query}
        />
        {status === 'pending' ? <div className="spinner" /> : null}
      </div>

      {error ? (
        <div className="error">
          <p>Something went wrong! 😭</p>
          <p>Message: {error.message}</p>
        </div>
      ) : null}

      <RepoList repos={data || []} activeRepo={activeRepo} setActiveRepo={setActiveRepo} />
    </main>
  );
};
