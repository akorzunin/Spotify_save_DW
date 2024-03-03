import React, { FC } from 'react';

const GetLoginPage: FC = () => {
  window.location.href = `${import.meta.env.VITE_API_URL}/login`;
  return null;
};

export default GetLoginPage;
