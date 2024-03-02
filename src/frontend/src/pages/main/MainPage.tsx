/// <reference types="vite/client" />
import React, { FC } from 'react';
import Cookies from 'universal-cookie';

import Footer from '../../components/Footer';
import Button from '../../components/buttons/BaseButton';
import BlobButton from '../../components/buttons/blob-button/BlobButton';
import * as cookieHandle from '../../utils/cookieHandle';

export const MainPage: FC = () => {
  // handle cookies
  const [userPath, setUserPath] = React.useState(
    `${import.meta.env.VITE_API_URL}/login`
  );
  React.useEffect(() => {
    if (cookieHandle.isValidCookies(cookies)) {
      cookieHandle
        .getUserPath(cookies)
        .then((res) => {
          setUserPath(res);
        })
        .catch((err: string) => {
          console.warn('Cant get user info ' + err);
          setUserPath(`${import.meta.env.VITE_API_URL}/login`);
        });
    } else {
      setUserPath(`${import.meta.env.VITE_API_URL}/login`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const cookiesLib = new Cookies();
  const cookies = cookiesLib.getAll();

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
          <BlobButton title="Save DW" link={userPath} />
        </section>
      </main>
      <Footer style={'fixed bottom-0'} />
    </>
  );
};

export default MainPage;
