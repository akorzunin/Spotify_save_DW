/// <reference types="vite/client" />

import { FC } from 'react';
import Cookies from 'universal-cookie';

import BlobButton from '../../components/buttons/blob-button/BlobButton';
import * as cookieHandle from '../../utils/cookieHandle';
import { useQuery } from '@tanstack/react-query';
import { OpenAPI } from '../../api/client';

export const MainPage: FC = () => {
  const cookiesLib = new Cookies();
  const cookies = cookiesLib.getAll();

  // getUserQuery
  const { data } = useQuery({
    queryKey: ['user', cookies],
    queryFn: async () => {
      const res = await cookieHandle.getUserPath(cookies);
      if (res) {
        return { userPath: res };
      }
      console.warn('Cant get user info ');
      return { userPath: `${OpenAPI.BASE}/login` };
    },
  });

  return (
    <div className="flex h-[75vh] items-center justify-center">
      <BlobButton
        title="Save DW"
        link={data?.userPath || `${OpenAPI.BASE}/login`}
      />
    </div>
  );
};

export default MainPage;
