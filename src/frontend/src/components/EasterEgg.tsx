import React from 'react';
import { get_text_emoji, updateTextEmoji } from '../utils/utils';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { increment } from '../store/reducers/counterReducer';

export const EasterEgg = () => {
    const dispatch = useDispatch();
    const counter = useTypedSelector((state) => state.counter);
    return (
        <span
            className="sm:ml-auto sm:mt-0 mt-2 sm:w-auto w-full sm:text-left text-center text-gray-500 text-sm hover:cursor-help"
            onClick={(e) => {
                console.log(counter);
                dispatch(increment());
                updateTextEmoji(e);
            }}
        >
            {get_text_emoji()}
        </span>
    );
};
