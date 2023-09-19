export interface Song {
  name: string; // this.track.name
  imgUrl: string; // this.track.album.images[2].url 640/300/64
  artists: string[] | string; // this.track.artists[0].name
  artist?: string;
  id?: string;
  uri?: string; // this.track.uri
}

export const emptySong = {
  name: 'No track data',
  imgUrl: 'https://i.scdn.co/image/ab67616d000048514ce8b4e42588bf18182a1ad2',
  artists: 'No artist data',
};
