import { emptySong, Song } from '../interfaces/Song';

export class SongSet {
  items: Song[];
  constructor() {
    this.items = [];
  }

  add(item: Song) {
    if (!this.has(item) && item.name !== emptySong.name) {
      this.items.push(item);
    }
  }

  has(item: Song) {
    return this.items.some((existingItem) =>
      this.deepEqual(existingItem, item)
    );
  }

  delete(item: Song) {
    this.items = this.items.filter(
      (existingItem) => !this.deepEqual(existingItem, item)
    );
  }

  get size() {
    return this.items.length;
  }

  deepEqual(obj1: Song, obj2: Song) {
    if (typeof obj1 !== typeof obj2) return false;

    if (typeof obj1 !== 'object') return obj1 === obj2;

    // TODO: override comparrison logic for Song
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (const key of keys1) {
      if (!this.deepEqual(obj1[key], obj2[key])) return false;
    }

    return true;
  }

  get key() {
    return this.items.reduce((acc, item) => acc + item.id, '');
  }
}

// Usage
// const customSet = new CustomSet();

// customSet.add({ name: "Charlie", age: 35 });
// customSet.add({ name: "David", age: 40 });

// console.log(customSet.has({ name: "Charlie", age: 35 })); // true
// console.log(customSet.size); // 2

// customSet.delete({ name: "David", age: 40 });
// console.log(customSet.size); // 1
