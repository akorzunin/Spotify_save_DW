import React, { FC } from 'react';

interface IBurger {
    burgerClass: string;
    handleBM: VoidFunction;
}

const Burger: FC<IBurger> = ({ burgerClass, handleBM }) => {
    return (
        <div className="">
            <div
                className={`header__burger-menu ${burgerClass}`}
                onClick={handleBM}
            >
                <span></span>
            </div>
        </div>
    );
};

export default Burger;
