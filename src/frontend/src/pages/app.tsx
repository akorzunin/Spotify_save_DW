import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import UserPage from './user/UserPage';
import MainPage from './main/MainPage';
import AboutPage from './about/AboutPage';

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/user/:user_id" element={<UserPage />} />
      <Route path="/help" element={<AboutPage />} />
    </Routes>
  );
};

export default App;
