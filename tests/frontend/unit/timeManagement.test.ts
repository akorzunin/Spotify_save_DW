import { expect, test } from "vitest";
import dayjs from "dayjs";
import { getWeekNumber } from "../../../src/frontend/src/utils/timeMangment";

test("getWeekNumber", async () => {
  const currentDate = dayjs("1970-01-01");
  const [fullYear, weekNumber] = getWeekNumber(currentDate.toDate());
  expect(weekNumber).toBe(1);
  expect(fullYear).toBe(1970);
});
