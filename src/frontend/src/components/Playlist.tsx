import { FC } from 'react';

import SongCard from './SongCard';
import { emptySong, Song } from '../interfaces/Song';
import PlaylistTitle from './PlaylistTitle';
import { cn } from '../lib/utils';

interface IPlayList {
  title: string;
  songs: string;
  isDW: boolean;
  className?: string;
}

const Playlist: FC<IPlayList> = ({ title, songs, isDW, className }) => {
  return (
    <div className="flex w-full flex-col gap-y-3">
      <PlaylistTitle title={'Playlist: ' + title} isDW={isDW} />
      <div className={cn(``, className)}>
        {Array.isArray(songs) && songs.length ? (
          songs.map((song: Song, index: number) => (
            <SongCard
              key={index.toString()}
              song={song}
              index={index}
              isDeletable={false}
              isHidden={undefined}
            />
          ))
        ) : (
          <div className="opacity-50">
            <SongCard
              song={emptySong}
              index={0}
              isDeletable={false}
              isHidden={undefined}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Playlist;
