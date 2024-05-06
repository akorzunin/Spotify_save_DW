import React, { FC, useState } from 'react';
import { ModalAvatar } from './ModalAvatar';
import { WeekCounter } from './WeekCounter';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export const DefaultUserImage =
  'https://i.scdn.co/image/ab6775700000ee8549835514e2fac464191927c7';

const UserCard: FC = () => {
  const [modalActive, setModalActive] = useState(false);
  // const [user, setfirst] = useAtom(spotifyUserAtom)
  const userName = '123';
  const imgUrl = DefaultUserImage;
  const followers = 123;
  const { userId } = useParams();

  const {
    status,
    data: user,
    error,
    refetch,
  } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const userData = await getUserData(cookie);
      return userData;
    },
    initialData: {
      noUser: true,
    },
  });
  console.log(user);
  return (
    <div className="flex p-5">
      <img
        src={imgUrl}
        alt="User icon"
        className="mr-9 h-16 cursor-pointer rounded-full"
        onClick={() => {
          setModalActive(true);
        }}
      />
      <div>
        <div className="flex p-0.5 ">
          <div className="text-shadow-md mr-6 text-lg font-semibold leading-6 text-black ">
            {userName}
          </div>
          <div className="text-shadow-md mt-[2px] hidden text-base leading-6 text-black      opacity-80 xl:block">
            {followers > 999 ? followers / 1000 + 'k' : followers} followers
          </div>
        </div>
        <WeekCounter />
      </div>
      {modalActive && (
        <ModalAvatar
          img={imgUrl}
          isOpen={modalActive}
          handleCloseModal={setModalActive}
        />
      )}
    </div>
  );
};

export default UserCard;
