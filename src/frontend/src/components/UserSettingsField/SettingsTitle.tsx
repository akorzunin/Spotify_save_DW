import React, { FC } from 'react';

const SettingsTitle: FC = () => {
    return (
        <div className="px-3 w-[100%]">
            <div
                className="inline-flex py-2 px-4 border border-transparent shadow-sm font-medium rounded-md text-white bg-emerald-600 hover:opacity-80 transition-opacity
                    w-[100%]"
            >
                Settings:
            </div>
        </div>
    );
};

export default SettingsTitle;
