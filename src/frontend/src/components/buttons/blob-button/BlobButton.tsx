import { FC } from 'react';

import styles from './BlobButton.module.css';

interface IBlobButton {
  title: string;
  link: string;
}

const circleStyle = {
  0: styles.circle__0,
  1: styles.circle__1,
  2: styles.circle__2,
  3: styles.circle__3,
  4: styles.circle__4,
};

const BlobButton: FC<IBlobButton> = ({ title = 'Blob', link = '/' }) => {
  const circles = [0, 1, 2, 3, 4];

  return (
    <>
      {/* <div className={`relative w-44 overflow-hidden ${styles.circle}`}> */}
      {/* <Blob styles="img-responsive object-cover w-full h-full" /> */}
      {/* {circles.map((circle) => {
          return (
            <div
              key={circle}
              className={`${styles.circle__main} ${circleStyle[circle]}`}
            ></div>
          );
        })} */}
      <a
        href={link}
        className="cursor-pointer rounded-full border border-transparent bg-opacity-0 text-xl font-bold text-purple-700 transition-opacity hover:opacity-80"
      >
        <button tabIndex={0}>{title}</button>
      </a>
      {/* </div> */}
    </>
  );
};

export default BlobButton;
