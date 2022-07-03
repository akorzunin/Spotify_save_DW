import React, { useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import Playlist from './Playlist'


const FullPlaylist = ({ PlaylistName, PlSongs,isDW, style}) => {
    return (
        <div className="">
            <Playlist
                title={ PlaylistName }
                songs={ PlSongs }
                isDW={ isDW }
                style={style}
            />
        </div>
    )
}

FullPlaylist.propTypes = {}

export default FullPlaylist