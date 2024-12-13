import { useAtomValue } from 'jotai';
import { UserDataAtom } from '../../store/store';
import AccountStatus from '../UserSettingsField/AccountStatus';
import SettingsTitle from '../UserSettingsField/SettingsTitle';
import { SettingsForm } from './SettingsForm';

export const SettingsPanelV2 = () => {
  const userData = useAtomValue(UserDataAtom);
  return (
    <div className="flex w-full flex-col gap-y-3">
      <SettingsTitle />
      <AccountStatus IsPremium={userData.is_premium} />
      <SettingsForm />
    </div>
  );
};
