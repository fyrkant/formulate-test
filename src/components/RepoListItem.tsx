import { Repository } from '../api';
import { truncateString, formatNumber } from '../utils';
import { Repo, Star, Fork } from './Icons';
import { LanguageLine } from './LanguageLine';

export const RepoListItem: React.FC<{
  activeRepo: string | undefined;
  setActiveRepo: (id: string | undefined) => void;
  repo: Repository;
}> = ({ activeRepo, setActiveRepo, repo }) => {
  return (
    <li className={repo.id === activeRepo ? 'active' : ''}>
      <button
        type="button"
        onClick={() => {
          setActiveRepo(repo.id === activeRepo ? undefined : repo.id);
        }}
      >
        <p title={repo.name} className="name with-icon">
          <Repo />
          {truncateString(repo.name, 20)}
        </p>
        <p className="description">{truncateString(repo.description, 50)}</p>
        <div className="footer">
          {repo.primaryLanguage ? (
            <LanguageLine name={repo.primaryLanguage.name} color={repo.primaryLanguage.color} />
          ) : null}
          <p className="with-icon">
            <Star />
            {formatNumber(repo.stargazerCount)}
          </p>
          <p className="with-icon">
            <Fork />
            {formatNumber(repo.forkCount)}
          </p>
        </div>
      </button>
    </li>
  );
};
