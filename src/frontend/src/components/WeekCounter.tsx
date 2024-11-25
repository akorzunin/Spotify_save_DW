import React from 'react';
import { weekNumber } from '../utils/timeMangment';

export const WeekCounter: React.FC = () => {
  return (
    <div className="text-shadow-md xl:text-lg p-0.5 text-sm text-black">
      Current week: {weekNumber}
    </div>
  );
};
