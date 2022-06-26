import React from 'react';
import PropTypes from 'prop-types'

const Button = ({ title, link, color }) => {
    return (
        <a href={link} 
            className={`cursor-pointer inline-flex justify-center py-2 px-4 border border-transparent shadow-sm
                text-sm font-medium rounded-md text-white ${color} hover:opacity-80 transition-opacity
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 `}>
            { title }
        </a>
    )
}

Button.defaultProps = {
    title: 'Button',
    link: '/',
    color: 'bg-blue-700',
}

Button.propTypes = {
    title: PropTypes.string,
    link: PropTypes.string,
    color: PropTypes.string,
}

export default Button
