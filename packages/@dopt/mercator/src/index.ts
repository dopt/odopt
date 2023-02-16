import { EntriesIterator, KeysIterator } from './iterators';

/**
 * A Map implementation that allows for objects as keys without key equality constraints.
 * Rather than using the standard SameValueZero algorithm as a Map, Mercator calls `JSON.stringify`
 * on its keys before inserting them into a Map. In practice, this works well for composite types
 * like Objects and Arrays. For more, see @dopt/mercator's [README.md]{@link https://github.com/dopt/odopt/tree/main/packages/@dopt/mercator/README.md}.
 */
export class Mercator<K, V> implements Map<K, V> {
  private map = new Map<string, V>();

  constructor(iterable?: [K, V][]) {
    if (iterable) {
      iterable.forEach(([k, v]) => {
        this.set(k, v);
      });
    }
  }

  [Symbol.toStringTag] = '[object Map]';

  set(key: K, value: V): this {
    this.map.set(JSON.stringify(key), value);
    return this;
  }

  get(key: K): V | undefined {
    return this.map.get(JSON.stringify(key));
  }

  clear() {
    this.map.clear();
  }

  delete(key: K): boolean {
    return this.map.delete(JSON.stringify(key));
  }

  entries(): IterableIterator<[K, V]> {
    return new EntriesIterator(this.map);
  }

  keys(): IterableIterator<K> {
    return new KeysIterator(this.map);
  }

  has(key: K): boolean {
    return this.map.has(JSON.stringify(key));
  }

  get size() {
    return this.map.size;
  }

  values(): IterableIterator<V> {
    return this.map.values();
  }

  forEach(
    callbackfn: (value: V, key: K, map: Map<K, V>) => void,
    self?: any
  ): void {
    this.map.forEach((value, key) =>
      callbackfn.call(self, value, JSON.parse(key), this)
    );
  }
  *[Symbol.iterator](): IterableIterator<[K, V]> {
    for (const i of this.map) {
      const [k, v] = i;
      yield [JSON.parse(k), v];
    }
  }
}
