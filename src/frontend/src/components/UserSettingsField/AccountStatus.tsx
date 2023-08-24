import React, { FC } from 'react';

interface IAccountStatus {
    IsPremium: boolean;
}

const AccountStatus: FC<IAccountStatus> = ({ IsPremium }) => {
    return (
        <div className="px-3 mt-3">
            <div
                className={`inline-flex py-2 px-4 border border-transparent shadow-sm
                        font-medium rounded-md text-white ${
                            IsPremium ? 'bg-emerald-600' : 'bg-yellow-500'
                        } hover:opacity-80 transition-opacity
                        w-[100%] `}
            >
                Account status: {IsPremium ? 'Premium' : 'not Premium'}
            </div>
        </div>
    );
};

export default AccountStatus;
