import React, { FC } from 'react';
import { WeekCounter } from './WeekCounter';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { getUserData } from '../utils/apiManager';
import { Avatar, AvatarFallback, AvatarImage } from '../shadcn/ui/avatar';
import { formatFollowerNumber } from '../utils/utils';

export const DefaultUserImage =
  'https://i.scdn.co/image/ab6775700000ee8549835514e2fac464191927c7';

const UserCard: FC = () => {
  const { userId } = useParams();

  const { data: user } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const userData = await getUserData();
      return userData;
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
        <div className="p-0.5">
          <div className="text-shadow-md mr-6 text-lg font-semibold leading-6 text-black">
            {user?.name}
          </div>
          <div className="text-shadow-md xl:block mt-[2px] hidden text-base leading-6 text-black opacity-80">
            {formatFollowerNumber(user?.followers || 0)} followers
          </div>
        </div>
        <WeekCounter />
      </div>
    </div>
  );
};

export default UserCard;
