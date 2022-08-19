import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

import AccountStatus from "./AccountStatus"
import SettingsTitle from "./SettingsTitle"
import SettingsButton from "./SettingsButton"
import { getUserData, createUser } from "../../utils/dbManager"
const SettingsPanel = ({ IsPremium, userId }) => {
    const [AutosaveHint, setAutosaveHint] = useState(false)
    const [SendmailHint, setSendmailHint] = useState(false)
    const [SubmitMessage, setSubmitMessage] = useState('')
    const showHint = (event) => {
        if (event) {
            if (event.target.id == "autosave") {
                setAutosaveHint(true)
            }
            if (event.target.id == "email-checkbox-label") {
                setSendmailHint(true)
            }
        }
    }
    const hideHint = (event) => {
        if (event) {
            if (event.target.id == "autosave") {
                setAutosaveHint(false)
            }
            if (event.target.id == "email-checkbox-label") {
                setSendmailHint(false)
            }
        }
    }
    const handleSubmit = (event) => {
        let formData = {}
        Array.from(event.currentTarget.elements).map((item: any) => {
            console.log(item.id, item.value)
            if (!item.id) return null
            if (item.type === 'checkbox') return item.checked
            return (formData[item.id] = item.value)
        })
        
    }
    useEffect(() => {
        getUserData(userId)
            .then((data) => {
                if (!data) {
                    // create user

                }
                console.log(data);
                
            })
    }, [])
    
    return (
        <div className="w-[448px] mb-3">
            <SettingsTitle />
            <AccountStatus IsPremium={IsPremium} />
            <div className="mx-3 mt-3 bg-green-500 rounded-md p-3 bg-opacity-20">
                <form onSubmit={handleSubmit} className="w-full max-w-lg">
                    <div className="flex items-center relative mb-4">
                        <input
                            id="email-checkbox"
                            type="checkbox"
                            value=""
                            className={`w-4 h-4 text-blue-600 bg-gray-100 rounded 
                            border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 
                            dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 
                            dark:border-gray-600`}
                        ></input>
                        <label
                            id="email-checkbox-label"
                            htmlFor="email-checkbox"
                            className="whitespace-nowrap mx-2 font-medium text-gray-900"
                            onMouseEnter={showHint}
                            onMouseLeave={hideHint}
                        >
                            Send weekly email
                        </label>
                        <div
                            className={`text-sm font-light text-gray-900 
                            bg-gray-500 absolute max-w-[192px] right-[30px]
                            rounded-md
                            ${SendmailHint ? "" : "hidden"}`}
                        >
                            <div className="p-3">
                                Send email everery week at Sunday to not
                                forget/inform about DW playlist save
                            </div>
                        </div>
                    </div>
                    <input
                        id="email-input"
                        className={`w-full mb-3 appearance-none block bg-gray-200 
                        text-gray-700 border border-red-500 rounded py-3 px-4 
                        leading-tight focus:outline-none focus:bg-white`}
                        type="email"
                        placeholder="Email"
                    ></input>
                    <input
                        className={`w-full mb-3 appearance-none block bg-gray-200 
                        text-gray-700 border border-red-500 rounded py-3 px-4 
                        leading-tight focus:outline-none focus:bg-white`}
                        id="email-date-input"
                        type="datetime-local"
                    ></input>

                    <div className="flex items-center relative mb-4">
                        <input
                            id="autosave-checkbox"
                            type="checkbox"
                            value=""
                            className={`w-4 h-4 text-blue-600 bg-gray-100 rounded
                                border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600
                                dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700
                                dark:border-gray-600`}
                        ></input>
                        <label
                            id="autosave"
                            htmlFor="autosave-checkbox"
                            className="whitespace-nowrap mx-2 font-medium text-gray-900"
                            onMouseEnter={showHint}
                            onMouseLeave={hideHint}
                        >
                            Autosave
                        </label>
                        <div
                            className={`text-sm font-light text-gray-900
                                bg-gray-500 absolute max-w-[192px] 
                                right-[100px] rounded-md
                                ${AutosaveHint ? "" : "hidden"}`}
                        >
                            <div className="p-3">
                                Save palylist automatically at choosen time UTC.
                                Service need to play one of playlist songs to
                                get playlist context
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div>{SubmitMessage}</div>
                        <SettingsButton
                            title="Save"
                            onClick={handleSubmit}
                            className="mb-3"
                        />
                        <input type="submit" value="Submit" />
                    </div>
                </form>
                <SettingsButton
                    title="Collect current DW"
                    onClick={undefined}
                    className="mb-3"
                />
                <SettingsButton
                    title="Play DW playlist"
                    onClick={undefined}
                    className={undefined}
                />
            </div>
        </div>
    )
}

SettingsPanel.propTypes = {}

export default SettingsPanel
