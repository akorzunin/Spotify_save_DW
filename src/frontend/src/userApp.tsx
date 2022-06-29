import React, { Component, useState, useEffect } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Button from "./components/Button";
import BlobButton from "./components/BlobButton";
import ClickButton from "./components/ClickButton";
import LogoutButton from "./components/LogoutButton";
import UserCard from "./components/UserCard";
import { WeekCounter } from "./components/WeekCounter";
import Playlist from "./components/Playlist";
import FullPlaylist from "./components/FullPlaylist";

import * as cookieHandle from "./components/utils/cookieHandle"
import * as timeMangment from "./components/utils/timeMangment"
import * as apiManager from "./components/utils/apiManager"

export const UserApp = () => {
    const [Session, setSession] = useState("SaveDW")
    const [User, setUser] = useState({
        name: undefined, 
        img: undefined,
        followers: undefined,
    })
    const cookie = cookieHandle.readCookies()[0]
    const ButtonStyle = "mr-3"

    useEffect(() => {
        apiManager.getUserData(cookie)
            .then((user) => {
                setUser(user)
            })
    }, [])
    
    return (
        <>
        <header className="flex justify-between">
            <UserCard 
                userName={User.name}
                imgUrl={User.img}
                followers={User.followers}
            />
            <WeekCounter className={undefined} />
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
            <FullPlaylist
                // title="Current playlist"
                cookie = {cookie}
            />

        </main>
        <Footer 
            style={undefined}
        />
        </>
    )
}


export default UserApp;