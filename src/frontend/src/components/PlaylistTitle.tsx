import React from "react"
import PropTypes from "prop-types"

const PlaylistTitle = ({ title, isDW }) => {
    return (
        <div className="pl-3 pr-3 ">
            <a
                className={`inline-flex py-2 px-4 border border-transparent shadow-sm
                font-medium rounded-md text-white ${
                    isDW ? "bg-green-500" : "bg-yellow-500"
                } hover:opacity-80 transition-opacity
                w-[100%] `}
            >
                {title}
            </a>
        </div>
    )
}

PlaylistTitle.propTypes = {}

export default PlaylistTitle
