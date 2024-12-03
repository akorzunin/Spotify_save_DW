import { FC, useEffect, useState } from 'react';
import { saveUserPl } from '../utils/apiManager';
import SaveSongPlaylist from './SaveSongPlaylist';
import PlaylistTitle from './PlaylistTitle';
import { Button } from '../shadcn/ui/button';
import { useAtom, useAtomValue } from 'jotai';
import { CurrentSongAtom, saveSongSetAtom } from '../store/store';
import { fullYear, weekNumber } from '../utils/timeMangment';

const SavePlaylist: FC = () => {
  const [IsSpinning, setIsSpinning] = useState(false);
  const [savePlState, setSavePlState] = useState('Save');
  const [listenPlayback, setListenPlayback] = useState(true);
  const [PingState, setPingState] = useState('hidden');

  const [Key, setKey] = useState('');

  const playbackSong = useAtomValue(CurrentSongAtom);
  const [SaveSongSet, setSaveSongSet] = useAtom(saveSongSetAtom);

  const onRefresh = () => {
    setPingState('hidden');
    setSavePlState('Save');
    // TODO new set
  };
  const onSpin = () => {
    setIsSpinning(!IsSpinning);
  };

  const saveUserPlaylist = async () => {
    setSavePlState('Saving...');
    const res = await saveUserPl(SaveSongSet.items);
    if (!res || res.ok) {
      setPingState('hidden');
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
    setSaveSongSet(playbackSong);
    setKey(SaveSongSet.key); // WTF React???
  }, [playbackSong, listenPlayback, SaveSongSet, setSaveSongSet]);

  return (
    <div className="flex w-full flex-col gap-y-3">
      <div className={`${IsSpinning ? 'animate-spin' : ''}`}>
        <PlaylistTitle
          title={`Saved playlist: ${fullYear}_${weekNumber}`}
          isDW={true}
        />
        <div className="flex justify-between gap-3 p-3">
          <div className="relative inline-flex">
            <Button variant="secondary" onClick={saveUserPlaylist}>
              {savePlState}
            </Button>
            <span className={`flex rounded-full ${PingState}`}>
              {/* TODO: use cn */}
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
        <SaveSongPlaylist
          key={Key} // this componen will not rerender if we use shallow value of SaveSongSet.items.length
        />
      </div>
    </div>
  );
};

export default SavePlaylist;
