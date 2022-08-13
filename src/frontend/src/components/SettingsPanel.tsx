import React from 'react'
import PropTypes from 'prop-types'
import ClickButton from './ClickButton'
import PlaylistTitle from './PlaylistTitle'

const SettingsPanel = () => {
    return (
        <div className="w-[448px]">
            <div className="px-3 w-[100%]">
                <div className="inline-flex py-2 px-4 border border-transparent shadow-sm
                    font-medium rounded-md text-white bg-green-500 hover:opacity-80 transition-opacity
                    w-[100%] ">
                    Settings:
                </div>
            </div>
            <div className="px-3 mt-3">
                <div className="inline-flex py-2 px-4 border border-transparent shadow-sm
                    font-medium rounded-md text-white bg-green-500 hover:opacity-80 transition-opacity
                    w-[100%] ">
                    Account status: non Premium
                </div>
            </div>
            <div className="mx-3 mt-3 bg-green-500 opacity-20 rounded-md">
                <div className="p-3">
                    SettingsPanel
                    SettingsPanel
                    SettingsPanel
                    SettingsPanel
                    SettingsPanel
                    SettingsPanel
                    SettingsPanel
                </div>
            </div>
        </div>
    )
}

SettingsPanel.propTypes = {}

export default SettingsPanel