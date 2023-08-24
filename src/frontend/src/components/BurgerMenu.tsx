import React, { FC, useEffect, useState } from 'react';
import Button from './Buttons/BaseButton';
import { Link } from 'react-router-dom';
import { deleteCookies } from '../utils/cookieHandle';

interface IBurgerMenu {
    burgerClass: string;
}

const BurgerMenu: FC<IBurgerMenu> = ({ burgerClass }) => {
    const [burgerOpen, setburgerOpen] = useState('');
    useEffect(() => {
        setburgerOpen(burgerClass ? 'popup_open' : '');
    }, [burgerClass]);

    return (
        <div
            className={`popup ${burgerOpen} [clip-path:circle(70%_at_100%_30%)]`}
        >
            <div className="my-auto mr-7 ml-auto flex flex-col">
                <Button
                    style="text-white"
                    title="Help"
                    link="/help"
                    color="text-white"
                />
                <Button style="" title="Home" link="/" color="text-black" />
                <Button
                    title="Logout"
                    link="/"
                    color="bg-red-500"
                    onClick={deleteCookies}
                />
            </div>
        </div>
    );
};

export default BurgerMenu;
