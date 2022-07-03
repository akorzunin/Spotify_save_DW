import React from 'react'
import PropTypes from 'prop-types'
import Button from "./Button";


const BlobButton = ({ title, link, }) => {
    // const BlobSvg = document.querySelector("#BlobSvg").className
    return (
        <div className="grid grid-cols-1 place-items-center h-[100%] mt-[15%]">
            <div className='relative w-44  overflow-hidden '>
                <img className="img-responsive object-cover w-full h-full "
                    src={new URL('./../../static/images/Blob.svg', import.meta.url) }
                    alt="pic" >
                </img>
                <Button
                    style="absolute w-full py-[50%] bottom-0 inset-x-0  
                    text-white  text-2xl text-center bg-opacity-0"
                    title={title}
                    link={link}
                    color=""
                />
            </div>
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
