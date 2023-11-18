import React from 'react';
import { get_text_emoji, updateTextEmoji } from '../utils/utils';
import { useDispatch } from 'react-redux';
import { increment } from '../store/reducers/counterReducer';

export const EasterEgg = () => {
  const dispatch = useDispatch();
  return (
    <span
      className="mt-2 w-full text-center text-sm text-gray-500 hover:cursor-help sm:ml-auto sm:mt-0 sm:w-auto sm:text-left"
      onClick={(e) => {
        dispatch(increment());
        updateTextEmoji(e);
      }}
    >
      {get_text_emoji()}
    </span>
  );
};
