import { FC } from 'react';
import { Song } from '../interfaces/Song';
import { cn } from '../lib/utils';

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
      className={cn(
        'flex max-w-sm rounded-md border-2 border-solid text-primary-foreground',
        isHidden && 'hidden'
      )}
    >
      <div className="inline">{Number.isNaN(index) ? '' : index}</div>
      <img
        src={song.imgUrl}
        alt="Song cover"
        width="64"
        height="64"
        className=""
      />
      <div className="items-center">
        <div className="truncate">{song.name}</div>
        <div className="truncate opacity-80">
          {song.artists.map((artist) => artist).join(', ')}
        </div>
      </div>
      <button
        className={`${!isDeletable && 'hidden'} hover:pointer m-3 cursor-pointer rounded-md border-2 border-solid transition hover:border-transparent hover:bg-red-400`}
        onClick={handleChange}
      >
        X
      </button>
    </div>
  );
};

export default SongCard;
