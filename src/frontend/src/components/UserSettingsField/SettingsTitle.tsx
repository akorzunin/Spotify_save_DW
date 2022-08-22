import React from "react"
import PropTypes from "prop-types"

const SettingsTitle = () => {
    return (
        <div className="px-3 w-[100%]">
            <div
                className="inline-flex py-2 px-4 border border-transparent shadow-sm font-medium rounded-md text-white bg-green-500 hover:opacity-80 transition-opacity
                    w-[100%]"
            >
                Settings:
            </div>
        </div>
    )
}

SettingsTitle.propTypes = {}

export default SettingsTitle
