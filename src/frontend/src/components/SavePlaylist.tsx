import { FC, useState } from 'react';
import { saveUserPl } from '../utils/apiManager';
import SaveSongPlaylist from './SaveSongPlaylist';
import PlaylistTitle from './PlaylistTitle';
import { Button } from '../shadcn/ui/button';
import { useAtom, useAtomValue } from 'jotai';
import {
  clrearSongSetAtom,
  listenPlaybackAtom,
  SongSetAtom,
} from '../store/store';
import { fullYear, weekNumber } from '../utils/timeMangment';
import { cn } from '../lib/utils';

const dotClassName =
  'absolute right-[-6px] top-[-6px] inline-flex h-3 w-3 bg-purple-700';

const SavePlaylist: FC = () => {
  const [IsSpinning, setIsSpinning] = useState(false);
  const [savePlState, setSavePlState] = useState('Save');
  const [listenPlayback, setListenPlayback] = useAtom(listenPlaybackAtom);
  const [PingState, setPingState] = useState<'' | 'hidden'>('hidden');

  const SaveSongSet = useAtomValue(SongSetAtom);
  const [, clrearSongSet] = useAtom(clrearSongSetAtom);

  const onClear = () => {
    setPingState('hidden');
    setSavePlState('Save');
    clrearSongSet();
  };

  const saveUserPlaylist = async () => {
    setSavePlState('Saving...');
    const ok = await saveUserPl(SaveSongSet.items);
    if (ok) {
      setPingState('hidden');
      setSavePlState('Saved');
    } else {
      setSavePlState('Error');
    }
    setTimeout(() => {
      setSavePlState('Save');
    }, 5000);
  };

  return (
    <div className="flex w-full flex-col gap-y-3">
      <div className={IsSpinning ? 'animate-spin' : ''}>
        <PlaylistTitle
          title={`Saved playlist: ${fullYear}_${weekNumber}`}
          isDW={true}
        />
        <div className="flex justify-between gap-3 p-3">
          <div className="relative inline-flex">
            <Button variant="secondary" onClick={saveUserPlaylist}>
              {savePlState}
            </Button>
            <span className={cn('flex rounded-full', PingState)}>
              <span
                className={cn(
                  dotClassName,
                  'animate-ping rounded-full opacity-75'
                )}
              ></span>
              <span className={cn(dotClassName, 'rounded-full')}></span>
            </span>
          </div>
          <Button variant="third" onClick={onClear}>
            Clear
          </Button>
          <Button
            variant="secondary"
            onClick={() => setIsSpinning(!IsSpinning)}
          >
            Spin
          </Button>
          <Button
            variant={listenPlayback ? 'secondary' : 'third'}
            onClick={() => setListenPlayback(!listenPlayback)}
          >
            From playback
          </Button>
        </div>
        <SaveSongPlaylist />
      </div>
    </div>
  );
};

export default SavePlaylist;
