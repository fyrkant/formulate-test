import { useLoaderData, Outlet, LoaderFunction, useSearchParams } from 'react-router-dom';

const gql = `
query SearchRespository($query: String!) {
  search(query: $query, type: REPOSITORY, first: 20) {
    edges {
      node {
        ... on Repository {
          id
          name
          forkCount
          stargazerCount
          languages(first: 3) {
            edges {
              node {
                name
              }
            }
          }
        }
      }
    }
  }
}
`;

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get('query');

  return fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `bearer ${import.meta.env.VITE_GITHUB_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ variables: { query }, query: gql }),
  });
};

export default function Root() {
  const data = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  console.log(data);

  return (
    <main className="container">
      <h1>Country Search</h1>
      <header />

      <div className="search-bar">
        <input />
      </div>
      <button
        type="button"
        onClick={() => {
          setSearchParams({ q: 'heu' });
        }}
      >
        hello
      </button>

      <Outlet />
    </main>
  );
}
