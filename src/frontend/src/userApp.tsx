import React, { Component, useState, useEffect } from "react"

import Footer from "./components/Footer"
import Button from "./components/Button"
import LogoutButton from "./components/LogoutButton"
import UserCard from "./components/UserCard"
import FullPlaylist from "./components/FullPlaylist"
import SongCard from "./components/SongCard"

import * as cookieHandle from "./components/utils/cookieHandle"
import * as apiManager from "./components/utils/apiManager"
import SavePlaylist from "./components/SavePlaylist"
import Burger from "./components/Burger"
import BurgerMenu from "./components/BurgerMenu"
import { Link, useParams } from "react-router-dom"
import SettingsPanel from "./components/SettingsPanel"

export const UserApp = () => {
    // vars
    const ButtonStyle = "mr-3 text-neutral-900"
    const emptySong = {
        name: "No track data",
        imgUrl: "https://i.scdn.co/image/ab67616d000048514ce8b4e42588bf18182a1ad2",
        artists: "No artist data",
    }
    let { user_id } = useParams()
    // States
    const [User, setUser] = useState({
        name: undefined,
        img: undefined,
        followers: undefined,
        isPremium: false,
    })
    const [PlSongs, setPlSongs] = useState("No songs")
    const [isDW, setIsDW] = useState(false)
    const [PlaylistName, setPlaylistName] = useState("No playlist name")
    const [CurrentSong, setCurrentSong] = useState(emptySong)
    const [burgerClass, setburgerClass] = useState("")
    const [cookie, setCookie] = useState(cookieHandle.readCookies()[0])
    // functions
    const isDiscoverWeekly = (data): boolean => {
        return data.images[0].url.search("discover") > 0 ? true : false
    }
    const usePlaylistData = (info) => {
        const songs = info[0]
        const data = info[1]
        const currentSong = info[2]
        if (data) {
            setPlaylistName(data.name)
            setIsDW(isDiscoverWeekly(data))
        }
        setCurrentSong(currentSong)
        setPlSongs(songs)
    }
    const setDefaults = () => {
        setPlSongs("No songs")
        setIsDW(false)
        setPlaylistName("No playlist name")
        setCurrentSong(emptySong)
    }
    // Effects
    useEffect(() => {
        // get user data
        apiManager.getUserData(cookie).then((user) => {
            setUser(user)
        })
        let data
        // look for user palyback
        apiManager
            .getPlayBackSongs(cookie)
            .then((plData) => {
                usePlaylistData(plData)
            })
            .catch((error) => {
                console.log(error)
            })
        const updateInterval = setInterval(function () {
            apiManager.getUserPlayback(cookie).then((tempData) => {
                // debugger

                if (!tempData) {
                    setDefaults()
                }
                if (typeof data === "undefined") {
                    // init data variable w/ available content
                    data = tempData
                }
                if (data) {
                    // debugger
                    if (data.error) {
                        if (data.error.status > 399) {
                            clearInterval(updateInterval)
                            throw new Error(data.error.message)
                        }
                    }
                    // check that playback was not empty
                    if (tempData) {
                        //  if there is no changes in playback, dont request songs
                        if (data.item.uri != tempData.item.uri) {
                            data = tempData
                            // debugger
                            apiManager
                                .getPlayBackSongs(cookie)
                                .then((plData) => {
                                    usePlaylistData(plData)
                                })
                                .catch((error) => {
                                    console.log(error)
                                    clearInterval(updateInterval)
                                })
                        }
                    }
                }
            })
        }, 2000)
    }, [])

    return (
        <>
            <div className="min-h-screen">
                <header className="flex justify-between mb-12 relative">
                    <UserCard
                        userName={User.name}
                        imgUrl={User.img}
                        followers={User.followers}
                    />
                    <SongCard
                        song={CurrentSong}
                        index={""}
                        isDeletable={false}
                        onDelete={undefined}
                        isHidden={undefined}
                    />
                    <div className=" items-center hidden lg:flex">
                        <Link to="/help">
                            <Button
                                style={ButtonStyle}
                                title="Help"
                                link="/help"
                                color="bg-white text-black"
                            />
                        </Link>
                        <Link to="/">
                            <Button
                                style={ButtonStyle}
                                title="Home"
                                link="/"
                                color="bg-white text-black"
                            />
                        </Link>
                        <LogoutButton ButtonStyle={"ml-12 "} />
                    </div>
                    <div className="block lg:hidden">
                        <Burger
                            burgerClass={burgerClass}
                            handleBM={() => {
                                setburgerClass(
                                    burgerClass
                                        ? ""
                                        : "header__burger-menu_active"
                                )
                            }}
                        />
                    </div>
                </header>
                <main className="">
                    <div className="xl:flex">
                        <div className="lg:flex justify-center">
                            <FullPlaylist
                                PlaylistName={PlaylistName}
                                PlSongs={PlSongs}
                                isDW={isDW}
                                style={"max-h-[70vh] max-w-md"}
                            />
                            <SavePlaylist
                                playbackSong={CurrentSong}
                                fullPlaylist={PlSongs}
                                isDW={isDW}
                                cookie={cookie}
                                style={"max-h-[70vh] max-w-md"}
                            />
                        </div>
                        <div className="flex justify-center">
                            <SettingsPanel IsPremium={User.isPremium} />
                        </div>
                    </div>
                </main>
            </div>
            <Footer style={""} />
            <BurgerMenu burgerClass={burgerClass} ButtonStyle={ButtonStyle} />
        </>
    )
}

export default UserApp
