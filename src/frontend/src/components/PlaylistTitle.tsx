import React, { FC } from 'react';

interface IPlaylistTitle {
    title: string;
    isDW: boolean;
}

const PlaylistTitle: FC<IPlaylistTitle> = ({ title, isDW }) => {
    return (
        <div className="pl-3 pr-3 ">
            <a
                className={`inline-flex py-2 px-4 border border-transparent shadow-sm
                font-medium rounded-md text-white ${
                    isDW ? 'bg-emerald-600' : 'bg-yellow-600'
                } hover:opacity-80 transition-opacity
                w-[100%] `}
            >
                {title}
            </a>
        </div>
    );
};

export default PlaylistTitle;
