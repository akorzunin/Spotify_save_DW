import { FC } from 'react';
import { cn } from '../../lib/utils';

interface IAccountStatus {
  IsPremium: boolean;
}

const AccountStatus: FC<IAccountStatus> = ({ IsPremium }) => {
  return (
    <div className="mt-3 px-3">
      <div
        className={cn(
          `inline-flex w-full rounded-md border border-transparent px-4 py-2
          font-medium text-primary shadow-sm transition-opacity hover:opacity-80`,
          IsPremium ? 'bg-secondary' : 'bg-third'
        )}
      >
        Account status: {IsPremium ? 'Premium' : 'not Premium'}
      </div>
    </div>
  );
};

export default AccountStatus;
