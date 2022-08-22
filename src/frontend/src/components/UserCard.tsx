import React from "react"
import PropTypes from "prop-types"
import { WeekCounter } from "./WeekCounter"

const UserCard = ({ userName, imgUrl, followers }) => {
    return (
        <div className="flex p-5">
            <div className="mr-9">
                <img
                    src={imgUrl}
                    alt="User icon "
                    className="h-16 rounded-full"
                />
            </div>
            <div>
                <div className="p-0.5 flex ">
                    <div className="font-semibold text-white text-lg mr-6 leading-6">
                        {userName}
                    </div>
                    <div className="text-white text-base mt-[2px] leading-6 opacity-80 hidden xl:block">
                        {followers > 999 ? followers / 1000 + "k" : followers}{" "}
                        followers
                    </div>
                </div>
                <WeekCounter className="text-white text-sm xl:text-lg p-0.5" />
            </div>
        </div>
    )
}
export const DefaultUserImage =
    "https://i.scdn.co/image/ab6775700000ee8549835514e2fac464191927c7"

UserCard.defaultProps = {
    userName: "DefaultUser",
    imgUrl: DefaultUserImage,
    followers: 999,
}

UserCard.propTypes = {
    userName: PropTypes.string,
    imgUrl: PropTypes.string,
    followers: PropTypes.number,
}

export default UserCard
