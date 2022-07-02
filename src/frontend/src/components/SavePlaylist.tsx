import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Playlist from './Playlist'
import * as apiManager from './utils/apiManager'
import * as timeMangment from './utils/timeMangment'
import SaveSongPlaylist from './SaveSongPlaylist'
import ClickButton from './ClickButton'
import PlaylistTitle from './PlaylistTitle'
import SavePlaylistButtons from './SavePlaylistButtons'
import { Song } from './SongCard'

const SavePlaylist = ({ playbackSong, fullPlaylist, isDW, cookie }) => {
    // States
    const [playedSongsSet, setPlayedSongsSet] = useState(new Set())
    const [SavedSongs, setSavedSongs] = useState([]);
    const [listenPlayback, setListenPlayback] = useState(true)
    const [PingState, setPingState] = useState("hidden")
    const [isPlSaved, setIsPlSaved] = useState(false)
    //isSaved
    // Functions
    const handleDelete = (song: Song, index) => {
        console.log('Del', song, index);
        const newSet = playedSongsSet
        newSet.delete(hashSong(song))
        setPlayedSongsSet(newSet)
    }
    const onRefresh = () => {
        setSavedSongs([])
        setPlayedSongsSet(new Set())
        setPingState("hidden")
        setIsPlSaved(false)
    }
    const hash = (str: string): number => 
        Array.from(str)
        .reduce((hash, char) => 0 | (31 * hash + char.charCodeAt(0)), 0)

    const hashSong = (song): number => hash(song.name + song.artists)
    
    const updateSavedSongs = () => {
        if (listenPlayback && playbackSong.name !== "No track data") {

            const fullPlSet = new Set(fullPlaylist.map((x) => hash(x.name+x.artists)))

            // add song to SavePlaylist
            if (!playedSongsSet.has(hashSong(playbackSong))) {
                setSavedSongs([...SavedSongs, playbackSong])
            }
            // complete playlist check
            if (isDW) {
                const hashedSong = hashSong(playbackSong)
                if (fullPlSet.has(hashedSong) && !playedSongsSet.has(hashedSong)) {
                    setPlayedSongsSet(playedSongsSet.add(hashedSong))
                } else {
                    // all playable song are already saved
                    // debugger
                    if (!isPlSaved) {
                        console.log('all SET');
                        setPingState('')
                    }
                    
                }
            }
        }
    }
    const filterSongsBySet = () => {
        const toSave = playedSongsSet
        const AllSongs = SavedSongs
        AllSongs.forEach(x => { x.hash = hashSong(x) })
        return AllSongs.filter(x => toSave.has(x.hash))
    }
    const saveUserPlaylist = () => {
        apiManager.saveUserPl(cookie, filterSongsBySet())
            .then(res => {
                setPingState("hidden")
                setIsPlSaved(true)
            })
            .catch(err => console.log(err))
    }
    // Effects
    useEffect(() => {
        updateSavedSongs()
    }, [playbackSong])

    useEffect(() => {
        // add song if user just turned "from playback" 
        //but new song did not appeared yet
        updateSavedSongs()
    }, [listenPlayback])
    
    return (

        <div className="">
            
            <PlaylistTitle
                title={`Saved playlist: ${timeMangment.fullYear}_${timeMangment.weekNumber}`}
                isDW={ true }
            />
            <div className="flex justify-between pl-3 pr-3 mt-3">
                <div className="relative inline-flex">
                    <ClickButton
                        title={isPlSaved ? "Saved" :"Save"}
                        onClick={saveUserPlaylist}
                        color={"bg-green-500"}
                        style={undefined}
                        />
                    <div>
                        <span className={`fixed flex h-3 w-3 ${PingState}`}>
                            <span className="animate-ping absolute right-2 top-[-6px] inline-flex h-full w-full rounded-full bg-purple-700 opacity-75"></span>
                            <span className="relative right-2 top-[-6px] inline-flex rounded-full h-3 w-3 bg-purple-700"></span>
                        </span>
                    </div>
                </div>
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
            <SaveSongPlaylist
                songs={SavedSongs} 
                alertDeleted={handleDelete}            
            />
        </div>
    )
}

SavePlaylist.propTypes = {}

export default SavePlaylist