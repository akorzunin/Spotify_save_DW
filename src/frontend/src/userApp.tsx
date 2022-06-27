import React, { Component } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Button from "./components/Button";
import BlobButton from "./components/BlobButton";
import ClickButton from "./components/ClickButton";
import * as cookieHandle from "./components/utils/cookieHandle"
import LogoutButton from "./components/LogoutButton";

export const UserApp = () => {
    const ButtonStyle = "mr-3"
    return (
        <>
        <header className="flex justify-between">
            {/* <Header
                title='Home'
            /> */}
            {/* <UserCard /> */}
            <h1>User info Placeholder</h1>
            <div className="mt-4 mr-4">
                <Button
                        style={ButtonStyle}
                        title="Home"
                        link="/"
                        color="bg-green-500"
                    />
                <LogoutButton
                    ButtonStyle={ButtonStyle}
                />
            </div>
        </header>
        <main className="">
            <h1>Pepe</h1>
                {/* <ContentCard /> */}
                {/* <FullDWpl /> */}
                    {/* <SongCard /> */}
                {/* <SongCard... /> */}

        </main>
        <Footer 
            style={undefined}
        />
        </>
    )
}


export default UserApp;