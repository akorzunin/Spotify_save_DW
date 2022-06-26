import React, { Component } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Button from "./components/Button";
import BlobButton from "./components/BlobButton";


export const App = () => {
    const ButtonStyle = ""
    return (
        <>
        <header className="flex justify-between">
            <Header
                title='Home'
            />
            <div className="mt-4 mr-4">
                <Button
                        style={ButtonStyle}
                        title="Help"
                        link="/help"
                        color={undefined}
                    />
                <Button
                    style={ButtonStyle+" ml-3"}
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
                link={undefined}
            />

        </main>
        <Footer />
        </>
    )
}


export default App;