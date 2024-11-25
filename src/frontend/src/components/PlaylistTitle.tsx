import { FC } from 'react';

interface IPlaylistTitle {
  title: string;
  isDW: boolean;
}

const PlaylistTitle: FC<IPlaylistTitle> = ({ title, isDW }) => {
  return (
    <div className="pl-3 pr-3">
      <a
        className={`inline-flex rounded-md border border-transparent px-4 py-2 font-medium text-white shadow-sm ${
          isDW ? 'bg-emerald-600' : 'bg-yellow-600'
        } w-[100%] transition-opacity hover:opacity-80`}
      >
        {title}
      </a>
    </div>
  );
};

export default PlaylistTitle;
