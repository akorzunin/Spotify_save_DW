import { atom } from 'jotai';
import { emptySong, Song } from '../interfaces/Song';
import { SongSet } from '../utils/songSet';
import { User } from '../api/client';
import { atomWithStorage } from 'jotai/utils';

export const easterEggCountAtom = atom(0);

export const listenPlaybackAtom = atomWithStorage('listen_playback', true);
export const CurrentSongAtom = atom<Song>(emptySong);

export const _SongSetAtom = atom<SongSet>(new SongSet());
export const SongSetAtom = atom(
  (get) => {
    return get(_SongSetAtom);
  },
  (_get, set, update: Song) => {
    const prevSongSet = _get(_SongSetAtom);
    return set(_SongSetAtom, prevSongSet.add(update));
  }
);
export const deleteSongSetAtom = atom(null, (_get, set, update: Song) => {
  const prevSongSet = _get(_SongSetAtom);
  prevSongSet.delete(update);
  return set(_SongSetAtom, prevSongSet.clone());
});
export const clrearSongSetAtom = atom(null, (_get, set) => {
  return set(_SongSetAtom, new SongSet());
});

export const UserDataAtom = atom<User>({
  user_id: '',
  is_premium: false,
  refresh_token: '',
  created_at: '',
});
