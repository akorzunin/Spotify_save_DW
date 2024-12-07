import { useState, useEffect, FC } from 'react';
import * as cookieHandle from '../../utils/cookieHandle';
import * as apiManager from '../../utils/apiManager';
import SavePlaylist from '../../components/SavePlaylist';
import { useParams } from 'react-router';
import SettingsPanel from '../../components/UserSettingsField/SettingsPanel';
import { emptySong, Song } from '../../interfaces/Song';
import Playlist from '../../components/Playlist';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { CurrentSongAtom } from '../../store/store';
import { cn } from '../../lib/utils';
import { SpotifyApi } from '../../api/SpotifyApi';

export const UserPage: FC = () => {
  const { userId } = useParams();

  const [User] = useState({
    name: undefined,
    img: undefined,
    followers: undefined,
    isPremium: false,
  });
  const [PlSongs, setPlSongs] = useState<Song[]>([emptySong]);
  const [isDW, setIsDW] = useState(false);
  const [DwPlaylistId, setDwPlaylistId] = useState('');
  const [PlaylistName, setPlaylistName] = useState('No playlist name');
  const [, setCurrentSong] = useAtom(CurrentSongAtom);
  const [cookie] = useState(cookieHandle.readCookies()[0]);

  const isDiscoverWeekly = (data: SpotifyApi.PlaylistObjectFull): boolean => {
    return data.images[0].url.search('discover') > 0;
  };

  const { data: playback } = useQuery({
    queryKey: ['player', cookie],
    queryFn: async () => {
      const plData = await apiManager.getPlayBackSongs(playback.data);
      return { data: plData };
    },
    refetchInterval: 3000,
    initialData: { data: [[emptySong], false, emptySong] },
  });
  useEffect(() => {
    const [songs, playlistData, currentSong] = playback.data;
    if (playlistData) {
      setPlaylistName(playlistData.name);
      const isDiscoverWeeklyPl = isDiscoverWeekly(playlistData);
      setIsDW(isDiscoverWeeklyPl);
      if (isDiscoverWeeklyPl) {
        setDwPlaylistId(playlistData.id);
      }
    }
    setCurrentSong(currentSong);
    setPlSongs(songs);
  }, [playback, setCurrentSong]);

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
        <SettingsPanel
          IsPremium={User.isPremium}
          userId={userId}
          DwPlaylistId={DwPlaylistId}
        />
      </div>
    </div>
  );
};

export default UserPage;
