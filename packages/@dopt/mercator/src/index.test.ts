import { Mercator } from './';
describe('Mercator', () => {
  describe('The `set()` and `get()` methods', () => {
    it('should work with an array as a key', () => {
      const d = new Mercator<[number, number], string>();
      d.set([1, 2], 'a');
      expect(d.get([1, 2])).toBe('a');
    });

    it('should work with an object as a key', () => {
      const d = new Mercator<Record<number, number>, string>();
      d.set({ 1: 1, 2: 2 }, 'a');
      expect(d.get({ 1: 1, 2: 2 })).toBe('a');
    });

    it('should work with a string as a key', () => {
      const d = new Mercator<string, string>();
      d.set('a', 'a');
      expect(d.get('a')).toBe('a');
    });
  });

  describe('The `clear()` method', () => {
    it('should the map', () => {
      const d = new Mercator<[number, number], string>();
      d.set([1, 2], 'a');
      expect(d.get([1, 2])).toBe('a');
      d.clear();
      expect(d.size).toBe(0);
    });
  });

  describe('The `delete()` method', () => {
    it('should delete the record from the map', () => {
      const d = new Mercator<[number, number], string>();
      d.set([1, 2], 'a').set([3, 4], 'b');
      expect(d.delete([3, 4])).toBe(true);
      expect(d.delete([1, 2])).toBe(true);
      expect(d.size).toBe(0);
    });
  });

  describe('The `entries()` method', () => {
    it('return an iterable iterator', () => {
      const d = new Mercator<[number, number], string>();
      d.set([1, 2], 'a').set([3, 4], 'b');
      const entries = d.entries();
      expect(entries.next().value).toEqual([[1, 2], 'a']);
      expect(entries.next().value).toEqual([[3, 4], 'b']);
    });
  });

  describe('The `keys()` method', () => {
    it('return an iterable iterator', () => {
      const d = new Mercator<[number, number], string>();
      d.set([1, 2], 'a').set([3, 4], 'b');
      const keys = d.keys();
      expect(keys.next().value).toEqual([1, 2]);
      expect(keys.next().value).toEqual([3, 4]);
    });
  });

  describe('The `Array.from(keys())` method', () => {
    it('return an iterable iterator', () => {
      const d = new Mercator<[number, number], string>();
      d.set([1, 2], 'a').set([3, 4], 'b');
      const keys = Array.from(d.keys());
      expect(keys).toEqual([
        [1, 2],
        [3, 4],
      ]);
    });
  });

  describe('The `Array.from(values())` method', () => {
    it('return an iterable iterator', () => {
      const d = new Mercator<[number, number], string>();
      d.set([1, 2], 'a').set([3, 4], 'b');
      const keys = Array.from(d.values());
      expect(keys).toEqual(['a', 'b']);
    });
  });

  describe('The `values()` method', () => {
    it('return an iterable iterator', () => {
      const d = new Mercator<[number, number], string>();
      d.set([1, 2], 'a').set([3, 4], 'b');
      const values = d.values();
      expect(values.next().value).toEqual('a');
      expect(values.next().value).toEqual('b');
    });
  });
  describe('The `has()` method', () => {
    it('return an true if it has the key', () => {
      const d = new Mercator<[number, number], string>();
      d.set([1, 2], 'a').set([3, 4], 'b');
      expect(d.has([1, 2])).toBe(true);
      expect(d.has([3, 4])).toBe(true);
    });
  });

  describe('The `forEach()` method', () => {
    it('allows iteration as expected', () => {
      const d = new Mercator<[number, number], string>();
      d.set([1, 2], 'a').set([3, 4], 'b').set([5, 6], 'c');
      let i = 0;
      d.forEach((v, k, map) => {
        expect(map.has(k)).toBe(true);
        expect(map.get(k)).toBe(v);
        switch (i) {
          case 0:
            expect(map.get([1, 2])).toBe(v);
            expect(map.get(k)).toBe('a');
            break;
          case 1:
            expect(map.get([3, 4])).toBe(v);
            expect(map.get(k)).toBe('b');
            break;
          case 2:
            expect(map.get([5, 6])).toBe(v);
            expect(map.get(k)).toBe('c');
            break;
        }
        i++;
      });
    });
  });

  describe('The `for...of` iteration works', () => {
    it('allows iteration as expected', () => {
      const d = new Mercator<[number, number], string>();
      d.set([1, 2], 'a').set([3, 4], 'b').set([5, 6], 'c');
      let i = 0;
      for (const [k, v] of d) {
        expect(d.has(k)).toBe(true);
        expect(d.get(k)).toBe(v);
        switch (i) {
          case 0:
            expect(d.get([1, 2])).toBe(v);
            expect(d.get(k)).toBe('a');
            break;
          case 1:
            expect(d.get([3, 4])).toBe(v);
            expect(d.get(k)).toBe('b');
            break;
          case 2:
            expect(d.get([5, 6])).toBe(v);
            expect(d.get(k)).toBe('c');
            break;
        }
        i++;
      }
    });
  });
});

export {};
