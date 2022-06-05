import React from 'react';
import { Repository, searchRepos } from '../api';

const useSafeDispatch = <T>(dispatch: React.Dispatch<T>) => {
  const mounted = React.useRef(false);
  React.useLayoutEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    };
  }, []);
  return React.useCallback(
    (action: T) => {
      return mounted.current ? dispatch(action) : void 0;
    },
    [dispatch]
  );
};

type State = {
  status: 'idle' | 'pending' | 'rejected' | 'resolved';
  data?: Repository[];
  error?: Error | null;
};

const initialState: State = { status: 'idle', data: [], error: null };
export const useGithubRepoData = () => {
  const [{ status, data, error }, setState] = React.useReducer<(s: State, a: Partial<State>) => State>((s, a) => {
    return { ...s, ...a };
  }, initialState);

  const safeSetState = useSafeDispatch(setState);

  const search = React.useCallback(
    (query: string) => {
      safeSetState({ status: 'pending' });
      return searchRepos(query).then(
        (responseData) => {
          safeSetState({ data: responseData, status: 'resolved' });
          return responseData;
        },
        (responseError: Error) => {
          safeSetState({ status: 'rejected', error: responseError });
          return responseError;
        }
      );
    },
    [safeSetState]
  );

  const reset = React.useCallback(() => {
    return safeSetState(initialState);
  }, [safeSetState]);

  return {
    error,
    status,
    data,
    search,
    reset,
  };
};
