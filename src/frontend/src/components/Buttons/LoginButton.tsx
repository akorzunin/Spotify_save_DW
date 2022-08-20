import React from "react"
import PropTypes from "prop-types"
import BaseButton from "./BaseButton"

const LoginButton = (props) => {
    return (
        <a href="/login">
            <BaseButton
                title="Login"
                link={undefined}
                color="bg-white"
                style={undefined}
            />
        </a>
    )
}

LoginButton.propTypes = {}

export default LoginButton
