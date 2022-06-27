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

import * as coockieHandle from "./utils/coockieHandle"
import ClickButton from "./components/ClickButton";



export const App = () => {
    // const cookies = coockieHandle.readCoockies()
    const cookiesLib = new Cookies()
    const cookies = cookiesLib.getAll()
    // const cookies = cookiesLib.
    console.log(cookies);
    console.log(typeof cookies);
    
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
                        onClick={coockieHandle.deleteCookies}
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
            {/* <Button
                title="Try it"
                link="/login"
                color={undefined}
            /> */}

            <BlobButton
                title={undefined}
                link={ 
                    coockieHandle.validateCookies(cookies) ?
                    coockieHandle.getUserPath(cookies):
                    "/login"
                }
            />
        {/* <div>
            <h1>Bookkeeper</h1>
            <nav
                style={{
                    borderBottom: "solid 1px",
                    paddingBottom: "1rem",
                }}
            >
            <Link to="/invoices">Invoices</Link> |{" "}
            <Link to="/api/api_route">Expenses</Link>
            </nav>
        </div> */}
        </main>
        <Footer 
            style={undefined}
        />
        </>
    )
}


export default App;

