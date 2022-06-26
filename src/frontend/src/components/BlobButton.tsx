import React from 'react'
import PropTypes from 'prop-types'

const BlobButton = ({ title, link, }) => {
    const BlobSvg = document.querySelector("#BlobSvg").className
    return (
        <div className='w-5/12 h-5/12'>
            <img className="img-responsive"
                src={ BlobSvg }
                alt="pic" >
            </img>
        </div>
    )
}
BlobButton.defaultProps = {
    title: 'Blob',
    link: '/',
}
BlobButton.propTypes = {
    title: PropTypes.string,
    link: PropTypes.string,
}

export default BlobButton