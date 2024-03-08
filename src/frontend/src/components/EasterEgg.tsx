import React from 'react';
import { get_text_emoji, updateTextEmoji } from '../utils/utils';
import { useAtom } from 'jotai';
import { easterEggCountAtom } from '../store/store';

export const EasterEgg = () => {
  const [easterEggCount, setEasterEggCount] = useAtom(easterEggCountAtom);
  return (
    <span
      className="mt-2 w-full select-none  text-center text-sm text-gray-500 hover:cursor-help sm:ml-auto sm:mt-0 sm:w-auto sm:text-left"
      onClick={(e) => {
        setEasterEggCount(easterEggCount + 1);
        console.log(easterEggCount);
        updateTextEmoji(e);
      }}
    >
      {get_text_emoji()}
    </span>
  );
};
