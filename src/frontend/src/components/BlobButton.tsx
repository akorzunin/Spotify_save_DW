import React from 'react'
import PropTypes from 'prop-types'
import Button from "./Button";
import Cookies from 'universal-cookie';

const BlobButton = ({ title, link, }) => {
    // console.log(ACCESS_TOKEN);
    
    const cookies = new Cookies();
    // cookies.set('myCat', 'Pacman', { path: '/' });
    // console.log(cookies.getAll()); // Pacman
    // console.log(cookies.remove("access_token")); 

    const BlobSvg = document.querySelector("#BlobSvg").className
    return (
        <div className="grid grid-cols-1 place-items-center h-[100%] mt-[15%]">
            <div className='relative w-44  overflow-hidden '>
                <img className="img-responsive object-cover w-full h-full "
                    src={ BlobSvg }
                    alt="pic" >
                </img>
                {/* <div className="absolute left-[39%] lg:left-[39%]
                lg:top-[42%]"> */}
                    <Button
                    style="absolute w-full py-[50%] bottom-0 inset-x-0  text-white  text-xs text-center bg-opacity-0"
                        title="Try it"
                        link="/login"
                        color="bg-blue-700"
                    />
                {/* </div> */}
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
