import { FC } from 'react';

interface IBlob {
  styles: string;
}

export const Blob: FC<IBlob> = ({ styles }) => {
  return (
    <svg
      width="494"
      height="549"
      viewBox="0 0 494 549"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles}
    >
      <path
        d="M493.5 323.601C494.3 362.203 484.9 399.271 465.3 434.803C445.7 470.335 415.9 484.591 375.9 477.573C335.9 470.554 297.9 486.127 261.9 524.291C225.9 562.455 199.9 555.217 183.9 502.577C167.9 449.937 134.9 420.546 84.9 414.405C34.9 408.263 7.7 381.943 3.3 335.445C-1.1 288.946 -1.1 242.447 3.3 195.949C7.7 149.45 30.9 117.866 72.9 101.197C114.9 84.5274 149.1 60.8394 175.5 30.1327C201.9 -0.573958 232.9 -7.81196 268.5 8.41871C304.1 24.6494 333.5 44.6087 356.7 68.2967C379.9 91.9847 404.7 113.479 431.1 132.781C457.5 152.082 474.3 179.06 481.5 213.715C488.7 248.369 492.7 284.998 493.5 323.601Z"
        fill="url(#paint0_radial_101_27)"
      />
      <defs>
        <radialGradient
          id="paint0_radial_101_27"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(246.774 274.175) rotate(90) scale(274.175 246.774)"
        >
          <stop stopColor="#61FF00" />
          <stop offset="0.557292" stopColor="#29A3E8" />
          <stop offset="1" stopColor="#CF078B" />
        </radialGradient>
      </defs>
    </svg>
  );
};
