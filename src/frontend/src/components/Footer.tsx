import React, { FC } from 'react';
import { emailLogo, githubLogo, telegramLogo } from '../icons/Logos';
import { EasterEgg } from './EasterEgg';

interface IFooter {
  style: string;
}

const Footer: FC<IFooter> = ({ style }) => {
  return (
    <footer
      className={` mb-0 ${style}  w-[100%] sm:w-[600px] md:w-[728px] lg:w-[974px] xl:w-[1220px] 2xl:w-[1456px]`}
    >
      <div className="border-t border-gray-200 ">
        <div className="container mx-auto flex flex-wrap items-center justify-end px-5 py-8">
          <span className=" ml-0 mr-2 inline-flex  w-full justify-center md:w-auto md:justify-start lg:mt-0">
            Contact me
          </span>
          <span className=" ml-0 inline-flex  w-full  justify-center md:w-auto md:justify-start lg:mt-0">
            <a
              className="text-gray-500"
              href="mailto:akorzunin123@gmail.com"
              target="_blank"
            >
              <img
                className="img-responsive h-6 w-6 object-cover "
                src={emailLogo.href}
                alt="mail"
              />
            </a>
            <a
              className="ml-3 text-gray-500"
              href="https://t.me/akorzunin"
              target="_blank"
            >
              <img
                className="img-responsive h-6 w-6 object-cover "
                src={telegramLogo.href}
                alt="telegram"
              />
            </a>
          </span>
          <span className=" ml-2 inline-flex  w-full justify-center md:w-auto md:justify-start lg:mt-0">
            Source code
          </span>
          <span className="ml-0 inline-flex  w-full  justify-center md:w-auto md:justify-start lg:mt-0">
            <a
              className="ml-3 text-gray-500"
              href="https://github.com/akorzunin/Spotify_save_DW"
              target="_blank"
            >
              <img
                className="img-responsive h-6 w-6 object-cover "
                src={githubLogo.href}
                alt="github"
              />
            </a>
          </span>
        </div>
      </div>

      <div className="body-font bottom-0 w-[100%] text-gray-600">
        <div className="bg-gray-100">
          <div className="container mx-auto flex flex-col flex-wrap px-5 py-4 sm:flex-row">
            <p className="text-center text-sm text-gray-500 sm:text-left">
              {' '}
              2022 Save Spotify Discover Weekly playlist —
              <a
                href="https://github.com/akorzunin"
                className="ml-1 text-gray-600"
                target="_blank"
                rel="noopener noreferrer"
              >
                @akorzunin
              </a>
            </p>
            <EasterEgg />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
