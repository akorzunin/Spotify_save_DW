/// <reference types="vite/client" />

import { FC } from 'react';

import BlobButton from '../../components/buttons/blob-button/BlobButton';
import * as cookieHandle from '../../utils/cookieHandle';
import { useQuery } from '@tanstack/react-query';
import { OpenAPI } from '../../api/client';

export const MainPage: FC = () => {
  // getUserQuery
  const { data: userPath } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await cookieHandle.getUserPath();
      if (res) {
        return res;
      }
      console.warn('Cant get user info ');
      return `${OpenAPI.BASE}/login`;
    },
  });

  return (
    <div className="flex items-center justify-center">
      <BlobButton title="Save DW" link={userPath || `${OpenAPI.BASE}/login`} />
    </div>
  );
};

export default MainPage;
