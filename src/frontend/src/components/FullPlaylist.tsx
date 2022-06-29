import React, { useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import Playlist from './Playlist'
import * as apiManager from './utils/apiManager'

const FullPlaylist = ({cookie,}) => {
    const [PlSongs, setPlSongs] = useState("No")
    useEffect( () => {
        let data
        apiManager.getPlayBackSongs(cookie)
            .then((songs) => {
                setPlSongs(songs)
            })
        setInterval(function () {
            apiManager.getUserPlayback(cookie)
                .then(tempData => {
                    if (typeof data === 'undefined') {
                        data = tempData
                    }
                    if (data.item.uri != tempData.item.uri) {
                        data = tempData
                        apiManager.getPlayBackSongs(cookie)
                            .then((songs) => {
                                setPlSongs(songs)
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
        <Playlist
            title="FullPalylist"
            songs={ PlSongs }
        />
    )
}

FullPlaylist.propTypes = {}

export default FullPlaylist