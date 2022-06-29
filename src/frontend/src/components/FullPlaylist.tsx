import React, { useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import Playlist from './Playlist'
import * as apiManager from './utils/apiManager'

const FullPlaylist = ({cookie,}) => {
    const isDiscoverWeekly = (data): boolean => {
        return data.images[0].url.search('discover') > 0 ? true: false
    }
    const usePlaylistData = (info) => {
        const songs = info[0]
        const data = info[1]
        if (data) {
            setPlaylistName(data.name)
            setIsDW(
                isDiscoverWeekly(data)
            )
        }
        setPlSongs(songs)
    }
    const [PlSongs, setPlSongs] = useState("No")
    const [isDW, setIsDW] = useState(false)
    const [PlaylistName, setPlaylistName] = useState("No playlist name")
    useEffect( () => {
        let data
        // look for user palyback
        apiManager.getPlayBackSongs(cookie)
            .then((plData) => {
                usePlaylistData(plData)
            })
        setInterval(function () {
            apiManager.getUserPlayback(cookie)
                .then(tempData => {
                    if (typeof data === 'undefined') {
                        data = tempData
                    }
                    //  if there is no changes in playback, dont request songs
                    if (data.item.uri != tempData.item.uri) {
                        data = tempData
                        apiManager.getPlayBackSongs(cookie)
                            .then((plData) => {
                                usePlaylistData(plData)
                            })
                            .catch((error) => {
                                    console.log(error);
                                    clearInterval(this)
                                }
                            )
                    }
                })
        }, 2000);
    }, [])
    
    return (

        <div>
            <h1>{ isDW.toString() }</h1>
            <Playlist
                title={ PlaylistName }
                songs={ PlSongs }
            />
        </div>
    )
}

FullPlaylist.propTypes = {}

export default FullPlaylist