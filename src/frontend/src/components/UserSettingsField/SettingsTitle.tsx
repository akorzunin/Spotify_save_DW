import { FC } from 'react';

const SettingsTitle: FC = () => {
  return (
    <div className="w-[100%] px-3">
      <div className="inline-flex w-[100%] rounded-md border border-transparent bg-emerald-600 px-4 py-2 font-medium text-white shadow-sm transition-opacity hover:opacity-80">
        Settings:
      </div>
    </div>
  );
};

export default SettingsTitle;
