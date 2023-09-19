import React, { FC } from 'react';

import { Link } from 'react-router-dom';
import Button from '../../components/buttons/BaseButton';
import MainHeader from '../../components/main-header/MainHeader';

const AboutPage: FC = () => {
  return (
    <>
      <header className="flex justify-between">
        <MainHeader title="Help Page" />
        <div className="mr-4 mt-4">
          <Link to="/user/demo_user">
            <Button
              style="mr-3 "
              title="Layout Demo"
              link="/user/demo_user"
              color="bg-white"
            />
          </Link>
          <Link to="/">
            <Button
              style="mr-3"
              title="Home"
              link="/"
              color="bg-white text-black"
            />
          </Link>
          <Button style="mr-3 " title="Login" link="/login" color="bg-white" />
        </div>
      </header>
      <div className="mt-5">
        <h1 className="text-xl font-semibold">How to use</h1>
        <ul>
          <li>
            <span>&#8226;</span> Press Save DW button to login with you Spotify
            account
          </li>
          <li>Now site listening you playback</li>
          <li>
            <span>&#8226;</span> If current playlist is not a DW playlist this
            panel will be yellow
          </li>
          <li>
            <span>&#8226;</span> Now if you don't have Spotify Premium (that
            means site can't control user playback) you can quickly play all
            songs in playlist to add them to new playlist
          </li>
          <li>
            <span>&#8226;</span> When playlist start repeating itself a little
            dot will appear to indicate that you didn't lost any tracks
          </li>
          <li>
            <span>&#8226;</span> That's it! Just press Save button and playlist
            will be automatically created
          </li>
        </ul>
      </div>
    </>
  );
};

export default AboutPage;
