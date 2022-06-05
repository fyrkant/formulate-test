import React from 'react';
import { Repository } from '../api';
import { RepoListItem } from './RepoListItem';

export const RepoList: React.FC<{
  repos: Repository[];
  activeRepo: string | undefined;
  setActiveRepo: (id: string | undefined) => void;
}> = ({ repos, activeRepo, setActiveRepo }) => {
  return (
    <ul className="repo-list">
      {repos.map((repo) => {
        return <RepoListItem key={repo.id} activeRepo={activeRepo} setActiveRepo={setActiveRepo} repo={repo} />;
      })}
    </ul>
  );
};
