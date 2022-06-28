import React from 'react'
import PropTypes from 'prop-types'

const UserCard = ({userName, imgUrl, followers}) => {
    return (
        <div className="bg-orange-500 flex">
            <img src={ imgUrl } alt="User icon" 
                className="w-12 h-12 p-2 rounded-full"/>
            <div className="p-2">
                <div>
                    {userName}
                </div>
                <div>
                    {followers > 999 ?
                        (followers / 1000) + "k" :
                        followers} followers
                </div>
            </div>
        </div>
    )
}

UserCard.defaultProps = {
    userName: "DefaultUser",
    imgUrl: "https://i.scdn.co/image/ab6775700000ee8549835514e2fac464191927c7",
    followers: "999",
}

UserCard.propTypes = {
    userName: PropTypes.string,
    imgUrl: PropTypes.string,
    followers: PropTypes.string,
}

export default UserCard