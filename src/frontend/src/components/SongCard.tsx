import React from 'react'
import PropTypes from 'prop-types'
export interface Song {
    // id: string,
    name: string,
    artist: string,
    uri: string,
    imgUrl: string,
}
const SongCard = ({ song, index, }) => {
    return (
        <div className="bg-orange-500 flex">
            <div>{index}</div>
            <img src={song.imgUrl} alt="User icon"
                className="w-12 h-12 p-2" />
            <div className="p-2">
                <div>
                    {song.name}
                </div>
                <div>
                    {song.artist}
                    
                </div>
            </div>
        </div>
    )
}

// SongCard.defaultProps = {
//     userName: "DefaulaUser",
//     imgUrl: "https://i.scdn.co/image/ab6775700000ee8549835514e2fac464191927c7",
//     followers: "999",
// }

// SongCard.propTypes = {
//     userName: PropTypes.string,
//     imgUrl: PropTypes.string,
//     followers: PropTypes.string,
// }

export default SongCard