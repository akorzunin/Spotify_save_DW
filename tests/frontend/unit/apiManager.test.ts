import { expect, test } from "vitest";

import { generatePlData } from "../../../src/frontend/src/utils/apiManager";

test("generatePlData default", async () => {
  const plData = await generatePlData();
  expect(plData.name).toBeDefined();
  expect(plData.description).toBeDefined();
});

test("generatePlData custom", async () => {
  // TODO: add custom name and description templates
  const plData = await generatePlData(
    "test{year}_{week}",
    "test description {year}",
  );
  console.log(plData);

  expect(plData.name).toBe("test");
  expect(plData.description).toBe("test");
});
