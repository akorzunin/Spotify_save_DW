import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import SongCard from './SongCard'
import { Song,  } from './utils/apiManager'

const SaveSongPlaylist = ({ songs, alertDeleted}) => {
    const [hiddenValues, setHiddenValues] = useState({});
    const handleDelete = (index, value) => {
        setHiddenValues({ ...hiddenValues, [index]: value })
        alertDeleted(songs[index], index)
    }
    return (      
        <div>
            <div className="container overflow-y-scroll max-h-[870px] mt-3">
                {
                    Array.isArray(songs) && songs.length ?
                    songs.map((song: Song, index: number) => (
                        <SongCard
                            key={index.toString()}
                            song={song}
                            index={index.toString()}
                            onDelete={handleDelete}
                            isHidden={hiddenValues[index]}
                            isDeletable={true}
                        />
                    )):
                        <div className="opacity-0">
                            <SongCard
                                song={{
                                    name: "undef",
                                    imgUrl: "undef",
                                    artists: "undef",
                                }}
                                index={0}
                                isDeletable={false}
                                onDelete={undefined}
                                isHidden={undefined}
                            />
                        </div>
                }
            </div>
        </div>
    )
}

SaveSongPlaylist.propTypes = {}

export default SaveSongPlaylist