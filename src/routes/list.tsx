import React from 'react';
import { LoaderFunction, json, useLoaderData } from 'react-router-dom';
import { Repository, searchRepos } from '../api';
import { RepoListItem } from '../components/RepoListItem';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get('query') || '';

  if (!query) {
    return json([]);
  }

  const data = await searchRepos(query);

  return data.data.search.nodes;
};

const List = () => {
  const [activeRepo, setActiveRepo] = React.useState<string>();
  const loaderData = useLoaderData() as Repository[];
  return (
    <ul className="repo-list">
      {loaderData.map((repo) => {
        return <RepoListItem key={repo.id} activeRepo={activeRepo} setActiveRepo={setActiveRepo} repo={repo} />;
      })}
    </ul>
  );
};

export default List;
