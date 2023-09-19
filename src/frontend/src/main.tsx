import ReactDOM from 'react-dom/client';
import React from 'react';
import { Provider } from 'react-redux';

import './index.css';
import { store } from './store/store';
import { ErrorBoundary } from 'react-error-boundary';
import App from './pages/App';
import { HashRouter } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Provider store={store}>
        <HashRouter>
          <App />
        </HashRouter>
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
