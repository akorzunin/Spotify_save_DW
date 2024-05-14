import Cookies from 'universal-cookie';
import { SpotifyCookie } from '../interfaces/Cookies';
import { SpotifyCookieKeys } from '../interfaces/Cookies';
import { getSpotifyUrl } from './utils';
import { getAccessToken } from './auth';

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
interface IapiSpotifyMe {
  country: string;
  display_name: string;
  // explicit_content : {filter_enabled: false, filter_locked: false}
  // external_urls : {spotify: 'https://open.spotify.com/user/sltyljtam3wzcb28yeowsxcn4'}
  // followers : {href: null, total: 5}
  href: string;
  id: string;
  // images : (2) [{…}, {…}]
  product: string;
  type: string;
  uri: string;
}
export const getUserPath = async (cookie: SpotifyCookie, isDirect = false) => {
  const token = await getAccessToken();
  const res = await fetch(getSpotifyUrl('/v1/me', isDirect), {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = (await res.json()) as IapiSpotifyMe;
  if (data.id) return '/app/user/' + data.id;
  return '/login';
};
export const isValidCookies = (cookie: SpotifyCookie) => {
  if (!Object.keys(cookie).length) {
    return false;
  } else {
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
