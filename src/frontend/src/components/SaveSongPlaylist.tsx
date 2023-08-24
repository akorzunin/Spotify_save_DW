import React, { FC, useState } from 'react';
import SongCard from './SongCard';
import { emptySong, Song } from '../interfaces/Song';

interface ISaveSongPlayList {
    songs: Song[];
    alertDeleted: (song: Song) => {};
    style: string;
}

const SaveSongPlaylist: FC<ISaveSongPlayList> = ({
    songs,
    alertDeleted,
    style,
}) => {
    const [hiddenValues, setHiddenValues] = useState({});
    const handleDelete = (index, value) => {
        setHiddenValues({ ...hiddenValues, [index]: value });
        alertDeleted(songs[index]);
    };
    console.log('songs', songs);
    return (
        <div className="">
            <div className={`container overflow-y-scroll ${style} mt-3`}>
                {Array.isArray(songs) && songs.length ? (
                    songs.map((song: Song, index: number) => (
                        <SongCard
                            key={index.toString()}
                            song={song}
                            index={index}
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
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default SaveSongPlaylist;
