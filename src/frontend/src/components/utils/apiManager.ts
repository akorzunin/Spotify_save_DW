import { instanceOf } from "prop-types";
import { SpotifyCoockie, readCookies, setCookies } from "./cookieHandle";

export interface Song {
    name: string, // this.track.name
    artists: string[], // this.track.artists[0].name
    uri: string, // this.track.uri
    imgUrl: string, // this.track.album.images[2].url 640/300/64
}
const checkStatusCode = (res) => {

    const logErr = (res) => {
        res.json()
            .then((err) => {
                console.log(err.error.status);
                console.log(err.error.message);

            });
    };
    if (res.status > 399) {
        // debugger
        // if (res.status > 399 && res.status <= 402) {
        if (res.status === 401) {
            console.error('Token is invalid trying to refresh');

            const location = window.location.href.split('//')[1].split('/')[0];
            console.log(location);
            // debugger
            logErr(res);
            refreshToken()
            return false

        } else if (res.status === 403) {
            console.error("Need paid user for that");
            logErr(res);
            return false
        }
    }
    return true
}

export const refreshToken = () => {
    const pref = window.location.href.split('//')[0]
    const location = window.location.href.split('//')[1].split('/')[0];
    const refreshToken = readCookies()[0].refresh_token
    if (refreshToken === 'undefined' || typeof refreshToken === undefined) {
        throw new Error("Cant refresh token because no cookies available");
        
    }
    debugger
    fetch(`${pref}//${location}/api/refresh_token`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ 'refresh_token': refreshToken }),
    })
        .then((res) => res.json())
        .then((data) => {
            // save data to local storage
            console.log('refresh token');
            debugger
            setCookies(data)
        })
        .catch((err) => {
            debugger
        })
}
export const getUserData = async (cookie: SpotifyCoockie) => {
    const res = await fetch('https://api.spotify.com/v1/me/', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${cookie.token_type} ${cookie.access_token}`
        }
    })
    if (checkStatusCode(res)) {
        const data = await res.json()
        return {
            name: data.display_name,
            img: data.images[0].url,
            followers: data.followers.total,
        }
    }
}
export const getUserPlayback = async (cookie: SpotifyCoockie) => {
    const res = await fetch('https://api.spotify.com/v1/me/player', {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${cookie.token_type} ${cookie.access_token}`
        }
    })
    if (res.status === 204) {
        console.log("No content"); 
        //TODO implement refresh tocken logick if problem in token
        // refreshToken()
        return false
        throw new Error("Cant do something");
        
    }
    if (checkStatusCode(res)){
        const data = await res.json()
        return data
    }
    return false
}
    
const isPlaybackPlaylist = ( data ):string|boolean => {
    try {
        if (data.context.type === "playlist") {
            return data.context.uri
        } else {
            throw new Error("No playlist found")
        }
    }
    catch (err) {
        if (err instanceof TypeError) {
            if (data.item.type === "track") {
                console.warn("No playlist found")
                return false
            }
            throw new Error("No playlist in a playback")
        } else {
            throw err;  // re-throw the error unchanged
        }
    }
}
const getPlaylistSongs = async (
    playlistUri: string, cookie: SpotifyCoockie, currentSong
    ): Promise<[Song[], any, any]> => {
    const playlistId = playlistUri.split(':').pop()
    const res = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `${cookie.token_type} ${cookie.access_token}`
        }
    });
    const data = await res.json()
    const songs = []
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
export const getPlayBackSongs = async (cookie: SpotifyCoockie): Promise<[Song[], any, any]> => {
    const data = await getUserPlayback(cookie)
    if (!data) {
        throw new Error("No user playback")
    }
    const currentSong = {
        name: data.item.name,
        imgUrl: data.item.album.images[2].url,
        artists: data.item.artists[0].name
    }
    const playlistUri = isPlaybackPlaylist(data)
    let songs = []
    let plInfo
    if (playlistUri) {
        return await getPlaylistSongs(playlistUri.toString(), cookie, currentSong)
    } else {
        songs = [
            {
                name: data.item.name,
                artists: data.item.artists[0].name,
                uri: data.item.uri,
                imgUrl: data.item.album.images[2].url,
            }
        ]
    }
    return [songs, plInfo, currentSong]
}

