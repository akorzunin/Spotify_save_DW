import React from 'react';
import PropTypes from 'prop-types'

const Header = ({ title, }) => {
    return (
        <div >
            <h1 className="text-6xl font-bold">
                {title}
            </h1>
        </div>
    )
}

Header.defaultProps = {
    title: 'Header',
}

Header.propTypes = {
    title: PropTypes.string,
}

export default Header