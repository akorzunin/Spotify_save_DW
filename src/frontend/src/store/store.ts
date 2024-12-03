import { atom } from 'jotai';
import { emptySong, Song } from '../interfaces/Song';
import { SongSet } from '../utils/songSet';

export const easterEggCountAtom = atom(0);

export const CurrentSongAtom = atom<Song>(emptySong);

export const SongSetAtom = atom<SongSet>(new SongSet());
export const saveSongSetAtom = atom(
  (get) => {
    return get(SongSetAtom);
  },
  (_get, set, update: Song) => {
    const prevSongSet = _get(SongSetAtom);
    prevSongSet.add(update);
    return set(SongSetAtom, prevSongSet);
  }
);
export const deleteSongSetAtom = atom(null, (_get, set, update: Song) => {
  const prevSongSet = _get(SongSetAtom);
  prevSongSet.delete(update);
  return set(SongSetAtom, prevSongSet);
});
