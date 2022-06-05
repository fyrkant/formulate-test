import React from 'react';
import ReactDOM from 'react-dom/client';
import { DataBrowserRouter, Route } from 'react-router-dom';
import './index.css';
import Root from './routes/root';
import List, { loader as listLoader } from './routes/list';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DataBrowserRouter>
      <Route path="" element={<Root />}>
        <Route path="" element={<List />} errorElement={<pre>oh no! error!</pre>} loader={listLoader} />
      </Route>
    </DataBrowserRouter>
  </React.StrictMode>
);
