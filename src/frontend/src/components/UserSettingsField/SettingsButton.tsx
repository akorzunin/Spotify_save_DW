import React from 'react'
import PropTypes from 'prop-types'

import Button from "../Buttons/BaseButton"

const SettingsButton = ({title, onClick, className}) => {
    return (
        <div onClick={onClick} className={className}>
            <Button
                style=""
                title={ title }
                link={undefined}
                color="bg-white text-black"
            />
        </div>
    )
}

SettingsButton.propTypes = {}

export default SettingsButton