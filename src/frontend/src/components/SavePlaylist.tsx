import { FC, useEffect, useState } from 'react';
import * as apiManager from '../utils/apiManager';
import * as timeMangment from '../utils/timeMangment';
import SaveSongPlaylist from './SaveSongPlaylist';
import PlaylistTitle from './PlaylistTitle';
import { Song } from '../interfaces/Song';
import { ICurrentSong } from '../types/song';
import { Button } from '../shadcn/ui/button';

interface ISavePlaylist {
  playbackSong: ICurrentSong;
  fullPlaylist: ICurrentSong[];
  isDW: boolean;
}

const SavePlaylist: FC<ISavePlaylist> = ({
  playbackSong,
  fullPlaylist,
  isDW,
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

  const hashSong = (song: Song | ICurrentSong): number =>
    hash(song.name + song.artists);

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

  const saveUserPlaylist = async () => {
    const songs = filterSongsBySet();
    setSavePlState('Saving...');
    const res = await apiManager.saveUserPl(songs);
    if (!res || res.ok) {
      setPingState('hidden');
      setIsPlSaved(true);
      setSavePlState('Saved');
    } else {
      setSavePlState('Error');
      console.log(res);
    }
    setTimeout(() => {
      setSavePlState('Save');
    }, 5000);
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
    <div className="flex w-full flex-col gap-y-3">
      <div className={`${IsSpinning ? 'animate-spin' : ''}`}>
        <PlaylistTitle
          title={`Saved playlist: ${timeMangment.fullYear}_${timeMangment.weekNumber}`}
          isDW={true}
        />
        <div className="flex justify-between gap-3 p-3">
          <div className="relative inline-flex">
            <Button variant="secondary" onClick={saveUserPlaylist}>
              {savePlState}
            </Button>
            <span className={`flex rounded-full ${PingState}`}>
              <span className="absolute right-[-6px] top-[-6px] inline-flex h-3 w-3 animate-ping rounded-full bg-purple-700 opacity-75"></span>
              <span className="absolute right-[-6px] top-[-6px] inline-flex h-3 w-3 rounded-full bg-purple-700"></span>
            </span>
          </div>
          <Button variant="third" onClick={onRefresh}>
            Clear
          </Button>
          <Button variant="secondary" onClick={onSpin}>
            Spin
          </Button>
          <Button
            variant={listenPlayback ? 'secondary' : 'third'}
            onClick={() => setListenPlayback(!listenPlayback)}
          >
            From playback
          </Button>
        </div>
        <SaveSongPlaylist songs={savedSongs} alertDeleted={handleDelete} />
      </div>
    </div>
  );
};

export default SavePlaylist;
