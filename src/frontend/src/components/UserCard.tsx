import React, { FC, useState } from 'react';
import { ModalAvatar } from './ModalAvatar';
import { WeekCounter } from './WeekCounter';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import * as cookieHandle from '../utils/cookieHandle';
import { getUserData } from '../utils/apiManager';
import { Avatar, AvatarFallback, AvatarImage } from './shadcn/ui/avatar';

export const DefaultUserImage =
  'https://i.scdn.co/image/ab6775700000ee8549835514e2fac464191927c7';

const UserCard: FC = () => {
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
      id: '',
      isPremium: false,
    },
  });
  return (
    <div className="flex items-center gap-4 p-4">
      {/* all user pictures can be only 64x64 */}
      <Avatar className="h-[64px] w-[64px]">
        <AvatarImage src={user?.img} className="h-full" />
        <AvatarFallback>NA</AvatarFallback>
      </Avatar>
      <div>
        <div className="p-0.5 ">
          <div className="text-shadow-md mr-6 text-lg font-semibold leading-6 text-black ">
            {user?.name}
          </div>
          <div className="text-shadow-md mt-[2px] hidden text-base leading-6 text-black opacity-80 xl:block">
            {user?.followers > 999
              ? Math.trunc(user?.followers / 1000) + 'k'
              : user?.followers}{' '}
            followers
          </div>
        </div>
        <WeekCounter />
      </div>
    </div>
  );
};

export default UserCard;
