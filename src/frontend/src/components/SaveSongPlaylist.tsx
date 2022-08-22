import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import SongCard from "./SongCard"

import { emptySong, Song } from "../interfaces/Song"

const SaveSongPlaylist = ({ songs, setSongs, alertDeleted, style }) => {
    const [hiddenValues, setHiddenValues] = useState({})
    const handleDelete = (index, value) => {
        setHiddenValues({ ...hiddenValues, [index]: value })
        alertDeleted(songs[index], index)
    }

    return (
        <div className="">
            <div className={`container overflow-y-scroll ${style} mt-3`}>
                {Array.isArray(songs) && songs.length ? (
                    songs.map((song: Song, index: number) => (
                        <SongCard
                            key={index.toString()}
                            song={song}
                            index={index.toString()}
                            onDelete={handleDelete}
                            isHidden={hiddenValues[index]}
                            isDeletable={true}
                        />
                    ))
                ) : (
                    <div className="opacity-50">
                        <SongCard
                            song={emptySong}
                            index={0}
                            isDeletable={false}
                            onDelete={undefined}
                            isHidden={undefined}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}

SaveSongPlaylist.propTypes = {}

export default SaveSongPlaylist
