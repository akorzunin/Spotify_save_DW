import React, { FC, useEffect, useState } from 'react';
import * as apiManager from '../utils/apiManager';
import * as timeMangment from '../utils/timeMangment';
import SaveSongPlaylist from './SaveSongPlaylist';
import PlaylistTitle from './PlaylistTitle';
import ClickButton from './buttons/button/Button';
import { Song } from '../interfaces/Song';
import { ICurrentSong } from '../types/song';

interface ISavePlaylist {
  playbackSong: ICurrentSong;
  fullPlaylist: ICurrentSong[];
  isDW: boolean;
  cookie: any;
}

const SavePlaylist: FC<ISavePlaylist> = ({
  playbackSong,
  fullPlaylist,
  isDW,
  cookie,
}) => {
  const [IsSpinning, setIsSpinning] = useState(false);
  const [savePlState, setSavePlState] = useState('Save');
  const [playedSongsSet, setPlayedSongsSet] = useState(new Set());
  const [savedSongs, setSavedSongs] = useState<ICurrentSong[]>([]);
  const [listenPlayback, setListenPlayback] = useState(true);
  const [PingState, setPingState] = useState('hidden');
  const [isPlSaved, setIsPlSaved] = useState(false);

  const handleDelete = (song: Song) => {
    const newSet = playedSongsSet;
    newSet.delete(hashSong(song));
    setPlayedSongsSet(newSet);
  };
  const onRefresh = () => {
    setSavedSongs([]);
    setPlayedSongsSet(new Set());
    setPingState('hidden');
    setIsPlSaved(false);
    setSavePlState('Save');
  };
  const onSpin = () => {
    setIsSpinning(!IsSpinning);
  };
  const hash = (str: string): number =>
    Array.from(str).reduce(
      (hash, char) => 0 | (31 * hash + char.charCodeAt(0)),
      0
    );

  const hashSong = (song): number => hash(song.name + song.artists);

  const updateSavedSongs = () => {
    if (listenPlayback && playbackSong.name !== 'No track data') {
      const fullPlSet = new Set(
        fullPlaylist.map((x) => hash(x.name + x.artists))
      );

      // add song to SavePlaylist
      if (!playedSongsSet.has(hashSong(playbackSong))) {
        if (Array.isArray(savedSongs))
          setSavedSongs([...savedSongs, playbackSong]);
        else {
          setSavedSongs([playbackSong]);
        }
      }
      // complete playlist check
      if (isDW) {
        const hashedSong = hashSong(playbackSong);
        if (fullPlSet.has(hashedSong) && !playedSongsSet.has(hashedSong)) {
          setPlayedSongsSet(playedSongsSet.add(hashedSong));
        } else if (playedSongsSet.size > 1) {
          // all playable song are already saved
          if (!isPlSaved) {
            console.log('all SET');
            setPingState('');
          }
        }
      }
    }
  };
  const filterSongsBySet = () => {
    const toSave = playedSongsSet;
    const allSongs = savedSongs;
    const result = allSongs.map((song) => {
      return { ...song, hash: hashSong(song) };
    });

    return result.filter((x) => toSave.has(x.hash));
  };

  const saveUserPlaylist = () => {
    setSavePlState('Saving...');
    apiManager
      .saveUserPl(cookie, filterSongsBySet())
      .then((res) => {
        setPingState('hidden');
        setIsPlSaved(true);
        setSavePlState('Saved');
        setTimeout(() => {
          setSavePlState('Save');
        }, 5000);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    updateSavedSongs();
  }, [playbackSong]);

  useEffect(() => {
    // add song if user just turned "from playback"
    //but new song did not appeared yet
    updateSavedSongs();
  }, [listenPlayback]);

  return (
    <div className="flex justify-center">
      <div className={`${IsSpinning ? 'animate-spin' : ''} mb-3 w-[448px]`}>
        <PlaylistTitle
          title={`Saved playlist: ${timeMangment.fullYear}_${timeMangment.weekNumber}`}
          isDW={true}
        />
        <div className="mt-3 flex justify-between pl-3 pr-3">
          <div className="relative inline-flex">
            <ClickButton
              title={savePlState}
              onClick={saveUserPlaylist}
              color={'bg-emerald-600'}
            />
            <span className={`flex rounded-full ${PingState}`}>
              <span className="absolute right-[-6px] top-[-6px] inline-flex h-3 w-3 animate-ping rounded-full bg-purple-700 opacity-75"></span>
              <span className="absolute right-[-6px] top-[-6px] inline-flex h-3 w-3 rounded-full bg-purple-700"></span>
            </span>
          </div>
          <ClickButton
            title="Refresh"
            onClick={onRefresh}
            color={'bg-yellow-600'}
          />
          <ClickButton title="Spin" onClick={onSpin} color="bg-emerald-600" />
          <ClickButton
            title="From playback"
            onClick={() => setListenPlayback(!listenPlayback)}
            color={listenPlayback ? 'bg-emerald-600' : 'bg-yellow-600'}
          />
        </div>
        <SaveSongPlaylist songs={savedSongs} alertDeleted={handleDelete} />
      </div>
    </div>
  );
};

export default SavePlaylist;
