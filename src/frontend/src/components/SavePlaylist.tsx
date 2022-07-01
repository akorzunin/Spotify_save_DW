import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Playlist from './Playlist'
import * as apiManager from './utils/apiManager'
import SaveSongPlaylist from './SaveSongPlaylist'
import ClickButton from './ClickButton'
import PlaylistTitle from './PlaylistTitle'
import SavePlaylistButtons from './SavePlaylistButtons'

const SavePlaylist = ({ playbackSong, fullPlaylist }) => {
    const [SavedSongs, setSavedSongs] = useState([]);
    const [listenPlayback, setListenPlayback] = useState(true)
    useEffect(() => {
        updateSavedSongs()
    }, [playbackSong])

    useEffect(() => {
        updateSavedSongs()
    }, [listenPlayback])
    
    const handleDelete = (index) => {
        console.log('Del', index);
        // setSavedSongs({ ...SavedSongs, [index]: {} })
    }
    const onRefresh = () => {
        setSavedSongs([])
    }
    const updateSavedSongs = () => {
        if (listenPlayback && playbackSong.name !== "No track data") {
            console.log(playbackSong);
            // add song to SavePlaylist
            setSavedSongs([...SavedSongs, playbackSong])
        }
    }
    // song auto save logick
    // on new song in savedPlaylist
    //      if pl isDW
    //          if song is in fullPlaylist
    //              if song is not in set (played songs)
    //                  add song to set (played songs)
    //              else all playabble songs collected
                        // highlight save button
    return (

        <div className="">
            
            <PlaylistTitle
                title={"2022_XX"}
                isDW={ true }
            />
            <div className="flex justify-between pl-3 pr-3 mt-3">
                <ClickButton
                    title="Save"
                    onClick={() => console.log("Save pl")}
                    color={"bg-green-500"}
                    style={undefined}
                />
                <ClickButton
                    title="Refresh"
                    onClick={onRefresh}
                    color={"bg-yellow-500"}
                    style={undefined}
                />
                <ClickButton
                    title="From playback"
                    onClick={() => setListenPlayback(!listenPlayback)}
                    color={listenPlayback ? "bg-green-500" : "bg-yellow-500"}
                    style={undefined}
                />
            </div>
            {/* <SavePlaylistButtons
            /> */}
            <SaveSongPlaylist
                songs={SavedSongs} 
                alertDeleted={handleDelete}            
            />
        </div>
    )
}

SavePlaylist.propTypes = {}

export default SavePlaylist