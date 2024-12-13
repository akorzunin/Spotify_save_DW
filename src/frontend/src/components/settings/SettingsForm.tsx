import { useAtomValue } from 'jotai';
import { UserDataAtom } from '../../store/store';
import { Switch } from '../../shadcn/ui/switch';
import { Label } from '@radix-ui/react-dropdown-menu';

export const SettingsForm = () => {
  const userData = useAtomValue(UserDataAtom);

  return (
    <div className="rounded-md bg-secondary bg-opacity-30 p-4">
      <form action="">
        <div className="flex items-center space-x-2">
          <Switch />
          <Label>Send weekly email</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch />
          <Label>Autosave</Label>
        </div>
      </form>
    </div>
  );
};
