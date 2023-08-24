import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

export const BaseButtonClass = `max-h-9 cursor-pointer inline-flex justify-center py-2 px-4 border border-transparent shadow-sm
    text-sm font-medium text-black rounded-md hover:opacity-80 transition-opacity
    `;

interface IBaseButton {
    title: string;
    link?: string | undefined;
    color: string;
    style?: string;
    onClick?: VoidFunction;
}

const BaseButton: FC<IBaseButton> = ({
    title = 'Button',
    link = '/',
    color = 'bg-blue-700',
    style = '',
    onClick,
}) => {
    return (
        <NavLink
            tabIndex={0}
            to={link}
            className={`${BaseButtonClass} ${color} ${style} btn`}
            onClick={onClick}
        >
            {title}
        </NavLink>
    );
};

export default BaseButton;
