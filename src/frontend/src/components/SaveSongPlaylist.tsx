import { FC, useState } from 'react';
import SongCard from './SongCard';
import { emptySong, Song } from '../interfaces/Song';

interface ISaveSongPlayList {
  songs: Song[];
  alertDeleted: (song: Song) => void;
}

const SaveSongPlaylist: FC<ISaveSongPlayList> = ({ songs, alertDeleted }) => {
  const [hiddenValues, setHiddenValues] = useState({});
  const handleDelete = (index: number, value: boolean) => {
    setHiddenValues({ ...hiddenValues, [index]: value });
    alertDeleted(songs[index]);
  };
  return (
    <div className="flex max-h-[70vh] flex-col-reverse gap-y-2 overflow-y-scroll">
      {Array.isArray(songs) && songs.length ? (
        songs.map((song: Song, index: number) => (
          <SongCard
            key={index.toString()}
            song={song}
            index={index}
            onDelete={handleDelete}
            // @ts-expect-error totally safe code, nothiong to worry about
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
  );
};

export default SaveSongPlaylist;
