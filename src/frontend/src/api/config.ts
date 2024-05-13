import { OpenAPI } from './client';

const getAccesToken = async (): Promise<string> => {
  // read from local store
  const accesToken = localStorage.getItem('acces_token');
  if (accesToken) {
    return accesToken;
  }

  // if not found in local store then read from cookies
  // TODO: ...
  return '...';
};

OpenAPI.TOKEN = getAccesToken;
OpenAPI.BASE = import.meta.env.VITE_API_URL || '';
