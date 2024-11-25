/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

export const DummyPage = () => {
  const navigate = useNavigate();
  // for dev server only, production sending redirects from / by default
  useEffect(() => {
    if (window.location.pathname === '' || window.location.pathname === '/') {
      // return redirect('app');
      console.log('redirect');
      navigate('/app');
    }
  }, []);
  return <div>DummyPage</div>;
};
