// @ts-nocheck
import React, { FC } from 'react';
import { Blob } from '../../icons/Blob';
interface IBlobButton {
  title: string;
  link: string;
}

const BlobButton: FC<IBlobButton> = ({ title = 'Blob', link = '/' }) => {
  return (
    <div className="mt-[20%] grid h-[100%] grid-cols-1 place-items-center">
      <div className="relative w-44  overflow-hidden ">
        <Blob styles="img-responsive object-cover w-full h-full" />
        <a
          href={link}
          className={`absolute inset-x-0 bottom-[calc(50%-23px)] inline-flex w-full cursor-pointer justify-center 
                    rounded-full border
                    border-transparent bg-opacity-0 px-4 py-2 text-center text-xl font-bold text-purple-700  
                    shadow-none transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2`}
        >
          <button tabIndex={0}>{title}</button>
        </a>
      </div>
    </div>
  );
};

export default BlobButton;
