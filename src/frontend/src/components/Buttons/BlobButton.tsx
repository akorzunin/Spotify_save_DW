import React from "react"
import PropTypes from "prop-types"

const BlobButton = ({ title, link }) => {
    return (
        <div className="grid grid-cols-1 place-items-center h-[100%] mt-[20%]">
            <div className="relative w-44  overflow-hidden ">
                <img
                    className="img-responsive object-cover w-full h-full "
                    src={
                        new URL(
                            "./../../../static/images/Blob.svg",
                            import.meta.url
                        )
                    }
                    alt="blob"
                ></img>
                <a
                    href={link}
                    className={`cursor-pointer inline-flex justify-center px-4 py-2 border border-transparent 
                    hover:opacity-80 transition-opacity
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 absolute w-full bottom-[calc(50%-23px)] inset-x-0  
                    text-purple-700 font-bold text-xl text-center bg-opacity-0 shadow-none rounded-full`}
                >
                    {title}
                </a>
            </div>
        </div>
    )
}
BlobButton.defaultProps = {
    title: "Blob",
    link: "/",
}
BlobButton.propTypes = {
    title: PropTypes.string,
    link: PropTypes.string,
}

export default BlobButton
