import { useLoaderData, Outlet, LoaderFunction, useSearchParams } from 'react-router-dom';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get('q');

  console.log(searchTerm);
  return Promise.resolve([
    {
      id: 'abc',
      title: 'Fake Note',
      content: "We'll replace this with real data soon",
    },
  ]);
};

export default function Root() {
  // const notes = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setSearchParams({ q: 'heu' });
        }}
      >
        hello
      </button>

      <Outlet />
    </div>
  );
}
