import { FC } from 'react';
import { Song } from '../interfaces/Song';
import { cn } from '../lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../shadcn/ui/avatar';

interface ISongCard {
  song: Song;
  index: number;
  isDeletable: boolean;
  onDelete?: (song: Song, index: number) => void;
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
      if (onDelete) onDelete(song, index);
    }
  };
  return (
    <div
      className={cn(
        'flex items-center justify-between rounded-md border-2 border-solid p-2 text-primary-foreground',
        isHidden && 'hidden',
        className
      )}
    >
      <div className="flex w-full items-center gap-x-3">
        <div className="flex">{Number.isNaN(index) ? '' : index}</div>
        <Avatar className="h-[64px] w-[64px] rounded-none">
          <AvatarImage src={song.imgUrl} className="h-full" alt="song cover" />
          <AvatarFallback className="rounded-none">NA</AvatarFallback>
        </Avatar>
        <div className="w-[50%]">
          <p className="truncate">{song.name}</p>
          <p className="truncate opacity-80">
            {song.artists.map((artist) => artist).join(', ')}
          </p>
        </div>
      </div>
      <div className="flex gap-x-3">
        <button
          className={cn(
            'hover:pointer cursor-pointer rounded-md border-2 border-solid px-4 transition hover:border-transparent hover:bg-destructive',
            !isDeletable && 'hidden'
          )}
          onClick={handleChange}
        >
          X
        </button>
        <button
          className={cn(
            'hover:pointer cursor-pointer rounded-md border-2 border-solid px-4 transition hover:border-transparent hover:bg-third',
            true && 'hidden'
          )}
          onClick={() => {}}
        >
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default SongCard;
