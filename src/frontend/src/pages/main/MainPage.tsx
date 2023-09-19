import React from 'react';
import Cookies from 'universal-cookie';

import MainHeader from '../../components/main-header/MainHeader';
import Footer from '../../components/Footer';
import Button from '../../components/buttons/BaseButton';
import BlobButton from '../../components/buttons/BlobButton';
import * as cookieHandle from '../../utils/cookieHandle';

export const MainPage = () => {
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
  }, []);
  const cookiesLib = new Cookies();
  const cookies = cookiesLib.getAll();
  return (
    <>
      <div className="min-h-screen">
        <header className="flex justify-between">
          <MainHeader title="Home" />
          <div className="mr-4 mt-4 flex">
            <div className="mr-3">
              <Button
                style=""
                title="Layout Demo"
                link="/user/demo_user"
                color="bg-white"
              />
            </div>
            <div className="mr-3">
              <Button
                style=""
                title="Help"
                link="/help" //use useNavigate
                color="bg-white"
              />
            </div>
            <Button
              title="Login"
              link={`${import.meta.env.VITE_API_URL}/login`}
              color="bg-white"
            />
          </div>
        </header>
        <main className="">
          <BlobButton title="Save DW" link={userPath} />
        </main>
      </div>
      <Footer style={'fixed bottom-0'} />
    </>
  );
};

export default MainPage;
