import React, { FC } from 'react';
import { BaseButtonClass } from './BaseButton';

interface IClickButton {
  title: string;
  onClick: VoidFunction;
  color: string;
}

const ClickButton: FC<IClickButton> = ({
  title = 'Button',
  onClick,
  color = 'bg-blue-700',
}) => {
  return (
    <button
      tabIndex={0}
      role="link"
      onClick={onClick}
      className={`${BaseButtonClass} ${color} btn text-white`}
    >
      {title}
    </button>
  );
};

export default ClickButton;
