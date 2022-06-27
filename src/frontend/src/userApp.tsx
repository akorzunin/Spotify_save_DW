import React, { Component } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Button from "./components/Button";
import BlobButton from "./components/BlobButton";


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
                <Button
                    style={ButtonStyle}
                    title="Logout"
                    link="/logout"
                    color="bg-red-500"
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