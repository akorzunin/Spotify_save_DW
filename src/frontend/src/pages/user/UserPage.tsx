import { useState, FC } from 'react';
import * as apiManager from '../../utils/apiManager';
import SavePlaylist from '../../components/SavePlaylist';
import { emptySong, Song } from '../../interfaces/Song';
import Playlist from '../../components/Playlist';
import { useQuery } from '@tanstack/react-query';
import { useAtom, useAtomValue } from 'jotai';
import {
  CurrentSongAtom,
  listenPlaybackAtom,
  SongSetAtom,
} from '../../store/store';
import { cn } from '../../lib/utils';
import { SpotifyApi } from '../../api/SpotifyApi';
import { SettingsPanelV2 } from '../../components/settings/SettingsPanelV2';

export const UserPage: FC = () => {
  const [PlSongs, setPlSongs] = useState<Song[]>([emptySong]);
  const [isDW, setIsDW] = useState(false);
  const [PlaylistName, setPlaylistName] = useState('No playlist name');
  const [, setCurrentSong] = useAtom(CurrentSongAtom);
  const listenPlayback = useAtomValue(listenPlaybackAtom);
  const [, addToSaveSongSet] = useAtom(SongSetAtom);

  const isDiscoverWeekly = (data: SpotifyApi.PlaylistObjectFull): boolean => {
    return data.images[0].url.search('discover') > 0;
  };

  const { data: playback } = useQuery({
    queryKey: ['player'],
    queryFn: async () => {
      const newPlayback = await apiManager.getPlayBackSongs(playback.data);
      const [songs, playlistData, currentSong] = newPlayback;
      if (playlistData) {
        setPlaylistName(playlistData.name);
        const isDiscoverWeeklyPl = isDiscoverWeekly(playlistData);
        setIsDW(isDiscoverWeeklyPl);
      }
      setCurrentSong(currentSong);
      setPlSongs(songs);
      if (listenPlayback) {
        addToSaveSongSet(currentSong);
      }
      return { data: newPlayback };
    },
    refetchInterval: 3000,
    initialData: { data: [[emptySong], false, emptySong] },
    enabled: listenPlayback,
  });

  return (
    <div className="flex items-center justify-center p-2">
      <div className="flex w-[448px] flex-col items-center gap-y-3">
        <Playlist
          title={PlaylistName}
          songs={PlSongs}
          isDW={isDW}
          className={cn(PlSongs.length === 0 && 'hidden')}
        />
        <SavePlaylist />
        <SettingsPanelV2 />
      </div>
    </div>
  );
};

export default UserPage;
