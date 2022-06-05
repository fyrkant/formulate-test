const gql = /* GraphQL */ `
  query SearchRepos($query: String = "") {
    search(first: 20, type: REPOSITORY, query: $query) {
      nodes {
        ... on Repository {
          name
          description
          stargazerCount
          forkCount
          id
          primaryLanguage {
            name
            color
          }
        }
      }
    }
  }
`;

export interface Repository {
  name: string;
  description: string;
  stargazerCount: number;
  forkCount: number;
  id: string;
  primaryLanguage: {
    name: string;
    color: string;
  };
}

interface ApiResponse<T> {
  data: {
    search: {
      nodes: T[];
    };
  };
}

export const searchRepos = (query: string) => {
  return fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      Authorization: `bearer ${import.meta.env.VITE_GITHUB_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ variables: { query }, query: gql }),
  }).then((res) => {
    return res.json() as Promise<ApiResponse<Repository>>;
  });
};
