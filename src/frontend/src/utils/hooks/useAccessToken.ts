import { useAtomValue } from 'jotai';
import { useState, useEffect } from 'react';

const useAccessToken = () => {
  const [data, setData] = useState({});
  useAtomValue;

  useEffect(() => {
    checkToken().then((data) => setData(data));
  }, [url]);

  return [data];
};

export default useAccessToken;
