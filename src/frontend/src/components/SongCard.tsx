import React, { FC } from 'react';
import { Song } from '../interfaces/Song';

interface ISongCard {
    song: Song;
    index: number;
    isDeletable: boolean;
    onDelete?: (index: number, value: boolean) => void;
    isHidden?: boolean;
}

const SongCard: FC<ISongCard> = ({
    song,
    index,
    isDeletable,
    onDelete,
    isHidden,
}) => {
    const handleChange = () => {
        if (isDeletable) {
            console.log('Deletable');
            if (onDelete) onDelete(index, true);
        }
    };
    return (
        <div
            className={`flex border-solid border-2 m-3 rounded-md ${
                isHidden && 'hidden'
            }`}
        >
            <div
                className={`text-black p-2 mb-auto mt-auto inline ${
                    index < 10 && 'ml-2'
                }`}
            >
                {index}
            </div>
            <img
                src={song.imgUrl}
                alt="User icon"
                className="h-[100%] p-2 max-h-[calc(64+8)px]"
            />
            <div className="p-2 w-72 items-center">
                <div className="text-black mt-1 flex truncate mr-4 max-w-[180px]">
                    {song.name}
                </div>
                <div
                    className="text-black mt-1 opacity-80 flex truncate mr-4 
                    max-w-[180px]"
                >
                    {song.artists}
                </div>
            </div>
            <button
                className={`text-white mr-5 my-auto ${!isDeletable && 'hidden'}
            border-solid border-2 m-3 rounded-md px-5 
            hover:bg-red-400 hover:pointer hover:border-transparent cursor-pointer
            transition
            `}
                onClick={handleChange}
            >
                X
            </button>
        </div>
    );
};

export default SongCard;
