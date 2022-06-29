import React from 'react'
import { weekNumber } from './utils/timeMangment'
export const WeekCounter = ({ className }) => {
    const [currentWeek, setcurrentWeek] = React.useState("00")
    React.useEffect(() => {
        setcurrentWeek(weekNumber)
    })
    return (
        <div className={className}>
            Current week: { currentWeek }
        </div>
    )
}
