import React from "react"
import PropTypes from "prop-types"
import { BaseButtonClass } from "./BaseButton"

const ClickButton = ({ title, onClick, color, style }) => {
    return (
        <button tabIndex="0" role="link" onClick={onClick}>
            <div className={`${BaseButtonClass} ${color} ${style}`}>
                {title}
            </div>
        </button>
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
