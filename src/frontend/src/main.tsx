import ReactDOM from 'react-dom/client';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './index.css';
import { ErrorBoundary } from 'react-error-boundary';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import UserPage from './pages/user/UserPage';
import MainPage from './pages/main/MainPage';
import AboutPage from './pages/about/AboutPage';
import GetTokenPage from './pages/get_token/GetTokenPage';
import GetLoginPage from './pages/login/GetLoginPage';
const queryClient = new QueryClient();

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
    path: '/app/user/:userId',
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
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
