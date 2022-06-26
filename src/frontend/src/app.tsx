import React, { Component } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Button from "./components/Button";
import BlobButton from "./components/BlobButton";


export const App = () => {
    return (
        <div >
            <Header 
                title='Home' 
            />
            <Button
                    title="Help"
                    link="/help"
                    color={undefined}
                />
            <Button
                title="Login"
                link="/login"
                color={undefined}
            />
            <Button
                title="Try it"
                link="/login"
                color={undefined}
            />
            <BlobButton
                title={undefined}
                link={undefined}
            />
            <Footer />
        </div>
    )
}


export default App;