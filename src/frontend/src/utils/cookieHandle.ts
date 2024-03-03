import Cookies from 'universal-cookie';
import { SpotifyCookie } from '../interfaces/Cookies';
import { SpotifyCookieKeys } from '../interfaces/Cookies';

export const setCookies = (cookies: SpotifyCookie) => {
  const cookiesLib = new Cookies();
  SpotifyCookieKeys.forEach((key) => {
    if (cookies[key]) {
      cookiesLib.set(key, cookies[key], { path: '/' });
    }
  });
};
export const readCookies = () => {
  const cookiesLib = new Cookies();
  const allCookies = cookiesLib.getAll();
  const spotifyCookies = {};
  SpotifyCookieKeys.forEach((key: string) => {
    spotifyCookies[key] = cookiesLib.get(key);
  });
  return [spotifyCookies, allCookies];
};
export const getUserPath = async (cookie: SpotifyCookie) => {
  const res = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `${cookie.token_type} ${cookie.access_token}`,
    },
  });
  const data = await res.json();
  if (data.id) return '/app/user/' + data.id;
  return '/login';
};
export const isValidCookies = (cookie: SpotifyCookie) => {
  if (!Object.keys(cookie).length) {
    console.log('invalid cookies');
    return false;
  } else {
    console.log('Valid cookies');
    return true;
  }
};
export const deleteCookies = () => {
  const cookiesLib = new Cookies();
  SpotifyCookieKeys.forEach((key: string) => {
    cookiesLib.remove(key, { path: '/' });
  });
  console.info('spotify api cookies deleted');
};
