import { FC } from 'react';

import { BaseButtonClass } from '../BaseButton';
import { cn } from '../../../lib/utils';

interface IClickButton {
  title: string;
  onClick: VoidFunction;
  color: string;
}

const ClickButton: FC<IClickButton> = ({
  title = 'Button',
  onClick,
  color = 'bg-secondary',
}) => {
  return (
    <button
      tabIndex={0}
      role="link"
      onClick={onClick}
      className={cn(BaseButtonClass, `btn text-primary`, color)}
    >
      {title}
    </button>
  );
};

export default ClickButton;
