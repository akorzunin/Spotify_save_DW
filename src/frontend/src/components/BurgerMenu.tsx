import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import LogoutButton from './LogoutButton'
import { Link } from 'react-router-dom'

const BurgerMenu = ({ burgerClass, ButtonStyle}) => {
    const [burgerOpen, setburgerOpen] = useState("")
    useEffect(() => {
        setburgerOpen(burgerClass ? "popup_open" : "")
    }, [burgerClass])
    
    return (
        <div className={`popup ${burgerOpen} [clip-path:circle(70%_at_100%_30%)]`}>
            <div className="my-auto mr-7 ml-auto flex flex-col">
                <Link to="/help">
                    <Button
                        style={""}
                        title="Help"
                        link="/help"
                        color="text-black"
                    />
                </Link>
                <Button
                    style={""}
                    title="Home"
                    link="/"
                    color="text-black"
                />
                <LogoutButton
                    ButtonStyle={""}
                />
            </div>
        </div>
    )
}

BurgerMenu.propTypes = {}

export default BurgerMenu