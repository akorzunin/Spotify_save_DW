import React from 'react';
import { weekNumber } from '../utils/timeMangment';

export const WeekCounter: React.FC = () => {
  return (
    <div className="text-shadow-md p-0.5 text-sm  text-black xl:text-lg">
      Current week: {weekNumber}
    </div>
  );
};
