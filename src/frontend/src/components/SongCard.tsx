import React from "react"
import PropTypes from "prop-types"
const SongCard = ({ song, index, isDeletable, onDelete, isHidden }) => {
    const handleChange = () => {
        if (isDeletable) {
            console.log("Deletable")
            onDelete(index, true)
        }
    }
    return (
        <div
            className={`flex border-solid border-2 m-3 rounded-md ${
                isHidden && "hidden"
            }`}
        >
            <div
                className={`text-white p-2 mb-auto mt-auto inline ${
                    index < 10 && "ml-2"
                }`}
            >
                {index}
            </div>
            <img
                src={song.imgUrl}
                alt="User icon"
                className="h-[100%] p-2 max-h-[calc(64+8)px]"
            />
            <div className="p-2 w-72 items-center">
                <div className="text-white mt-1 flex truncate mr-4 max-w-[180px]">
                    {song.name}
                </div>
                <div
                    className="text-white mt-1 opacity-80 flex truncate mr-4 
                    max-w-[180px]"
                >
                    {song.artists}
                </div>
            </div>
            <div
                className={`text-white mr-5 my-auto ${!isDeletable && "hidden"}
            border-solid border-2 m-3 rounded-md px-5 
            hover:bg-red-400 hover:pointer hover:border-transparent cursor-pointer
            transition
            `}
                onClick={handleChange}
            >
                X
            </div>
        </div>
    )
}

SongCard.defaultProps = {
    onDelete: () => {},
    isHidden: false,
    isDeletable: false,
}

// SongCard.propTypes = {
//     song: PropTypes.string,
//     index: PropTypes.string,
//     onDelete: PropTypes.func,
//     isHidden: PropTypes.boolean,
//     isDeletable: PropTypes.boolean,
// }

export default SongCard
