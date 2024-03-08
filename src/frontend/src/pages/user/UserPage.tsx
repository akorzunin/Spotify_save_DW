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
import { emptySong } from '../../interfaces/Song';
import UserCard from '../../components/UserCard';
import Playlist from '../../components/Playlist';
import { ICurrentSong } from '../../types/song';
import { useQuery } from '@tanstack/react-query';

export const UserPage: FC = () => {
  const ButtonStyle = 'text-neutral-900';
  const { user_id } = useParams();

  const [User, setUser] = useState({
    name: undefined,
    img: undefined,
    followers: undefined,
    isPremium: false,
  });
  const [PlSongs, setPlSongs] = useState<ICurrentSong[]>([emptySong]);
  const [isDW, setIsDW] = useState(false);
  const [DwPlaylistId, setDwPlaylistId] = useState();
  const [PlaylistName, setPlaylistName] = useState('No playlist name');
  const [CurrentSong, setCurrentSong] = useState<ICurrentSong>(emptySong);
  const [burgerClass, setburgerClass] = useState('');
  const [cookie, setCookie] = useState(cookieHandle.readCookies()[0]);

  const isDiscoverWeekly = (data): boolean => {
    return data.images[0].url.search('discover') > 0;
  };

  const { status, data, error, refetch } = useQuery({
    queryKey: ['player', cookie],
    queryFn: async () => {
      const plData = await apiManager.getPlayBackSongs(
        cookie,
        setCookie,
        data.data
      );
      return { data: plData };
    },
    refetchInterval: 3000,
    initialData: { data: [[emptySong], false, emptySong] },
  });

  useEffect(() => {
    const [songs, playlistData, currentSong] = data.data;
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
  }, [data]);

  return (
    <>
      <main className="min-h-screen">
        <header className="relative mb-12 flex justify-between">
          <UserCard
            userName={User.name}
            imgUrl={User.img}
            followers={User.followers}
          />
          <SongCard
            song={CurrentSong}
            index={''}
            isDeletable={false}
            onDelete={undefined}
            isHidden={undefined}
          />
          <div className=" hidden items-center gap-3 lg:flex">
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
              onClick={cookieHandle.deleteCookies}
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
        </header>
        <section className="">
          <div className="xl:flex 2xl:justify-center">
            <div className="justify-center lg:flex">
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
                cookie={cookie}
              />
            </div>
            <div className="flex justify-center">
              <SettingsPanel
                IsPremium={User.isPremium}
                userId={user_id}
                cookie={cookie}
                DwPlaylistId={DwPlaylistId}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer style={''} />
      <BurgerMenu burgerClass={burgerClass} ButtonStyle={ButtonStyle} />
    </>
  );
};

export default UserPage;
