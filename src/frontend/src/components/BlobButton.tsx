import React from 'react'
import PropTypes from 'prop-types'
import Button from "./Button";


const BlobButton = ({ title, link, }) => {
    // const BlobSvg = document.querySelector("#BlobSvg").className
    return (
        <div className="grid grid-cols-1 place-items-center h-[100%] mt-[20%]">
            <div className='relative w-44  overflow-hidden '>
                <img className="img-responsive object-cover w-full h-full "
                    src={new URL('./../../static/images/Blob.svg', import.meta.url) }
                    alt="blob" >
                </img>
                <Button
                    style="absolute w-full py-[50%] bottom-[calc(50%-23px)] inset-x-0  
                    text-purple-700 font-bold text-xl text-center bg-opacity-0 shadow-none rounded-full"
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
