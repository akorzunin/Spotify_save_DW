import React, { Component } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Button from "./components/Button";
import BlobButton from "./components/BlobButton";
import ClickButton from "./components/ClickButton";
import * as cookieHandle from "./components/utils/cookieHandle"
import * as timeMangment from "./components/utils/timeMangment"
import LogoutButton from "./components/LogoutButton";
import UserCard from "./components/UserCard";

export const UserApp = () => {
    const ButtonStyle = "mr-3"
    return (
        <>
        <header className="flex justify-between">
            {/* <Header
                title='Home'
            /> */}
            <UserCard 
                userName={undefined}
                imgUrl={undefined}
                followers={undefined}
            />
            <Button
                title={
                    timeMangment
                    .getWeekNumber(new Date())
                    .join(" ") 
                }
                color="bg-green-400"
                link={undefined}
                style={undefined}
            />
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