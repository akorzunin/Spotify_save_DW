import { SpotifyCookie } from "../interfaces/Cookies"
import { readCookies, setCookies } from "./cookieHandle"
import { emptySong, Song } from "../interfaces/Song"

import * as timeMangment from "./timeMangment"
import { DefaultUserImage } from "../components/UserCard"

const checkStatusCode = (res, updateCookie?) => {
    const logErr = (res) => {
        res.json().then((err) => {
            console.table(err.error)
        })
    }
    if (res.status > 399) {
        if (res.status === 401) {
            console.error("Token is invalid trying to refresh")
            logErr(res)
            refreshToken(updateCookie)
            return false
        }
        if (res.status === 403) {
            console.error("Need paid user for that")
            logErr(res)
            return false
        }
        if (res.status === 503) {
            // somtimes happening for no reason
            // probably cause of packet loss or sth like that
            console.warn("Connection error")
            return false
        }
    }

    return true
}

export const refreshToken = (updateCookie) => {
    const refreshToken = readCookies()[0].refresh_token
    if (refreshToken === "undefined" || typeof refreshToken === undefined) {
        throw new Error("Cant refresh token because no cookies available")
    }
    fetch(`/api/refresh_token`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
    })
        .then((res) => res.json())
        .then((data) => {
            // save data to browser cookies
            setCookies(data)
            // update React cookie state
            updateCookie(readCookies()[0])
        })
        .catch((err) => {
            console.error(err)
        })
}
export const getUserData = async (cookie: SpotifyCookie, updateCookie?) => {
    const res = await fetch("https://api.spotify.com/v1/me/", {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${cookie.token_type} ${cookie.access_token}`,
        },
    })
    if (checkStatusCode(res, updateCookie)) {
        const data = await res.json()
        let isPremium = false
        if (data.product === "premium") {
            isPremium = true
        }
        let userImage: string
        if (!data.images) {
            userImage = DefaultUserImage
        } else {
            userImage = data.images[0].url
        }
        return {
            name: data.display_name,
            img: userImage,
            followers: data.followers.total,
            id: data.id,
            isPremium: isPremium,
        }
    }
}
export const getUserPlayback = async (cookie: SpotifyCookie, updateCookie?) => {
    const localCookie: SpotifyCookie = readCookies()[0]
    const res = await fetch("https://api.spotify.com/v1/me/player", {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${localCookie.token_type} ${localCookie.access_token}`,
        },
    })
    if (res.status === 204) {
        console.info("No content")
        return false
    }
    if (checkStatusCode(res, updateCookie)) {
        const data = await res.json()
        return data
    }
    return false
}

const isPlaybackPlaylist = (data): string | boolean => {
    try {
        if (data.context.type === "playlist") {
            return data.context.uri
        } else if (data.context.type === "collection") {
            console.warn("No playlist found, collection is playing")
            return false
        } else {
            debugger
            throw new Error("No playlist found")
        }
    } catch (err) {
        if (err instanceof TypeError) {
            if (data.item.type === "track") {
                console.warn("No playlist found")
                return false
            }
            throw new Error("No playlist in a playback")
        } else {
            throw err // re-throw the error unchanged
        }
    }
}
const getPlaylistSongs = async (
    playlistUri: string,
    cookie: SpotifyCookie,
    currentSong: Song
): Promise<[Song[], any, any]> => {
    const playlistId = playlistUri.split(":").pop()
    const res = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}`,
        {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `${cookie.token_type} ${cookie.access_token}`,
            },
        }
    )
    const data = await res.json()
    const songs: Song[] = []
    data.tracks.items.forEach((song) => {
        songs.push({
            name: song.track.name,
            artists: song.track.artists[0].name,
            uri: song.track.uri,
            imgUrl: song.track.album.images[2].url,
        })
    })
    return [songs, data, currentSong]
}
export const getPlayBackSongs = async (
    cookie: SpotifyCookie,
    updateCookie
): Promise<[Song[], any, any]> => {
    const data = await getUserPlayback(cookie, updateCookie)
    if (!data) {
        // throw new Error("No user playback")
        console.warn("No user playback")
        const noPlInfo = false
        const emptySongs = [emptySong]
        return [emptySongs, noPlInfo, emptySong]
    }
    const currentSong: Song = {
        name: data.item.name,
        imgUrl: data.item.album.images[2].url,
        artists: data.item.artists[0].name,
        id: data.item.uri,
    }
    const playlistUri = isPlaybackPlaylist(data)
    let songs: Song[] = []
    let plInfo
    if (playlistUri) {
        return await getPlaylistSongs(
            playlistUri.toString(),
            cookie,
            currentSong
        )
    } else {
        songs = [
            {
                name: data.item.name,
                artists: data.item.artists[0].name,
                uri: data.item.uri,
                imgUrl: data.item.album.images[2].url,
            },
        ]
    }
    return [songs, plInfo, currentSong]
}
const generatePlData = async (name?: string, description?: string) => {
    const plData: { name: string; description: string } = {
        name: "",
        description: "",
    }
    if (!name) {
        plData.name = `${timeMangment.fullYear}_${timeMangment.weekNumber}`
    }
    if (!description) {
        // replace regular space w/ U+205F cause of bug
        plData.description =
            `Creation date: ${timeMangment.currentTime}. This playlist was created by web service. Link to github repo /akorzunin/Spotify_save_DW`
                .split(" ")
                .join(" ")
    }
    return plData
}
export const saveUserPl = async (cookie: SpotifyCookie, songs) => {
    // Create new playlist
    const userData = await getUserData(cookie)
    const PlData = await generatePlData()
    if (userData) {
        const res = await fetch(
            `https://api.spotify.com/v1/users/${userData.id}/playlists`,
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `${cookie.token_type} ${cookie.access_token}`,
                },
                body: JSON.stringify({
                    name: PlData.name,
                    description: PlData.description,
                    public: true,
                }),
            }
        )
        if (checkStatusCode(res)) {
            const data = await res.json()
            // wait some time before spotify create playlist
            await new Promise((resolve) => setTimeout(resolve, 500))
            // add songs to playlist
            const plRes = await fetch(
                `https://api.spotify.com/v1/playlists/${data.id}/tracks`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `${cookie.token_type} ${cookie.access_token}`,
                    },
                    body: JSON.stringify({
                        uris: songs.map((x) => x.id),
                    }),
                }
            )
            if (checkStatusCode(plRes)) {
                const data = await plRes.json()
                console.info("Saved", data)
                return true
            }
            return false
        }
    }
    return false
}
