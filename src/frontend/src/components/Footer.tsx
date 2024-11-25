import React, { FC } from 'react';
import { emailLogo, githubLogo, telegramLogo } from '../icons/Logos';
import { EasterEgg } from './EasterEgg';
import { cn } from '../lib/utils';

interface IFooter {
  className?: string;
}

const Footer: FC<IFooter> = ({ className }) => {
  return (
    <footer
      className={cn(
        `fixed inset-x-0 bottom-0 mx-auto tablet:px-8 desktop:max-w-screen-desktop`,
        className
      )}
    >
      <div className="border-t border-gray-200">
        <div className="container mx-auto flex flex-wrap items-center justify-end px-5 py-8">
          <span className="md:w-auto md:justify-start lg:mt-0 ml-0 mr-2 inline-flex w-full justify-center">
            Contact me
          </span>
          <span className="md:w-auto md:justify-start lg:mt-0 ml-0 inline-flex w-full justify-center">
            <a
              className="text-gray-500"
              href="mailto:akorzunin123@gmail.com"
              target="_blank"
            >
              <img
                className="img-responsive h-6 w-6 object-cover"
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
                className="img-responsive h-6 w-6 object-cover"
                src={telegramLogo.href}
                alt="telegram"
              />
            </a>
          </span>
          <span className="md:w-auto md:justify-start lg:mt-0 ml-2 inline-flex w-full justify-center">
            Source code
          </span>
          <span className="md:w-auto md:justify-start lg:mt-0 ml-0 inline-flex w-full justify-center">
            <a
              className="ml-3 text-gray-500"
              href="https://github.com/akorzunin/Spotify_save_DW"
              target="_blank"
            >
              <img
                className="img-responsive h-6 w-6 object-cover"
                src={githubLogo.href}
                alt="github"
              />
            </a>
          </span>
        </div>
      </div>

      <div className="bottom-0 bg-gray-100 text-gray-600">
        <div className="flex items-center justify-between px-5 py-4">
          <p className="text-sm ">
            {' '}
            2022 Save Spotify Discover Weekly playlist —
            <a
              href="https://github.com/akorzunin"
              target="_blank"
              rel="noopener noreferrer"
            >
              @akorzunin
            </a>
          </p>
          <EasterEgg />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
