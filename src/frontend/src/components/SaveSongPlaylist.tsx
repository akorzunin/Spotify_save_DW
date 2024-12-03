import { FC, useState } from 'react';
import SongCard from './SongCard';
import { emptySong, Song } from '../interfaces/Song';
import { useAtom, useAtomValue } from 'jotai';
import { deleteSongSetAtom, SongSetAtom } from '../store/store';
import { Button } from '../shadcn/ui/button';

const SaveSongPlaylist: FC = () => {
  const [, setKey] = useState('');
  const songs = useAtomValue(SongSetAtom);
  const [, deleteSong] = useAtom(deleteSongSetAtom);

  const handleDelete = (song: Song, index: number) => {
    console.log(song, index);
    deleteSong(song);
    setKey(songs.key); // force rerender
  };
  const rerender = () => {
    console.log(songs.items);
    setKey(self.crypto.randomUUID());
  };
  return (
    <div className="flex max-h-[70vh] flex-col-reverse gap-y-2 overflow-y-scroll">
      {songs.items.length > 0 ? (
        songs.items.map((song: Song, index: number) => (
          <SongCard
            key={self.crypto.randomUUID()}
            song={song}
            index={index + 1}
            onDelete={handleDelete}
            isDeletable={true}
          />
        ))
      ) : (
        <div className="opacity-50">
          <SongCard song={emptySong} index={0} isDeletable={false} />
        </div>
      )}
      <Button className="hidden" variant="secondary" onClick={() => rerender()}>
        Rerender
      </Button>
    </div>
  );
};

export default SaveSongPlaylist;
