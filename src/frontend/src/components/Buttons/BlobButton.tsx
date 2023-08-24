// @ts-nocheck
import React, { FC } from 'react';
import { Blob } from '../../icons/Blob';
interface IBlobButton {
    title: string;
    link: string;
}

const BlobButton: FC<IBlobButton> = ({ title = 'Blob', link = '/' }) => {
    return (
        <div className="grid grid-cols-1 place-items-center h-[100%] mt-[20%]">
            <div className="relative w-44  overflow-hidden ">
                <Blob styles="img-responsive object-cover w-full h-full" />
                <a
                    href={link}
                    className={`cursor-pointer inline-flex justify-center px-4 py-2 border border-transparent 
                    hover:opacity-80 transition-opacity
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 absolute w-full bottom-[calc(50%-23px)] inset-x-0  
                    text-purple-700 font-bold text-xl text-center bg-opacity-0 shadow-none rounded-full`}
                >
                    <button tabIndex={0}>{title}</button>
                </a>
            </div>
        </div>
    );
};

export default BlobButton;
