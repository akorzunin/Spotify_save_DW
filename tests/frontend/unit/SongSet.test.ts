// playwright unit test
import { expect, test } from "vitest";
import { SongSet } from "../../../src/frontend/src/utils/songSet";

export const songSetTest = test.extend({
  songSet: async ({}, use) => {
    const songSet = new SongSet();
    songSet.add({ name: "Charlie", age: 35 });
    songSet.add({ name: "David", age: 40 });
    use(songSet);
  },
});

songSetTest("SongSet", async ({ songSet }: { songSet: SongSet }) => {
  expect(songSet.has({ name: "Charlie", age: 35 })).toBe(true);
  expect(songSet.size).toBe(2);
  songSet.delete({ name: "David", age: 40 });
  expect(songSet.size).toBe(1);
});

songSetTest("SongSet unique", async ({ songSet }: { songSet: SongSet }) => {
  songSet.add({ name: "Charlie", age: 35 });
  songSet.add({ name: "Charlie", age: 35 });

  expect(songSet.size).toBe(2);
});
