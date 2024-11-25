import { FC, useEffect, useState } from 'react';

import { useNavigate, useSearchParams } from 'react-router';
import { SpotifyCookie } from '../../interfaces/Cookies';
import { setCookies } from '../../utils/cookieHandle';
import { OpenAPI } from '../../api/client';

interface DevSpotifyCookie extends SpotifyCookie {
  user_id: string;
}

const GetTokenPage: FC = () => {
  // only for dev server
  const [code, setCode] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const handleResponse = async (response: Response) => {
    const data = (await response.json()) as DevSpotifyCookie;
    setCookies(data);
    navigate(`/app/user/${data.user_id}`);
  };
  useEffect(() => {
    // console.log(code);
    const codeParam = searchParams.get('code');
    if (!codeParam) {
      throw new Error('No code for auth request');
    }
    setCode(codeParam);

    const options = {
      method: 'GET',
    };

    fetch(
      `${OpenAPI.BASE}/get_token?` +
        new URLSearchParams({
          code: codeParam,
          redirect: 'false',
        }),
      options
    )
      .then((response) => handleResponse(response))
      .catch((err) => console.error(err));
  }, [searchParams]);

  return null;
};

export default GetTokenPage;
