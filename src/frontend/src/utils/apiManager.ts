import { readCookies, setCookies } from './cookieHandle';
import { emptySong, Song } from '../interfaces/Song';

import * as timeMangment from './timeMangment';
import { SpotifyApi } from '../api/SpotifyApi';
import { Playback } from '../interfaces/Playback';
import { getSpotifyUrl } from './utils';
import { getAccessToken } from './auth';
import { OpenAPI } from '../api/client';

const checkStatusCode = (res: Response) => {
  const logErr = (res: Response) => {
    res.json().then((err) => {
      console.table(err.error);
    });
  };
  if (res.status > 399) {
    if (res.status === 401) {
      console.error('Token is invalid trying to refresh');
      logErr(res);
      refreshToken();
      return false;
    }
    if (res.status === 403) {
      console.error('Need paid user for that');
      logErr(res);
      return false;
    }
    if (res.status === 503) {
      // somtimes happening for no reason
      // probably cause of packet loss or sth like that
      console.warn('Connection error');
      return false;
    }
  }

  return true;
};

export const refreshToken = () => {
  const refreshToken = readCookies()[0].refresh_token;
  if (refreshToken === 'undefined' || typeof refreshToken === 'undefined') {
    throw new Error('Cant refresh token because no cookies available');
  }
  fetch(`${OpenAPI.BASE}/api/refresh_token`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  })
    .then((res) => res.json())
    .then((data) => {
      // save data to browser cookies
      setCookies(data);
      localStorage.setItem('refresh_token', data.refresh_token);
    })
    .catch((err) => {
      console.error(err);
    });
};
export interface UserData {
  name: string;
  img: string;
  followers: number;
  id: string;
  isPremium: boolean;
}
export const getUserData = async (): Promise<UserData> => {
  const token = await getAccessToken();
  const res = await fetch(getSpotifyUrl('/v1/me/', false), {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = (await res.json()) as SpotifyApi.CurrentUsersProfileResponse;
  let isPremium = false;
  if (data.product === 'premium') {
    isPremium = true;
  }
  let userImage: string;
  if (!data.images) {
    userImage = '';
  } else {
    userImage = data.images[0].url;
  }
  return {
    name: data.display_name || 'No User',
    img: userImage,
    followers: data?.followers?.total || 0,
    id: data.id,
    isPremium: isPremium,
  };
};

export const getUserPlayback = async () => {
  const token = await getAccessToken();
  const res = await fetch(getSpotifyUrl('/v1/me/player', false), {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.status === 204) {
    console.info('No content');
    return false;
  }
  if (checkStatusCode(res)) {
    const data = (await res.json()) as SpotifyApi.CurrentlyPlayingObject;
    return data;
  }
  return false;
};

const isPlaybackPlaylist = (data): string | boolean => {
  try {
    if (data.context.type === 'playlist') {
      return data.context.uri;
    } else if (data.context.type === 'collection') {
      console.warn('No playlist found, collection is playing');
      return false;
    } else if (data.context.type === 'album') {
      console.warn('No playlist found, album is playing');
      return false;
    } else {
      throw new Error('No playlist found');
    }
  } catch (err) {
    if (err instanceof TypeError) {
      if (data.item.type === 'track') {
        console.warn('No playlist found');
        return false;
      }
      throw new Error('No playlist in a playback');
    } else {
      throw err; // re-throw the error unchanged
    }
  }
};
const getPlaylistSongs = async (
  playlistUri: string,
  currentSong: Song
): Promise<Playback> => {
  const playlistId = playlistUri.split(':').pop();
  const token = await getAccessToken();
  const res = await fetch(getSpotifyUrl(`/v1/playlists/${playlistId}`, false), {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = (await res.json()) as SpotifyApi.PlaylistObjectFull;
  const songs: Song[] = [];
  data.tracks.items.forEach((song) => {
    songs.push({
      name: song?.track?.name || '',
      artists: song?.track?.artists.map((i) => i.name) || [],
      uri: song?.track?.uri,
      imgUrl: song?.track?.album.images[2].url || '',
    });
  });
  return [songs, data, currentSong];
};
export const getPlayBackSongs = async (
  prevData: Playback
): Promise<Playback> => {
  const data = await getUserPlayback();
  if (!data || !data?.item) {
    console.warn('No user playback');
    const noPlInfo = false;
    const emptySongs = [emptySong];
    return [emptySongs, noPlInfo, emptySong];
  }
  if (data.item?.type !== 'track') {
    throw new Error('Cant handle this type of song');
  }

  const currentSong: Song = {
    name: data.item.name,
    imgUrl: data.item.album.images[2].url,
    artists: data.item.artists.map((artist) => artist.name),
    id: data.item.uri,
  };
  const playlistUri = isPlaybackPlaylist(data);
  let songs: Song[] = [];
  let plInfo;
  const prevPlaylistUri = prevData[1] && prevData[1].uri;
  if (playlistUri && playlistUri !== prevPlaylistUri) {
    // fetch all songs from new playlist
    return await getPlaylistSongs(playlistUri.toString(), currentSong);
  }
  if (playlistUri) {
    // only update current song if same playlist is playing
    return [prevData[0], prevData[1], currentSong];
  }
  songs = [
    {
      name: data.item.name,
      artists: data.item.artists.map((artist) => artist.name),
      uri: data.item.uri,
      imgUrl: data.item.album.images[2].url,
    },
  ];
  return [songs, plInfo, currentSong];
};
const generatePlData = async (name?: string, description?: string) => {
  const plData: { name: string; description: string } = {
    name: '',
    description: '',
  };
  if (!name) {
    plData.name = `${timeMangment.fullYear}_${timeMangment.weekNumber}`;
  }
  if (!description) {
    // replace regular space w/ U+205F cause of bug
    plData.description =
      `Creation date: ${timeMangment.currentTime}. This playlist was created by web service. Link to github repo /akorzunin/Spotify_save_DW`
        .split(' ')
        .join(' ');
  }
  return plData;
};
export const saveUserPl = async (songs) => {
  // Create new playlist
  const userData = await getUserData();
  const PlData = await generatePlData();
  if (userData) {
    const token = await getAccessToken();
    const res = await fetch(
      getSpotifyUrl(`/v1/users/${userData.id}/playlists`, false),
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: PlData.name,
          description: PlData.description,
          public: true,
        }),
      }
    );
    if (checkStatusCode(res)) {
      const resData = (await res.json()) as SpotifyApi.CreatePlaylistResponse;
      // wait some time before spotify create playlist
      await new Promise((resolve) => setTimeout(resolve, 500));
      // add songs to playlist
      const token = await getAccessToken();
      const plRes = await fetch(
        getSpotifyUrl(`/v1/playlists/${resData.id}/tracks`, false),
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            uris: songs.map((x) => x.id),
          }),
        }
      );
      if (!checkStatusCode(plRes)) {
        return false;
      }
      const data =
        (await plRes.json()) as SpotifyApi.AddTracksToPlaylistResponse;
      console.info('Created', data);
      const updatedRes = await updatePlaylistDescription(resData);
      return updatedRes;
    }
  }
  return false;
};

export const updatePlaylistDescription = async (plData) => {
  const playtlistDetails = await generatePlData();
  const token = await getAccessToken();
  const res = await fetch(getSpotifyUrl(`/v1/playlists/${plData.id}`, false), {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      description: playtlistDetails.description,
    }),
  });
  if (!checkStatusCode(res)) {
    return false;
  }
  return res;
};
