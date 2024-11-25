import React, { useState, useEffect, FC } from 'react';
import Footer from '../../components/Footer';
import SongCard from '../../components/SongCard';
import * as cookieHandle from '../../utils/cookieHandle';
import * as apiManager from '../../utils/apiManager';
import SavePlaylist from '../../components/SavePlaylist';
import { Burger } from '../../components/Burger';
import BurgerMenu from '../../components/BurgerMenu';
import { Link, useParams } from 'react-router-dom';
import SettingsPanel from '../../components/UserSettingsField/SettingsPanel';
import Button from '../../components/buttons/BaseButton';
// import { Button as Buttonv2 } from '../../components/shadcn/ui/button';
import { emptySong } from '../../interfaces/Song';
import UserCard from '../../components/UserCard';
import Playlist from '../../components/Playlist';
import { ICurrentSong } from '../../types/song';
import { useQuery } from '@tanstack/react-query';
import { deleteCookiesAndLocalStorage } from '../../utils/cookieHandle';

export const UserPage: FC = () => {
  const ButtonStyle = 'text-neutral-900';
  const { userId } = useParams();

  const [User] = useState({
    name: undefined,
    img: undefined,
    followers: undefined,
    isPremium: false,
  });
  const [PlSongs, setPlSongs] = useState<ICurrentSong[]>([emptySong]);
  const [isDW, setIsDW] = useState(false);
  const [DwPlaylistId, setDwPlaylistId] = useState('');
  const [PlaylistName, setPlaylistName] = useState('No playlist name');
  const [CurrentSong, setCurrentSong] = useState<ICurrentSong>(emptySong);
  const [burgerClass, setburgerClass] = useState('');
  const [cookie, setCookie] = useState(cookieHandle.readCookies()[0]);

  const isDiscoverWeekly = (data): boolean => {
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
  }, [playback]);

  return (
    <>
      {/* <main className="container mx-auto min-h-screen"> */}
      {/* <header className="relative mb-12 flex flex-col justify-between md:flex-row">
          <UserCard />
          <SongCard
            song={CurrentSong}
            index={NaN}
            isDeletable={false}
            onDelete={undefined}
            isHidden={undefined}
          />
          <div className="hidden items-center gap-3 lg:flex">
            <Button
              style={ButtonStyle}
              title="Help"
              link="/app/help"
              color="bg-white text-black"
            />
            <Button
              style={ButtonStyle}
              title="Home"
              link="/"
              color="bg-white text-black"
            />

            <Button
              title="Logout"
              link="/"
              color="bg-red-500 ml-12"
              onClick={deleteCookiesAndLocalStorage}
              style=" text-white"
            />
          </div>
          <div className="block lg:hidden">
            <Burger
              burgerClass={burgerClass}
              handleBM={() => {
                setburgerClass(burgerClass ? '' : 'header__burger-menu_active');
              }}
            />
          </div>
        </header> */}
      <div className="xl:flex 2xl:justify-center pb-64">
        <div className="lg:flex justify-center">
          <Playlist
            title={PlaylistName}
            songs={PlSongs}
            isDW={isDW}
            style={'max-h-[70vh] max-w-md'}
          />
          <SavePlaylist
            playbackSong={CurrentSong}
            fullPlaylist={PlSongs}
            isDW={isDW}
          />
        </div>
        <div className="flex justify-center">
          <SettingsPanel
            IsPremium={User.isPremium}
            userId={userId}
            DwPlaylistId={DwPlaylistId}
          />
        </div>
      </div>
      {/* <BurgerMenu burgerClass={burgerClass} ButtonStyle={ButtonStyle} /> */}
    </>
  );
};

export default UserPage;
