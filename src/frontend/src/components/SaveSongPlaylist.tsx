import React, { FC, useState } from 'react';
import SongCard from './SongCard';
import { emptySong, Song } from '../interfaces/Song';

interface ISaveSongPlayList {
  songs: Song[];
  alertDeleted: (song: Song) => void;
}

const SaveSongPlaylist: FC<ISaveSongPlayList> = ({ songs, alertDeleted }) => {
  const [hiddenValues, setHiddenValues] = useState({});
  const handleDelete = (index, value) => {
    setHiddenValues({ ...hiddenValues, [index]: value });
    alertDeleted(songs[index]);
  };
  return (
    <div className="">
      <div className={`container mt-3 max-h-[70vh] max-w-md overflow-y-scroll`}>
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
            <SongCard song={emptySong} index={0} isDeletable={false} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SaveSongPlaylist;
