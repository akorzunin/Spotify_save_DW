import React from "react"
import PropTypes from "prop-types"

const ClickButton = ({ title, onClick, color, style }) => {
    return (
        <a
            onClick={onClick}
            className={`cursor-pointer inline-flex justify-center py-2 px-4 border border-transparent shadow-sm
                text-sm text-left font-medium rounded-md text-white ${color} hover:opacity-80 transition-opacity
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${style}`}
        >
            {title}
        </a>
    )
}

ClickButton.defaultProps = {
    title: "Button",
    onClick: () => console.log("Button is clicked"),
    color: "bg-blue-700",
    style: "",
}

ClickButton.propTypes = {
    title: PropTypes.string,
    onClick: PropTypes.func,
    color: PropTypes.string,
    style: PropTypes.string,
}

export default ClickButton
