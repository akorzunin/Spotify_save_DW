export interface Song {
    name: string, // this.track.name
    imgUrl: string, // this.track.album.images[2].url 640/300/64
    artists: string[], // this.track.artists[0].name
    artist?: string,
    id?: string,
    uri?: string, // this.track.uri
}
