import React, { FC } from 'react';

import styles from './index.module.css';

interface IHeader {
  title: string;
}

const MainHeader: FC<IHeader> = ({ title }) => {
  return (
    <div>
      <h1 className="text-6xl font-bold">{title}</h1>
    </div>
  );
};

export default MainHeader;
