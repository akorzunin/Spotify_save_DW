import { atom } from 'jotai';
import { emptySong, Song } from '../interfaces/Song';

export const easterEggCountAtom = atom(0);

export const CurrentSongAtom = atom<Song>(emptySong);
