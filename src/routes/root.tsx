import { useLoaderData, Outlet, LoaderFunction, useSearchParams, json } from 'react-router-dom';
import { z } from 'zod';

const graphql = /* GraphQL */ `
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
const graphql2 = /* GraphQL */ `
  query SearchCountries($query: String!) {
    countries(name_Icontains: $query, first: 20) {
      edges {
        node {
          name
          capital
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
`;

const countriesSchema = z.object({
  node: z.object({
    name: z.string(),
    capital: z.string(),
    languages: z.object({
      edges: z.array(
        z.object({
          node: z.object({
            name: z.string(),
          }),
        })
      ),
    }),
  }),
});

const loaderSchema = z.object({
  data: z.object({
    countries: z.object({
      edges: z.array(countriesSchema),
    }),
  }),
});

type Data = z.infer<typeof loaderSchema>;

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get('query') || '';

  const res = await fetch('https://graphql.country/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ variables: { query }, query: graphql2 }),
  });

  const jsonData = (await res.json()) as unknown;

  const parsed = loaderSchema.safeParse(jsonData);

  if (!parsed.success) {
    throw new Error(parsed.error.toString());
  }

  return json(parsed.data);
};

export default function Root() {
  const loaderData = useLoaderData() as Data;
  const [searchParams, setSearchParams] = useSearchParams();

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

      <ul>
        {loaderData.data.countries.edges.map(({ node }) => {
          return (
            <li key={node.name}>
              <h2>{node.name}</h2>
              <p>{node.capital}</p>
              <ul>
                {node.languages.edges.map(({ node: language }) => {
                  return <li key={language.name}>{language.name}</li>;
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
