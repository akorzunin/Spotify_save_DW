import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

const AccountStatus = ({ IsPremium }) => {
    return (
        <div className="px-3 mt-3">
            <div
                className={`inline-flex py-2 px-4 border border-transparent shadow-sm
                        font-medium rounded-md text-white ${
                            IsPremium ? "bg-green-500" : "bg-yellow-400"
                        } hover:opacity-80 transition-opacity
                        w-[100%] `}
            >
                Account status: {IsPremium ? "Premium" : "not Premium"}
            </div>
        </div>
    )
}

AccountStatus.propTypes = {}

export default AccountStatus
