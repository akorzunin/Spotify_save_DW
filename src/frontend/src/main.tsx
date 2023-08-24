import ReactDOM from 'react-dom/client';
import React from 'react';
import { Provider } from 'react-redux';
import { Routes, Route, HashRouter } from 'react-router-dom';
import App from './pages/app';
import UserApp from './pages/userApp';
import { AboutPage } from './pages/aboutPage';
import './index.css';
import { store } from './store/store';

ReactDOM.createRoot(document.getElementById('app')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/user/:user_id" element={<UserApp />} />
                    <Route path="/help" element={<AboutPage />} />
                </Routes>
            </HashRouter>
        </Provider>
    </React.StrictMode>
);
