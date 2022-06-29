import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import SongCard from './SongCard'
import { Song,  } from './utils/apiManager'

const Playlist = ({ title, songs}) => {
    // const [Songs, setSongs] = useState("No Song available")
    // useEffect(() => {

    //     setSongs(songs)
        
    //     return () => {
    //         // second
    //     }
    // }, [])
    
    return (      
        <div>
            <div>{title}</div>
            <div>
                {
                    Array.isArray(songs) ?
                    songs.map((song: Song, index: number) => (
                        <SongCard
                            key={index.toString()}
                            song={song}
                            index={index.toString()}
                        />
                    )):
                        songs
                }
            </div>
        </div>
    )
}

Playlist.propTypes = {}

export default Playlist