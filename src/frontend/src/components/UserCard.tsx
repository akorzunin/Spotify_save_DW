import React, { FC, useState } from 'react';
import { ModalAvatar } from './ModalAvatar';
import { WeekCounter } from './WeekCounter';

interface IUserCard {
    userName: string;
    imgUrl: string;
    followers: number;
}

export const DefaultUserImage =
    'https://i.scdn.co/image/ab6775700000ee8549835514e2fac464191927c7';

const UserCard: FC<IUserCard> = ({
    userName = 'User Name',
    imgUrl = DefaultUserImage,
    followers = 0,
}) => {
    const [modalActive, setModalActive] = useState(false);

    return (
        <div className="flex p-5">
            <img
                src={imgUrl}
                alt="User icon"
                className="h-16 rounded-full mr-9 cursor-pointer"
                onClick={() => {
                    setModalActive(true);
                }}
            />
            <div>
                <div className="p-0.5 flex ">
                    <div className="font-semibold text-white text-lg mr-6 leading-6 text-shadow-md">
                        {userName}
                    </div>
                    <div className="text-white text-base mt-[2px] leading-6 opacity-80 hidden xl:block text-shadow-md">
                        {followers > 999 ? followers / 1000 + 'k' : followers}{' '}
                        followers
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
