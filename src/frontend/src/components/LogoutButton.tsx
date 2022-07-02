
import React from 'react'
import Button from './Button'
import * as cookieHandle from './utils/cookieHandle'


const LogoutButton = ({ButtonStyle}) => {
    return (
        <div onClick={ cookieHandle.deleteCookies }>
            <Button
                style={ButtonStyle}
                title="Logout"
                link="/"
                color="bg-red-500"
            />
        </div>
    )
}

export default LogoutButton
