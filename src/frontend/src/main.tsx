import ReactDOM from 'react-dom/client';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './index.css';
import { ErrorBoundary } from 'react-error-boundary';
import {
  createBrowserRouter,
  Outlet,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import UserPage from './pages/user/UserPage';
import MainPage from './pages/main/MainPage';
import AboutPage from './pages/about/AboutPage';
import GetTokenPage from './pages/get_token/GetTokenPage';
import GetLoginPage from './pages/login/GetLoginPage';

// Setup OpenApi config
import './api/config';
import { getBrowserName } from './utils/compat';
import { ThemeProvider } from './shadcn/ui/theme-provider';
import { Button } from './shadcn/ui/button';
import { ModeToggle } from './shadcn/ui/theme-toggle';
import { RootLayout } from './pages/layout/RootLayout';
import { DummyPage } from './pages/dummy/DummyPage';

if (getBrowserName() === 'Firefox') {
  const root = document.getElementsByTagName('html')[0];
  root.setAttribute('class', 'ff-scrollbar');
}

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <DummyPage />,
  },
  {
    path: 'get_token',
    element: <GetTokenPage />,
  },
  {
    path: '/app/*',
    // element: <MainPage />,
    // loader: async () => {
    //   if (window.location.pathname === '' || window.location.pathname === '/') {
    //     return redirect('app');
    //   }
    //   return null;
    // },
    element: <RootLayout />,
    children: [
      {
        path: '*',
        element: <MainPage />,
      },
      {
        path: 'user/:userId',
        element: <UserPage />,
      },
      {
        path: 'help',
        element: <AboutPage />,
      },
      // {
      //   path: 'login',
      //   element: <GetLoginPage />,
      // },
    ],
  },
]);
//   }
//   {
//     path: '/',
//     element: <MainPage />,
//   },
//   {
//     path: '/app',
//     element: <MainPage />,
//   },
//   {
//     path: '/app/user/:userId',
//     element: <UserPage />,
//   },
//   {
//     path: '/app/help',
//     element: <AboutPage />,
//   },
//   {
//     path: '/get_token',
//     element: <GetTokenPage />,
//   },
//   {
//     path: '/login',
//     element: <GetLoginPage />,
//   },
// ]);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
