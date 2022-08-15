import React from 'react'
import PropTypes from 'prop-types'
import ClickButton from './ClickButton'
import PlaylistTitle from './PlaylistTitle'
import Button from './Button'
import AccountStatus from './AccountStatus'

const SettingsPanel = ({IsPremium}) => {
    return (
        <div className="w-[448px]">
            <div className="px-3 w-[100%]">
                <div className="inline-flex py-2 px-4 border border-transparent shadow-sm
                    font-medium rounded-md text-white bg-green-500 hover:opacity-80 transition-opacity
                    w-[100%] ">
                    Settings:
                </div>
            </div>
            <div className="px-3 mt-3">
                <AccountStatus
                    IsPremium={IsPremium}
                />
            </div>
            <div className="mx-3 mt-3 bg-green-500 rounded-md p-3 bg-opacity-20">
                <form class="w-full max-w-lg">
                    <div class="flex items-center mb-4">
                        <input id="email-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        </input>
                        <label for="email-checkbox" class="whitespace-nowrap mx-2 font-medium text-gray-900">
                            Send weekly email
                        </label>
                        <div className="text-sm font-light text-gray-900">
                            Send email everery week at Sunday to not forget/inform about DW playlist save
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Email">
                            </input>
                        </div>
                    </div>
                    <div class="flex items-center mb-4">
                        <input id="email-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        </input>
                        <label for="email-checkbox" class="whitespace-nowrap mx-2 font-medium text-gray-900">
                            Autosave
                        </label>
                        <div className="text-sm font-light text-gray-900">
                            Save palylist automatically at Sunday xx:xx UTC. Service need to play one of playlist songs to get playlist context
                        </div>
                    </div>
                </form>
                <div className="my-3">
                    <Button
                        style=""
                        title="Collect current DW"
                        link="/help"
                        color="bg-white text-black"
                    />
                </div>
                <div>
                    <Button
                        style=""
                        title="Play DW playlist"
                        link="/help"
                        color="bg-white text-black"
                    />
                </div>
            </div>
        </div>
    )
}

SettingsPanel.propTypes = {}

export default SettingsPanel