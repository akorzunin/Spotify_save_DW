import React, { FC, useState } from 'react';
import { ModalAvatar } from './ModalAvatar';
import { WeekCounter } from './WeekCounter';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import * as cookieHandle from '../utils/cookieHandle';
import { getUserData } from '../utils/apiManager';

export const DefaultUserImage =
  'https://i.scdn.co/image/ab6775700000ee8549835514e2fac464191927c7';

const UserCard: FC = () => {
  const [modalActive, setModalActive] = useState(false);
  // const [user, setfirst] = useAtom(spotifyUserAtom)

  const { userId } = useParams();
  const [cookie] = useState(cookieHandle.readCookies()[0]);

  const { data: user } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const userData = await getUserData(cookie);
      return userData;
    },
    initialData: {
      name: 'No user',
      img: DefaultUserImage,
      followers: 0,
      id: null,
      isPremium: false,
    },
  });
  return (
    <div className="flex p-5">
      <img
        src={user?.img}
        alt="User icon"
        className="mr-9 h-16 cursor-pointer rounded-full"
        onClick={() => {
          setModalActive(true);
        }}
      />
      <div>
        <div className="flex p-0.5 ">
          <div className="text-shadow-md mr-6 text-lg font-semibold leading-6 text-black ">
            {user?.name}
          </div>
          <div className="text-shadow-md mt-[2px] hidden text-base leading-6 text-black      opacity-80 xl:block">
            {user?.followers > 999
              ? user?.followers / 1000 + 'k'
              : user?.followers}{' '}
            followers
          </div>
        </div>
        <WeekCounter />
      </div>
      {modalActive && (
        <ModalAvatar
          img={user?.img || DefaultUserImage}
          isOpen={modalActive}
          handleCloseModal={setModalActive}
        />
      )}
    </div>
  );
};

export default UserCard;
