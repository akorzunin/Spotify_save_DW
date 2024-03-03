import ReactDOM from 'react-dom/client';
import React from 'react';
import { Provider } from 'react-redux';

import './index.css';
import { store } from './store/store';
import { ErrorBoundary } from 'react-error-boundary';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserPage from './pages/user/UserPage';
import MainPage from './pages/main/MainPage';
import AboutPage from './pages/about/AboutPage';
import GetTokenPage from './pages/get_token/GetTokenPage';
import GetLoginPage from './pages/login/GetLoginPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/app',
    element: <MainPage />,
  },
  {
    path: '/app/user/:id',
    element: <UserPage />,
  },
  {
    path: '/app/help',
    element: <AboutPage />,
  },
  {
    path: '/get_token',
    element: <GetTokenPage />,
  },
  {
    path: '/login',
    element: <GetLoginPage />,
  },
]);
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
