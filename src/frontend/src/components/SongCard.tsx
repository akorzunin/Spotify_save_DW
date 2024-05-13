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
      className={`m-3 flex max-w-sm rounded-md border-2 border-solid ${
        isHidden && 'hidden'
      }`}
    >
      <div
        className={`mb-auto mt-auto inline p-2 text-black ${
          index < 10 && 'ml-2'
        }`}
      >
        {Number.isNaN(index) ? '' : index}
      </div>
      <img
        src={song.imgUrl}
        alt="User icon"
        className="h-[100%] max-h-[calc(64+8)px] p-2"
      />
      <div className="w-72 items-center p-2">
        <div className="mr-4 mt-1 flex max-w-[180px] truncate text-black">
          {song.name}
        </div>
        <div
          className="mr-4 mt-1 flex max-w-[180px] truncate text-black
                    opacity-80"
        >
          {song.artists}
        </div>
      </div>
      <button
        className={`my-auto mr-5 text-white ${!isDeletable && 'hidden'}
            hover:pointer m-3 cursor-pointer rounded-md border-2
            border-solid px-5 transition hover:border-transparent
            hover:bg-red-400
            `}
        onClick={handleChange}
      >
        X
      </button>
    </div>
  );
};

export default SongCard;
