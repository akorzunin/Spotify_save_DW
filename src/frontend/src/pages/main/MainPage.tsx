/// <reference types="vite/client" />

import React, { FC } from 'react';
import Cookies from 'universal-cookie';

import Footer from '../../components/Footer';
import Button from '../../components/buttons/BaseButton';
import BlobButton from '../../components/buttons/blob-button/BlobButton';
import * as cookieHandle from '../../utils/cookieHandle';
import { useQuery } from '@tanstack/react-query';

export const MainPage: FC = () => {
  const cookiesLib = new Cookies();
  const cookies = cookiesLib.getAll();

  // getUserQuery
  const { data } = useQuery({
    queryKey: ['user', cookies],
    queryFn: async () => {
      const res = await cookieHandle.getUserPath(cookies);
      if (res) {
        return { userPath: res };
      }
      console.warn('Cant get user info ');
      return { userPath: `${import.meta.env.VITE_API_URL}/login` };
    },
  });

  return (
    <>
      <main className="min-h-screen">
        <header className="flex justify-between">
          <h1 className="text-6xl font-bold">Home</h1>
          <div className="mr-4 mt-4 flex gap-x-3">
            <Button
              title="Layout Demo"
              link="/user/demo_user"
              color="bg-white"
            />
            <Button
              title="Help"
              link="/help" //use useNavigate
              color="bg-white"
            />
            <Button
              title="Login"
              link={`${import.meta.env.VITE_API_URL}/login`}
              color="bg-white"
            />
          </div>
        </header>
        <section>
          <BlobButton
            title="Save DW"
            link={data?.userPath || `${import.meta.env.VITE_API_URL}/login`}
          />
        </section>
      </main>
      <Footer style={'fixed bottom-0'} />
    </>
  );
};

export default MainPage;
