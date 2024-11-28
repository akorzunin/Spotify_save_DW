import { FC } from 'react';
import { emailLogo, githubLogo, telegramLogo } from '../icons/Logos';
import { EasterEgg } from './EasterEgg';
import { cn } from '../lib/utils';

interface IFooter {
  className?: string;
}

const Footer: FC<IFooter> = ({ className }) => {
  return (
    <footer className={cn('', className)}>
      <div className="border-b border-primary p-0.5" />
      <div className="flex justify-end gap-4 px-5 py-8">
        <div className="flex gap-3">
          Contact me
          <span>
            <a href="mailto:akorzunin123@gmail.com" target="_blank">
              <img
                className="img-responsive h-6 w-6 object-cover"
                src={emailLogo.href}
                height={24}
                width={24}
                alt="mail"
              />
            </a>
          </span>
          <span>
            <a href="https://t.me/akorzunin" target="_blank">
              <img
                className="img-responsive h-6 w-6 object-cover"
                src={telegramLogo.href}
                height={24}
                width={24}
                alt="telegram"
              />
            </a>
          </span>
        </div>
        <div className="flex gap-3">
          Source code
          <span>
            <a
              href="https://github.com/akorzunin/Spotify_save_DW"
              target="_blank"
            >
              <img
                className="img-responsive h-6 w-6 object-cover"
                src={githubLogo.href}
                height={24}
                width={24}
                alt="github"
              />
            </a>
          </span>
        </div>
      </div>

      <div className="bg-primary">
        <div className="flex items-center justify-between truncate px-5 py-4">
          <p className="text-sm text-muted-foreground ">
            2022 —{' '}
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
