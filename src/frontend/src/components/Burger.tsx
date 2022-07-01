import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const Burger = ({ burgerClass, handleBM }) => {
    return    (
        <div className="">
            <div className={`header__burger-menu ${burgerClass}`} onClick={handleBM} >
                <span ></span>
            </div>
        </div>
    )
}

Burger.propTypes = {}

export default Burger