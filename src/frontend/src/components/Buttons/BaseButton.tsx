import React from "react"
import PropTypes from "prop-types"

export const BaseButtonClass = `cursor-pointer inline-flex justify-center py-2 px-4 border border-transparent shadow-sm
    text-sm font-medium text-black rounded-md hover:opacity-80 transition-opacity
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600`

const BaseButton = ({ title, link, color, style }) => {
    return (
        <button
            tabIndex="0"
            href={link}
            className={`${BaseButtonClass} ${color} ${style}`}
        >
            {title}
        </button>
    )
}

BaseButton.defaultProps = {
    title: "Button",
    link: "/",
    color: "bg-blue-700",
    style: "",
}

BaseButton.propTypes = {
    title: PropTypes.string,
    link: PropTypes.string,
    color: PropTypes.string,
    style: PropTypes.string,
}

export default BaseButton
