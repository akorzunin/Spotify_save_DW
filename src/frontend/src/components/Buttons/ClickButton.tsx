import React from "react"
import PropTypes from "prop-types"
import { BaseButtonClass } from "./BaseButton"

const ClickButton = ({ title, onClick, color, style }) => {
    return (
        <a
            onClick={onClick}
            className={`${BaseButtonClass} ${color} ${style}`}
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
