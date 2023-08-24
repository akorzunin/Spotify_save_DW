import React, { FC } from 'react';
import { get_text_emoji, updateTextEmoji } from '../utils/utils';

interface IFooter {
    style: string;
}

const Footer: FC<IFooter> = ({ style }) => {
    return (
        <footer
            className={` mb-0 ${style}  w-[100%] sm:w-[600px] md:w-[728px] lg:w-[974px] xl:w-[1220px] 2xl:w-[1456px]`}
        >
            <div className="border-t border-gray-200 ">
                <div className="container px-5 py-8 flex flex-wrap mx-auto items-center justify-end">
                    <span className=" ml-0 mr-2 inline-flex  lg:mt-0 w-full justify-center md:justify-start md:w-auto">
                        Contact me
                    </span>
                    <span className=" ml-0 inline-flex  lg:mt-0  w-full justify-center md:justify-start md:w-auto">
                        <a
                            className="text-gray-500"
                            href="mailto:akorzunin123@gmail.com"
                            target="_blank"
                        >
                            <img
                                className="img-responsive object-cover w-6 h-6 "
                                src="src/assets/images/email-logo-48.png"
                                alt="mail"
                            />
                        </a>
                        <a
                            className="ml-3 text-gray-500"
                            href="https://t.me/akorzunin"
                            target="_blank"
                        >
                            <img
                                className="img-responsive object-cover w-6 h-6 "
                                src="src/assets/images/telegram-logo-48.PNG"
                                alt="telegram"
                            />
                        </a>
                    </span>
                    <span className=" ml-2 inline-flex  lg:mt-0 w-full justify-center md:justify-start md:w-auto">
                        Source code
                    </span>
                    <span className="ml-0 inline-flex  lg:mt-0  w-full justify-center md:justify-start md:w-auto">
                        <a
                            className="ml-3 text-gray-500"
                            href="https://github.com/akorzunin/Spotify_save_DW"
                            target="_blank"
                        >
                            <img
                                className="img-responsive object-cover w-6 h-6 "
                                src="src/assets/images/github-48.PNG"
                                alt="github"
                            />
                        </a>
                    </span>
                </div>
            </div>

            <div className="text-gray-600 body-font w-[100%] bottom-0">
                <div className="bg-gray-100">
                    <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
                        <p className="text-gray-500 text-sm text-center sm:text-left">
                            {' '}
                            2022 Save Spotify Discover Weekly playlist —
                            <a
                                href="https://github.com/akorzunin"
                                className="text-gray-600 ml-1"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                @akorzunin
                            </a>
                        </p>
                        <span
                            className="sm:ml-auto sm:mt-0 mt-2 sm:w-auto w-full sm:text-left text-center text-gray-500 text-sm hover:cursor-help"
                            onClick={updateTextEmoji}
                        >
                            {get_text_emoji()}
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
