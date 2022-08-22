import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import SongCard from "./SongCard"
import { emptySong, Song } from "../interfaces/Song"
import ClickButton from "./Buttons/ClickButton"
import PlaylistTitle from "./PlaylistTitle"

const Playlist = ({ title, songs, isDW, style }) => {
    return (
        <div className="max-w-md mb-3">
            <PlaylistTitle title={"Playlist: " + title} isDW={isDW} />
            <div className="justify-between pl-3 pr-3 mt-3 opacity-0 hidden lg:flex">
                <ClickButton
                    title="Placeholder"
                    onClick={() => console.log("Save pl")}
                    color={"bg-green-500"}
                    style={undefined}
                />
            </div>
            <div className={`container overflow-y-scroll ${style} mt-3`}>
                {Array.isArray(songs) && songs.length ? (
                    songs.map((song: Song, index: number) => (
                        <SongCard
                            key={index.toString()}
                            song={song}
                            index={index.toString()}
                            isDeletable={false}
                            onDelete={undefined}
                            isHidden={undefined}
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

Playlist.propTypes = {}

export default Playlist
