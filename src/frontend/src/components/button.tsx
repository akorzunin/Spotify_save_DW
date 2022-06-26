// import PropTypes from 'prop-types'
const button = ({ btnName, link, color }) => {
    return (
        <div class="px-4 py-3 bg-purple-400 text-right sm:px-6">
            <a href={ link }
                class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm
                text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ">
                { btnName }
            </a>
        </div>

    )
}


button.propTypes = {

}

export default button
