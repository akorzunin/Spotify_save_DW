import { expect, test } from "vitest";
import dayjs from "dayjs";

import { generatePlData } from "../../../src/frontend/src/utils/apiManager";
import {
  getTimeData,
  getWeekNumber,
  TimeData,
} from "../../../src/frontend/src/utils/timeMangment";

const testWithTime = test.extend({
  testTime: async ({}, use) => {
    use(dayjs("1970-01-01"));
  },
  testTimeData: async ({}, use) => {
    use(getTimeData(dayjs("1970-01-01").toDate()));
  },
});

testWithTime(
  "generatePlData default",
  async ({
    testTime,
    testTimeData,
  }: {
    testTime: dayjs.Dayjs;
    testTimeData: TimeData;
  }) => {
    const plData = await generatePlData(undefined, undefined, testTimeData);
    expect(plData.name).toBeDefined();
    expect(plData.description).toBeDefined();
  },
);

test(
  "generatePlData custom",
  async () => {
    const currentTime = dayjs();
    // TODO: add custom name and description templates
    const plData = await generatePlData(
      "test{year}_{week}",
      "test description {year}",
    );

    expect(plData.name).toBe("test");
    expect(plData.description).toBe("test");
  },
  { skip: true },
);
