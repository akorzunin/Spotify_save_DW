import React, { useState } from 'react';
import { get_text_emoji, updateTextEmoji } from '../utils/utils';
import { useAtom } from 'jotai';
import { easterEggCountAtom } from '../store/store';
import { cn } from '../lib/utils';

export const EasterEgg = () => {
  const [easterEggCount, setEasterEggCount] = useAtom(easterEggCountAtom);
  const [rotate, setRotate] = useState(false);
  return (
    <span
      className={cn(
        'mt-2 w-full select-none text-center text-sm text-gray-500 hover:cursor-help sm:ml-auto sm:mt-0 sm:w-auto sm:text-left',
        rotate && 'animate-spin'
      )}
      onClick={(e) => {
        setEasterEggCount(easterEggCount + 1);
        if (easterEggCount > 10) {
          setRotate(true);
          setEasterEggCount(0);
        } else {
          setRotate(false);
        }

        updateTextEmoji(e);
      }}
    >
      {get_text_emoji()}
    </span>
  );
};
