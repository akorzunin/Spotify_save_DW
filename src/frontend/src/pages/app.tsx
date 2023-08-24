import React from 'react';
import Cookies from 'universal-cookie';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Buttons/BaseButton';
import BlobButton from '../components/Buttons/BlobButton';
import * as cookieHandle from '../utils/cookieHandle';

export const App = () => {
    // handle cookies
    const [userPath, setUserPath] = React.useState('/login');
    React.useEffect(() => {
        if (cookieHandle.isValidCookies(cookies)) {
            cookieHandle
                .getUserPath(cookies)
                .then((res) => {
                    setUserPath(res);
                })
                .catch((err: string) => {
                    console.warn('Cant get user info ' + err);
                    setUserPath('/login');
                });
        } else {
            setUserPath('/login');
        }
    }, []);
    const cookiesLib = new Cookies();
    const cookies = cookiesLib.getAll();
    return (
        <>
            <div className="min-h-screen">
                <header className="flex justify-between">
                    <Header title="Home" />
                    <div className="mt-4 mr-4 flex">
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
                        <Button title="Login" link="/login" color="bg-white" />
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

export default App;
