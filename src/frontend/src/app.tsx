import React, { Component } from "react";
import Cookies from 'universal-cookie';
// import { Link } from "react-router-dom";
// import {
//     BrowserRouter as Router,
//     Routes,
//     useRoutes,
//     Route,
//     useNavigate,
// } from 'react-router-dom';

import Header from "./components/Header";
import Footer from "./components/Footer";
import Button from "./components/Button";
import BlobButton from "./components/BlobButton";

import * as cookieHandle from "./utils/cookieHandle"
import ClickButton from "./components/ClickButton";

export const App = () => {
    // handek cookies
    const [userPath, setUserPath] = React.useState("/login");
    React.useEffect(() => {
        cookieHandle.getUserPath(cookies)
            .then((res) => {
                setUserPath(res)
                    .catch((err) => {
                        console.warn("Cant get user info " + err);
                        setUserPath("/login")
                    })
            })
    }, [])
    const cookiesLib = new Cookies()
    const cookies = cookiesLib.getAll()

    const ButtonStyle = "mr-3"
    return (
        <>
            <header className="flex justify-between">
                <Header
                    title='Home'
                />
                <div className="mt-4 mr-4">
                    <ClickButton
                        style={ButtonStyle}
                        title="Delete cookies"
                        onClick={cookieHandle.deleteCookies}
                        color="bg-red-700"
                    />
                    <Button
                        style={ButtonStyle}
                        title="Dev User"
                        link="/user/123"
                        color="bg-red-700"
                    />
                    <Button
                        style={ButtonStyle}
                        title="Help"
                        link="/help" //use useNavigate
                        color={undefined}
                    />
                    <Button
                        style={ButtonStyle}
                        title="Login"
                        link="/login"
                        color={undefined}
                    />
                </div>
            </header>
            <main className="">
                <BlobButton
                    title="Save DW"
                    link={
                        cookieHandle.validateCookies(cookies) ?
                            userPath :
                            "/login"
                    }
                />
            </main>
            <Footer
                style={undefined}
            />
        </>
    )
}

export default App;

