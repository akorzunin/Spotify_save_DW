import React, { FC, useEffect, useState } from 'react';
import Button from './buttons/BaseButton';
import { deleteCookies } from '../utils/cookieHandle';
import { cn } from '../lib/utils';

interface IBurgerMenu {
  burgerClass: string;
}

const BurgerMenu: FC<IBurgerMenu> = ({ burgerClass }) => {
  const [burgerOpen, setburgerOpen] = useState(false);
  useEffect(() => {
    setburgerOpen(!!burgerClass);
  }, [burgerClass]);

  return (
    <div
      className={cn(
        `ml-[calc((100vw - 320px) / 2);] fixed right-0 top-0 hidden h-80 w-48 bg-cyan-400 [clip-path:circle(70%_at_100%_30%)] lg:hidden`,
        burgerOpen && 'flex'
      )}
    >
      <div className="my-auto ml-auto mr-7 flex flex-col gap-3">
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
