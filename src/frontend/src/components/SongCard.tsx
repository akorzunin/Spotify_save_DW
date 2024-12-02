import { FC } from 'react';
import { Song } from '../interfaces/Song';
import { cn } from '../lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../shadcn/ui/avatar';

interface ISongCard {
  song: Song;
  index: number;
  isDeletable: boolean;
  onDelete?: (index: number, value: boolean) => void;
  isHidden?: boolean;
  className?: string;
}

const SongCard: FC<ISongCard> = ({
  song,
  index,
  isDeletable,
  onDelete,
  isHidden,
  className,
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
        'flex items-center gap-x-2 rounded-md border-2 border-solid p-2 text-primary-foreground',
        isHidden && 'hidden',
        className
      )}
    >
      <div className="">{Number.isNaN(index) ? '' : index}</div>
      <Avatar className="h-[64px] w-[64px] rounded-none">
        <AvatarImage src={song.imgUrl} className="h-full" alt="song cover" />
        <AvatarFallback className="rounded-none">NA</AvatarFallback>
      </Avatar>
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
