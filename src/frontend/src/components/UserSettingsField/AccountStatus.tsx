import React, { FC } from 'react';

interface IAccountStatus {
  IsPremium: boolean;
}

const AccountStatus: FC<IAccountStatus> = ({ IsPremium }) => {
  return (
    <div className="mt-3 px-3">
      <div
        className={`inline-flex rounded-md border border-transparent px-4 py-2
                        font-medium text-white shadow-sm ${
                          IsPremium ? 'bg-emerald-600' : 'bg-yellow-500'
                        } w-[100%] transition-opacity
                        hover:opacity-80 `}
      >
        Account status: {IsPremium ? 'Premium' : 'not Premium'}
      </div>
    </div>
  );
};

export default AccountStatus;
