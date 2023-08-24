import React from 'react';
import { weekNumber } from '../utils/timeMangment';

export const WeekCounter: React.FC = () => {
    return (
        <div className="text-white text-sm xl:text-lg p-0.5 text-shadow-md">
            Current week: {weekNumber}
        </div>
    );
};
