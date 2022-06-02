import React from 'react';
import ReactDOM from 'react-dom/client';
import { DataBrowserRouter, Route } from 'react-router-dom';
import './index.css';
import Root, { loader as rootLoader } from './routes/root';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DataBrowserRouter fallbackElement={<p>Loading...</p>}>
      <Route path="" element={<Root />} loader={rootLoader} />
    </DataBrowserRouter>
  </React.StrictMode>
);
